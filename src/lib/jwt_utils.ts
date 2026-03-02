import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET)
  throw new Error("Variable de ambiente faltante -> JWT_SECRET");

export function generateJWT(obj:any):string {
  return jwt.sign(obj, JWT_SECRET)
}
export function decodeJWT(token:string) { 
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Variable de ambiente faltante -> JWT_SECRET");
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    return null
  }
}