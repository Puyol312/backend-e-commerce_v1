import type { NextApiRequest, NextApiResponse } from "next";

import { getTokenFromRequest } from "../lib/getTokenFromReq";
import { decodeJWT } from "../lib/jwt_utils";
import { AuthenticatedRequest } from "../types";

export function authMiddleware(
  callback: (req:AuthenticatedRequest, res:NextApiResponse) => Promise<void>
) { 
  return async (req: NextApiRequest, res: NextApiResponse) => { 
    const token = getTokenFromRequest(req);

    if (!token) { 
      return res.status(401).json({
        message: "Missing bearer token."
      });
    }

    try {
      const { userId, timestamp } = decodeJWT(token);

      if (Date.now() > timestamp) { 
        return res.status(401).json({
          message: "Expired token"
        })
      }
      const authReq = req as AuthenticatedRequest;
      authReq.user = { id: Number(userId) };
      return await callback(authReq, res);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token or missing"
      })
    }
  }
}