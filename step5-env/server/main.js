const express = require('express');
const app = express();
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const port = 4000;

app.get('/echo', (req, res) => {
  res.send('Hello from step5! Database host: ' + process.env.DATABASE_NAME);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
