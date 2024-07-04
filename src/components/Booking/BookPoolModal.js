import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './BookPoolModal.css'; // Ensure you create this CSS file

function BookPoolModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted', formData);
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book your Pool</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              className='form-select'
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookPoolModal;
