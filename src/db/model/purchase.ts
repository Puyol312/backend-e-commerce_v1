import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";

class Purchase extends Model {
  declare id: number;
  declare from: string;
  declare amount: number;
  declare message?: string;
  declare date: Date;
  declare status: "pending" | "paid" | "cancelled";
}

Purchase.init(
  {
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "cancelled"
      ),
      allowNull: false,
      defaultValue: "pending",
    }
  },
  {
    sequelize,
    modelName:"purchase"
  }
)

export { Purchase }