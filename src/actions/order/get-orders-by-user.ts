"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Must be authenticated to get orders",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!orders) {
      return {
        ok: false,
        message: "No orders found",
      };
    }

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Error getting orders");
  }
};
