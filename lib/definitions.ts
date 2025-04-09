export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: Array<StrapiRichText>;
  image: StrapiImage;
  categories: Array<{ name: string }>;
  cart_items: Array<CartItem>;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiRichText {
  children: Array<{
    text: string;
    type: string;
  }>;
  type: string;
}

interface StrapiImage {
  url: string;
  height: number;
  width: number;
  alternativeText: string;
  formats: {
    large: StrapiImageFormat;
    medium: StrapiImageFormat;
    small: StrapiImageFormat;
    thumbnail: StrapiImageFormat;
  };
}

interface StrapiImageFormat {
  url: string;
  height: number;
  width: number;
}

export interface SingleStrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiResponse<T> {
  data: Array<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  getCartCount: () => number;
  clearCart: () => void;
}
