"use server";

import type { Address, Size } from "@/interfaces";

import { auth } from "@/auth.config";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "There is no user logged in.",
    };
  }
};
