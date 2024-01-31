"use server";

import type { Address, Size } from "@/interfaces";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

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

  // Get products information
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });

  // Calculate total price
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Subtotal, tax and total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product)
        throw new Error("Product not found with id: " + item.productId);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // A database transaction refers to a sequence of read/write operations that are guaranteed to either succeed or fail as a whole
  // Create transaction in database
  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. Update product stock

    // 2. Create order - header - detail
    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ??
                0,
            })),
          },
        },
      },
    });

    // 3. Create order address
    const { country, ...restAddress } = address;

    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,
      },
    });
  });
};
