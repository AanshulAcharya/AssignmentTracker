const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  student_name: { type: String, required: true },
  project_link: { type: String, required: true },
  session_number: { type: Number, required: true },
  submitted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
