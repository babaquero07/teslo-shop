"use server";

import { PayPalOrdeStatusResponse } from "@/interfaces";

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
    const result = await fetch(oauth2url, requestOptions).then((r) => r.json());

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
    const resp = await fetch(
      `${paypalOrderUrl}/${paypalTransactionId}`,
      requestOptions
    ).then((response) => response.json());

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
  console.log("🚀 ~ paypalCheckPayment ~ status:", status);
  console.log("🚀 ~ paypalCheckPayment ~ purchase_units:", purchase_units);
  if (status !== "COMPLETED") {
    return { ok: false, message: "Payment not completed" };
  }
};
