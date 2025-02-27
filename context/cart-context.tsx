/* eslint-disable indent */

"use client";

import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";

import { Product } from "@/types/products";

type CartItem = Product & { quantity: number };

type CartState = {
  cart: CartItem[];
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case "UPDATE_QUANTITY": {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    }

    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

type CartContextType = {
  cart: CartItem[];
  dispatch: Dispatch<CartAction>;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const initialCart = typeof window !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [];

  const [state, dispatch] = useReducer(cartReducer, { cart: initialCart });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }

    setLoading(false);
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
