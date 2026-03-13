import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { client } from "../../../lib/algolia";
import { airtable } from "../../../lib/airtable";
import { offsetAndLimitMiddleware } from "../../../middleware/offsetAndLimitMiddleware";
import { Product } from "../../../db/model";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  console.table("---- INICIO LA EJECUCION DEL SYNC ----");
  airtable("Furniture")
    .select({
      pageSize: (req as any).limit,
    })
    .eachPage(
      async function (records, fetchNextPage) {
        try {
          const objectsForTable = records.map((record: any) => ({
            name: record.fields.Name,
            price: record.fields["Unit cost"],
            description: record.fields.Description,
            img: record.fields.Images?.[0]?.url,
            stock: record.fields?.stock || 10,
          }));
          console.log(objectsForTable);
          const products = await Product.bulkCreate(objectsForTable, {
            returning: true,
            updateOnDuplicate: [
              "name",
              "price",
              "description",
              "img",
              "stock",
            ],
          });

          const objectsForAlgolia = records.map((record: any, i: number) => ({
            objectID: (products[i] as any).id,
            ...record.fields,
          }));

          const clientRes = await client.saveObjects({
            indexName: "products",
            objects: objectsForAlgolia,
          });

          console.log("--- COMUNICADO DE LA TRANSACCION ---");
          console.log(clientRes);

          fetchNextPage();
        } catch (err) {
          console.error("---- ERROR EN PAGE SYNC ----");
          console.error(err);
          return res.status(500).json({
            message: err.message
          });
        }
      },
      function done(err) {
        if (err) {
          console.log("---- ERROR EN SYNC ----");
          console.error(err);

          return res.status(500).json({
            message: err.message
          });
        }

        console.log("---- TERMINO LA EJECUCION DEL SYNC ----");
        res.json({
          message: "Database successfully synchronized",
        });
      }
    );
}
export default methods({
  post: offsetAndLimitMiddleware(postHandler)
});