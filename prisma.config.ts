// prisma.config.ts
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./server/prisma/schema.prisma",
  migrations: {
    seed: "node ./server/prisma/seed.js",
  },
});
