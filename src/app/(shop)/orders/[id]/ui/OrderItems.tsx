import ProductImage from "@/components/product/product-image/ProductImage";

import { currencyFormat } from "@/utils/currencyFormat";

const OrderItems = ({ orderItems }) => {
  return (
    <>
      {orderItems.map(({ price, quantity, size, product }: any) => (
        <div key={product.slug + "-" + size} className="flex mb-5">
          <ProductImage
            className="mr-5 rounded"
            src={product.ProductImage[0].url}
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
              {product.title} - {size}
            </p>
            <p>
              ${price} x {quantity}
            </p>
            <p className="font-bold">
              Subtotal: {currencyFormat(price * quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderItems;
