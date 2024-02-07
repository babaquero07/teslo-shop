"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You are not authorized to perform this action",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
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
