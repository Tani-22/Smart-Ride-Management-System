import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
