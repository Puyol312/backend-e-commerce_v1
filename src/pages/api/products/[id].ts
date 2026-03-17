import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { client } from "../../../lib/algolia";


async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const product = await client.getObject({
      indexName: "products",
      objectID: String(id),
    });
    return res.json({
      data: product
    });
  } catch (error) {
    return res.status(404).json({ error: "Product not found" });
  }
}

export default methods({
  get: getHandler,
});