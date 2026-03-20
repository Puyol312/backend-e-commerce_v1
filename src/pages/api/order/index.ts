import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { Product, User } from "../../../db/model";
import { authMiddleware } from "../../../middleware/authMiddleware";
import { createNewPayment } from "../../../controllers/payments";

import { AuthenticatedRequest } from "../../../types";

interface ProductRequest extends AuthenticatedRequest {
  products: {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    quantity: number;
  }[];
}

function productMiddleware(
  callback: (req:NextApiRequest, res:NextApiResponse) => Promise<void>) {
  return async (req:AuthenticatedRequest, res:NextApiResponse) => { 
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
    const productReq = req as ProductRequest;

    productReq.products = [{
      productId: product.id,
      productName: product.get("name"),
      productDescription: product.get("description") || "not description",
      productPrice: product.get("price"),
      quantity: 1
    }];
    return callback(productReq, res);
  }
}

async function postHandler(req: ProductRequest, res: NextApiResponse) {
  const user = await User.findByPk(req.user.id);
  const { message } = req.body;

  console.log("==========================================================================");
  console.log(req.products);
  console.log("==========================================================================");
  try {
    const { url } = await createNewPayment({
      userId: req.user.id,
      from: user.get("firstName") as string,
      message,
      products: req.products
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

export default methods({
  post: authMiddleware(productMiddleware(postHandler)),
});