const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/assignments', (req, res) => {
  const sql = 'SELECT * FROM assignments ORDER BY session_number, submitted_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new assignment
app.post('/assignments', (req, res) => {
  const { student_name, project_link, session_number } = req.body;

  if (!student_name || !project_link || !session_number) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO assignments (student_name, project_link, session_number)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [student_name, project_link, session_number], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      id: result.insertId,
      student_name,
      project_link,
      session_number,
      submitted_at: new Date()
    });
  });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);