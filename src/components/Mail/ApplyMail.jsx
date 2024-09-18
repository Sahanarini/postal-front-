
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { Container, Form, Button, Card } from 'react-bootstrap';
// // import styles from './MailAddressForm.module.css'; // Import CSS module

// // const MailAddressForm = () => {
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [mailData, setMailData] = useState({
// //     service: '',
// //     articleType: '',
// //     articlecontent: '',
// //     createdAt: '',
// //     price: '',
// //     weight: '',
// //     length: '',
// //     height: '',
// //     width: '',
// //     value: '',
// //     collectiondate: '',
// //     time: '',
// //     status: 'requested',
// //     user: { userId: sessionStorage.getItem('userId') },
// //     address: { id: sessionStorage.getItem('id') }
// //   });

// //   const [addressData, setAddressData] = useState({
// //     toName: '',
// //     toAddress: '',
// //     toCountry: '',
// //     toState: '',
// //     toCity: '',
// //     toPincode: '',
// //     toEmail: '',
// //     toMobile: ''
// //   });

// //   useEffect(() => {
// //     console.log('Initialized User ID:', sessionStorage.getItem('userId'));
// //     console.log('Initialized Address ID:', sessionStorage.getItem('id'));
// //   }, []);

// //   const handleMailChange = (e) => {
// //     setMailData(prevData => ({
// //       ...prevData,
// //       [e.target.name]: e.target.value
// //     }));
// //   };

// //   const handleAddressChange = (e) => {
// //     setAddressData(prevData => ({
// //       ...prevData,
// //       [e.target.name]: e.target.value
// //     }));
// //   };

// //   const handleNext = () => {
// //     if (currentStep === 1) {
// //       setCurrentStep(2);
// //     }
// //   };

// //   const handleSaveAddress = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:9999/addAddress', addressData);
// //       console.log('Server response:', response.data);

// //       if (response.data && response.data.id) {
// //         sessionStorage.setItem('id', response.data.id);
// //         setMailData(prevData => ({
// //           ...prevData,
// //           address: { id: response.data.id }
// //         }));
// //         setCurrentStep(3);
// //       } else {
// //         throw new Error('Address ID not returned from server.');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       Swal.fire({
// //         title: 'Error',
// //         text: 'There was a problem saving the address.',
// //         icon: 'error',
// //       });
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     const { address, user } = mailData;
// //     if (!address.id || !user.userId) {
// //       Swal.fire({
// //         title: 'Error',
// //         text: 'Address ID or User ID is missing.',
// //         icon: 'error',
// //       });
// //       return;
// //     }

// //     const dataToSend = {
// //       ...mailData,
// //       user,
// //       address
// //     };

// //     console.log('Mail data being sent to backend:', dataToSend);

// //     try {
// //       const response = await axios.post('http://localhost:9999/addMail', dataToSend, {
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //       });
// //       Swal.fire({
// //         title: 'Success',
// //         text: 'Mail placed successfully.',
// //         icon: 'success',
// //       });
// //     } catch (error) {
// //       console.error(error.response ? error.response.data : error.message);
// //       Swal.fire({
// //         title: 'Error',
// //         text: 'There was a problem placing the mail.',
// //         icon: 'error',
// //       });
// //     }
// //   };

// //   return (
// //     <Container className="my-4">
// //       <Card className={`${styles.formContainer} p-4 shadow-lg rounded-lg`}>
// //         <div className={styles.stepperContainer}>
// //           <div className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>1</div>
// //           <div className={`${styles.stepLine} ${currentStep > 1 ? styles.stepLineActive : ''}`}></div>
// //           <div className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>2</div>
// //           <div className={`${styles.stepLine} ${currentStep > 2 ? styles.stepLineActive : ''}`}></div>
// //           <div className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>3</div>
// //         </div>

// //         <Form>
// //           {currentStep === 1 && (
// //             <div>
// //               <Card.Title className={styles.cardTitle}>Mail Information</Card.Title>
// //               {[
// //                 { label: 'Service', name: 'service', type: 'text' },
// //                 { label: 'Article Type', name: 'articleType', type: 'text' },
// //                 { label: 'Article Content', name: 'articlecontent', type: 'text' },
// //                 { label: 'Created At', name: 'createdAt', type: 'date' },
// //                 { label: 'Price', name: 'price', type: 'number' },
// //                 { label: 'Weight', name: 'weight', type: 'number' },
// //                 { label: 'Length', name: 'length', type: 'number' },
// //                 { label: 'Height', name: 'height', type: 'number' },
// //                 { label: 'Width', name: 'width', type: 'number' },
// //                 { label: 'Value', name: 'value', type: 'number' },
// //                 { label: 'Collection Date', name: 'collectiondate', type: 'date' },
// //                 { label: 'Time', name: 'time', type: 'text' },
// //                 // { label: 'Status', name: 'status', type: 'text' },
// //                 // { label: 'User ID', name: 'user.userId', type: 'text', readOnly: true },
// //                 // { label: 'Address ID', name: 'address.id', type: 'text', readOnly: true }
// //               ].map(({ label, name, type, readOnly }) => (
// //                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
// //                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
// //                   <Form.Control
// //                     type={type}
// //                     name={name}
// //                     value={mailData[name]}
// //                     onChange={handleMailChange}
// //                     placeholder={`Enter ${label.toLowerCase()}`}
// //                     className={styles.formControl}
// //                     readOnly={readOnly}
// //                   />
// //                 </Form.Group>
// //               ))}
// //               <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next</Button>
// //             </div>
// //           )}

// //           {currentStep === 2 && (
// //             <div>
// //               <Card.Title className={styles.cardTitle}>Address Information</Card.Title>
// //               {[
// //                 { label: 'Recipient\'s Name', name: 'toName', type: 'text' },
// //                 { label: 'Address', name: 'toAddress', type: 'text' },
// //                 { label: 'Country', name: 'toCountry', type: 'text' },
// //                 { label: 'State', name: 'toState', type: 'text' },
// //                 { label: 'City', name: 'toCity', type: 'text' },
// //                 { label: 'Pincode', name: 'toPincode', type: 'text' },
// //                 { label: 'Email', name: 'toEmail', type: 'email' },
// //                 { label: 'Mobile', name: 'toMobile', type: 'text' }
// //               ].map(({ label, name, type }) => (
// //                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
// //                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
// //                   <Form.Control
// //                     type={type}
// //                     name={name}
// //                     value={addressData[name]}
// //                     onChange={handleAddressChange}
// //                     placeholder={`Enter ${label.toLowerCase()}`}
// //                     className={styles.formControl}
// //                   />
// //                 </Form.Group>
// //               ))}
// //               <Button className={`${styles.buttonSave} mt-3`} onClick={handleSaveAddress}>Save Address</Button>
// //             </div>
// //           )}

// //           {currentStep === 3 && (
// //             <div>
// //               <Card.Title className={styles.cardTitle}>Review and Submit</Card.Title>
// //               <p>Please review your information and submit.</p>
// //               <Button className={`${styles.buttonSubmit} mt-3`} onClick={handleSubmit}>Submit</Button>
// //             </div>
// //           )}
// //         </Form>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default MailAddressForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Container, Form, Button, Card } from 'react-bootstrap';
// import styles from './MailAddressForm.module.css'; // Import CSS module
// import { useNavigate } from 'react-router-dom';

// const MailAddressForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [mailData, setMailData] = useState({
//     service: '',
//     articleType: '',
//     articlecontent: '',
//     createdAt: '',
//     price: '',
//     weight: '',
//     length: '',
//     height: '',
//     width: '',
//     value: '',
//     collectiondate: '',
//     time: '',
//     status: 'requested',
//     user: { userId: sessionStorage.getItem('userId') },
//     address: { id: sessionStorage.getItem('id') }
//   });

//   const [addressData, setAddressData] = useState({
//     toName: '',
//     toAddress: '',
//     toCountry: '',
//     toState: '',
//     toCity: '',
//     toPincode: '',
//     toEmail: '',
//     toMobile: ''
//   });

//   const [pincodes, setPincodes] = useState([]);

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchPincodes = async () => {
//       try {
//         const response = await axios.get('http://localhost:9999/getAllPostoffice');
//         const fetchedPincodes = response.data; // Assume response data is an array of objects

//         // Get the pincode from session and handle null case
//         const sessionPincode = sessionStorage.getItem('id');
//         const trimmedSessionPincode = sessionPincode ? sessionPincode.trim() : '';

//         // Filter out the pincode from session
//         const filteredPincodes = fetchedPincodes.filter(pincodeObj => 
//           pincodeObj.pincode.toString().trim() !== trimmedSessionPincode
//         );
//         setPincodes(filteredPincodes);
//       } catch (error) {
//         console.error('Error fetching pincodes:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'Failed to load pincodes.',
//           icon: 'error',
//         });
//       }
//     };
//     fetchPincodes();
//   }, []);

//   const handleMailChange = (e) => {
//     setMailData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };
  
//   const handleAddressChange = (e) => {
//     setAddressData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep === 1) {
//       setCurrentStep(2);
//     }
//   };

//   const handleSaveAddress = async () => {
//     try {
//       const response = await axios.post('http://localhost:9999/addAddress', addressData);
//       console.log('Server response:', response.data);

//       if (response.data && response.data.id) {
//         sessionStorage.setItem('id', response.data.id);
//         setMailData(prevData => ({
//           ...prevData,
//           address: { id: response.data.id }
//         }));
//         setCurrentStep(3);
//       } else {
//         throw new Error('Address ID not returned from server.');
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem saving the address.',
//         icon: 'error',
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     const { address, user } = mailData;
//     if (!address.id || !user.userId) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Address ID or User ID is missing.',
//         icon: 'error',
//       });
//       return;
//     }

//     const dataToSend = {
//       ...mailData,
//       user,
//       address
//     };

//     console.log('Mail data being sent to backend:', dataToSend);

//     try {
//       const response = await axios.post('http://localhost:9999/addMail', dataToSend, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       Swal.fire({
//         title: 'Success',
//         text: 'Mail placed successfully.',
//         icon: 'success',
//       });
//       navigate('/payment');
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem placing the mail.',
//         icon: 'error',
//       });
//     }
//   };

//   return (
//     <Container className="my-4">
//       <Card className={`${styles.formContainer} p-4 shadow-lg rounded-lg`}>
//         <div className={styles.stepperContainer}>
//           <div className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>1</div>
//           <div className={`${styles.stepLine} ${currentStep > 1 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>2</div>
//           <div className={`${styles.stepLine} ${currentStep > 2 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>3</div>
//         </div>

//         <Form>
//           {currentStep === 1 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Mail Information</Card.Title>
//               {[
//                 { label: 'Service', name: 'service', type: 'text' },
//                 { label: 'Article Type', name: 'articleType', type: 'text' },
//                 { label: 'Article Content', name: 'articlecontent', type: 'text' },
//                 { label: 'Created At', name: 'createdAt', type: 'date' },
//                 { label: 'Price', name: 'price', type: 'number' },
//                 { label: 'Weight', name: 'weight', type: 'number' },
//                 { label: 'Length', name: 'length', type: 'number' },
//                 { label: 'Height', name: 'height', type: 'number' },
//                 { label: 'Width', name: 'width', type: 'number' },
//                 { label: 'Value', name: 'value', type: 'number' },
//                 { label: 'Collection Date', name: 'collectiondate', type: 'date' },
//                 { label: 'Time', name: 'time', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   <Form.Control
//                     type={type}
//                     name={name}
//                     value={mailData[name]}
//                     onChange={handleMailChange}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                     className={styles.formControl}
//                   />
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next</Button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Address Information</Card.Title>
//               {[
//                 { label: 'Recipient\'s Name', name: 'toName', type: 'text' },
//                 { label: 'Address', name: 'toAddress', type: 'text' },
//                 { label: 'Country', name: 'toCountry', type: 'text' },
//                 { label: 'State', name: 'toState', type: 'text' },
//                 { label: 'City', name: 'toCity', type: 'text' },
//                 { label: 'Pincode', name: 'toPincode', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   {name === 'toPincode' ? (
//                     <Form.Control
//                       as="select"
//                       name="toPincode"
//                       value={addressData.toPincode}
//                       onChange={handleAddressChange}
//                       className={styles.formControl}
//                     >
//                       <option value="">Select Pincode</option>
//                       {pincodes.map((pincodeObj) => (
//                         <option key={pincodeObj.pincode} value={pincodeObj.pincode}>
//                           {pincodeObj.pincode} - {pincodeObj.postOfficeName}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   ) : (
//                     <Form.Control
//                       type={type}
//                       name={name}
//                       value={addressData[name]}
//                       onChange={handleAddressChange}
//                       placeholder={`Enter ${label.toLowerCase()}`}
//                       className={styles.formControl}
//                     />
//                   )}
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonSave} mt-3`} onClick={handleSaveAddress}>Save Address</Button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Review and Submit</Card.Title>
//               <p>Please review your information and submit.</p>
//               <Button className={`${styles.buttonSubmit} mt-3`} onClick={handleSubmit}>Submit</Button>
//             </div>
//           )}
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default MailAddressForm;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Container, Form, Button, Card } from 'react-bootstrap';
// import styles from './MailAddressForm.module.css'; // Import CSS module
// import { useNavigate } from 'react-router-dom';

// const MailAddressForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [mailData, setMailData] = useState({
//     service: '',
//     articleType: '',
//     articlecontent: '',
//     createdAt: '',
//     price: '',
//     weight: '',
//     length: '',
//     height: '',
//     width: '',
//     value: '',
//     collectiondate: '',
//     time: '',
//     status: 'requested',
//     user: { userId: sessionStorage.getItem('userId') },
//     address: { id: sessionStorage.getItem('id') }
//   });

//   const [addressData, setAddressData] = useState({
//     toName: '',
//     toAddress: '',
//     toCountry: '',
//     toState: '',
//     toCity: '',
//     toPincode: '',
//     toEmail: '',
//     toMobile: ''
//   });

//   const [paymentData, setPaymentData] = useState({
//     cardNumber: '',
//     cardExpiry: '',
//     cardCVC: ''
//   });

//   const [pincodes, setPincodes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPincodes = async () => {
//       try {
//         const response = await axios.get('http://localhost:9999/getAllPostoffice');
//         const fetchedPincodes = response.data;

//         const sessionPincode = sessionStorage.getItem('id');
//         const trimmedSessionPincode = sessionPincode ? sessionPincode.trim() : '';

//         const filteredPincodes = fetchedPincodes.filter(pincodeObj =>
//           pincodeObj.pincode.toString().trim() !== trimmedSessionPincode
//         );
//         setPincodes(filteredPincodes);
//       } catch (error) {
//         console.error('Error fetching pincodes:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'Failed to load pincodes.',
//           icon: 'error',
//         });
//       }
//     };
//     fetchPincodes();
//   }, []);

//   const handleMailChange = (e) => {
//     setMailData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleAddressChange = (e) => {
//     setAddressData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleSaveAddress = async () => {
//     try {
//       const response = await axios.post('http://localhost:9999/addAddress', addressData);
//       console.log('Server response:', response.data);

//       if (response.data && response.data.id) {
//         sessionStorage.setItem('id', response.data.id);
//         setMailData(prevData => ({
//           ...prevData,
//           address: { id: response.data.id }
//         }));
//         setCurrentStep(3); // Move to review step
//       } else {
//         throw new Error('Address ID not returned from server.');
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem saving the address.',
//         icon: 'error',
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     const { address, user } = mailData;
//     if (!address.id || !user.userId) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Address ID or User ID is missing.',
//         icon: 'error',
//       });
//       return;
//     }

//     const dataToSend = {
//       ...mailData,
//       user,
//       address,
//       paymentData
//     };

//     console.log('Mail data being sent to backend:', dataToSend);

//     try {
//       const response = await axios.post('http://localhost:9999/addMail', dataToSend, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       Swal.fire({
//         title: 'Success',
//         text: 'Mail placed successfully.',
//         icon: 'success',
//       });
//       navigate('/payment');
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem placing the mail.',
//         icon: 'error',
//       });
//     }
//   };

//   return (
//     <Container className="my-4">
//       <Card className={`${styles.formContainer} p-4 shadow-lg rounded-lg`}>
//         <div className={styles.stepperContainer}>
//           <div className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>1</div>
//           <div className={`${styles.stepLine} ${currentStep > 1 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>2</div>
//           <div className={`${styles.stepLine} ${currentStep > 2 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>3</div>
//           <div className={`${styles.stepLine} ${currentStep > 3 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 4 ? styles.stepActive : ''}`}>4</div>
//         </div>

//         <Form>
//           {currentStep === 1 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Mail Information</Card.Title>
//               {[
//                 { label: 'Service', name: 'service', type: 'text' },
//                 { label: 'Article Type', name: 'articleType', type: 'text' },
//                 { label: 'Article Content', name: 'articlecontent', type: 'text' },
//                 { label: 'Created At', name: 'createdAt', type: 'date' },
//                 { label: 'Price', name: 'price', type: 'number' },
//                 { label: 'Weight', name: 'weight', type: 'number' },
//                 { label: 'Length', name: 'length', type: 'number' },
//                 { label: 'Height', name: 'height', type: 'number' },
//                 { label: 'Width', name: 'width', type: 'number' },
//                 { label: 'Value', name: 'value', type: 'number' },
//                 { label: 'Collection Date', name: 'collectiondate', type: 'date' },
//                 { label: 'Time', name: 'time', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   <Form.Control
//                     type={type}
//                     name={name}
//                     value={mailData[name]}
//                     onChange={handleMailChange}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                     className={styles.formControl}
//                   />
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next</Button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Address Information</Card.Title>
//               {[
//                 { label: 'Recipient\'s Name', name: 'toName', type: 'text' },
//                 { label: 'Address', name: 'toAddress', type: 'text' },
//                 { label: 'Country', name: 'toCountry', type: 'text' },
//                 { label: 'State', name: 'toState', type: 'text' },
//                 { label: 'City', name: 'toCity', type: 'text' },
//                 { label: 'Pincode', name: 'toPincode', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   {name === 'toPincode' ? (
//                     <Form.Control
//                       as="select"
//                       name="toPincode"
//                       value={addressData.toPincode}
//                       onChange={handleAddressChange}
//                       className={styles.formControl}
//                     >
//                       <option value="">Select Pincode</option>
//                       {pincodes.map((pincodeObj) => (
//                         <option key={pincodeObj.pincode} value={pincodeObj.pincode}>
//                           {pincodeObj.pincode} - {pincodeObj.postOfficeName}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   ) : (
//                     <Form.Control
//                       type={type}
//                       name={name}
//                       value={addressData[name]}
//                       onChange={handleAddressChange}
//                       placeholder={`Enter ${label.toLowerCase()}`}
//                       className={styles.formControl}
//                     />
//                   )}
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonSave} mt-3`} onClick={handleSaveAddress}>Save Address</Button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Review and Submit</Card.Title>
//               <p>Please review your information and submit.</p>
//               <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next to Payment</Button>
//             </div>
//           )}

//           {currentStep === 4 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Payment Information</Card.Title>
//               {[
//                 { label: 'Card Number', name: 'cardNumber', type: 'text' },
//                 { label: 'Expiry Date', name: 'cardExpiry', type: 'text' },
//                 { label: 'CVC', name: 'cardCVC', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   <Form.Control
//                     type={type}
//                     name={name}
//                     value={paymentData[name]}
//                     onChange={handlePaymentChange}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                     className={styles.formControl}
//                   />
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonSubmit} mt-3`} onClick={handleSubmit}>Submit Payment</Button>
//             </div>
//           )}
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default MailAddressForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Container, Form, Button, Card } from 'react-bootstrap';
// import styles from './MailAddressForm.module.css'; // Import CSS module
// import { useNavigate } from 'react-router-dom';

// const MailAddressForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [mailData, setMailData] = useState({
//     service: '',
//     articleType: '',
//     articlecontent: '',
//     createdAt: '',
//     price: '',
//     weight: '',
//     length: '',
//     height: '',
//     width: '',
//     value: '',
//     collectiondate: '',
//     time: '',
//     status: 'requested',
//     user: { userId: sessionStorage.getItem('userId') },
//     address: { id: sessionStorage.getItem('id') }
//   });

//   const [addressData, setAddressData] = useState({
//     toName: '',
//     toAddress: '',
//     toCountry: '',
//     toState: '',
//     toCity: '',
//     toPincode: '',
//     toEmail: '',
//     toMobile: ''
//   });

//   const [paymentData, setPaymentData] = useState({
//     cardNumber: '',
//     cardExpiry: '',
//     cardCVC: ''
//   });

//   const [pincodes, setPincodes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPincodes = async () => {
//       try {
//         const response = await axios.get('http://localhost:9999/getAllPostoffice');
//         const fetchedPincodes = response.data;

//         const sessionPincode = sessionStorage.getItem('id');
//         const trimmedSessionPincode = sessionPincode ? sessionPincode.trim() : '';

//         const filteredPincodes = fetchedPincodes.filter(pincodeObj =>
//           pincodeObj.pincode.toString().trim() !== trimmedSessionPincode
//         );
//         setPincodes(filteredPincodes);
//       } catch (error) {
//         console.error('Error fetching pincodes:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'Failed to load pincodes.',
//           icon: 'error',
//         });
//       }
//     };
//     fetchPincodes();
//   }, []);

//   const handleMailChange = (e) => {
//     setMailData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleAddressChange = (e) => {
//     setAddressData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleSaveAddress = async () => {
//     try {
//       const response = await axios.post('http://localhost:9999/addAddress', addressData);
//       console.log('Server response:', response.data);

//       if (response.data && response.data.id) {
//         sessionStorage.setItem('id', response.data.id);
//         setMailData(prevData => ({
//           ...prevData,
//           address: { id: response.data.id }
//         }));
//         setCurrentStep(3); // Move to review step
//       } else {
//         throw new Error('Address ID not returned from server.');
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem saving the address.',
//         icon: 'error',
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     const { address, user } = mailData;
//     if (!address.id || !user.userId) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Address ID or User ID is missing.',
//         icon: 'error',
//       });
//       return;
//     }

//     const dataToSend = {
//       ...mailData,
//       user,
//       address,
//       paymentData
//     };

//     console.log('Mail data being sent to backend:', dataToSend);

//     try {
//       const response = await axios.post('http://localhost:9999/addMail', dataToSend, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       Swal.fire({
//         title: 'Success',
//         text: 'Mail placed successfully.',
//         icon: 'success',
//       });
//       navigate('/payment');
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem placing the mail.',
//         icon: 'error',
//       });
//     }
//   };

//   return (
//     <Container className="my-4">
//       <Card className={`${styles.formContainer} p-4 shadow-lg rounded-lg`}>
//         <div className={styles.stepperContainer}>
//           <div className={`${styles.step} ${currentStep === 1 ? styles.stepActive : ''}`}>1</div>
//           <div className={`${styles.stepLine} ${currentStep > 1 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 2 ? styles.stepActive : ''}`}>2</div>
//           <div className={`${styles.stepLine} ${currentStep > 2 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 3 ? styles.stepActive : ''}`}>3</div>
//           <div className={`${styles.stepLine} ${currentStep > 3 ? styles.stepLineActive : ''}`}></div>
//           <div className={`${styles.step} ${currentStep === 4 ? styles.stepActive : ''}`}>4</div>
//         </div>

//         <Form>
//           {currentStep === 1 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Mail Information</Card.Title>
//               {[
//                 { label: 'Service', name: 'service', type: 'text' },
//                 { label: 'Article Type', name: 'articleType', type: 'text' },
//                 { label: 'Article Content', name: 'articlecontent', type: 'text' },
//                 { label: 'Created At', name: 'createdAt', type: 'date' },
//                 { label: 'Price', name: 'price', type: 'number' },
//                 { label: 'Weight', name: 'weight', type: 'number' },
//                 { label: 'Length', name: 'length', type: 'number' },
//                 { label: 'Height', name: 'height', type: 'number' },
//                 { label: 'Width', name: 'width', type: 'number' },
//                 { label: 'Value', name: 'value', type: 'number' },
//                 { label: 'Collection Date', name: 'collectiondate', type: 'date' },
//                 { label: 'Time', name: 'time', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   <Form.Control
//                     type={type}
//                     name={name}
//                     value={mailData[name]}
//                     onChange={handleMailChange}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                     className={styles.formControl}
//                   />
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next</Button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Address Information</Card.Title>
//               {[
//                 { label: 'Recipient\'s Name', name: 'toName', type: 'text' },
//                 { label: 'Address', name: 'toAddress', type: 'text' },
//                 { label: 'Country', name: 'toCountry', type: 'text' },
//                 { label: 'State', name: 'toState', type: 'text' },
//                 { label: 'City', name: 'toCity', type: 'text' },
//                 { label: 'Pincode', name: 'toPincode', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   {name === 'toPincode' ? (
//                     <Form.Control
//                       as="select"
//                       name="toPincode"
//                       value={addressData.toPincode}
//                       onChange={handleAddressChange}
//                       className={styles.formControl}
//                     >
//                       <option value="">Select Pincode</option>
//                       {pincodes.map((pincodeObj) => (
//                         <option key={pincodeObj.pincode} value={pincodeObj.pincode}>
//                           {pincodeObj.pincode} - {pincodeObj.postOfficeName}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   ) : (
//                     <Form.Control
//                       type={type}
//                       name={name}
//                       value={addressData[name]}
//                       onChange={handleAddressChange}
//                       placeholder={`Enter ${label.toLowerCase()}`}
//                       className={styles.formControl}
//                     />
//                   )}
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonSave} mt-3`} onClick={handleSaveAddress}>Save Address</Button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Review and Submit</Card.Title>
//               <p>Please review your information and submit.</p>
//               <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next to Payment</Button>
//             </div>
//           )}

//           {currentStep === 4 && (
//             <div>
//               <Card.Title className={styles.cardTitle}>Payment Information</Card.Title>
//               {[
//                 { label: 'Card Number', name: 'cardNumber', type: 'text' },
//                 { label: 'Expiry Date', name: 'cardExpiry', type: 'text' },
//                 { label: 'CVC', name: 'cardCVC', type: 'text' }
//               ].map(({ label, name, type }) => (
//                 <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
//                   <Form.Label className={styles.formLabel}>{label}</Form.Label>
//                   <Form.Control
//                     type={type}
//                     name={name}
//                     value={paymentData[name]}
//                     onChange={handlePaymentChange}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                     className={styles.formControl}
//                   />
//                 </Form.Group>
//               ))}
//               <Button className={`${styles.buttonSubmit} mt-3`} onClick={handleSubmit}>Submit Payment</Button>
//             </div>
//           )}
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default MailAddressForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Form, Button, Card } from 'react-bootstrap';
import styles from './MailAddressForm.module.css';
import { useNavigate } from 'react-router-dom';

const MailAddressForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mailData, setMailData] = useState({
    service: '',
    articleType: '',
    articlecontent: '',
    createdAt: '',
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
    address: { id: sessionStorage.getItem('id') }
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

        const sessionPincode = sessionStorage.getItem('id');
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
    setMailData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddressChange = (e) => {
    setAddressData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.post('http://localhost:9999/addAddress', addressData);
      console.log('Server response:', response.data);

      if (response.data && response.data.id) {
        sessionStorage.setItem('id', response.data.id);
        setMailData(prevData => ({
          ...prevData,
          address: { id: response.data.id }
        }));
        setCurrentStep(3); // Move to review step
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
      address,
    };

    console.log('Mail data being sent to backend:', dataToSend);

    try {
      const response = await axios.post('http://localhost:9999/addMail', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Store mId in session storage after successful mail placement
      if (response.data && response.data.mId) {
        sessionStorage.setItem('mId', response.data.mId);
      }

      Swal.fire({
        title: 'Success',
        text: 'Mail placed successfully.',
        icon: 'success',
      });
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

  return (
    <Container className="my-4">
      <Card className={`${styles.formContainer} p-4 shadow-lg rounded-lg`}>
        <Form>
          {currentStep === 1 && (
            <div>
              <Card.Title className={styles.cardTitle}>Mail Information</Card.Title>
              {[
                { label: 'Service', name: 'service', type: 'text' },
                { label: 'Article Type', name: 'articleType', type: 'text' },
                { label: 'Article Content', name: 'articlecontent', type: 'text' },
                { label: 'Created At', name: 'createdAt', type: 'date' },
                { label: 'Price', name: 'price', type: 'number' },
                { label: 'Weight', name: 'weight', type: 'number' },
                { label: 'Length', name: 'length', type: 'number' },
                { label: 'Height', name: 'height', type: 'number' },
                { label: 'Width', name: 'width', type: 'number' },
                { label: 'Value', name: 'value', type: 'number' },
                { label: 'Collection Date', name: 'collectiondate', type: 'date' },
                { label: 'Time', name: 'time', type: 'text' }
              ].map(({ label, name, type }) => (
                <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
                  <Form.Label className={styles.formLabel}>{label}</Form.Label>
                  <Form.Control
                    type={type}
                    name={name}
                    value={mailData[name]}
                    onChange={handleMailChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className={styles.formControl}
                  />
                </Form.Group>
              ))}
              <Button className={`${styles.buttonNext} mt-3`} onClick={handleNext}>Next</Button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <Card.Title className={styles.cardTitle}>Address Information</Card.Title>
              {[
                { label: 'Recipient\'s Name', name: 'toName', type: 'text' },
                { label: 'Address', name: 'toAddress', type: 'text' },
                { label: 'Country', name: 'toCountry', type: 'text' },
                { label: 'State', name: 'toState', type: 'text' },
                { label: 'City', name: 'toCity', type: 'text' },
                { label: 'Pincode', name: 'toPincode', type: 'text' }
              ].map(({ label, name, type }) => (
                <Form.Group className={styles.formGroup} controlId={`form${name}`} key={name}>
                  <Form.Label className={styles.formLabel}>{label}</Form.Label>
                  {name === 'toPincode' ? (
                    <Form.Control
                      as="select"
                      name="toPincode"
                      value={addressData.toPincode}
                      onChange={handleAddressChange}
                      className={styles.formControl}
                    >
                      <option value="">Select Pincode</option>
                      {pincodes.map((pincodeObj) => (
                        <option key={pincodeObj.pincode} value={pincodeObj.pincode}>
                          {pincodeObj.pincode} - {pincodeObj.postOfficeName}
                        </option>
                      ))}
                    </Form.Control>
                  ) : (
                    <Form.Control
                      type={type}
                      name={name}
                      value={addressData[name]}
                      onChange={handleAddressChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className={styles.formControl}
                    />
                  )}
                </Form.Group>
              ))}
              <Button className={`${styles.buttonSave} mt-3`} onClick={handleSaveAddress}>Save Address</Button>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <Card.Title className={styles.cardTitle}>Review and Submit</Card.Title>
              <h5>Mail Information:</h5>
              <ul>
                {Object.entries(mailData).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>
              <h5>Address Information:</h5>
              <ul>
                {Object.entries(addressData).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>
              <Button className={`${styles.buttonSubmit} mt-3`} onClick={handleSubmit}>Review and Proceed to Payment</Button>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
};

export default MailAddressForm;
