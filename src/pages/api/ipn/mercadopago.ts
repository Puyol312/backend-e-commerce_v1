import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { WebhokPayload } from "../../../lib/mercadopago";
import { confirmPaymentByMPId } from "../../../controllers/payments";

async function postHandler(req:NextApiRequest, res:NextApiResponse) {
  const payload: WebhokPayload = req.body;
  if (payload.type === "payment") {
    try {
      await confirmPaymentByMPId(payload.data.id);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error in payment confirmation"
      })
    }
  }

  return res.json({ received: true });
}

export default methods({
  post: postHandler
})