import { CategoryResponse } from "@/types/categories";

import { getData } from "@/helpers/get-data";

export async function getCategories() {

  return await getData<CategoryResponse>("/products/category");
}