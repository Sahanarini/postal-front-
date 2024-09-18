// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Empsidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('user');
    // Navigate to homepage
    navigate('/');
  };

  return (
    <div className="bg-red-600 text-white w-64 min-h-screen p-4 fixed top-0 left-0 shadow-md z-40">
      <h2 className="text-xl font-semibold mb-6">Admin Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/pickup" className="block p-3 rounded-md 
            hover:bg-red-700 transition-colors duration-200 font-medium">
            Pick Up
          </Link>
        </li>
        <li>
          <Link to="/delivery" className="block p-3 rounded-md hover:bg-red-700 
            transition-colors duration-200 font-medium">
            Delivery
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-6 w-full p-3 bg-red-700 rounded-md 
          hover:bg-red-800 transition-colors duration-200 font-medium">
        Logout
      </button>
    </div>
  );
};

export default Empsidebar;
