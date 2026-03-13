import { Sequelize } from "sequelize";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  // logging: false,
});

let isSync = false;

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.table([
      {
        message: "Database connected",
        description: "The connection of Sequelize was successfully completed",
      }
    ]);
    if (isSync) return;
    await sequelize.sync({ alter: true });
    isSync = true;
    console.table([
      {
        message: "Database schema synchronized",
        description: "The database schema was successfully synchronized with the Sequelize models",
      }
    ]);
  } catch (error) {
    console.error("DB connection or sync error:", error);
  }
};

connectDB();

export {
  sequelize,
}