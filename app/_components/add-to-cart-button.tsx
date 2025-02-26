"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Product } from "@/types/products";

import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "default" | "icon";
}

const AddToCartButton = ({ product, className, size }: AddToCartButtonProps) => {

  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      size={size}
      onClick={() => console.log("Add to cart clicked", product)}>
      <ShoppingCart className="size-4" />
      {size === "icon" ? null : "Adicionar ao carrinho"}
    </Button>
  );
};

export default AddToCartButton;