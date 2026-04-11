import express from "express"
import dotenv from "dotenv"
import mysql from "mysql2/promise"
import * as redisConfig from "./redisClient.js"

const { redisClient, connectRedis } = redisConfig;
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
    const [results, fields] = await pool.query("SELECT * FROM `user`");

    res.json({ data: results, success: true });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message || "Error", success: false });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    console.log("username: ", username);
    const [results] = await pool.query(
      "INSERT INTO `user` (username) VALUES (?)",
      [username],
    );
    res.json({ id: results.insertId, success: true });
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
