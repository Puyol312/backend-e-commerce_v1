import { confirmPurchase, createNewPurchase } from "../lib/purchase";
import { createNewProductPreference, getPaymentById } from "../lib/mercadopago";
import { productOptions } from "../types";

type createNewPaymentOptions = {
  userId: number;
  from: string;
  message?: string;
  products: productOptions[]
}

export async function createNewPayment(options: createNewPaymentOptions) {
  const newPurchId = await createNewPurchase({
    from: options.from,
    userId: options.userId,
    message: options.message || "ningun mensaje asignado",
    products: options.products.map((product) => ({
      productId: Number(product.productId),
      quantity: product.quantity,
      price: product.productPrice,
    }))
  });

  const newPref = await createNewProductPreference({
    transactionId: String(newPurchId),
    items: options.products
  })

  return {
    url: newPref.init_point
  }
}

export async function confirmPaymentByMPId(MPId: string) { 
  const mpPayment = await getPaymentById(MPId);
  if (mpPayment.status === "approved") {
    const purchaseId = mpPayment.external_reference;
    await confirmPurchase(purchaseId);
  }
}