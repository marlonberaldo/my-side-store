import { Product } from "@/types/products";

import { CartAction, cartReducer } from "@/context/cart-context";

describe("cartReducer", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Smartphone",
    image: "https://example.com/smartphone.jpg",
    price: 1200,
    description: "Um ótimo smartphone",
    brand: "MarcaX",
    model: "ModeloY",
    color: "Preto",
    category: "Eletrônicos",
    discount: 10,
  };

  it("should add a product to the cart", () => {
    const initialState = { cart: [] };
    const action: CartAction = { type: "ADD_TO_CART", payload: mockProduct };
    const newState = cartReducer(initialState, action);

    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0].id).toBe(mockProduct.id);
    expect(newState.cart[0].quantity).toBe(1);
  });

  it("should increment the quantity of an existing product in the cart", () => {
    const initialState = { cart: [{ ...mockProduct, quantity: 1 }] };
    const action: CartAction = { type: "ADD_TO_CART", payload: mockProduct };
    const newState = cartReducer(initialState, action);

    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0].quantity).toBe(2);
  });

  it("should update the quantity of a product in the cart", () => {
    const initialState = { cart: [{ ...mockProduct, quantity: 1 }] };
    const action: CartAction = { type: "UPDATE_QUANTITY", payload: { id: 1, quantity: 5 } };
    const newState = cartReducer(initialState, action);

    expect(newState.cart[0].quantity).toBe(5);
  });

  it("should remove a product from the cart", () => {
    const initialState = { cart: [{ ...mockProduct, quantity: 1 }] };
    const action: CartAction = { type: "REMOVE_FROM_CART", payload: 1 };
    const newState = cartReducer(initialState, action);

    expect(newState.cart).toHaveLength(0);
  });

  it("should clear the cart", () => {
    const initialState = { cart: [{ ...mockProduct, quantity: 1 }] };
    const action: CartAction = { type: "CLEAR_CART" };
    const newState = cartReducer(initialState, action);

    expect(newState.cart).toHaveLength(0);
  });
});