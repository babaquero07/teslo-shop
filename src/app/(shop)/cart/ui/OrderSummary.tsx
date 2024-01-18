"use client;";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useCartStore } from "@/store";

const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { totalItems, subTotal, taxes, total } = useCartStore((state) =>
    state.getOrderSummary()
  );

  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {loaded && totalItems > 0 && (
        <div className="bg-white rounded-xl p-7 h-fit">
          <h2 className="text-2xl mb-2">Order summary</h2>
          <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">
              {totalItems === 1 ? "1 product" : `${totalItems} products`}
            </span>
            <span>Subtotal</span>
            <span className="text-right">$ {subTotal}</span>
            <span>Taxes (15 %)</span>
            <span className="text-right">$ {taxes}</span>
            <span className="text-2xl mt-5">Total</span>
            <span className="mt-5 text-2xl text-right">$ {total}</span>
          </div>

          <div className="mt-5 mb-2 w-full">
            <Link
              className="flex btn-primary justify-center"
              href="/checkout/address"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
