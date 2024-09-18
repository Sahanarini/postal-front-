// src/App.js
import React from 'react';
import AdNavbar from './AdNavbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function Adapp() {
  return (
    <div className="flex flex-col h-screen">
      <AdNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default Adapp;
