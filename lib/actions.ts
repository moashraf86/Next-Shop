import { CartItem, Product } from "./definitions";

// [1] create cart entry
export const createCart = async (data: {
  username: string;
  email: string | undefined;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          username: data.username,
          email: data.email,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to create cart: ${errorData.error || "Unknown error"}`
      );
    }

    const response = await res.json();
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in createCart:", error.message);
    } else {
      console.error("Error in createCart:", error);
    }
    throw error;
  }
};

// [2] add product to cart
export const addProductToCart = async (
  email: string | undefined,
  username: string,
  quantity: number,
  product: Product
) => {
  try {
    // Fetch existing cart for the user
    const cartRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/carts?filters[email][$eq]=${email}&populate[cart_items][populate]=product`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!cartRes.ok) {
      throw new Error("Failed to fetch cart");
    }

    const cartData = await cartRes.json();

    let cart = cartData.data[0];

    if (!cart) {
      // Create a new cart if none exists
      const newCart = await createCart({ username, email });
      cart = newCart.data;
    }

    // Ensure cart and cart items exist
    const cartItems = cart.cart_items || [];

    // Check if the product already exists in the cart
    const existingCartItem = cartItems.find(
      (item: CartItem) => item.product.id === product.id
    );

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/cart-items/${existingCartItem.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              quantity: existingCartItem.quantity + quantity,
            },
          }),
        }
      );

      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        throw new Error(
          `Failed to update cart item: ${errorData.error || "Unknown error"}`
        );
      }

      const updatedCartItem = await updateRes.json();
      return updatedCartItem;
    } else {
      // Add a new cart item
      const addItemRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/cart-items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              quantity: quantity,
              cart: cart.id,
              product: product.id,
            },
          }),
        }
      );

      if (!addItemRes.ok) {
        const errorData = await addItemRes.json();
        throw new Error(
          `Failed to add product to cart: ${errorData.error || "Unknown error"}`
        );
      }

      const newCartItem = await addItemRes.json();

      return newCartItem;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in addProductToCart:", error.message);
    } else {
      console.error("Error in addProductToCart:", error);
    }
    throw error;
  }
};

// [3] remove cart item
export const removeCartItem = async (cartItemId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/cart-items/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to remove cart item: ${errorData.error || "Unknown error"}`
      );
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in removeCartItem:", error.message);
    } else {
      console.error("Error in removeCartItem:", error);
    }
    throw error;
  }
};

// [4] increase product quantity
export const updateItemQuantity = async (
  cartItemId: string,
  quantity: number
) => {
  try {
    // update cart item quantity
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/cart-items/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            quantity,
          },
        }),
      }
    );

    console.log("updateItemQuantity", res.url);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to update cart item quantity: ${
          errorData.error || "Unknown error"
        }`
      );
    }

    const updatedCartItem = await res.json();
    return updatedCartItem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in increaseProductQuantity:", error.message);
    } else {
      console.error("Error in increaseProductQuantity:", error);
    }
    throw error;
  }
};

// [5] create order
export const createOrder = async (data: {
  name: string;
  email: string | undefined;
  amount: number;
  products: number[];
  payment_id?: string;
  order_number?: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name: data.name,
            email: data.email,
            amount: data.amount,
            products: data.products,
            payment_id: data.payment_id,
            order_number: `ORD-${crypto
              .randomUUID()
              .split("-")[0]
              .toUpperCase()}`,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to create order: ${errorData.error || "Unknown error"}`
      );
    }

    const response = await res.json();
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in createOrder:", error.message);
    } else {
      console.error("Error in createOrder:", error);
    }
    throw error;
  }
};
