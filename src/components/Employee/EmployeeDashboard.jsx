import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Empnavbar from './Empnavbar';
import Empsidebar from './Empsidebar';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // Handler for Pickup button
  const handlePickup = () => {
    navigate('/pickup'); // Navigate to Pickup page
  };

  // Handler for Delivery button
  const handleDelivery = () => {
    navigate('/delivery'); // Navigate to Delivery page
  };

  return (
    <>
      <Empnavbar/> {/* Include your Navbar component here */}
      <Empsidebar/>
      {/* Main Content */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center">Employee Dashboard</h2>
            <div className="mt-4">
              <Row>
                <Col>
                  <Button variant="primary" onClick={handlePickup} className="w-100">
                    Pickup
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" onClick={handleDelivery} className="w-100">
                    Delivery
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EmployeeDashboard;
