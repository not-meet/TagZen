"use server"

import { scrapeAmazonProduct } from "../scraper";

export async function scrapAndStoreProducts(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
  } catch (error: any) {
    throw new Error(`failed to create/update product: ${error.message}`);
  }
}
