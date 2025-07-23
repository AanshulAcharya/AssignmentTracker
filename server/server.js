const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the database connection
const Assignment = require('./assigmentTrackerDBModel'); // Mongoose model

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
connectDB();

app.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ session_number: 1, submitted_at: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new assignment
app.post('/assignments', async (req, res) => {
  try {
    const { student_name, project_link, session_number } = req.body;
    const newAssignment = new Assignment({ student_name, project_link, session_number });
    const saved = await newAssignment.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);