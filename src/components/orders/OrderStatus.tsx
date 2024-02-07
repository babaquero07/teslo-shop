import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}

const OrderStatus = ({ isPaid }: Props) => {
  console.log("🚀 ~ OrderStatus ~ isPaid:", isPaid);
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": !isPaid,
          "bg-green-700": isPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      <div className="mx-2">{!isPaid ? "Pending to pay" : "Paid order"}</div>
      <p></p>
    </div>
  );
};

export default OrderStatus;
