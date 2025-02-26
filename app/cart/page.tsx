import { Metadata } from "next";

import CartList from "./_components/cart-list";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Confira os produtos que você adicionou ao carrinho",
};

export default function CartPage() {

  return (
    <main>
      <CartList />
    </main>
  );
}