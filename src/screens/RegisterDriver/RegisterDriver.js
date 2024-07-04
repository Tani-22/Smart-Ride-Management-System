import React, { useState } from 'react';
import { database, storage } from '../../firebase'; // Adjust the path to your firebase.js file
import { ref, push, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import './RegisterDriver.css';

function RegisterDriver() {
  const [formData, setFormData] = useState({
    driverName: '',
    driverContact: '',
    vehicleType: '',
    vehicleNumber: '',
    authorized: false,
    driverImage: null,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFormData({
      ...formData,
      driverImage: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      console.error('Driver image is required.');
      return;
    }

    const newDriverRef = push(ref(database, 'drivers'));

    const imageRef = storageRef(storage, `drivers/${newDriverRef.key}/${imageFile.name}`);

    try {
      await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(imageRef);

      const driverData = {
        driverName: formData.driverName,
        driverContact: formData.driverContact,
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber,
        authorized: formData.authorized,
        driverImage: downloadURL,
      };

      const updates = {};
      updates[newDriverRef.key] = driverData;

      await update(ref(database, 'drivers'), updates);

      console.log('Driver registered successfully.');
      handleCancel(); // Reset form after submission
    } catch (error) {
      console.error('Error registering driver:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      driverName: '',
      driverContact: '',
      vehicleType: '',
      vehicleNumber: '',
      authorized: false,
      driverImage: null,
    });
    setImageFile(null);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header text-start">
            <span className="fw-medium fs-5">Register Driver</span>
          </div>
          <div className="card-body mt-2 d-flex">
            <div className="form-container col-md-6">
              <div className="mb-3 text-start">
                <label htmlFor="driverName" className="form-label">Driver Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="driverName"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  placeholder="Enter Driver Name"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="driverContact" className="form-label">Driver Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="driverContact"
                  name="driverContact"
                  value={formData.driverContact}
                  onChange={handleChange}
                  placeholder="Enter Driver Contact"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="vehicleType" className="form-label">Driver Vehicle Type</label>
                <select
                  className="form-select"
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Vehicle Type</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                  <option value="MiniSUV">MiniSUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Traveller">Traveller</option>
                </select>
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="vehicleNumber" className="form-label">Driver Vehicle Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="Enter Vehicle Number"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="authorized" className="form-label">Authorized</label>
                <div>
                  <input
                    type="checkbox"
                    id="authorized"
                    name="authorized"
                    checked={formData.authorized}
                    onChange={handleChange}
                  />
                  <label htmlFor="authorized" className="ms-2">Yes</label>
                </div>
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="driverImage" className="form-label">Upload Driver Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="driverImage"
                  name="driverImage"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="image-container col-md-6 d-flex justify-content-center align-items-center">
              {formData.driverImage ? (
                <img src={formData.driverImage} alt="Driver" className="img-fluid driver-image" />
              ) : (
                <div className="placeholder-text">Preview Image</div>
              )}
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterDriver;
