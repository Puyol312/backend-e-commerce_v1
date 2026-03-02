import type { NextApiRequest } from "next";

export function getTokenFromRequest(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : parts[0];
  
  return token ? token : null; 
}