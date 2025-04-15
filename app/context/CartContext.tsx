import { toast } from "@/hooks/use-toast";
import {
  addProductToCart as apiAddProductToCart,
  removeCartItem as apiRemoveCartItem,
  updateItemQuantity as apiUpdateItemQuantity,
} from "@/lib/actions";
import { fetchCartItems } from "@/lib/data";
import { CartContextType, CartItem, Product } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [currentUpdatingProduct, setCurrentUpdatingProduct] = useState<
    string | null
  >(null);
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const username = user?.fullName;

  // Initialize cart items from strapi
  async function fetchCart() {
    if (!email) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // fetch cart items from strapi
      const items = await fetchCartItems(email);
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Add item to cart
  const addProductToCart = async (product: Product, quantity: number) => {
    try {
      setIsUpdatingProduct(true);
      // Add product to Strapi and get the response
      if (!email || !username) {
        throw new Error("User email or username is missing");
      }
      const res = await apiAddProductToCart(email, username, quantity, product);

      // Simulate delay for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update cart items in context
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item to cart with documentId from Strapi
          const newItem = {
            id: res.data.id,
            documentId: res.data.documentId,
            quantity: quantity,
            product: product,
          };
          return [...prevItems, newItem];
        }
      });
      // Show success toast notification
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    } catch (error: unknown) {
      console.error("Error adding product to cart:", error);
      // Show error toast notification
      toast({
        title: "Error adding to cart",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId: string) => {
    try {
      await apiRemoveCartItem(itemId);
      // Update cart items in context
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.documentId !== itemId)
      );
    } catch (error) {
      toast({
        title: "Error removing item",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  // Update item quantity
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    try {
      setIsUpdatingProduct(true);
      setCurrentUpdatingProduct(itemId);
      // Add product to Strapi and get the response
      const res = await apiUpdateItemQuantity(itemId, quantity);

      // Simulate delay for 1 second
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update cart items in context
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.documentId === itemId
            ? { ...item, quantity: res.data.quantity }
            : item
        )
      );
    } catch (error: unknown) {
      // Show error toast notification
      toast({
        title: "Error updating item",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsUpdatingProduct(false);
    }
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
        addProductToCart,
        removeCartItem,
        updateItemQuantity,
        getCartCount,
        clearCart,
        loading,
        isUpdatingProduct,
        currentUpdatingProduct,
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
