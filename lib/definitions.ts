export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: Array<StrapiRichText>;
  images: StrapiImage[];
  bannerImage: StrapiImage[];
  color: string;
  categories: Array<{ slug: string; name: string }>;
  collections: Array<{ slug: string; name: string }>;
  faces: Array<{ slug: string; name: string; description: StrapiRichText[] }>;
  cart_items: Array<CartItem>;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sizes: Size[];
  straps: Strap[];
}

export interface Size {
  documentId: string;
  id: number;
  name: string;
  slug: string;
  straps: Strap[];
}

export interface Strap {
  documentId: string;
  id: number;
  name: string;
  slug: string;
  images: StrapiImage[];
}
interface StrapiRichText {
  children: Array<{
    text: string;
    type: string;
  }>;
  type: string;
}

export interface StrapiImage {
  alternativeText: string;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: {
    large: StrapiImageFormat;
    medium: StrapiImageFormat;
    small: StrapiImageFormat;
    thumbnail: StrapiImageFormat;
  };
  hash: string;
  width: number;
  height: number;
  id: number;
  name: string;
  url: string;
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
  size: string;
  color: string | undefined;
  createdAt: string;
}

export interface OrderItem {
  createdAt: string;
  documentId: string;
  id: number;
  price: number;
  product: Product;
  quantity: number;
  total: number;
  size: string;
  color: string | undefined;
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
  networks: {
    available: string[];
    preferred: string | null;
  };
  regulated_status: string;
  three_d_secure_usage: {
    supported: boolean;
  };
  last4: string;
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

export interface Order {
  amount: number;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  name: string;
  order_items: OrderItem[];
  order_number: string;
  payment_id: string;
  payment_method: PaymentMethod;
  publishedAt: string;
  shipping_address: Address;
  updatedAt: string;
}
