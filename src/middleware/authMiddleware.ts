import type { NextApiRequest, NextApiResponse } from "next";

import { getTokenFromRequest } from "../lib/getTokenFromReq";
import { decodeJWT } from "../lib/jwt_utils";

export function authMiddleware(
  callback: (req:NextApiRequest, res:NextApiResponse) => Promise<void>
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
      (req as any).user = { id:userId };
      return await callback(req, res);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token or missing"
      })
    }
  }
}