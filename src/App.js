import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';
import HelpAndSupport from './screens/HelpAndSupport/HelpAndSupport';
import RegisterDriver from './screens/RegisterDriver/RegisterDriver';
import Layout from './Layout';
import ActiveRides from './screens/ActiveRides/ActiveRides';
import AllRides from './screens/AllRides/AllRides';
import MyRides from './screens/MyRides/MyRides';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={ <Layout> <Dashboard /> </Layout> } />
          <Route path="/help-and-support" element={ <Layout> <HelpAndSupport /> </Layout> } />
          <Route path="/register-driver" element={ <Layout> <RegisterDriver /> </Layout> } />
          <Route path="/active-rides" element={ <Layout> <ActiveRides /> </Layout> } />
          <Route path="/all-rides" element={ <Layout> <AllRides /> </Layout> } />
          <Route path="/my-rides" element={ <Layout> <MyRides /> </Layout> } />
          {/* Add more routes wrapped with Layout as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;