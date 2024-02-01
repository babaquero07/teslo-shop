"use server";

import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include: {
            product: {
              include: {
                ProductImage: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
        OrderAddress: {
          include: {
            country: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!order) return null;

    const { OrderItem, ...rest } = order;

    return {
      ...rest,
      items: OrderItem.map((item) => {
        const { product, ...rest } = item;

        return {
          ...rest,
          title: item.product.title,
          slug: item.product.slug,
          images: item.product.ProductImage.map((image) => image.url),
        };
      }),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error getting order by id");
  }
};
