// src/Screens/HelpAndSupport/HelpAndSupport.js
import React, { useState } from 'react';
import './HelpAndSupport.css';

function HelpAndSupport() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted', { title, email, phoneNumber, message });
  };

  return (
    <div className="help-and-support-container">
      <div className="card">
        <div className="card-header text-start">
          <span className="fw-medium fs-5">Help and Support</span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="text-start form-helpAndSupport">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Title"
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter Email"
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                placeholder="Enter Phone Number"
                id="phoneNumber" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">What's on your mind?</label>
              <textarea 
                className="form-control" 
                id="message" 
                rows="4" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="What's on your mind?"
                required 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
