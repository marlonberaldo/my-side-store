export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
}

export type ProductParams = {
  limit?: number;
  page?: number;
  query?: string;
}

export type ProductCategoryParams = {
  limit?: number;
  category: string;
}

export interface ProductsResponse {
  status: string;
  message: string;
  products: Product[];
}

export interface ProductResponse {
  status: string;
  message: string;
  product: Product;
}
