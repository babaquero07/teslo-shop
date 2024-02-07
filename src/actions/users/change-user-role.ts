"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      error: "You are not authorized to perform this action",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};
