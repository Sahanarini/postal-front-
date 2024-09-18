import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
