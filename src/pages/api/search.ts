import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { client } from "../../lib/algolia";
import { offsetAndLimitMiddleware } from "../../middleware/offsetAndLimitMiddleware";

async function getHandler(req:NextApiRequest, res:NextApiResponse) {
  const { q } = req.query;
  if (!q || Array.isArray(q)) return res.status(400).json({
    message: "Missing or invalid query parameter"
  });
  const results = await client.searchSingleIndex({
    indexName: "products",
    searchParams: {
      query: String(q),
      page: (req as any).offset,
      hitsPerPage: (req as any).limit,
    }
  });
  return res.json({
    results: results.hits,
    pagination: {
      limit:(req as any).limit,
      offset: results.page,
      total: results.nbHits,
    },
    query: q
  });
}

export default methods({
  get: offsetAndLimitMiddleware(getHandler)
})