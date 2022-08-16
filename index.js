const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.get('/counter/:bookId', async (req, res) => {
  const {bookId} = req.params;
  const dbPath = path.join(__dirname, 'db.json');

  const rawDB = await fs.readFile(dbPath);
  const DB = JSON.parse(rawDB);
  const counter = DB.hasOwnProperty(bookId) ? DB[bookId] : 0;

  res.json({id: bookId, counter});
});

app.post('/counter/:bookId/incr', async (req, res) => {
  const {bookId} = req.params;
  const dbPath = path.join(__dirname, 'db.json');

  const rawDB = await fs.readFile(dbPath);
  const DB = JSON.parse(rawDB);
  const counter = DB.hasOwnProperty(bookId) ? DB[bookId] + 1 : 1;
  const newDB = {...DB, [bookId]: counter}

  await fs.writeFile(dbPath, JSON.stringify(newDB))

  res.json({id: bookId, counter});
});

app.listen(PORT, () => {
  console.log(`SerVER START ON ${PORT}`)
});