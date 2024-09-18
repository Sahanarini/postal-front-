import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import styles from './Payment.module.css'; // Import CSS module

const PaymentForm = () => {
  const [trackingId, setTrackingId] = useState(generateTrackingId());
  const [price, setPrice] = useState('');
  const [paymentType, setPaymentType] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mailDetails, setMailDetails] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  // Retrieve mId from session storage
  const mId = sessionStorage.getItem('id');

  // Function to generate a random 12-digit tracking ID
  function generateTrackingId() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }

  // Fetch mail details when the component mounts
  useEffect(() => {
    const fetchMailDetails = async () => {
      if (mId) {
        console.log('Fetching mail details for mId:', mId);
        try {
          const response = await axios.get(`http://localhost:9999/getMail/${mId}`);
          setMailDetails(response.data);
        } catch (err) {
          console.error('Error fetching mail details:', err);
          setError('Failed to load mail details.');
        }
      } else {
        setError('Mail ID not found in session.');
      }
    };

    fetchMailDetails();
  }, [mId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mId) {
      setError('Mail ID not found in session.');
      return;
    }

    const paymentData = {
      trackingid: trackingId,
      price: parseInt(price, 10),
      mail: { mId: parseInt(mId, 10) },
    };

    try {
      const response = await axios.post('http://localhost:9999/addPayment', paymentData);
      if (response.data === 'added') {
        setSuccess('Payment added successfully!');
        setError('');
        // Clear the form
        setTrackingId(generateTrackingId());
        setPrice('');
        setUpiId('');
        setCardNumber('');
        setShowSummary(false);
      }
    } catch (err) {
      setError('Failed to add payment. Please try again.');
      setSuccess('');
      console.error('Payment error:', err);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Payment Form</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {showSummary ? (
        <Card className={styles.summaryCard}>
          <Card.Body>
            <h5>Mail Details Summary</h5>
            <div className={styles.summaryItem}>
              <p>Tracking ID: {trackingId}</p>
              <p>Price: {price}</p>
              <p>Payment Type: {paymentType}</p>
              {paymentType === 'UPI' && <p>UPI ID: {upiId}</p>}
              {paymentType === 'Card' && <p>Card Number: {cardNumber}</p>}
              {/* Add more details from mailDetails as needed */}
            </div>
            <Button variant="primary" onClick={handleSubmit}>
              Confirm Payment
            </Button>
            <Button variant="secondary" onClick={() => setShowSummary(false)}>
              Edit Payment
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Form onSubmit={(e) => { e.preventDefault(); setShowSummary(true); }}>
          <Form.Group controlId="formTrackingId">
            <Form.Label>Tracking ID</Form.Label>
            <Form.Control type="text" value={trackingId} readOnly />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPaymentType">
            <Form.Label>Payment Type</Form.Label>
            <Form.Control as="select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </Form.Control>
          </Form.Group>

          {paymentType === 'UPI' && (
            <Form.Group controlId="formUpiId">
              <Form.Label>UPI ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {paymentType === 'Card' && (
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default PaymentForm;
