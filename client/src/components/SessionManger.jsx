import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAssignmentModal from './AddAssignment';
import EditAssignmentModal from './EditAssignmentModal.jsx';

function SessionManager({ searchQuery }) {
  const [assignments, setAssignments] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await axios.get('http://localhost:3000/assignments');
    setAssignments(res.data);
  };

  const handleAddAssignment = async (data) => {
    await axios.post('http://localhost:3000/assignments', data);
    setShowModal(false);
    fetchAssignments();
  };

  const openEditModal = (assignment) => {
  setSelectedAssignment(assignment);
  setEditModalOpen(true);
};

const closeEditModal = () => {
  setSelectedAssignment(null);
  setEditModalOpen(false);
};

const handleSave = async (updatedAssignment) => {
  await axios.put(`http://localhost:3000/assignments/${updatedAssignment._id}`, updatedAssignment);
  closeEditModal();
  fetchAssignments();
};

const handleDelete = async (id) => {
  await axios.delete(`http://localhost:3000/assignments/${id}`);
  closeEditModal();
  fetchAssignments();
};

  const sessions = [...new Set(assignments.map(a => a.session_number))];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Assignment Sessions</h4>
        <button className="btn btn-success btn-sm" onClick={() => setShowModal(true)}>
          + Add Assignment
        </button>
      </div>

      {/* Session buttons */}
      <div className="mb-3">
        {sessions.map(session => (
          <button
            key={session}
            className={`btn btn-sm me-2 ${selectedSession === session ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedSession(session)}
          >
            Session {session}
          </button>
        ))}
      </div>

      {/* Assignment table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Student</th>
            <th>Project Link</th>
            <th>Submitted At</th>
            <th>Session</th>
          </tr>
        </thead>
        <tbody>
         {assignments
            .filter(a =>
             (selectedSession === null || a.session_number === selectedSession) &&
              (
                a.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.project_link.toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(a.session_number).includes(searchQuery)
              )
            )       
        .map((a, index) => (
            <tr key={a.id}>
              <td
                onClick={() => openEditModal(a)}
                style={{ cursor: 'pointer', color: '#0e0e0fff' }}
              >{a.student_name}</td>

              <td><a href={a.project_link} target="_blank" rel="noreferrer">View</a></td>
              <td>{new Date(a.submitted_at).toLocaleString()}</td>
              <td>{a.session_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      <AddAssignmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddAssignment}
      />
      <EditAssignmentModal
         show={editModalOpen}
         onClose={closeEditModal}
         assignment={selectedAssignment}
         onSave={handleSave}
         onDelete={handleDelete}
      />
    </div>
    
  );
}

export default SessionManager;

