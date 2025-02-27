
import { Product } from "@/types/products";

import { CartProvider } from "@/context/cart-context";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCartButton from "@/app/_components/add-to-cart-button";

const mockProduct: Product = {
  id: 1,
  title: "Produto Teste",
  description: "Descrição do produto",
  price: 100,
  discount: 20,
  image: "/product.jpg",
  category: "eletronicos",
  brand: "Marca",
  color: "Azul",
  model: "Modelo",
};

describe("AddToCartButton", () => {
  it("should add product to cart", async () => {
    render(
      <CartProvider>
        <AddToCartButton product={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByRole("button", { name: `Adicionar ou remover ${mockProduct.title} do carrinho` });

    await userEvent.click(button);

    expect(await screen.findByText(/Adicionado/i)).toBeInTheDocument();
  });

  it("should remove product from cart", async () => {
    render(
      <CartProvider>
        <AddToCartButton product={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByRole("button", { name: `Adicionar ou remover ${mockProduct.title} do carrinho` });

    await userEvent.click(button);

    expect(await screen.findByText(/Adicionar ao carrinho/i)).toBeInTheDocument();
  });

  it("should render button with icon only when size is 'icon'", () => {
    render(
      <CartProvider>
        <AddToCartButton product={mockProduct} size="icon" />
      </CartProvider>
    );

    expect(screen.queryByText(/Adicionado/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Adicionar ao carrinho/i)).not.toBeInTheDocument();
  });

  it("should focus on the add to cart button when tabbing", async () => {
    render(
      <CartProvider>
        <AddToCartButton product={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByRole("button", { name: `Adicionar ou remover ${mockProduct.title} do carrinho` });

    button.focus();
    expect(button).toHaveFocus();
  });
});