import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the path to your firebase.js file
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import PoolDetailsModal from '../../components/PoolDetails/PoolDetailsModal';
import BookPoolModal from '../../components/Booking/BookPoolModal';

function Dashboard() {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedPoolDetails, setSelectedPoolDetails] = useState({});
  const [showBookPoolModal, setShowBookPoolModal] = useState(false);
  const [pools, setPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]);

  useEffect(() => {
    const poolsRef = ref(database, 'pools');
    onValue(poolsRef, (snapshot) => {
      const poolsData = snapshot.val();
      const poolList = [];
      for (let key in poolsData) {
        poolList.push({ id: key, ...poolsData[key] });
      }
      setPools(poolList);
      setFilteredPools(poolList);
    });
  }, []);

  const handleFromChange = (event) => {
    setFromQuery(event.target.value);
  };

  const handleToChange = (event) => {
    setToQuery(event.target.value);
  };

  const handlePeopleCountChange = (event) => {
    setPeopleCount(event.target.value);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSearch = () => {
    const filtered = pools.filter(pool => {
      const matchesFrom = fromQuery ? pool.from.toLowerCase().includes(fromQuery.toLowerCase()) : true;
      const matchesTo = toQuery ? pool.to.toLowerCase().includes(toQuery.toLowerCase()) : true;
      const matchesDate = startDate ? pool.date === startDate.toISOString().split('T')[0] : true;
      const matchesVacant = peopleCount ? pool.vacant >= peopleCount : true;

      return matchesFrom && matchesTo && matchesDate && matchesVacant;
    });
    setFilteredPools(filtered);
  };

  const handleMoreInfo = (poolDetails) => {
    setSelectedPoolDetails(poolDetails);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookPool = () => {
    setShowBookPoolModal(true);
  };

  const handleCloseBookPoolModal = () => {
    setShowBookPoolModal(false);
  };

  return (
    <div className="dashboard-container">
      <div className="card mb-4">
        <div className="card-header text-start">
          <span className="fw-medium fs-5">Find a Ride</span>
        </div>
        <div className="card-body mt-2 px-20 py-20">
          <div className="search-container">
            <div className="search-field">
              <input
                type="text"
                id="from"
                placeholder="From..."
                value={fromQuery}
                onChange={handleFromChange}
                className="search-input form-control"
              />
            </div>
            <div className="search-field">
              <input
                type="text"
                id="to"
                placeholder="To..."
                value={toQuery}
                onChange={handleToChange}
                className="search-input form-control"
              />
            </div>
            <div className="search-field">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                className="date-picker form-control"
                id="date"
              />
            </div>
            <div className="search-field">
              <div className="dropdown-container">
                <i className="fas fa-user"></i>
                <select
                  id="people"
                  value={peopleCount}
                  onChange={handlePeopleCountChange}
                  className="people-dropdown"
                >
                  {[1, 2, 3, 4, 5].map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="search-field">
              <button onClick={handleSearch} className="btn btn-primary">
                Search
              </button>
            </div>
            <div className="search-field">
              <button onClick={() => setFilteredPools(pools)} className="btn btn-primary">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header text-start">
          <span className="fw-medium fs-5">Ride Listings</span>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className='text-center'>From</th>
                <th scope="col" className='text-center'>To</th>
                <th scope="col" className='text-center'>People</th>
                <th scope="col" className='text-center'>Vacant</th>
                <th scope="col" className='text-center'>Date</th>
                <th scope="col" className='text-center'>Ride Charges</th>
                <th scope="col" className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPools.map((pool) => (
                <tr key={pool.id}>
                  <td className='text-center align-middle'>{pool.from}</td>
                  <td className='text-center align-middle'>{pool.to}</td>
                  <td className='text-center align-middle'>{pool.people}</td>
                  <td className='text-center align-middle'>{pool.vacant}</td>
                  <td className='text-center align-middle'>{pool.date}</td>
                  <td className='text-center align-middle'>Rs {pool.rideCharges}/-</td>
                  <td className='text-center action-cell gap-2'>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleMoreInfo(pool)}
                    >
                      More Info
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={handleBookPool}>Book</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PoolDetailsModal
        show={showModal}
        handleClose={handleCloseModal}
        poolDetails={selectedPoolDetails}
      />
      <BookPoolModal 
        show={showBookPoolModal} 
        handleClose={handleCloseBookPoolModal} 
      />
    </div>
  );
}

export default Dashboard;
