import { User } from "./user";
import { Auth } from "./auth";
import { Product } from "./product";
import { Purchase } from "./purchase";
import { PurchaseProduct } from "./product_purchase";

User.hasMany(Auth, { foreignKey: "userId" });
Auth.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Purchase, { foreignKey: "userId" });
Purchase.belongsTo(User, { foreignKey: "userId" });

Purchase.belongsToMany(Product, { through: PurchaseProduct });
Product.belongsToMany(Purchase, { through: PurchaseProduct });

export { User, Auth, Purchase, Product }