"use client";

import { useState } from "react";

import SizeSelector from "@/components/product/size-selector/SizeSelector";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";

import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {};

  return (
    <>
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
