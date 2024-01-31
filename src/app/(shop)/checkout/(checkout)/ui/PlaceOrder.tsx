"use client";

import { useState, useEffect } from "react";

import { useCartStore, useAddressStore } from "@/store";

import { currencyFormat } from "@/utils/currencyFormat";
import clsx from "clsx";

import { placeOrder } from "@/actions";

const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { totalItems, subTotal, taxes, total } = useCartStore((state) =>
    state.getOrderSummary()
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    await placeOrder(productsToOrder, address);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Shipping address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.zipCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl font-bold mb-2">Order summary</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {totalItems === 1 ? "1 product" : `${totalItems} products`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Taxes (15 %)</span>
        <span className="text-right">{currencyFormat(taxes)}</span>
        <span className="text-2xl mt-5">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            By placing your order, you agree to our terms of service and privacy
            policy.
          </span>
        </p>

        {/* <p className="text-red-500">Error creating order</p> */}

        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
