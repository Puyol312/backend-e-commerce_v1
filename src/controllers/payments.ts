import { confirmPurchase, createNewPurchase } from "../lib/purchase";
import { createNewProductPreference, getPaymentById } from "../lib/mercadopago";
import { productOptions } from "../types";
import { Product, Purchase } from "../db/model";

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

export async function getAllPurchaseWithProducts(userId: Number){ 
  const purchases = await Purchase.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: Product
      }
    ]
  });
  return purchases;
}

export async function getPurchaseWithProductsById(purchaseId: string) { 
  const purchase = await Purchase.findByPk(purchaseId, {
    include: [
      {
        model: Product
      }
    ]
  });
  return purchase;
}

export async function doesPurchaseBelongToUser(purchaseId: string, userId: number) { 
  const exists = await Purchase.count({
    where: {
      id: purchaseId,
      userId: userId
    }
  });

  const belongsToUser = exists > 0;
  return belongsToUser;
}