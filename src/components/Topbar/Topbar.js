import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PoolCreateModal from '../../components/PoolCreate/PoolCreate';
import './Topbar.css';

function Topbar() {
  const [showModal, setShowModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [nestedDropdownVisible, setNestedDropdownVisible] = useState(false);
  const location = useLocation();

  const handlePostAPool = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleToggleNestedDropdown = () => {
    setNestedDropdownVisible(!nestedDropdownVisible);
  };

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log('Sign Out');
    setDropdownVisible(false); // Close the dropdown after signing out
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/register-driver':
        return 'Register Driver';
      case '/active-rides':
        return 'Active Rides';
      case '/all-rides':
        return 'All Rides';
      case '/help-and-support':
        return 'Help and Support';
      case '/my-rides':
        return 'My Rides';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h3>{getPageTitle()}</h3>
      </div>
      <div className="topbar-right">
        <div className="topbar-item">
          <button onClick={handlePostAPool} className="btn btn-primary me-5">
            Post a Pool
          </button>
        </div>
        <div className="topbar-item">
          <i className="fas fa-bell" style={{ fontSize: '24px', color: 'orangered' }}></i>
        </div>
        <div className="topbar-item dropdown pe-auto"  onClick={handleToggleDropdown}>
          <i className="fas fa-user-circle" style={{ fontSize: '24px', color: 'orangered' }}></i> 
          <span className='fw-medium fs-5 me-3 pe-auto'> Varun </span>
          <i className='fas fa-caret-down' style={{ cursor: 'pointer' }}></i>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={handleSignOut} className="dropdown-item">Sign Out</button>
            </div>
          )}
        </div>
      </div>
      <PoolCreateModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default Topbar;
