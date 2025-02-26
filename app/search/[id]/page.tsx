import { getProductsByCategory } from "@/services/products";

import { Params } from "@/types/params";

import ProductCard from "@/app/_components/product-card";

export async function generateMetadata(params: Params) {
  const { id } = await params.params;

  return {
    title: `Pesquisa por "${id}"`,
    description: `Resultados da pesquisa por "${id}"`,
  };
}

export default async function SearchIdPage(params: Params) {
  const { id } = await params.params;

  const { products } = await getProductsByCategory({ category: id });

  const resultsText = products.length > 1 ? "resultados" : "resultado";

  return (
    <div>
      <p className="mb-4 text-muted-foreground">
        {products.length === 0
          ? "Nenhum produto encontrado para "
          : `Exibindo ${products.length} ${resultsText} para `
        }
        <strong className="font-bold">&quot;{id}&quot;</strong>
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );

}