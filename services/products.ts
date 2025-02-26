import {
  ProductCategoryParams,
  ProductParams,
  ProductResponse,
  ProductsResponse
} from "@/types/products";

import { getData } from "@/helpers/get-data";

export async function getProducts({ limit = 10, page = 1, query }: ProductParams = {}) {
  const searchParams = new URLSearchParams({ limit: String(limit), page: String(page) });

  const productsResponse = await getData<ProductsResponse>(`/products?${searchParams.toString()}`);

  const filteredProducts = query
    ? productsResponse.products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
    : productsResponse.products;

  const hasMore = filteredProducts.length >= limit;

  return {
    ...productsResponse,
    products: filteredProducts,
    hasMore
  };
}

// products by category has no support for pagination (page param is not working)
export async function getProductsByCategory({ limit, category }: ProductCategoryParams) {
  const searchParams = new URLSearchParams({ limit: String(limit) });

  return await getData<ProductsResponse>(`/products/category?type=${category}&${searchParams.toString()}`);
}

export async function getProductById(id: string): Promise<ProductResponse> {
  const response = await getData<ProductResponse>(`/products/${id}`);

  return response;
}