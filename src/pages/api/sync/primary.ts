import { NextApiRequest, NextApiResponse } from "next";
import "../../../db/index";
import "../../../db/model"

export default function (req: NextApiRequest, res:NextApiResponse) { 
  res.json({
    message: "Database schema synchronized with Sequelize models"
  });
}