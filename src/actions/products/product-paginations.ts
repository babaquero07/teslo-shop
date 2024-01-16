"use server";

import prisma from "../../lib/prisma";

export const getPaginatedProductsWithImages = async (
  page: number,
  limit: number
) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    console.log("🚀 ~ products:", products);
  } catch (error) {
    console.log(error);
  }
};
