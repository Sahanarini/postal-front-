import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Optional: create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container fluid>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We provide reliable postal services with a commitment to quality and efficiency.
            </p>
          </Col>
          <Col md={4}>
            <h5>Services</h5>
            <ul>
              <li>Standard Mail Delivery</li>
              <li>Express Shipping</li>
              <li>International Shipping</li>
              <li>Package Tracking</li>
              <li>Customer Support</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@postalservice.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <small>© 2024 Postal Service. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
