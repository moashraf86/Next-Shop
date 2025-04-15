import { Product, SingleStrapiResponse, StrapiResponse } from "./definitions";

// [1] fetch all products
export async function fetchProducts(): Promise<{ products: Product[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // simulate long loading for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response: StrapiResponse<Product> = await res.json();

  const products = response.data;

  return {
    products,
  };
}

// [2] fetch by category
export async function fetchProductsByCategory(
  category: string
): Promise<{ products: Product[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*&filters[categories][name][$eq]=${category}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // simulate long loading for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response: StrapiResponse<Product> = await res.json();

  const products = response.data;

  return {
    products,
  };
}

// [3] fetch bestselling products
export async function fetchBestSellingProducts(
  gender: string
): Promise<{ products: Product[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*&filters[$and][0][categories][name][$eq]=bestselling&filters[$and][1][categories][name][$eq]=${gender}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // simulate long loading for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response: StrapiResponse<Product> = await res.json();

  const products = response.data;

  return {
    products,
  };
}

// [4] fetch product by id
export async function fetchProductById(
  id: string
): Promise<{ product: Product }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${id}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const response: SingleStrapiResponse<Product> = await res.json();

  const product = response.data;

  return {
    product,
  };
}

// [5] fetch cart products from strapi
export async function fetchCartItems(email: string | undefined) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/carts?filters[email][$eq]=${email}&populate[cart_items][populate][product][populate]=image`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const response: StrapiResponse<Product> = await res.json();

  const cartItems = response.data[0]?.cart_items || [];

  return cartItems;
}
