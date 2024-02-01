"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      error: "You need to be logged in to get order by id",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`Order not found with id: ${orderId}`);

    if (session.user.role === "user") {
      if (order.userId !== session.user.id) {
        throw new Error(`${orderId} is not your order`);
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      error: "Failed to get order by id",
    };
  }
};
