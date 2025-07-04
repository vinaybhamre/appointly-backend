import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";
import { config } from "./app.config";

export const getDatabaseConfig = () => {
  const isProduction = config.NODE_ENV === "production";
  const databaseUrl = config.DATABASE_URL;

  return new DataSource({
    type: "postgres",
    url: databaseUrl,
    entities: [path.join(__dirname, "../database/entities/*{.ts,.js}")],
    migrations: [path.join(__dirname, "../database/migrations/*{.ts,.js}")],
    synchronize: !isProduction,
    logging: isProduction ? false : ["error"],
    ssl: isProduction
      ? { rejectUnauthorized: false } // allow SSL for Supabase on Render
      : false, // no SSL locally
  });
};

export const AppDataSource = getDatabaseConfig();
