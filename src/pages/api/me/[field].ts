import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { authMiddleware } from "../../../middleware/authMiddleware";
import { findUserById } from "../../../controllers/user";

type PatchField = "email" | "firstName" | "lastName";

function isValidField(field: any): field is PatchField {
  return ["email", "firstName", "lastName"].includes(field);
}

async function patchHandler(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const { field }  = req.query;
  const { value } = req.body;

  if (!field || Array.isArray(field) || !isValidField(field)) {
    return res.status(400).json({
      message: "Invalid or missing field parameter",
    });
  }
  if (value === undefined) {
    return res.status(400).json({
      message: "Missing field value"
    })
  }
  
  try {
    const user = await findUserById(userId);
    await user.update({
      [field]: value
    });
    return res.json({
      message: "User updated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export default methods({
  patch: authMiddleware(patchHandler)
})