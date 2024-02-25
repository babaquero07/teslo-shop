"use client";

import { useState, useEffect } from "react";

import { useCartStore } from "@/store";

import { currencyFormat } from "@/utils/currencyFormat";

import ProductImage from "@/components/product/product-image/ProductImage";

const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product, index) => (
        <div key={`product-${index + 1}`} className="flex mb-5">
          <ProductImage
            className="mr-5 rounded"
            src={product.image}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
          />

          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
