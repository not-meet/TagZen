import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  //bright data proxy config
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    //fetching the product
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    // console.log(response.data);

    //extract the product title
    const title = $('#productTitle').text().trim();
    const currPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('.a-price.a-text-price'))

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    const outofStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'))

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    // construct data object with the scrapped info 
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currPrice),
      originalPrice: Number(originalPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outofStock,
    }
    // console.log({ title, currPrice, originalPrice, outofStock, imageUrls, currency });
    console.log(data);
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }

}
