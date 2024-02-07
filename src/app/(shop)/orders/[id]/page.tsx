import Title from "@/components/ui/title/Title";

import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";

import OrderItems from "./ui/OrderItems";
import OrderSummary from "./ui/OrderSummary";
import OrderStatus from "@/components/orders/OrderStatus";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;
  const summary = {
    orderId: order!.id,
    itemsInOrder: order!.itemsInOrder,
    subTotal: order!.subTotal,
    taxes: order!.tax,
    total: order!.total,
    isPaid: order!.isPaid,
  };

  return (
    <div className="flex justify-center items center mb-72 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            <OrderItems orderItems={order!.OrderItem} />
          </div>

          {/* Order summary */}
          <OrderSummary address={address} summary={summary} />
        </div>
      </div>
    </div>
  );
}
