"use server"

import { revalidatePath } from 'next/cache'
import Product from "../models/product.models";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils'
import { connect } from 'http2';
import { generateEmailBody, sendEmail } from '../nodemailer';
import { User } from '@/app/types';

export async function scrapAndStoreProducts(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory: any = [...existingProduct.priceHistory, { price: scrapedProduct.currentPrice }]

      product = {
        ...scrapedProduct, priceHistory: updatedPriceHistory, lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory), averagePrice: getAveragePrice(updatedPriceHistory),

      }
    }
    const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url }, product, { upsert: true, new: true })

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`failed to create/update product: ${error.message}`);
  }
}

//getting the product in the website seperate page

export async function getProductByid(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });
    if (!product) return null;
    return product
  } catch (error) {
    console.log(error)
  }
}

//getting all the scrapAndStoreProducts

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (e) {
    console.log(e);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currProduct = await Product.findById(productId);
    if (!currProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3)
    return similarProducts;
  } catch (e) {
    console.log(e);
  }
}


export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try {
    connectToDB()
    const product = await Product.findById(productId);

    if (!product) return

    const userExist = product.users.some((user: User) => user.email === userEmail);
    if (!userExist) {
      product.users.push({ email: userEmail });

      await product.save();
      try {
        const emailContent = await generateEmailBody(product, 'WELCOME');  // Await if needed

        // Send the email content now
        await sendEmail(emailContent, [userEmail]);
      } catch (error) {
        console.error('Error generating email:', error);
      }

    }
  } catch (error) {

  }
}
