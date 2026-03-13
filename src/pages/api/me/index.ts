import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import yup from "yup";

import { authMiddleware } from "../../../middleware/authMiddleware";
import { findUserById } from "../../../controllers/user";

let patchBodySchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
})
.strict()
.noUnknown()

async function getHandler(req:NextApiRequest, res:NextApiResponse) {
  const user = await findUserById((req as any).user.id);
  if (!user) { 
    return res.status(404).json({
      message: "Usuario no encontrado"
    })
  }
  return res.json({
    firstName: user.get("firstName"),
    lastName: user.get("lastName") || "no definido",
    email: user.get("email"),
    role: user.get("role"),
  });
}
async function patchHandler(req: NextApiRequest, res: NextApiResponse) {
  let firstName: string | undefined;
  let lastName: string | undefined;
  let email: string | undefined;

  try {
    ({ firstName, lastName, email } =
      await patchBodySchema.validate(req.body));
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }

  try {
    const user = await findUserById((req as any).user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const fieldsToUpdate: any = {};
    if (firstName !== undefined) fieldsToUpdate.firstName = firstName;
    if (lastName !== undefined) fieldsToUpdate.lastName = lastName;
    if (email !== undefined) fieldsToUpdate.email = email;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        message: "No fields to update"
      });
    }

    await user.update(fieldsToUpdate);

    return res.status(200).json({
      message: "User updated successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export default methods({
  get: authMiddleware(getHandler),
  patch: authMiddleware(patchHandler)
})