const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory store (we'll move to Postgres next)
let submissions = [];

app.post('/api/submit', (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' });
  }
  const submission = { id: Date.now(), title, message, createdAt: new Date() };
  submissions.push(submission);
  console.log('New submission received:', submission.id);
  res.status(201).json({ success: true, id: submission.id });
});

app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
