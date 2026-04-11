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

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection
  .then(() => {
    console.log("Connected to MySQL successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL", err);
  });

const port = 4000;

app.get("/echo", (req, res) => {
  res.send("Hello from step5! Database host: " + process.env.DATABASE_NAME);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
