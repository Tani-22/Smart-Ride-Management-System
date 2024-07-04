import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the path to your firebase.js file
import './AllRides.css'; // Ensure you create this CSS file

function AllRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const ridesRef = ref(database, 'pools');
    onValue(ridesRef, (snapshot) => {
      const ridesData = snapshot.val();
      const ridesList = [];
      for (let key in ridesData) {
        ridesList.push({ id: key, ...ridesData[key] });
      }
      setRides(ridesList);
    });
  }, []);

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-header text-start">
          <span className="fw-medium fs-5">All Rides</span>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center ">Driver Name</th>
                <th className="text-center">Date</th>
                <th className="text-center">From</th>
                <th className="text-center">To</th>
                <th className="text-center">Vacant</th>
                <th className="text-center">Phone Number</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.id}>
                  <td className="text-center align-middle">{ride.driver}</td>
                  <td className="text-center align-middle">{ride.date}</td>
                  <td className="text-center align-middle">{ride.from}</td>
                  <td className="text-center align-middle">{ride.to}</td>
                  <td className="text-center align-middle">{ride.vacant}</td>
                  <td className="text-center align-middle">{ride.driverContact}</td>
                  <td className="text-center gap-2">
                    <button className="btn btn-sm btn-warning me-2">More Info</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllRides;
