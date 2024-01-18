import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;

  updateProductQuantity: (product: CartProduct, quantity: number) => void;

  removeProductFromCart: (product: CartProduct) => void;

  getOrderSummary: () => {
    totalItems: number;
    subTotal: number;
    taxes: number;
    total: number;
  };
}

export const useCartStore = create<State>()(
  // Persist the cart in local storage
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // Check if product is already in cart with the size selected
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // If product is already in cart, update the quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },

      getOrderSummary: () => {
        const { cart } = get();

        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const taxes = subTotal * 0.15;
        const total = subTotal + taxes;

        return { totalItems, subTotal, taxes, total };
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
