import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Section.css';

const IconSection = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleCalculatePostageClick = () => {
    navigate('/postage');
  };

  const handleLocatePostOfficeClick = () => {
    navigate('/locatepost'); // Navigate to LocatePost page
  };

  return (
    <Container fluid className="py-4">
      <div className="icon-container">
        <div className="icon-box">
          <img src="tracking.png" alt="Track" className="icon-image" />
          <h5>Track</h5>
        </div>
        <div className="icon-box" onClick={handleCalculatePostageClick}>
          <img src="calculator.png" alt="Calculate Postage" className="icon-image" />
          <h5>Calculate Postage</h5>
        </div>
        <div className="icon-box" onClick={handleLocatePostOfficeClick}>
          <img src="location.png" alt="Locate PostOffice" className="icon-image" />
          <h5>Locate PostOffice</h5>
        </div>
      </div>
    </Container>
  );
};

export default IconSection;
