import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const PaymentForm = () => {
  const [trackingId, setTrackingId] = useState(generateTrackingId());
  const [price, setPrice] = useState('');
  const [paymentType, setPaymentType] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Retrieve mId from session storage
  const mId = sessionStorage.getItem('mId');

  // Function to generate a random 12-digit tracking ID
  function generateTrackingId() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mId) {
      setError('Mail ID not found in session.');
      return;
    }

    const paymentData = {
      trackingid: trackingId,
      price: parseInt(price, 10),
      mail: {
        mId: parseInt(mId, 10)  // Ensure mId is correctly parsed as an integer
      }
    };

    try {
      // Process payment logic here if necessary
      // This could involve validating the UPI or card details, but not storing them.

      const response = await axios.post('http://localhost:9999/addPayment', paymentData);
      if (response.data === 'added') {
        setSuccess('Payment added successfully!');
        setError('');
        // Clear the form
        setTrackingId(generateTrackingId());
        setPrice('');
        setUpiId('');
        setCardNumber('');
      }
    } catch (err) {
      setError('Failed to add payment. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Payment Form</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTrackingId">
          <Form.Label>Tracking ID</Form.Label>
          <Form.Control
            type="text"
            value={trackingId}
            readOnly // Make the tracking ID read-only
          />
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
          <>
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
            {/* Add additional card fields as necessary, like expiration date and CVV */}
          </>
        )}

        <Button variant="primary" type="submit">
          Submit Payment
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentForm;
