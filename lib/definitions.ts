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
  name: string;
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
  documentId: string;
  quantity: number;
  product: Product;
}

export interface OrderItem {
  createdAt: string;
  documentId: string;
  id: number;
  price: number;
  product: Product;
  quantity: number;
  total: number;
  updatedAt: string;
}
export interface CartContextType {
  cartItems: CartItem[];
  addProductToCart: (product: Product, quantity: number) => void;
  removeCartItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  getCartCount: () => number;
  clearCart: () => void;
  loading: boolean;
  isUpdatingProduct: boolean;
  currentUpdatingProduct: string | null;
}

export interface Address {
  /**
   * City/District/Suburb/Town/Village.
   */
  city: string | null;

  /**
   * 2-letter country code.
   */
  country: string | null;

  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  line1: string | null;

  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  line2: string | null;

  /**
   * ZIP or postal code.
   */
  postal_code: string | null;

  /**
   * State/County/Province/Region.
   */
  state: string | null;
}

interface PaymentCard {
  brand: string;
  checks: {
    address_line1_check: string;
    address_postal_code_check: string;
    cvc_check: string;
  };
  country: string;
  display_brand: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from: any | null;
  networks: {
    available: string[];
    preferred: string | null;
  };
  regulated_status: string;
  three_d_secure_usage: {
    supported: boolean;
  };
  wallet: any | null;
}

interface BillingDetails {
  address: {
    city?: string | null;
    country?: string | null;
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    state?: string | null;
  };
  email: string | null;
  name: string | null;
  phone: string | null;
  tax_id?: string | null;
}
export interface PaymentMethod {
  id: string;
  object: "payment_method";
  type: "card";
  livemode: boolean;
  created: number;
  customer: string | null;
  metadata: Record<string, string>;
  card: PaymentCard;
  billing_details: BillingDetails;
}
