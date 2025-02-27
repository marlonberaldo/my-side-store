"use client";

import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useCart } from "@/context/cart-context";

import { Minus, Plus, Trash } from "lucide-react";

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

  const totalCart = cart.reduce((acc, item) => acc + item.quantity * (item.price - (item.discount || 0)), 0);

  return (
    <section>
      <ul className="space-y-4 pb-[50px]">
        {cart.map((item) => (
          <li key={item.id} className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-4 rounded-lg border border-b-2 p-4 shadow md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-x-10 gap-y-4 md:flex-row md:items-center">
              <Image
                src={item.image || "/a50.webp"}
                alt={item.title}
                width={150}
                height={150}
                className="min-h-[150px] min-w-[150px] rounded-md object-contain md:border md:p-1"
              />

              <div className="flex max-w-full flex-col md:max-w-[250px]">
                <p className="line-clamp-2 text-lg font-bold">{item.title}</p>

                <div className="flex items-start gap-x-2 font-semibold">
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
            </div>

            <div className="flex flex-col items-start">
              <span className="text-sm text-muted-foreground">Total ({item.quantity})</span>
              <span className="font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.quantity * (item.price - (item.discount || 0)))}
              </span>
            </div>

            <div className="flex w-full flex-wrap items-start justify-between gap-2 md:w-auto md:flex-col lg:items-center">
              <div className="flex items-center gap-4 rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Diminuir quantidade"
                  disabled={item.quantity === 1}
                  onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })}
                >
                  <Minus className="size-4" />
                </Button>

                <span>{item.quantity}</span>

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Incrementar quantidade"
                  onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })}
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              <Button
                variant="destructive"
                aria-label="Remover do carrinho"
                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
              >
                <Trash className="size-4" /> Remover
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="fixed bottom-0 left-0 z-40 w-full gap-4 border-t bg-background px-4 py-3">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="flex w-full items-center justify-between gap-x-4 md:w-auto">
            <span className="font-semibold text-muted-foreground">Total</span>
            <span className="font-bold underline">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalCart)}
            </span>
          </div>

          <Button
            variant="default"
            size="default"
            className="mt-3 w-full bg-primary text-white md:mt-0 md:w-[250px]"
            aria-label="Finalizar compra"
            onClick={() => {
              alert("Parabéns! Sua compra foi finalizada com sucesso!");
              dispatch({ type: "CLEAR_CART" });
            }}
          >
            Finalizar compra
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartList;