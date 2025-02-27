"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Product } from "@/types/products";

import AddToCartButton from "./add-to-cart-button";
import BlurImage from "./blur-image";

import { ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [src, setSrc] = useState(product.image || "/file.svg");

  return (
    <div
      key={product.id}
      className={cn(
        "group flex flex-col justify-between space-y-4 rounded-lg border p-4 shadow hover:border-primary bg-background",
        className
      )}
    >
      <BlurImage
        src={src}
        alt={product.title}
        width={300}
        height={300}
        className={cn(
          "mx-auto object-contain object-center transition-transform",
          src === "/file.svg"
            ? "scale-75"
            : "scale-100 group-hover:scale-105"
        )}
        onError={() => setSrc("/file.svg")}
      />

      <div className="flex w-full flex-col justify-between space-y-3">
        <div>
          <h2 className="line-clamp-2 text-lg font-semibold">{product.title}</h2>

          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-gray-700">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}

            {product.discount > 0 && (
              <span className="text-sm text-red-500 line-through">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price + product.discount)}
              </span>
            )}
          </div>

          <Link href={`/search/${product.category}`} className="rounded-md border px-2.5 py-0.5 text-xs font-semibold text-primary">
            {product.category}
          </Link>
        </div>

        <div className="!mt-6 flex gap-2">
          <AddToCartButton product={product} size="icon" />

          <Button asChild variant="outline" className="group/button w-full">
            <Link href={`/products/${product.id}`}>
              Ver detalhes
              <ChevronRight className="me-1 size-4 transition-all group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
