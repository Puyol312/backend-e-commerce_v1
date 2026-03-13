import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { client } from "../../../lib/algolia";


async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(id);
  if (!id) { 
    res.status(400).json({
      message: "id parameter is required",
    });
  }
  const product = await client.getObject({
    indexName: "products",
    objectID: String(id),
  });
  if (!product) { 
    res.status(404).json({
      message: "Product not found"
    });
  }
  res.json({
    data: product
  });
}

export default methods({
  get: getHandler,
});