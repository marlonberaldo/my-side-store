"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  const [count, setCount] = useState<number>(0);

  const formattedCount = count > 9 ? "9+" : count;

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={() => setCount(prev => prev + 1)}
    >
      <ShoppingCart />
      <span className="absolute -right-2 -top-2 flex size-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
        {formattedCount}
      </span>
    </Button>
  );
};

export default CartButton;