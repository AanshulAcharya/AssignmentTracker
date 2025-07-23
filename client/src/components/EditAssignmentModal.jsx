import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditAssignmentModal = ({ show, onClose, assignment, onSave, onDelete }) => {
  const [form, setForm] = useState({
    student_name: '',
    project_link: '',
    session_number: ''
  });

  useEffect(() => {
    if (assignment) {
      setForm({
        student_name: assignment.student_name || '',
        project_link: assignment.project_link || '',
        session_number: assignment.session_number || ''
      });
    }
  }, [assignment]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.student_name && form.project_link && form.session_number) {
      onSave({ ...assignment, ...form });
    }
  };

  const handleDelete = () => {
    if (assignment && assignment._id) {
      onDelete(assignment._id);
    }
  };

  return (
    <>
      {show && (
        <Modal show={show} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formStudentName">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  name="student_name"
                  value={form.student_name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
              </Form.Group>

              <Form.Group controlId="formProjectLink" className="mt-3">
                <Form.Label>Project Link</Form.Label>
                <Form.Control
                  type="text"
                  name="project_link"
                  value={form.project_link}
                  onChange={handleChange}
                  placeholder="Enter project link"
                />
              </Form.Group>

              <Form.Group controlId="formSessionNumber" className="mt-3">
                <Form.Label>Session Number</Form.Label>
                <Form.Control
                  type="number"
                  name="session_number"
                  value={form.session_number}
                  onChange={handleChange}
                  placeholder="Enter session number"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditAssignmentModal;
