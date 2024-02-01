import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { currencyFormat } from "@/utils/currencyFormat";

const OrderSummary = ({ orderSummary, orderAddress }) => {
  return (
    <div className="bg-white rounded-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Shipping address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {orderAddress.firstName} {orderAddress.lastName}
        </p>
        <p>{orderAddress.address}</p>
        <p>{orderAddress.address2}</p>
        <p>{orderAddress.zipCode}</p>
        <p>
          {orderAddress.city}, {orderAddress.country.name}
        </p>
        <p>{orderAddress.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl font-bold mb-2">Order summary</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {orderSummary.itemsInOrder === 1
            ? "1 product"
            : `${orderSummary.itemsInOrder} products`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">
          {currencyFormat(orderSummary.subTotal)}
        </span>
        <span>Taxes (15 %)</span>
        <span className="text-right">{currencyFormat(orderSummary.taxes)}</span>
        <span className="text-2xl mt-5">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(orderSummary.total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <div
          className={clsx(
            "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
            {
              "bg-red-500": !orderSummary.isPaid,
              "bg-green-700": orderSummary.isPaid,
            }
          )}
        >
          <IoCardOutline size={30} />
          <div className="mx-2">
            {!orderSummary.isPaid ? "Pending to pay" : "Paid order"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
