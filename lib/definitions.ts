export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: StrapiRichText;
  image: StrapiImage;
  categories: Array<{ name: string }>;
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
