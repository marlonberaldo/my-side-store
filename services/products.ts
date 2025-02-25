import {
  ProductCategoryParams,
  ProductParams,
  ProductResponse,
  ProductsResponse
} from "@/types/products";

import { getData } from "@/helpers/get-data";

export async function getProducts({ limit = 10, page = 1 }: ProductParams = {}) {
  const searchParams = new URLSearchParams({ limit: String(limit), page: String(page) });

  return await getData<ProductsResponse>(`/products?${searchParams.toString()}`);
}

export async function getProductsByCategory({ limit = 10, page = 1, category }: ProductCategoryParams) {
  const searchParams = new URLSearchParams({ limit: String(limit), page: String(page) });

  return await getData<ProductsResponse>(`/products/category?type=${category}&${searchParams.toString()}`);
}

export async function getProductById(id: string): Promise<ProductResponse> {
  const response = await getData<ProductResponse>(`/products/${id}`);

  return response;
}