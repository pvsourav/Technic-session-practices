const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'feedback_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/feedback', (req, res) => {
  const query = 'SELECT * FROM feedback ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      res.status(500).json({ error: 'Failed to fetch feedback' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/feedback', (req, res) => {
  const { name, email, rating, category, message } = req.body;

  if (!name || !email || !rating || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const query = 'INSERT INTO feedback (name, email, rating, category, message) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, rating, category, message], (err, result) => {
    if (err) {
      console.error('Error inserting feedback:', err);
      res.status(500).json({ error: 'Failed to save feedback' });
      return;
    }

    res.status(201).json({
      message: 'Feedback saved successfully',
      id: result.insertId
    });
  });
});

app.get('/api/analytics', (req, res) => {
  const queries = {
    ratingDistribution: 'SELECT rating, COUNT(*) as count FROM feedback GROUP BY rating ORDER BY rating',
    categoryBreakdown: 'SELECT category, COUNT(*) as count FROM feedback GROUP BY category',
    averageRating: 'SELECT AVG(rating) as average FROM feedback',
    totalFeedback: 'SELECT COUNT(*) as total FROM feedback',
    ratingTrends: `
      SELECT 
        DATE(created_at) as date, 
        AVG(rating) as avg_rating,
        COUNT(*) as count
      FROM feedback 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date
    `
  };

  const analytics = {};
  let completedQueries = 0;
  const totalQueries = Object.keys(queries).length;

  Object.entries(queries).forEach(([key, query]) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error(`Error in ${key} query:`, err);
        analytics[key] = [];
      } else {
        analytics[key] = results;
      }

      completedQueries++;
      if (completedQueries === totalQueries) {
        res.json(analytics);
      }
    });
  });
});

app.delete('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM feedback WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err);
      res.status(500).json({ error: 'Failed to delete feedback' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Feedback not found' });
      return;
    }

    res.json({ message: 'Feedback deleted successfully' });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
