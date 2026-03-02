import { Sequelize } from "sequelize";
import pg from "pg"

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
    console.log("DB connected");
    if (isSync) return;
    await sequelize.sync({ force: true });
    isSync = true;
    console.log("DB sync");
  } catch (error) {
    console.error("DB connection or sync error:", error);
  }
};

connectDB();

export {
  sequelize,
}