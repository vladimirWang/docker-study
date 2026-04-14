import express from "express";
import mysql from "mysql2/promise";
import * as redisConfig from "./redisClient.js";
import prismaClient from "./prismaClient.js";
import arg from "arg";

const argv = arg({ "--mode": String, "-m": "--mode" });

// const argv = process.argv.slice(2);
console.log("argv: ", argv['--mode']);

const { redisClient, connectRedis } = redisConfig;

try {
  await connectRedis();
  console.log("Redis connected");
} catch (err) {
  console.error("Failed to connect to Redis:", err);
  process.exit(1);
}

const app = express();

// console.log(connection, connection.connect);
// .connect()
// .then(() => {
//   console.log("Connected to MySQL");
// })
// .catch((err) => {
//   console.error("Error connecting to MySQL", err);
// });

const port = 4000;

app.use(express.json());

app.get("/echo", async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();

    res.json({ data: users, success: true });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message || "Error", success: false });
  }
});

app.post("/user", async (req, res) => {
  // console.log("Received request to create user", prismaClient.user);
  // return res.json({ id: 1, success: true });
  try {
    const { username } = req.body;
    const result = await prismaClient.user.create({
      data: { username },
    });

    res.json({ id: result.id, success: true });
  } catch (err) {
    res.json({ error: err.message || "Error", success: false });
  }
});

app.post("/redis/increment", async (req, res) => {
  try {
    const value = await redisClient.incr("count");
    res.json({ value, success: true });
  } catch (err) {
    res.json({ error: "Error: " + err.message, success: false });
  }
});

app.get("/redis", async (req, res) => {
  try {
    const value = await redisClient.get("count");
    res.json({ value, success: true });
  } catch (err) {
    res.json({ error: "Error: " + err.message, success: false });
  }
});

app.listen(port, () => {
  // console.log(
  //   `[server] mode=${mode} (process.env.SERVER_MODE=${process.env.SERVER_MODE})`,
  // );
  console.log(`Server is running on http://localhost:${port}`);
});
