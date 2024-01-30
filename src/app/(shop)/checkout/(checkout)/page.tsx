import Link from "next/link";

import Title from "@/components/ui/title/Title";
import ProductsInCart from "./ui/ProductsInCart";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items center mb-72 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Edit order</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Shipping address</h2>
            <div className="mb-10">
              <p className="text-xl">Alexander Baquero</p>
              <p>Av. Siempre viva 123</p>
              <p>USA</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl font-bold mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 products</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Taxes (15 %)</span>
              <span className="text-right">$ 100</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  By placing your order, you agree to our terms of service and
                  privacy policy.
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
