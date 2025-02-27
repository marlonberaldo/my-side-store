"use client";

import { Suspense, useState } from "react";

import Link from "next/link";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import CartButton from "./cart-button";
import { SearchForm, SearchSkeleton } from "./search-form";

import { Menu, X } from "lucide-react";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between gap-2 border-b bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <Drawer direction="left" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger
          className="md:hidden"
          aria-label="Abrir menu"
        >
          <Menu />
        </DrawerTrigger>

        <DrawerContent className="h-dvh w-full rounded-none border-none md:hidden">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DrawerClose asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Fechar menu"
              >
                <X />
              </Button>
            </DrawerClose>

            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <div className="flex size-full flex-col items-start justify-between">
            <div className="w-full space-y-3 p-5">
              <Suspense fallback={<SearchSkeleton className="max-w-full" />}>
                <SearchForm className="max-w-full" onSubmit={() => setIsDrawerOpen(false)} />
              </Suspense>

              <Link
                href="/"
                className="flex items-center gap-x-2 opacity-70 hover:opacity-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/search"
                className="flex items-center gap-x-2 opacity-70 hover:opacity-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                Categorias
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-x-2 opacity-70 hover:opacity-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                Carrinho
              </Link>
            </div>

            <div className="flex w-full items-center justify-center gap-x-3 border-t px-5 py-2">
              <span className="flex size-9 items-center justify-center rounded-xl border bg-primary text-sm font-bold text-primary-foreground">
                MS
              </span>
              <span className="whitespace-nowrap text-sm font-bold">MY SIDE STORE</span>
            </div>
          </div>

        </DrawerContent>
      </Drawer>

      <div className="flex items-center gap-5">
        <Link href="/" className="flex items-center gap-x-2">
          <span className="flex size-[40px] items-center justify-center rounded-xl border bg-primary font-bold text-primary-foreground">
            MS
          </span>
          <span className="whitespace-nowrap text-sm font-bold">
            MY SIDE STORE
          </span>
        </Link>

        <Link href="/search" className="hidden text-sm underline-offset-4 opacity-60 hover:underline hover:opacity-100 md:block">
          Categorias
        </Link>
      </div>

      <Suspense fallback={<SearchSkeleton className="hidden md:flex md:max-w-[300px] lg:max-w-[500px]" />}>
        <SearchForm className="hidden md:flex md:max-w-[300px] lg:max-w-[500px]" />
      </Suspense>

      <CartButton />
    </header >
  );
};

export default Header;