export interface Product {
  id: number;
  title: string;
  description: Array<{
    children: Array<{
      text: string;
      type: string;
    }>;
    type: string;
  }>;
  image: {
    url: string;
    height: number;
    width: number;
    formats: {
      large: { url: string; height: number; width: number };
      medium: { url: string; height: number; width: number };
      small: { url: string; height: number; width: number };
      thumbnail: { url: string; height: number; width: number };
    };
  };
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
