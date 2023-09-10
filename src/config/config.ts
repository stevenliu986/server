import * as process from "process";
import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV ?? "development",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
  mongoUri:
    process.env.MONGODB_URI ??
    process.env.MONGO_HOST ??
    "mongodb://" +
      (process.env.IP ?? "localhost") +
      ":" +
      (process.env.MONGO_PORT ?? "27017") +
      "/test",
};

export default config;
