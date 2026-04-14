import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
console.log("Prisma Client initialized, DATABASE_HOST: ", process.env.DATABASE_HOST);
const config = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "3306"),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME,
};
console.log("Prisma config:", config);
const adapter = new PrismaMariaDb(config);
function createPrismaClient() {
    const basePrisma = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error", "warn"],
    });
    return basePrisma;
}
const prisma = globalThis.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}
export default prisma;
