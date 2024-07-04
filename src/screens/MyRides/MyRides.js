import React from 'react';
import './MyRides.css'; // Ensure you create this CSS file

function MyRides() {
  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-header text-start">
          <span className="fw-medium fs-5">My Rides</span>
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
              <tr>
                <td className="text-center align-middle">John Doe</td>
                <td className="text-center align-middle">2024-06-20</td>
                <td className="text-center align-middle">New York</td>
                <td className="text-center align-middle">Los Angeles</td>
                <td className="text-center align-middle">2</td>
                <td className="text-center align-middle">123-456-7890</td>
                <td className="text-center gap-2">
                  <button className="btn btn-sm btn-warning me-2">More Info</button>
                </td>
              </tr>
              <tr>
                <td className="text-center align-middle">John Doe</td>
                <td className="text-center align-middle">2024-06-20</td>
                <td className="text-center align-middle">New York</td>
                <td className="text-center align-middle">Los Angeles</td>
                <td className="text-center align-middle">2</td>
                <td className="text-center align-middle">123-456-7890</td>
                <td className="text-center gap-2">
                  <button className="btn btn-sm btn-warning me-2">More Info</button>
                </td>
              </tr>
              <tr>
                <td className="text-center align-middle">John Doe</td>
                <td className="text-center align-middle">2024-06-20</td>
                <td className="text-center align-middle">New York</td>
                <td className="text-center align-middle">Los Angeles</td>
                <td className="text-center align-middle">2</td>
                <td className="text-center align-middle">123-456-7890</td>
                <td className="text-center gap-2">
                  <button className="btn btn-sm btn-warning me-2">More Info</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyRides;
