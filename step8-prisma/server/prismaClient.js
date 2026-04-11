import prismaPkg from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const { PrismaClient } = prismaPkg;

const { DATABASE_URL } = process.env;

const globalForPrisma = globalThis;

function getDatabaseConfig() {
  const baseConfig = {
    connectionLimit: 10,
    connectTimeout:
      process.env.NODE_ENV === "production" ? 30000 : 10000,
    // 解决 MySQL 8 caching_sha2_password 认证时 "RSA public key is not available" 错误
    allowPublicKeyRetrieval: true,
  };

  if (
    process.env.DATABASE_HOST &&
    process.env.DATABASE_USER &&
    process.env.DATABASE_NAME
  ) {
    return {
      ...baseConfig,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || "3306"),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD || "",
      database: process.env.DATABASE_NAME,
    };
  }
  const url = process.env.DATABASE_URL;
  if (url) {
    const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    if (match) {
      return {
        ...baseConfig,
        host: match[3],
        port: parseInt(match[4]),
        user: match[1],
        password: match[2],
        database: match[5],
      };
    }
  }

  // 默认配置（需本机已启动 MySQL/MariaDB）
  return {
    ...baseConfig,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "prisma_demo",
  };
}

const adapter = new PrismaMariaDb(getDatabaseConfig());

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