// src/components/AddAssignmentModal.js
import React, { useState } from 'react';

function AddAssignmentModal({ show, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    student_name: '',
    project_link: '',
    session_number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      session_number: parseInt(formData.session_number)
    });
    setFormData({ student_name: '', project_link: '', session_number: '' });
  };

  if (!show) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 rounded shadow" style={{ width: '400px' }}>
        <h5 className="mb-3">Add Assignment</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              name="student_name"
              className="form-control"
              placeholder="Student Name"
              value={formData.student_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="url"
              name="project_link"
              className="form-control"
              placeholder="Project Link"
              value={formData.project_link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="session_number"
              className="form-control"
              placeholder="Session Number"
              value={formData.session_number}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAssignmentModal;
