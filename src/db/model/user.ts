import { Model, DataTypes } from "sequelize";
import { sequelize } from "..";

class User extends Model {
	declare id: number;
	declare firstName: string;
	declare lastName: string;
	declare email: string;
	declare role: "buyer" | "seller";
}

User.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
      type: DataTypes.STRING,
		},
		email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "buyer",
        "seller"
      ),
      defaultValue: "buyer",
      allowNull: false
    }
	},
	{
		sequelize,
		modelName: "user",
	},
);

export { User }