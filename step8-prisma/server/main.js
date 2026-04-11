import express from "express"
import dotenv from "dotenv"
import mysql from "mysql2/promise"
import { redisClient, connectRedis } from "./redisClient.js"
import prismaClient from "./prismaClient.js"
await connectRedis()

const app = express();

// console.log(connection, connection.connect);
// .connect()
// .then(() => {
//   console.log("Connected to MySQL");
// })
// .catch((err) => {
//   console.error("Error connecting to MySQL", err);
// });

// 加载环境变量
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

pool
  .query("SELECT 1")
  .then(() => console.log("MySQL pool ready"))
  .catch((err) => console.error("MySQL pool error:", err));

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
  console.log(`Server is running on http://localhost:${port}`);
});
