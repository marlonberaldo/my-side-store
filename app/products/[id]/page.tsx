import { Suspense } from "react";

import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { getProductById, getProductsByCategory } from "@/services/products";

import { Params } from "@/types/params";

import AddToCartButton from "@/app/_components/add-to-cart-button";
import ProductCard from "@/app/_components/product-card";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { id } = await props.params;

  const { product } = await getProductById(id);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.title,
          width: 800,
          height: 600,
        },
      ],
    }
  };
}

async function GetRelatedProducts({ productId, category }: { productId: number, category: string }) {
  const { products } = await getProductsByCategory({
    category,
    limit: 5
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products
        .filter(product => product.id !== productId)
        .slice(0, 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

function RelatedProductsFallback() {

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array
        .from({ length: 4 })
        .map((_, index) => (
          <div
            key={`product-${index}`}
            className="h-[450px] w-full animate-pulse rounded-lg border bg-primary/10 shadow"
          />
        ))}
    </div>
  );
}

export default async function SingleProductPage(props: Params) {
  const { id } = await props.params;

  const { product } = await getProductById(id);

  return (
    <main className="space-y-[50px]">
      <div className="relative flex flex-col justify-between gap-[25px] lg:flex-row lg:items-start">
        <div className="relative aspect-[2/1.5] w-full lg:w-1/2">
          <Image
            src={"/a50.webp"} // product.image is not working, so I'm using a static image
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain object-top"
          />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-1/2">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <hr />

          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center gap-2 text-lg font-semibold">
            {product.discount > 0 ? (
              <>
                <span className="font-bold text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price - product.discount)}
                </span>

                <span className="text-base text-muted-foreground/50 line-through">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </span>
              </>
            ) : (
              <span className="text-green-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </span>
            )}
          </div>

          <div className="space-y-1 text-sm text-gray-500">
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Modelo:</strong> {product.model}</p>
            <p><strong>Cor:</strong> {product.color}</p>
            <p><strong>Categoria:</strong>
              <Link href={`/search/${product.category}`} className="ml-1 hover:underline">
                {product.category}
              </Link>
            </p>
          </div>

          <div className="fixed bottom-0 left-0 z-10 w-full bg-background px-2 py-3 lg:static lg:p-0">
            <AddToCartButton
              product={product}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700"
            />
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <p className="text-2xl font-bold">Produtos Relacionados</p>
        <Suspense fallback={<RelatedProductsFallback />}>
          <GetRelatedProducts
            productId={product.id}
            category={product.category}
          />
        </Suspense>
      </section>
    </main>
  );
}