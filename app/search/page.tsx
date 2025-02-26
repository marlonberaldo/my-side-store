import { getProducts } from "@/services/products";

import { Params } from "@/types/params";

import ProductCard from "../_components/product-card";

export default async function SearchPage(props: Params) {
  const { q: searchValue, page, limit } = await props.searchParams;

  const q = Array.isArray(searchValue) ? searchValue[0] : searchValue;

  const { products } = await getProducts({
    page: Number(page) || 1,
    limit: Number(limit) || searchValue ? 150 : 24
  });

  const filteredProducts = q
    ? products.filter((product) => product.title.toLowerCase().includes(q.toLowerCase()))
    : products;

  const resultsText = products.length > 1 ? "resultados" : "resultado";

  return (
    <main>
      {q && (
        <p className="mb-4 text-muted-foreground">
          {filteredProducts.length === 0
            ? "Nenhum produto encontrado para "
            : `Exibindo ${filteredProducts.length} ${resultsText} para `
          }
          <strong className="font-bold">&quot;{q}&quot;</strong>
        </p>

      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}