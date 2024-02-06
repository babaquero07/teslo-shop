"use server";

import prisma from "@/lib/prisma";

import { PayPalOrdeStatusResponse } from "@/interfaces";
import { revalidatePath } from "next/cache";

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());

    return result.access_token;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrdeStatusResponse | null> => {
  const paypalOrderUrl = process.env.PAYPAL_ORDERS_URL ?? "";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(`${paypalOrderUrl}/${paypalTransactionId}`, {
      ...requestOptions,
      cache: "no-store",
    }).then((response) => response.json());

    return resp;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return { ok: false, message: "Failed to get PayPal token" };
  }

  const res = await verifyPayPalPayment(paypalTransactionId, authToken);
  if (!res) {
    return { ok: false, message: "Failed to verify payment" };
  }

  const { status, purchase_units } = res;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return { ok: false, message: "Payment not completed" };
  }

  // Update order
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`orders/${orderId}`);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Failed to update order" };
  }
};
