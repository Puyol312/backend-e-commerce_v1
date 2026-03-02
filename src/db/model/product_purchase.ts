import { DataTypes } from "sequelize";
import { sequelize } from "..";

const PurchaseProduct = sequelize.define("PurchaseProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

export { PurchaseProduct }