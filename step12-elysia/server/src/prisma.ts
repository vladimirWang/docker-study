import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import type { Prisma } from "@prisma/client";

const { DATABASE_URL } = process.env;

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const config = {
    connectionLimit: 10,
    connectTimeout:
      process.env.NODE_ENV === "production" ? 30000 : 10000,
    // 解决 MySQL 8 caching_sha2_password 认证时 "RSA public key is not available" 错误
    allowPublicKeyRetrieval: true,
          host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || "3306"),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD || "",
      database: process.env.DATABASE_NAME,
  };

const adapter = new PrismaMariaDb(config);

function createPrismaClient() {
  const basePrisma = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error", "warn"],
  });

  // 使用 $extends 添加软删除过滤逻辑
  return basePrisma
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
