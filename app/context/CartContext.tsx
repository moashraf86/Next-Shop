import { fetchCartItems } from "@/lib/data";
import { CartContextType, CartItem, Product } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  console.log(email);

  // Initialize cart items from strapi
  useEffect(() => {
    console.log(cartItems);

    fetchCartItems(email).then((response) => {
      const items = response[0]?.cart_items;
      setCartItems(items);
      console.log("Fetched cart items:", items);
    });
  }, [email]);

  // Add item to cart
  const addToCart = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productId
      );
      console.log("existingItem", existingItem);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          { id: productId, quantity: 1, product: { id: productId } as Product },
        ];
      }
    });
  };

  // Remove item from cart
  const removeProductFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Get total cart count
  const getCartCount = () => {
    return cartItems?.reduce((total, item) => total + item.quantity, 0);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeProductFromCart,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
