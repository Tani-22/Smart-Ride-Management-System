import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PoolCreateModal from '../../components/PoolCreate/PoolCreate';
import './Sidebar.css';

function Sidebar() {

  const [showModal, setShowModal] = useState(false);

  const handlePostAPool = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>POOLPAL</h3>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item active">
          <NavLink to="/dashboard" activeClassName="active">
            <i className="fas fa-home"></i> Dashboard
          </NavLink>
        </li>
        <li className="sidebar-item">
          <a href="#" onClick={handlePostAPool}>
            <i className="fas fa-plus-square"></i> Post a Pool
          </a>
        </li>
        <li className="sidebar-item">
          <NavLink to="/register-driver" activeClassName="active">
            <i className="fas fa-plus-square"></i> RegisterDriver
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/my-rides" activeClassName="active">
            <i className="fas fa-car"></i> My Rides
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/active-rides" activeClassName="active">
            <i className="fas fa-car-on"></i> Active Rides
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/all-rides" activeClassName="active">
            <i className="fas fa-car-side"></i> All Rides
          </NavLink>
        </li>
        <li className="sidebar-item">
          <a href="#">
            <i className="fas fa-bell"></i> Notifications
          </a>
        </li>
        <li className="sidebar-item">
          <NavLink to="/help-and-support" activeClassName="active">
            <i className="fas fa-question-circle"></i> Help and Support
          </NavLink>
        </li>
        <li className="sidebar-item">
          <a href="#">
            <i className="fas fa-cog"></i> Settings
          </a>
        </li>
      </ul>
      <PoolCreateModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default Sidebar;
