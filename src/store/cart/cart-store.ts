import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
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
    }),
    {
      name: "shopping-cart",
    }
  )
);
