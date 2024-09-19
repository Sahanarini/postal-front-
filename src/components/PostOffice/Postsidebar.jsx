// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Postsidebar = () => {
  return (
    <div className="bg-red-600 text-white w-64 min-h-screen p-4 fixed top-0 left-0 shadow-md z-40">
      <h2 className="text-xl font-semibold mb-6">Admin Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/addemployee" className="block p-3 rounded-md hover:bg-red-700
           transition-colors duration-200 font-medium">Add employee</Link>
        </li>
        <li>
          <Link to="/mailview" className="block p-3 rounded-md
           hover:bg-red-700 transition-colors duration-200 font-medium">pickups</Link>
        </li>
        <li>
          <Link to="/topost" className="block p-3 rounded-md hover:bg-red-700
           transition-colors duration-200 font-medium">delivery</Link>
        </li>
        {/* <li>
          <Link to="/settings" className="block p-3 rounded-md hover:bg-red-700
           transition-colors duration-200 font-medium">Settings</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Postsidebar;
