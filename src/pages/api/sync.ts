import { NextApiRequest, NextApiResponse } from "next";
import "../../db/index";
import "../../db/model"

export default function (req: NextApiRequest, res:NextApiResponse) { 
  res.send("base de datos sincronizada");
}