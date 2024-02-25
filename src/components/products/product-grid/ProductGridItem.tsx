"use client";

import { useState } from "react";
import Link from "next/link";

import { Product } from "@/interfaces";
import { currencyFormat } from "@/utils";

import ProductImage from "@/components/product/product-image/ProductImage";

interface Props {
  product: Product;
}

const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <div
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        >
          <ProductImage
            src={displayImage}
            alt={product.title}
            className="w-full object-cover"
            width={500}
            height={500}
          ></ProductImage>
        </div>
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">{currencyFormat(product.price)}</span>
      </div>
    </div>
  );
};

export default ProductGridItem;
