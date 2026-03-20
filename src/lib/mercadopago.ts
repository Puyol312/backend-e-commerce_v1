import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { productOptions } from "../types";

if (!process.env.MP_TOKEN) { 
  throw new Error("MP_TOKEN is not defined in .env");
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_TOKEN as string,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

const BASE_URL =
	process.env.VERCEL_URL ?
		"https://" + process.env.VERCEL_URL
	:	"http://localhost:4004";

const pref = new Preference(client);

type CreatePrefOptions = {
  items: productOptions[];
  transactionId: string;
};

export async function createNewProductPreference(
  options: CreatePrefOptions
) {
  return pref.create({
    body: {
      items: options.items.map((product) => ({
        id: String(product.productId),
        title: product.productName,
        description: product.productDescription,
        quantity: product.quantity,
        currency_id: "UYU",
        unit_price: product.productPrice
      })),
      back_urls: {
        success: BASE_URL + "/donate/success",
        failure: BASE_URL + "/donate/failure",
        pending: BASE_URL + "/donate/pending",
      },

      external_reference: options.transactionId,
    },
  });
}

export async function getPaymentById(id: string) {
  const payment = new Payment(client);
  return payment.get({ id });
}

export type WebhokPayload = {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
};