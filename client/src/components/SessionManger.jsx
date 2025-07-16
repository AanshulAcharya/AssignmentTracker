import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAssignmentModal from './AddAssignment';

function SessionManager({ searchQuery }) {
  const [assignments, setAssignments] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            <th>#</th>
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
              <td>{index + 1}</td>
              <td>{a.student_name}</td>
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
    </div>
  );
}

export default SessionManager;

