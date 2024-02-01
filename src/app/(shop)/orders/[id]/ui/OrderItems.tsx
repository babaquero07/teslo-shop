import Image from "next/image";

import { currencyFormat } from "@/utils/currencyFormat";

const OrderItems = ({ orderItems }) => {
  return (
    <>
      {orderItems.map((product) => (
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
            <p>
              {product.title} - {product.size}
            </p>
            <p>
              ${product.price} x {product.quantity}
            </p>
            <p className="font-bold">
              Subtotal: {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderItems;
