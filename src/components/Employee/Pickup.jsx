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
  const empId = sessionStorage.getItem('empId') || null;

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
                <th>User Pincode</th>
                <th>User Phone Number</th>
                <th>Address</th>
                <th>Collection Date</th>
                <th>Collection Time</th>
                <th>Address Pincode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mails.map((mail) => (
                <tr key={mail.mId}>
                  <td>{mail.mId}</td>
                  <td>{mail.user.firstName} {mail.user.lastName}</td>
                  <td>{mail.user.pincode}</td> {/* User Pincode */}
                  <td>{mail.user.phoneNumber}</td>
                  <td>{mail.address.toAddress}</td>
                  <td>{mail.collectiondate || 'N/A'}</td>
                  <td>{mail.time}</td>
                  <td>{mail.address.toPincode}</td> {/* Address Pincode */}
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
