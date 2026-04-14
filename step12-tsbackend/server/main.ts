import express from "express";
import * as redisConfig from "./redisClient.js";
import prismaClient from "./prismaClient.js";
import arg from "arg";

const argv = arg({ "--mode": String, "-m": "--mode" });

// const argv = process.argv.slice(2);
console.log("argv: ", argv["--mode"]);

const { redisClient, connectRedis } = redisConfig;

try {
  await connectRedis();
  console.log("Redis connected");
} catch (err) {
  console.error("Failed to connect to Redis:", err);
  process.exit(1);
}

const app = express();

const port = 4000;

app.use(express.json());

app.get("/echo", async (_req, res) => {
  try {
    const users = await prismaClient.user.findMany();

    res.json({ data: users, success: true });
  } catch (err) {
    console.log(err);
    res.json({
      error: err instanceof Error ? err.message : "Error",
      success: false,
    });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username } = req.body as { username?: unknown };
    const result = await prismaClient.user.create({
      // 保持与原 JS 一致：不做额外校验，让 Prisma 自己报错并走 catch
      data: { username: username as any },
    });

    res.json({ id: result.id, success: true });
  } catch (err) {
    res.json({
      error: err instanceof Error ? err.message : "Error",
      success: false,
    });
  }
});

app.post("/redis/increment", async (_req, res) => {
  try {
    const value = await redisClient.incr("count");
    res.json({ value, success: true });
  } catch (err) {
    res.json({
      error: "Error: " + (err instanceof Error ? err.message : "Error"),
      success: false,
    });
  }
});

app.get("/redis", async (_req, res) => {
  try {
    const value = await redisClient.get("count");
    res.json({ value, success: true });
  } catch (err) {
    res.json({
      error: "Error: " + (err instanceof Error ? err.message : "Error"),
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

