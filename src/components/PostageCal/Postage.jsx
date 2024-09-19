import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from './Postage.module.css'; // Import the CSS module

import { domestic } from './domestic';
import { international } from './international'; // Import international data
import { miscellaneous } from './miscellaneous'; // Import miscellaneous data

const Postage = () => {
  const [serviceType, setServiceType] = useState('');
  const [articleType, setArticleType] = useState('');
  const [formData, setFormData] = useState({
    fromPincode: '',
    fromCity: '',
    fromState: '',
    toPincode: '',
    toCity: '',
    toState: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    fromCountry: 'IN',
    toCountry: ''
  });
  const [validationMessage, setValidationMessage] = useState('');
  const [pincodeOptions, setPincodeOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [miscellaneousOptions, setMiscellaneousOptions] = useState([]);

  useEffect(() => {
    // Load pincode options on component mount
    const uniquePincodes = Array.from(new Set(domestic.locations.map(loc => loc.pincode)));
    setPincodeOptions(uniquePincodes);

    // Load country options for international service
    const countries = international[0]?.international?.countries || [];
    setCountryOptions(countries);

    // Load miscellaneous options
    const miscOptions = miscellaneous[0].articleTypes;
    setMiscellaneousOptions(miscOptions);
  }, []);

  useEffect(() => {
    // Ensure pincode options are filtered correctly when formData changes
    const { fromPincode, toPincode } = formData;
    const filteredFromPincodes = pincodeOptions.filter(pincode => pincode !== toPincode);
    const filteredToPincodes = pincodeOptions.filter(pincode => pincode !== fromPincode);

    // Update state with the filtered pincodes
    setFormData(prevFormData => ({
      ...prevFormData,
      availableFromPincodes: filteredFromPincodes,
      availableToPincodes: filteredToPincodes
    }));
  }, [formData.fromPincode, formData.toPincode, pincodeOptions]);

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
    setArticleType(''); // Reset article type when service type changes
    setValidationMessage(''); // Clear validation message
  };

  const handleArticleTypeChange = (e) => {
    setArticleType(e.target.value);
    setValidationMessage(''); // Clear validation message
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setValidationMessage(''); // Clear validation message
  };

  const handlePincodeChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };

    const selectedLocation = domestic.locations.find(loc => loc.pincode === value);
    if (selectedLocation) {
      updatedFormData[`${name.replace('Pincode', 'City')}`] = selectedLocation.city;
      updatedFormData[`${name.replace('Pincode', 'State')}`] = selectedLocation.state;
    }

    setFormData(updatedFormData);
    setValidationMessage(''); // Clear validation message
  };

  const validateDimensions = () => {
    const { weight, length, width, height } = formData;
    const article = serviceType === 'domestic'
      ? domestic.articleType[articleType]
      : serviceType === 'international'
        ? international[0]?.international?.articleType[articleType]
        : miscellaneous[0].articleTypes.find(type => type.name === articleType);

    if (!article) return 'Invalid article type selected.';

    const weightValue = parseInt(weight, 10);
    const lengthValue = parseInt(length, 10);
    const widthValue = parseInt(width, 10);
    const heightValue = parseInt(height, 10);

    if (weightValue < parseInt(article.minWeight) || weightValue > parseInt(article.maxWeight)) {
      return `Weight must be between ${article.minWeight}g and ${article.maxWeight}g.`;
    }
    if (lengthValue < parseInt(article.minLength) || lengthValue > parseInt(article.maxLength)) {
      return `Length must be between ${article.minLength}cm and ${article.maxLength}cm.`;
    }
    if (widthValue < parseInt(article.minWidth) || widthValue > parseInt(article.maxWidth)) {
      return `Width must be between ${article.minWidth}cm and ${article.maxWidth}cm.`;
    }
    if (heightValue < parseInt(article.minHeight) || heightValue > parseInt(article.maxHeight)) {
      return `Height must be between ${article.minHeight}cm and ${article.maxHeight}cm.`;
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateDimensions();
    if (validationError) {
      setValidationMessage(validationError);
    } else {
      setValidationMessage('Form submitted successfully!');
    }
  };

  // Extract filtered pincodes from formData
  const availableToPincodes = formData.availableToPincodes || [];
  const availableFromPincodes = formData.availableFromPincodes || [];

  return (
    <Container fluid className={styles.postageContainer}>
      <h1 className={styles.heading}>Calculate Postage</h1>
      <Container className={styles.serviceContainer}>
        <Row className="mb-3">
          <Col>
            <Form>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Service Type
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Domestic"
                    value="domestic"
                    name="serviceType"
                    checked={serviceType === 'domestic'}
                    onChange={handleServiceChange}
                  />
                  <Form.Check
                    type="radio"
                    label="International"
                    value="international"
                    name="serviceType"
                    checked={serviceType === 'international'}
                    onChange={handleServiceChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Miscellaneous"
                    value="miscellaneous"
                    name="serviceType"
                    checked={serviceType === 'miscellaneous'}
                    onChange={handleServiceChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        {/* Domestic Form */}
        {serviceType === 'domestic' && (
          <>
            <div className={styles.formContent}>
              <h3>From:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      as="select"
                      name="fromPincode"
                      value={formData.fromPincode}
                      onChange={handlePincodeChange}
                    >
                      <option value="">Select Pincode</option>
                      {availableFromPincodes.map(pincode => (
                        <option key={pincode} value={pincode}>
                          {pincode}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="fromCity"
                      value={formData.fromCity}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="fromState"
                      value={formData.fromState}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h3>To:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      as="select"
                      name="toPincode"
                      value={formData.toPincode}
                      onChange={handlePincodeChange}
                    >
                      <option value="">Select Pincode</option>
                      {availableToPincodes.map(pincode => (
                        <option key={pincode} value={pincode}>
                          {pincode}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="toCity"
                      value={formData.toCity}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="toState"
                      value={formData.toState}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h3>Article Type:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="articleType"
                      value={articleType}
                      onChange={handleArticleTypeChange}
                    >
                      <option value="">Select Article Type</option>
                      {domestic.articleTypes.map(type => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <h3>Dimensions:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Weight (g)</Form.Label>
                    <Form.Control
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Length (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Width (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </>
        )}

        {/* International Form */}
        {serviceType === 'international' && (
          <>
            <div className={styles.formContent}>
              <h3>From:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      name="fromCountry"
                      value={formData.fromCountry}
                      onChange={handleFormChange}
                    >
                      {countryOptions.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <h3>To:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      name="toCountry"
                      value={formData.toCountry}
                      onChange={handleFormChange}
                    >
                      {countryOptions.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <h3>Article Type:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="articleType"
                      value={articleType}
                      onChange={handleArticleTypeChange}
                    >
                      <option value="">Select Article Type</option>
                      {international[0]?.international?.articleType && 
                        Object.keys(international[0].international.articleType).map(key => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <h3>Dimensions:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Weight (g)</Form.Label>
                    <Form.Control
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Length (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Width (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </>
        )}

        {/* Miscellaneous Form */}
        {serviceType === 'miscellaneous' && (
          <>
            <div className={styles.formContent}>
              <h3>Article Type:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="articleType"
                      value={articleType}
                      onChange={handleArticleTypeChange}
                    >
                      <option value="">Select Article Type</option>
                      {miscellaneousOptions.map(type => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <h3>Dimensions:</h3>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Weight (g)</Form.Label>
                    <Form.Control
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Length (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Width (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </>
        )}

        <Row>
          <Col>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>

        {validationMessage && (
          <Row className="mt-3">
            <Col>
              <Alert variant="warning">{validationMessage}</Alert>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Postage;
