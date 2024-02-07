import PayPalButton from "@/components/paypal/PaypalButton";

import { currencyFormat } from "@/utils/currencyFormat";

const OrderSummary = ({ address, summary }) => {
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
          {address.city}, {address.countryId}.
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl font-bold mb-2">Order summary</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {summary.itemsInOrder === 1
            ? "1 product"
            : `${summary.itemsInOrder} products`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(summary.subTotal)}</span>
        <span>Taxes (15 %)</span>
        <span className="text-right">{currencyFormat(summary.taxes)}</span>
        <span className="text-2xl mt-5">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(summary.total)}
        </span>
      </div>

      {/* PaypalButton */}
      {!summary.isPaid && (
        <div className="mt-5 mb-2 w-full">
          <PayPalButton amount={summary.total} orderId={summary.orderId} />
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
