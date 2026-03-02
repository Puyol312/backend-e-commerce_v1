import { Model, DataTypes } from "sequelize";
import { sequelize } from "..";

class Product extends Model { }

Product.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  },
  {
    sequelize,
    modelName: "product"
  }
);

export { Product }