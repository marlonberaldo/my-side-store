import { Suspense } from "react";

import ProductCard from "./_components/product-card";
import CategoriesNav from "./_components/categories-nav";
import { Pagination } from "./_components/pagination";

import { getProducts } from "@/services/products";

import { Params } from "@/types/params";

async function GetProducts({ props }: { props: Params }) {
  const { page, limit } = await props.searchParams;

  const { products, hasMore } = await getProducts({
    page: Number(page) || 1,
    limit: Number(limit) || 15,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="md:first-of-type:col-span-2"
          />
        ))}
      </div>

      <Pagination hasMore={hasMore} />
    </>
  );
}

function ProductsFallback() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {Array
        .from({ length: 15 })
        .map((_, index) => (
          <div
            key={`product-${index}`}
            className="h-[450px] w-full animate-pulse rounded-lg border bg-primary/10 shadow md:first-of-type:col-span-2"
          />
        ))}
    </div>
  );
}

export default function Home(props: Params) {

  return (
    <main className="space-y-[25px]">
      <CategoriesNav />

      <Suspense fallback={<ProductsFallback />}>
        <GetProducts props={props} />
      </Suspense>
    </main>
  );
}
