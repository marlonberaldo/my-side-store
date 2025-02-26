import { Metadata } from "next";

import { getProducts } from "@/services/products";

import { Params } from "@/types/params";

import ProductCard from "../_components/product-card";
import { Pagination } from "../_components/pagination";

export const metadata: Metadata = {
  title: "Pesquisa",
  description: "Página de pesquisa de produtos",
};

export default async function SearchPage(props: Params) {
  const { q: searchValue, page, limit } = await props.searchParams;

  const q = Array.isArray(searchValue) ? searchValue[0] : searchValue;

  const { products, hasMore } = await getProducts({
    page: Number(page) || 1,
    limit: limit ? Number(limit) : (q ? 150 : 15),
    // api has no support for query search pagination, so we need to fetch all products to ensure we have enough to show (150)
    query: q
  });

  const resultsText = products.length > 1 ? "resultados" : "resultado";

  return (
    <main>
      {q && (
        <p className="mb-4 text-muted-foreground">
          {products.length === 0
            ? "Nenhum produto encontrado para "
            : `Exibindo ${products.length} ${resultsText} para `
          }
          <strong className="font-bold">&quot;{q}&quot;</strong>
        </p>

      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <Pagination hasMore={hasMore} />
    </main>
  );
}