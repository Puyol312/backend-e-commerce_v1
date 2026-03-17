import type { NextApiRequest, NextApiResponse } from "next";
import yup from "yup";
import methods from "micro-method-router";
import { addMinutes } from "date-fns/addMinutes";

import { validateAuthCode } from "../../../controllers/auth";
import { findUserByEmail } from "../../../controllers/user";
import { generateJWT } from "../../../lib/jwt_utils";

let bodySchema = yup.object().shape({
  email: yup.string().required(),
  code: yup.number().required()
}).noUnknown(true).strict()

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  let email: string;
  let code: number;
  try {
    ({ email, code } = await bodySchema.validate(req.body));
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
  try {
    const isValid = await validateAuthCode({ email, code });
    if (!isValid) {
      return res.status(401).json({
        message: "Code not valid"
      });
    }
    const user = await findUserByEmail(email);
    const now = new Date();
    const timestamp = addMinutes(now, 120);
    const token = generateJWT({
      userId: user.get("id"),
      timestamp,
    });
    res.json({
      token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export default methods({
  post: postHandler
})