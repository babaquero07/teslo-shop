"use server";

import prisma from "@/lib/prisma";

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

    return {
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("Error getting products with images");
  }
};
