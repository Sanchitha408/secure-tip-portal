const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/submit', async (req, res) => {
  const { ciphertext, nonce, ephemeralPublicKey } = req.body;
  if (!ciphertext || !nonce || !ephemeralPublicKey) {
    return res.status(400).json({ error: 'Missing encrypted payload fields' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO submissions (ciphertext, nonce, ephemeral_public_key) VALUES ($1, $2, $3) RETURNING id',
      [ciphertext, nonce, ephemeralPublicKey]
    );
    console.log('New encrypted submission received:', result.rows[0].id);
    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
