// Code for backend
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS 
app.use(cors());

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create 'music' table
db.serialize(() => {
  db.run(`
    CREATE TABLE music (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      songname TEXT NOT NULL,
      artist TEXT NOT NULL,
      album TEXT,
      genre TEXT
    )
  `);
});

// Add a new song (POST /music)
app.post('/music', (req, res) => {
  const { songname, artist, album, genre } = req.body;
  db.run(
    `INSERT INTO music (songname, artist, album, genre) VALUES (?, ?, ?, ?)`,
    [songname, artist, album, genre],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, songname, artist, album, genre });
    }
  );
});

// Get all songs (GET /music)
app.get('/music', (req, res) => {
  db.all(`SELECT * FROM music`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ music: rows });
  });
});

// Get song by ID (GET /music/:id)
app.get('/music/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM music WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(row);
  });
});

// Update song by ID (PUT /music/:id)
app.put('/music/:id', (req, res) => {
  const { id } = req.params;
  const { songname, artist, album, genre } = req.body;
  db.run(
    `UPDATE music SET songname = ?, artist = ?, album = ?, genre = ? WHERE id = ?`,
    [songname, artist, album, genre, id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Song not found' });
      }
      res.json({ message: 'Song updated successfully' });
    }
  );
});

// Delete song by ID (DELETE /music/:id)
app.delete('/music/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM music WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  });
});

// Start 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
