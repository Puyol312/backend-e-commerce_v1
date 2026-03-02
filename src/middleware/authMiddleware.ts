import type { NextApiRequest, NextApiResponse } from "next";

import { getTokenFromRequest } from "../lib/getTokenFromReq";
import { decodeJWT } from "../lib/jwt_utils";

export function authMiddleware(
  callback: (req:NextApiRequest, res:NextApiResponse, userId: number) => Promise<void>
) { 
  return async (req: NextApiRequest, res: NextApiResponse) => { 
    const token = getTokenFromRequest(req);

    if (!token) { 
      return res.status(401).json({
        message: "Bearer token faltante."
      });
    }

    try {
      const { userId, timestamp } = decodeJWT(token);

      if (Date.now() > timestamp) { 
        return res.status(401).json({
          message: "Token expirado"
        })
      }
      return await callback(req, res, Number(userId));
    } catch (error) {
      return res.status(401).json({
        message: "Token invalido o falso"
      })
    }
  }
}