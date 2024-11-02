"use server"

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapAndStoreProducts(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return
  } catch (error: any) {
    throw new Error(`failed to create/update product: ${error.message}`);
  }
}
