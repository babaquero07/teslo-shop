"use server";

import { signIn } from "@/auth.config";

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    return "Something went wrong.";
  }
}
