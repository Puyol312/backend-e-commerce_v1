import { Model, DataTypes } from "sequelize";
import { sequelize } from "..";

class Auth extends Model {
  declare id: number;
  declare email: string;
  declare code: number;
  declare isValid: boolean;
  declare expires: Date;
}

Auth.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
		modelName: "auth",
  }
);

export { Auth }