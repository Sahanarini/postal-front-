// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    sessionStorage.removeItem('user');
    // Navigate to the homepage
    navigate('/');
  };

  return (
    <div className="bg-red-600 text-white w-64 min-h-screen p-4 fixed top-0 left-0 shadow-md z-40">
      <h2 className="text-xl font-semibold mb-6">Admin Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="block p-3 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium">Home</Link>
        </li>
        <li>
          <Link to="/addpostofficehead" className="block p-3 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium">Post Office</Link>
        </li>
        <li>
          <Link to="/reports" className="block p-3 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium">View Postoffices</Link>
        </li>
        <li>
          <Link to="/settings" className="block p-3 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium">View Employees</Link>
        </li>
      </ul>
      <div className="mt-auto">
        <button 
          onClick={handleLogout} 
          className="w-full p-3 rounded-md bg-red-800 hover:bg-red-900 transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
