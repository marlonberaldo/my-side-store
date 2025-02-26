import { Suspense } from "react";

import Link from "next/link";

import SearchForm from "./search-form";
import CartButton from "./cart-button";

const Header = () => {

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between gap-2 border-b bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <Link href="/" className="flex items-center gap-x-4">
        <span className="flex size-[40px] items-center justify-center rounded-full border bg-primary font-bold text-primary-foreground">
          MS
        </span>
        <span className="text-sm font-bold">
          MY SIDE STORE
        </span>
      </Link>

      <Suspense fallback={null}>
        <SearchForm className="hidden md:flex" />
      </Suspense>

      <CartButton />
    </header>
  );
};

export default Header;