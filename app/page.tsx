import ProductCard from "./_components/product-card";

import { getProducts } from "@/services/products";

import { Params } from "@/types/params";

export default async function Home(props: Params) {
  const { page, limit } = await props.searchParams;

  const { products } = await getProducts({
    page: Number(page) || 1,
    limit: Number(limit) || 15,
  });

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="md:first-of-type:col-span-2"
          />
        ))}
      </div>
    </main>
  );
}
