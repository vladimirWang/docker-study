const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

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

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.json({ data: results });
  } catch (err) {
    console.log(err);
    res.send("Error: " + err.message);
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
    res.json({ id: results.insertId });
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
