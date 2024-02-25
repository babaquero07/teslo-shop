"use server";

import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "Image of FS cannot be deleted",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);

    const deletedImage = await prisma?.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${deletedImage?.product.slug}`);
    revalidatePath(`/product/${deletedImage?.product.slug}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      error: "Error deleting image",
    };
  }
};
