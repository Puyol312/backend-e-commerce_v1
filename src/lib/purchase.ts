import { Purchase } from "../db/model";

type PurchaseCreateOptions = {
  from: string;
  userId: number;
  message?: string;
  products: {
    productId: number,
    quantity: number,
    price: number
  }[]
};

export async function createNewPurchase(
  { from, userId ,message, products }: PurchaseCreateOptions
): Promise<number> {
  const newPurchase = await Purchase.create({
    from,
    message,
    date: new Date(),
    userId
  });

  //genera mucho ruido.
  for (const item of products) {
    await (newPurchase as any).addProduct(item.productId, {
      through: {
        quantity: item.quantity,
        unitPrice: item.price
      }
    });
  }
  // Mejora de lo anterior
  // await PurchaseProduct.bulkCreate(
  //   products.map(item => ({
  //     purchaseId: newPurchase.id,
  //     productId: item.productId,
  //     quantity: item.quantity,
  //     unitPrice: item.price
  //   }))
  // );

  return newPurchase.get("id");
}

export async function confirmPurchase(purchaseId: string) {
  const purchase = await Purchase.findByPk(Number(purchaseId));

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  await purchase.update({
    status: "paid",
  });

  return purchase;
}