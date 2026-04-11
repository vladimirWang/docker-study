const express = require('express');
const app = express();

const port = 4000;

app.get('/api/data', (req, res) => {
  res.send('Hello from step5!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});