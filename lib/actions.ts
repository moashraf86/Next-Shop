"use server";

import { Product, StrapiResponse } from "./definitions";

// [1] fetch products
export async function fetchProducts(): Promise<{ products: Product[] }> {
  const res = await fetch(`${process.env.STRAPI_API_URL}/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // simulate long loading for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response: StrapiResponse<Product> = await res.json();

  // Transform the Strapi response to match our Product interface
  const products = response.data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: {
      url: item.image.url,
      height: item.image.height,
      width: item.image.width,
      formats: item.image.formats,
    },
    price: item.price,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
  }));

  return {
    products,
  };
}
