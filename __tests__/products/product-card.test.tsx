/* eslint-disable @next/next/no-img-element */

import { ImageProps } from "next/image";

import { Product } from "@/types/products";

import { fireEvent, render, screen } from "@testing-library/react";
import ProductCard from "@/app/_components/product-card";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/image", () => {
  return function ImageMock(props: ImageProps) {
    const { src, alt, ...rest } = props;
    return <img
      src={typeof src === "string" ? src : ""}
      alt={alt || ""}
      {...rest}
    />;
  };
});

jest.mock("@/app/_components/add-to-cart-button", () => ({
  __esModule: true,
  default: () => <button data-testid="add-to-cart">Adicionar ao carrinho</button>,
}));

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

describe("ProductCard", () => {
  it("should render correctly title, description and prices", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição do produto")).toBeInTheDocument();

    expect(screen.getByText(/R\$ 100,00/)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 120,00/)).toBeInTheDocument();
  });

  it("should render a link to the category page", () => {
    render(<ProductCard product={mockProduct} />);

    const categoryLink = screen.getByText("eletronicos");
    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveAttribute("href", "/search/eletronicos");
  });

  it("should render a 'Ver detalhes' button with the correct link", () => {
    render(<ProductCard product={mockProduct} />);

    const detailsLink = screen.getByText("Ver detalhes");
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute("href", "/products/1");
  });

  it("should render a 'Adicionar ao carrinho' button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });

  it("should change the image to '/file.svg' if there is an error loading", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("Produto Teste") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/product.jpg");

    fireEvent.error(image);
    expect(image.src).toContain("/file.svg");
  });
});
