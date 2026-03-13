import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getPurchaseWithProductsById } from "../../../controllers/payments";
import { doesPurchaseBelongToUser } from "../../../controllers/payments";
import { authMiddleware } from "../../../middleware/authMiddleware";

async function getHandler(req:NextApiRequest, res:NextApiResponse) {
  const { orderId } = req.query;
  if (!orderId) { 
    return res.status(400).json({
      message: "Missing parameter orderId"
    });
  }
  try {
    const belongsToUser = await doesPurchaseBelongToUser(String(orderId), (req as any).user.id);
    if (!belongsToUser) {
      return res.status(404).json({
        message: "Purchase by user not found"
      });
    }
    const purchase = await getPurchaseWithProductsById(String(orderId));
    return res.json({
      data: purchase
    });
  } catch (error) {
    console.error("Error in order/[orderId]", error);
    return res.status(500).json({
      message:  error instanceof Error ? error.message : "Internal server error"
    });
  }
}

export default methods({
  get: authMiddleware(getHandler)
})