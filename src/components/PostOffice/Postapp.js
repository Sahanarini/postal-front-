// src/App.js
import React from 'react';
// import AdNavbar from './AdNavbar';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
import Postofficenavbar from './Postofficenavbar';
import Postsidebar from './Postsidebar';
import Postdashboard from './Postdashboard';

function Postapp() {
  return (
    <div className="flex flex-col h-screen">
      <Postofficenavbar/>
      <div className="flex flex-1">
        <Postsidebar />
        <Postdashboard />
      </div>
    </div>
  );
}

export default Postapp;
