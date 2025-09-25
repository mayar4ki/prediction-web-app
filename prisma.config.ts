// prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "./server/prisma/schema.prisma",
    migrations: {
        seed: 'node ./server/prisma/seed.js'
    }
})