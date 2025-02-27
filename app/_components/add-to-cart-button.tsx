"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Product } from "@/types/products";

import { useCart } from "@/context/cart-context";

import { CheckCircle, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "default" | "icon";
}

const AddToCartButton = ({ product, className, size }: AddToCartButtonProps) => {
  const { cart, dispatch } = useCart();
  const isInCart = cart.some(item => item.id === product.id);

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  return (
    <Button
      className={cn("flex items-center gap-2 shrink-0", className)}
      size={size}
      onClick={handleCartToggle}
      role="button"
      aria-label={`Adicionar ou remover ${product.title} do carrinho`}
    >
      {isInCart ? (
        <>
          {size === "icon" ? null : "Adicionado"}
          <CheckCircle className="size-5 " />
        </>
      ) : (
        <>
          {size === "icon" ? null : "Adicionar ao carrinho"}
          <ShoppingCart className="size-5" />
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;