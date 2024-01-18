"use client";

import { useState } from "react";

import SizeSelector from "@/components/product/size-selector/SizeSelector";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";

import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size,
      quantity,
    };

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="text-red-500 fade-in">Please select a size*</span>
      )}

      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
