import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { database } from '../../firebase'; // Adjust the path to your firebase.js file
import { ref, push, onValue } from 'firebase/database';
import './PoolCreate.css';

function PostRideModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    people: '',
    vacant: '',
    date: '',
    time: '',
    driver: '',
    driverContact: '',
    vehicleType: '',
    vehicleNumber: '',
    rideCharges: '',
    driverImage: '',
  });

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const driversRef = ref(database, 'drivers');
    onValue(driversRef, (snapshot) => {
      const driversData = snapshot.val();
      const driverList = [];
      for (let key in driversData) {
        driverList.push({ id: key, ...driversData[key] });
      }
      setDrivers(driverList);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'driver') {
      const selectedDriver = drivers.find(driver => driver.driverName === value);
      if (selectedDriver) {
        setFormData(prevState => ({
          ...prevState,
          driverContact: selectedDriver.driverContact,
          vehicleType: selectedDriver.vehicleType,
          vehicleNumber: selectedDriver.vehicleNumber,
          driverImage: selectedDriver.driverImage,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(database, 'pools'), formData);
      console.log('Pool created successfully.');
      setFormData({
        from: '',
        to: '',
        people: '',
        vacant: '',
        date: '',
        time: '',
        driver: '',
        driverContact: '',
        vehicleType: '',
        vehicleNumber: '',
        rideCharges: '',
        driverImage: '',
      });
      handleClose();
    } catch (error) {
      console.error('Error creating pool:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Post a Pool</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="from" className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="From Location..."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="to" className="form-label">To</label>
                <input
                  type="text"
                  className="form-control"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  placeholder="To Location..."
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="people" className="form-label">People</label>
                <input
                  type="number"
                  className="form-control"
                  id="people"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  placeholder="Capacity"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="vacant" className="form-label">Vacant</label>
                <input
                  type="number"
                  className="form-control"
                  id="vacant"
                  name="vacant"
                  value={formData.vacant}
                  onChange={handleChange}
                  placeholder="Vacant"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="time" className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="hh:mm AM/PM"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="driver" className="form-label">Driver</label>
                <select
                  className="form-select"
                  id="driver"
                  name="driver"
                  value={formData.driver}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Driver</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.driverName}>
                      {driver.driverName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="driverContact" className="form-label">Driver Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="driverContact"
                  name="driverContact"
                  value={formData.driverContact}
                  onChange={handleChange}
                  placeholder="Driver Contact"
                  required
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  placeholder="Vehicle Type"
                  required
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="vehicleNumber" className="form-label">Vehicle Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="Vehicle Number"
                  required
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="rideCharges" className="form-label">Ride Charges</label>
                <input
                  type="number"
                  className="form-control"
                  id="rideCharges"
                  name="rideCharges"
                  value={formData.rideCharges}
                  onChange={handleChange}
                  placeholder="Ride Charges"
                  required
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" variant="secondary" onClick={handleClose} className="me-2 btn btn-sm btn-secondary">Cancel</button>
            <button type="submit" variant="primary" className="btn btn-sm btn-primary">Submit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default PostRideModal;
