import type { NextApiRequest, NextApiResponse } from "next";
import yup from "yup";
import methods from "micro-method-router";

import { findOrCreateNewUser } from "../../../controllers/user";
import { sendAuthToMail } from "../../../controllers/auth";

let bodySchema = yup.object().shape({
  email: yup.string().required(),
}).strict();

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = await bodySchema.validate(req.body);
    const userId = await findOrCreateNewUser({ email });
    await sendAuthToMail({ email, userId });
    res.json({
      "message": "Código enviado al email"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export default methods({
  post: postHandler
})