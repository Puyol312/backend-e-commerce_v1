import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { Product, User } from "../../../db/model";
import { authMiddleware } from "../../../middleware/authMiddleware";
import { createNewPayment } from "../../../controllers/payments";

function productMiddleware(
  callback: (req:NextApiRequest, res:NextApiResponse) => Promise<void>) {
  return async (req:NextApiRequest, res:NextApiResponse) => { 
    const productId = Number(req.query.productId);;
    if (!productId || !Number.isInteger(productId)) { 
      return res.status(400).json({
        message: "productId parameter is required or invalid"
      });
    }
    const product = await Product.findByPk(productId);
    if (!product) { 
      return res.status(404).json({
        message: "Product not found"
      });
    }
    (req as any).products = [{
      productId: product.get("id"),
      productName: product.get("name"),
      productDescription: product.get("description") || "not description",
      productPrice: product.get("price"),
      quantity: 1
    }]
    return callback(req, res);
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.findByPk((req as any).user.id);
  const { message } = req.body;
  try {
    const { url } = await createNewPayment({
      userId: (req as any).user.id,
      from: user.get("name") as string,
      message,
      products: (req as any).products
    });
    return res.json({
      url
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    })
  }
}

methods({
  post: authMiddleware(productMiddleware(postHandler)),
});