import type { NextApiRequest } from "next";

export type productOptions = {
  productName: string;
  productDescription: string;
  productId: number;
  productPrice: number;
  quantity: number;
}
export interface AuthenticatedRequest extends NextApiRequest {
  user: {
    id: number
  }
}