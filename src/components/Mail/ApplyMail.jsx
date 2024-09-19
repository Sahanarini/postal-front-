import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Form, Button, Card } from 'react-bootstrap';
import styles from './MailAddressForm.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const MailAddressForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mailData, setMailData] = useState({
    service: 'Domestic',
    articleType: '',
    articlecontent: '',
    createdAt: new Date().toISOString().split('T')[0],
    price: '',
    weight: '',
    length: '',
    height: '',
    width: '',
    value: '',
    collectiondate: '',
    time: '',
    status: 'requested',
    user: { userId: sessionStorage.getItem('userId') },
    address: { id: sessionStorage.getItem('addressId') }
  });

  const [addressData, setAddressData] = useState({
    toName: '',
    toAddress: '',
    toCountry: '',
    toState: '',
    toCity: '',
    toPincode: '',
    toEmail: '',
    toMobile: ''
  });

  const [pincodes, setPincodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPincodes = async () => {
      try {
        const response = await axios.get('http://localhost:9999/getAllPostoffice');
        const fetchedPincodes = response.data;
        const sessionPincode = sessionStorage.getItem('addressId');
        const trimmedSessionPincode = sessionPincode ? sessionPincode.trim() : '';
        const filteredPincodes = fetchedPincodes.filter(pincodeObj =>
          pincodeObj.pincode.toString().trim() !== trimmedSessionPincode
        );
        setPincodes(filteredPincodes);
      } catch (error) {
        console.error('Error fetching pincodes:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load pincodes.',
          icon: 'error',
        });
      }
    };
    fetchPincodes();
  }, []);

  const handleMailChange = (e) => {
    const { name, value } = e.target;
    setMailData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (['length', 'width', 'height', 'articleType'].includes(name)) {
      calculatePrice();
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.post('http://localhost:9999/addAddress', addressData);
      if (response.data && response.data.id) {
        sessionStorage.setItem('addressId', response.data.id);
        setMailData(prevData => ({
          ...prevData,
          address: { id: response.data.id }
        }));
        setCurrentStep(3);
      } else {
        throw new Error('Address ID not returned from server.');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem saving the address.',
        icon: 'error',
      });
    }
  };

  const handleSubmit = async () => {
    const { address, user } = mailData;
    if (!address.id || !user.userId) {
      Swal.fire({
        title: 'Error',
        text: 'Address ID or User ID is missing.',
        icon: 'error',
      });
      return;
    }

    const dataToSend = {
      ...mailData,
      user,
      address
    };

    try {
      const response = await axios.post('http://localhost:9999/addMail', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const mId = response.data.mId;
      if (mId) {
        sessionStorage.setItem('mId', mId);
      }

      sessionStorage.setItem('mailData', JSON.stringify(dataToSend));
      navigate('/payment');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem placing the mail.',
        icon: 'error',
      });
    }
  };

  const calculatePrice = () => {
    const { length, width, height, articleType } = mailData;

    if (!articleType) {
      setMailData(prev => ({ ...prev, price: 'Select a valid article type' }));
      return;
    }

    const volume = Number(length) * Number(width) * Number(height);
    let price;

    if (volume <= 1000) {
      price = 50;
    } else if (volume <= 5000) {
      price = 100;
    } else {
      price = 150;
    }

    setMailData(prev => ({ ...prev, price }));
  };

  const getCollectionDateRange = () => {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    const maxDateString = maxDate.toISOString().split('T')[0];
    return { minDate, maxDate: maxDateString };
  };

  const { minDate, maxDate } = getCollectionDateRange();

  const renderReviewData = () => {
    return (
      <>
        <Navbar></Navbar>
        <h5>Mail Information</h5>
        <Form.Group>
          <Form.Label>Service</Form.Label>
          <Form.Control plaintext readOnly value={mailData.service} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Article Type</Form.Label>
          <Form.Control plaintext readOnly value={mailData.articleType} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Article Content</Form.Label>
          <Form.Control plaintext readOnly value={mailData.articlecontent} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Created At</Form.Label>
          <Form.Control plaintext readOnly value={mailData.createdAt} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control plaintext readOnly value={mailData.price} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Weight (g)</Form.Label>
          <Form.Control plaintext readOnly value={mailData.weight} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Dimensions (cm)</Form.Label>
          <div>
            Length: {mailData.length}, Width: {mailData.width}, Height: {mailData.height}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Value</Form.Label>
          <Form.Control plaintext readOnly value={mailData.value} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Collection Date</Form.Label>
          <Form.Control plaintext readOnly value={mailData.collectiondate} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control plaintext readOnly value={mailData.time} />
        </Form.Group>

        <h5>Address Information</h5>
        {Object.keys(addressData).map(key => (
          <Form.Group key={key}>
            <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
            <Form.Control plaintext readOnly value={addressData[key]} />
          </Form.Group>
        ))}
      </>
    );
  };

  return (
    <Container className="my-4">
      <Card className={`${styles.formContainer} p-4 shadow-lg rounded-lg`}>
        <div className={styles.stepperContainer}>
          <div className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>1</div>
          <div className={`${styles.stepLine} ${currentStep > 1 ? styles.stepLineActive : ''}`}></div>
          <div className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>2</div>
          <div className={`${styles.stepLine} ${currentStep > 2 ? styles.stepLineActive : ''}`}></div>
          <div className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>3</div>
        </div>

        <Form>
          {currentStep === 1 && (
            <div className={styles.formContainer}>
              <Card.Title className={styles.cardTitle}>Mail Information</Card.Title>
              {[{ label: 'Service', name: 'service', type: 'text' },
                { label: 'Article Type', name: 'articleType', type: 'select', options: ['letter', 'parcel', 'postcard'] },
                { label: 'Article Content', name: 'articlecontent', type: 'text' },
                { label: 'Created At', name: 'createdAt', type: 'date', disabled: true },
                { label: 'Price', name: 'price', type: 'text', disabled: true },
                { label: 'Weight (g)', name: 'weight', type: 'number' },
                { label: 'Length (cm)', name: 'length', type: 'number' },
                { label: 'Height (cm)', name: 'height', type: 'number' },
                { label: 'Width (cm)', name: 'width', type: 'number' },
                { label: 'Value', name: 'value', type: 'number' },
                { label: 'Collection Date', name: 'collectiondate', type: 'date', min: minDate, max: maxDate },
                { label: 'Time', name: 'time', type: 'select', options: ['Morning', 'Afternoon', 'Evening'] }]
                .map(({ label, name, type, options, disabled, min, max }) => (
                  <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
                    <Form.Label className={styles.formLabel}>{label}</Form.Label>
                    {type === 'select' ? (
                      <Form.Control
                        as="select"
                        name={name}
                        value={mailData[name]}
                        onChange={handleMailChange}
                        className={styles.formControl}
                      >
                        <option value="">Select</option>
                        {options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <Form.Control
                        type={type}
                        name={name}
                        value={mailData[name]}
                        onChange={handleMailChange}
                        disabled={disabled}
                        min={min}
                        max={max}
                        className={styles.formControl}
                      />
                    )}
                  </Form.Group>
                ))}
              <Button onClick={handleNext} className="mt-3">Next</Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.formContainer}>
              <Card.Title className={styles.cardTitle}>Address Information</Card.Title>
              {Object.keys(addressData).map(key => (
                <Form.Group className={styles.formGroup} controlId={`form${key}`} key={key}>
                  <Form.Label className={styles.formLabel}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                  <Form.Control
                    type="text"
                    name={key}
                    value={addressData[key]}
                    onChange={handleAddressChange}
                    className={styles.formControl}
                  />
                </Form.Group>
              ))}
              <Button onClick={handleSaveAddress} className="mt-3">Save Address</Button>
              <Button onClick={handleBack} className="mt-3 ml-2">Back</Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.formContainer}>
              <Card.Title className={styles.cardTitle}>Review</Card.Title>
              {renderReviewData()}
              <div className="d-flex justify-content-between mt-3">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleSubmit} className="ml-2">Submit</Button>
              </div>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
};

export default MailAddressForm;

