import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [price, setPrice] = useState(50);
  const [paymentType, setPaymentType] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [mailDetails, setMailDetails] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const mId = sessionStorage.getItem('mId');

  useEffect(() => {
    const fetchMailDetails = async () => {
      if (mId) {
        try {
          const response = await axios.get(`http://localhost:9999/getMail/${mId}`);
          setMailDetails(response.data);
        } catch (err) {
          setError('');
        }
      } else {
        setError('');
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
      trackingid: "1234567", // Example tracking ID
      price: parseInt(price, 10),
      mail: { mId: parseInt(mId, 10) },
    };

    if (paymentType === 'UPI') {
      paymentData.upiId = upiId;
    } else if (paymentType === 'Card') {
      paymentData.cardHolderName = cardHolderName;
      paymentData.cardNumber = cardNumber;
      paymentData.cvv = cvv;
    }

    try {
      const response = await axios.post('http://localhost:9999/addPayment', paymentData);
      if (response.data === 'added') {
        Swal.fire({
          title: 'Payment Successful!',
          text: 'Your payment has been processed successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to homepage after confirmation
          navigate('/');
        });
        resetForm();
      } else {
        setError('Failed to add payment.');
      }
    } catch (err) {
      setError('Failed to add payment. Please try again.');
    }
  };

  const resetForm = () => {
    setPrice('');
    setUpiId('');
    setCardHolderName('');
    setCardNumber('');
    setCvv('');
    setShowSummary(false);
  };

  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  };

  const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0.5rem',
    transition: 'border-color 0.3s',
    marginBottom: '1rem',
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  };
  

  return (
    <Container style={containerStyle}>
      <Card style={cardStyle}>
        <h2 className="text-center">Payment Form</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        {showSummary ? (
          <Card.Body>
            <h5 className="font-bold">Mail Details Summary</h5>
            <div>
              {/* <p>Price: {price}</p> */}
              <p>Payment Type: {paymentType}</p>
              {paymentType === 'UPI' && <p>UPI ID: {upiId}</p>}
              {paymentType === 'Card' && (
                <>
                  <p>Cardholder Name: {cardHolderName}</p>
                  <p>Card Number: {cardNumber}</p>
                  <p>CVV: {cvv}</p>
                </>
              )}
            </div>
            <Button variant="primary" onClick={handleSubmit} className="w-100 mt-4">
              Confirm Payment
            </Button>
            <Button variant="secondary" onClick={() => setShowSummary(false)} className="w-100 mt-2">
              
            </Button>
          </Card.Body>
        ) : (
          <Form onSubmit={(e) => { e.preventDefault(); setShowSummary(true); }} style={{ padding: '1.5rem' }}>
            {/* <Form.Group controlId="formPrice">
              <Form.Label style={labelStyle}>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
                onBlur={(e) => e.target.style = inputStyle}
              />
            </Form.Group> */}

            <Form.Group controlId="formPaymentType">
              <Form.Label style={labelStyle}>Payment Type</Form.Label>
              <Form.Control as="select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} style={inputStyle}>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </Form.Control>
            </Form.Group>

            {paymentType === 'UPI' && (
              <Form.Group controlId="formUpiId">
                <Form.Label style={labelStyle}>UPI ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
                  onBlur={(e) => e.target.style = inputStyle}
                />
              </Form.Group>
            )}

            {paymentType === 'Card' && (
              <>
                <Form.Group controlId="formCardHolderName">
                  <Form.Label style={labelStyle}>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Cardholder Name"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
                    onBlur={(e) => e.target.style = inputStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formCardNumber">
                  <Form.Label style={labelStyle}>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Card Number (12 digits)"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setCardNumber(value);
                    }}
                    required
                    style={inputStyle}
                    maxLength={12}
                    onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
                    onBlur={(e) => e.target.style = inputStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formCvv">
                  <Form.Label style={labelStyle}>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CVV (3 digits)"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                      setCvv(value);
                    }}
                    required
                    style={inputStyle}
                    maxLength={3}
                    onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
                    onBlur={(e) => e.target.style = inputStyle}
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Next
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default PaymentForm;
