import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PoolDetailsModal.css';

function PoolDetailsModal({ show, handleClose, poolDetails }) {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Pool Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-4">
          <div className="col-md-5 p-0">
            <img 
              src={poolDetails.driverImage} 
              alt="Driver" 
              className="img-fluid h-100 w-100"
            />
          </div>
          <div className="col-md-7">
            <p><strong>From:</strong> {poolDetails.from}</p>
            <p><strong>To:</strong> {poolDetails.to}</p>
            <p><strong>People:</strong> {poolDetails.people}</p>
            <p><strong>Vacant:</strong> {poolDetails.vacant}</p>
            <p><strong>Date:</strong> {poolDetails.date}</p>
            <p><strong>Driver Name:</strong> {poolDetails.driver}</p>
            <p><strong>Driver Contact:</strong> {poolDetails.driverContact}</p>
            <p><strong>Vehicle Type:</strong> {poolDetails.vehicleType}</p>
            <p><strong>Vehicle Number:</strong> {poolDetails.vehicleNumber}</p>
            <p><strong>Route Charges:</strong> {poolDetails.rideCharges}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => { /* Handle booking logic here */ }}>
          Proceed to Book the Pool
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PoolDetailsModal;
