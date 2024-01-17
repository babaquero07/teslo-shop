import Link from "next/link";
import Image from "next/image";

import { initialData } from "@/seed/seed";
import Title from "@/components/ui/title/Title";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex justify-center items center mb-72 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": true,
                  "bg-green-700": false,
                }
              )}
            >
              <IoCardOutline size={30} />
              <div className="mx-2">Pending to pay</div>
              {/* <div className="mx-2">Paid order</div> */}
            </div>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  className="mr-5 rounded"
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": true,
                    "bg-green-700": false,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <div className="mx-2">Pending to pay</div>
                {/* <div className="mx-2">Paid order</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
