import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
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
}));
