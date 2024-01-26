"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
      message: "The address was deleted",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "The address could not be deleted",
    };
  }
};
