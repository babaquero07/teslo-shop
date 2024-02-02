import Title from "@/components/ui/title/Title";

import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";

import OrderItems from "./ui/OrderItems";
import OrderSummary from "./ui/OrderSummary";

import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

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
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <div className="mx-2">
                {!order!.isPaid ? "Pending to pay" : "Paid order"}
              </div>
            </div>

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
