import { useCart } from "@/context/cart-context";

import CartList from "@/app/cart/_components/cart-list";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/context/cart-context");

describe("CartList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the empty cart message when the cart is empty", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      dispatch: jest.fn(),
      loading: false,
    });

    render(<CartList />);

    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
  });

  it("should display the cart items when the cart has products", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: "1",
          title: "Produto 1",
          price: 100,
          discount: 10,
          quantity: 2,
          image: "/product1.jpg",
        },
      ],
      dispatch: jest.fn(),
      loading: false,
    });

    render(<CartList />);

    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Total (2)")).toBeInTheDocument();
  });

  it("should increment the item quantity when clicking the plus button", () => {
    const dispatchMock = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: "1",
          title: "Produto 1",
          price: 100,
          discount: 10,
          quantity: 2,
          image: "/product1.jpg",
        },
      ],
      dispatch: dispatchMock,
      loading: false,
    });

    render(<CartList />);

    const plusButton = screen.getByLabelText("Incrementar quantidade");
    fireEvent.click(plusButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "UPDATE_QUANTITY",
      payload: { id: "1", quantity: 3 },
    });
  });

  it("should decrement the item quantity when clicking the minus button", () => {
    const dispatchMock = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: "1",
          title: "Produto 1",
          price: 100,
          discount: 10,
          quantity: 2,
          image: "/product1.jpg",
        },
      ],
      dispatch: dispatchMock,
      loading: false,
    });

    render(<CartList />);

    const minusButton = screen.getByLabelText("Diminuir quantidade");
    fireEvent.click(minusButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "UPDATE_QUANTITY",
      payload: { id: "1", quantity: 1 },
    });
  });

  it("should remove the item from the cart when clicking the remove button", () => {
    const dispatchMock = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: "1",
          title: "Produto 1",
          price: 100,
          discount: 10,
          quantity: 2,
          image: "/product1.jpg",
        },
      ],
      dispatch: dispatchMock,
      loading: false,
    });

    render(<CartList />);

    const removeButton = screen.getByRole("button", { name: /remover/i });
    fireEvent.click(removeButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "REMOVE_FROM_CART",
      payload: "1",
    });
  });

  it("should display the total value of the cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: "1",
          title: "Produto 1",
          price: 100,
          discount: 10,
          quantity: 2,
          image: "/product1.jpg",
        },
        {
          id: "2",
          title: "Produto 2",
          price: 80,
          discount: 0,
          quantity: 1,
          image: "/product2.jpg",
        }
      ],
      dispatch: jest.fn(),
      loading: false,
    });

    render(<CartList />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("R$ 180,00")).toBeInTheDocument();
  });

  it("should clear the cart and show a success alert when the 'Finalizar compra' button is clicked", async () => {
    const dispatchMock = jest.fn();
    global.alert = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: "1",
          title: "Produto 1",
          price: 100,
          discount: 10,
          quantity: 2,
          image: "/product1.jpg",
        },
      ],
      dispatch: dispatchMock,
      loading: false,
    });

    render(<CartList />);

    const finalizeButton = screen.getByRole("button", { name: /finalizar compra/i });
    fireEvent.click(finalizeButton);

    expect(global.alert).toHaveBeenCalledWith("Parabéns! Sua compra foi finalizada com sucesso!");
    expect(dispatchMock).toHaveBeenCalledWith({ type: "CLEAR_CART" });
  });
});
