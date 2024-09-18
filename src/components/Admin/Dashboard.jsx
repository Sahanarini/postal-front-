// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 ml-64 mt-16">
      {/* `ml-64` to offset for the sidebar width */}
      {/* `mt-16` to offset for the navbar height */}
      <h2 className="text-2xl font-semibold mb-6">Statistics Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded p-6">
          <h3 className="text-lg font-medium mb-2">Total Packages Delivered</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h3 className="text-lg font-medium mb-2">Total Employees</h3>
          <p className="text-3xl font-bold">56</p>
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h3 className="text-lg font-medium mb-2">Pending Deliveries</h3>
          <p className="text-3xl font-bold">89</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
