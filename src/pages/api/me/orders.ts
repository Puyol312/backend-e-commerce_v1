import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { authMiddleware } from "../../../middleware/authMiddleware";
import { getAllPurchaseWithProducts } from "../../../controllers/payments"; 

async function getHandler(req: NextApiRequest, res: NextApiResponse) { 
  try {
    const userPurchases = await getAllPurchaseWithProducts((req as any).user.id);
    return res.json({
      data: userPurchases,
    });
  } catch (error) {
    console.error("Error at getHandler in me/orders", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default methods({
  get: authMiddleware(getHandler),
});