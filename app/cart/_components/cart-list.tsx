"use client";

import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useCart } from "@/context/cart-context";

import { Minus, Plus } from "lucide-react";

const CartList = () => {
  const { cart, dispatch, loading } = useCart();

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`cart-item-${index}`} className="h-[160px] animate-pulse rounded-lg bg-primary/10" />
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/empty_cart.png"
          alt="Carrinho vazio"
          width={200}
          height={200}
          className="object-contain"
        />
        <p className="mt-2 text-lg font-semibold">Seu carrinho está vazio</p>
        <p className="text-base text-muted-foreground">Adicione produtos ao carrinho para continuar</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {cart.map((item) => (
        <li key={item.id} className="flex flex-col items-start justify-between gap-5 rounded-lg border p-4 md:flex-row lg:items-center">
          <figure className="rounded-lg bg-secondary p-2 ">
            <Image
              src={"/a50.webp"} // item.image is not available
              alt={item.title}
              width={150}
              height={150}
              className="object-contain"
            />
          </figure>

          <div className="flex max-w-full flex-col lg:max-w-[250px]">
            <p className="line-clamp-2 text-lg font-bold">{item.title}</p>
            <div className="flex items-center gap-2 text-lg font-semibold">
              {item.discount > 0 ? (
                <>
                  <span className="font-bold text-green-600">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price - item.discount)}
                  </span>

                  <span className="text-base text-muted-foreground/50 line-through">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </span>
                </>
              ) : (
                <span className="text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={() =>
                dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })
              }
            >
              <Minus className="size-4" />
            </Button>

            <span>{item.quantity}</span>

            <Button
              variant="secondary"
              size="icon"
              onClick={() =>
                dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })
              }
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            variant="destructive"
            className="w-full max-w-[150px]"
            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
          >
            Remover
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default CartList;