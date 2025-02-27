import React from "react";

import { CartProvider, useCart } from "@/context/cart-context";

import { render, screen } from "@testing-library/react";

const TestComponent = () => {
  const { cart, loading } = useCart();

  return (
    <div>
      <p data-testid="cart-length">{cart.length}</p>
      <p data-testid="loading">{loading ? "loading" : "loaded"}</p>
    </div>
  );
};

describe("CartProvider", () => {
  it("should provide the cart context", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
    expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
  });
});
