// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const PickupDashboard = () => {
//   const [mails, setMails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMails = async () => {
//       // Retrieve employee data from sessionStorage
//       const employeeData = sessionStorage.getItem('user');
      
//       // Parse the employee data
//       const employee = employeeData ? JSON.parse(employeeData) : null;
      
//       // Print session data to the console for debugging
//       console.log("Session Data:", sessionStorage);
//       console.log("Employee Data from Session:", employee);

//       // Check if employee data and empId are available
//       if (!employee || !employee.empId) {
//         console.error("Employee data or Employee ID not found in session.");
//         setError("Employee data or Employee ID not found in session.");
//         setLoading(false);
//         return;
//       }

//       const empId = employee.empId;

//       console.log("Fetched Employee ID from session:", empId);

//       try {
//         // Fetch mails data from API
//         const response = await axios.get(`http://localhost:9999/frommailsofemployee/${empId}`);
        
//         // Print fetched data to the console for debugging
//         console.log("Fetched Mails Data:", response.data);

//         // Update state with fetched data
//         setMails(response.data);
//       } catch (err) {
//         console.error("Failed to load data:", err);
//         setError("Failed to load data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMails();
//   }, []);
//   if (loading) {
//     return (
//       <Container className="mt-5 text-center">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={12}>
//           <h2 className="text-center">Pickup Dashboard</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Mail ID</th>
//                 <th>Username</th>
//                 <th>Address</th>
//                 <th>Phone Number</th>
//                 <th>Collection Date</th>
//                 <th>Collection Time</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mails.map((mail) => (
//                 <tr key={mail.mId}>
//                   <td>{mail.mId}</td>
//                   <td>{mail.user.firstName} {mail.user.lastName}</td>
//                   <td>{mail.address.toAddress}</td>
//                   <td>{mail.user.phoneNumber}</td>
//                   <td>{mail.collectiondate || 'N/A'}</td>
//                   <td>{mail.time}</td>
//                   <td>{mail.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PickupDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Table, Spinner, Alert, Button, Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const PickupDashboard = () => {
//   const [mails, setMails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMails = async () => {
//       const employeeData = sessionStorage.getItem('user');
//       const employee = employeeData ? JSON.parse(employeeData) : null;

//       if (!employee || !employee.empId) {
//         setError("Employee data or Employee ID not found in session.");
//         setLoading(false);
//         return;
//       }

//       const empId = employee.empId;

//       try {
//         const response = await axios.get(`http://localhost:9999/frommailsofemployee/${empId}`);
//         setMails(response.data);
//       } catch (err) {
//         setError("Failed to load data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMails();
//   }, []);

//   const updateStatus = async (mId, status) => {
//     try {
//       const response = await axios.post('http://localhost:9999/updateMailStatus', { mId, status });
//       if (response.data === "SUCCESS") {
//         setMails(prevMails =>
//           prevMails.map(mail => (mail.mId === mId ? { ...mail, status } : mail))
//         );
//       } else {
//         setError("Failed to update status.");
//       }
//     } catch (err) {
//       setError("Error updating status.");
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="mt-5 text-center">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={12}>
//           <h2 className="text-center">Pickup Dashboard</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Mail ID</th>
//                 <th>Username</th>
//                 <th>Address</th>
//                 <th>Phone Number</th>
//                 <th>Collection Date</th>
//                 <th>Collection Time</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mails.map((mail) => (
//                 <tr key={mail.mId}>
//                   <td>{mail.mId}</td>
//                   <td>{mail.user.firstName} {mail.user.lastName}</td>
//                   <td>{mail.address.toAddress}</td>
//                   <td>{mail.user.phoneNumber}</td>
//                   <td>{mail.collectiondate || 'N/A'}</td>
//                   <td>{mail.time}</td>
//                   <td>{mail.status}</td>
//                   <td>
//                     <Dropdown>
//                       <Dropdown.Toggle variant="success" id="dropdown-basic">
//                         Update Status
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                         {["Out for Pickup", "Pickup Success", "In Transit"].map((status) => (
//                           <Dropdown.Item key={status} onClick={() => updateStatus(mail.mId, status)}>
//                             {status}
//                           </Dropdown.Item>
//                         ))}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PickupDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Table, Spinner, Alert, Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import styles from './PickupDashboard.module.css';

// const PickupDashboard = () => {
//   const [mails, setMails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMails = async () => {
//       const employeeData = sessionStorage.getItem('user');
//       const employee = employeeData ? JSON.parse(employeeData) : null;

//       if (!employee || !employee.empId) {
//         setError("Employee data or Employee ID not found in session.");
//         setLoading(false);
//         return;
//       }

//       const empId = employee.empId;

//       try {
//         const response = await axios.get(`http://localhost:9999/frommailsofemployee/${empId}`);
//         setMails(response.data);
//       } catch (err) {
//         setError("Failed to load data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMails();
//   }, []);

//   const updateStatus = async (mId, status) => {
//     try {
//       const response = await axios.post('http://localhost:9999/updateMailStatus', { mId, status });
//       if (response.data === "SUCCESS") {
//         setMails(prevMails =>
//           prevMails.map(mail => (mail.mId === mId ? { ...mail, status } : mail))
//         );
//       } else {
//         setError("Failed to update status.");
//       }
//     } catch (err) {
//       setError("Error updating status.");
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="mt-5 text-center">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={12}>
//           <h2 className="text-center">Pickup Dashboard</h2>
//           <Table striped bordered hover className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Mail ID</th>
//                 <th>Username</th>
//                 <th>Address</th>
//                 <th>Phone Number</th>
//                 <th>Collection Date</th>
//                 <th>Collection Time</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mails.map((mail) => (
//                 <tr key={mail.mId}>
//                   <td>{mail.mId}</td>
//                   <td>{mail.user.firstName} {mail.user.lastName}</td>
//                   <td>{mail.address.toAddress}</td>
//                   <td>{mail.user.phoneNumber}</td>
//                   <td>{mail.collectiondate || 'N/A'}</td>
//                   <td>{mail.time}</td>
//                   <td>{mail.status}</td>
//                   <td>
//                     <Dropdown>
//                       <Dropdown.Toggle variant="success" id="dropdown-basic">
//                         Update Status
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                         {["Out for Pickup", "Pickup Success", "In Transit"].map((status) => (
//                           <Dropdown.Item key={status} onClick={() => updateStatus(mail.mId, status)}>
//                             {status}
//                           </Dropdown.Item>
//                         ))}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PickupDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Spinner, Alert, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './PickupDashboard.module.css';
import Swal from 'sweetalert2';

const PickupDashboard = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Retrieve employee ID directly from session storage
  const empId = sessionStorage.getItem('empId') ? sessionStorage.getItem('empId') : null;

  useEffect(() => {
    const fetchMails = async () => {
      if (!empId) {
        setError("Employee data or Employee ID not found in session.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:9999/frommailsofemployee/${empId}`);
        setMails(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, [empId]);

  const updateStatus = async (mId, status) => {
    try {
      const response = await axios.post('http://localhost:9999/updateMailStatus', { mId, status });
      if (response.data === "SUCCESS") {
        setMails(prevMails =>
          prevMails.map(mail => (mail.mId === mId ? { ...mail, status, updated: true } : mail))
        );

        // Show success alert
        Swal.fire({
          title: 'Status Updated!',
          text: `Mail ID ${mId} status changed to ${status}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        setError("Failed to update status.");
      }
    } catch (err) {
      setError("Error updating status.");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const getAvailableStatuses = (currentStatus) => {
    const statuses = ["Out for Pickup", "Pickup Success", "In Transit"];
    const index = statuses.indexOf(currentStatus);
    return index === -1 ? statuses : statuses.slice(index + 1);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-center">Pickup Dashboard</h2>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Mail ID</th>
                <th>Username</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Collection Date</th>
                <th>Collection Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mails.map((mail) => (
                <tr key={mail.mId}>
                  <td>{mail.mId}</td>
                  <td>{mail.user.firstName} {mail.user.lastName}</td>
                  <td>{mail.address.toAddress}</td>
                  <td>{mail.user.phoneNumber}</td>
                  <td>{mail.collectiondate || 'N/A'}</td>
                  <td>{mail.time}</td>
                  <td>{mail.status}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={mail.updated}>
                        Update Status
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {getAvailableStatuses(mail.status).map((status) => (
                          <Dropdown.Item key={status} onClick={() => updateStatus(mail.mId, status)}>
                            {status}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PickupDashboard;
