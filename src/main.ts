import { executeCommmand } from "./db";

const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());


// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.post('/execute', async (req, res) => {
  const { cmd } = req.body;
  try {
    const result = await executeCommmand(cmd);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
