"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useCart } from "@/context/cart-context";

import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Carrinho de compras"
      >
        <ShoppingCart />
      </Button>
    );
  }

  const formattedCount = cart.length > 9 ? "9+" : cart.length;

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Carrinho de compras"
      asChild
    >
      <Link href="/cart" className="relative">
        <ShoppingCart />
        <span className="absolute -right-2 -top-2 flex size-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {formattedCount}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;