import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Spinner, Alert, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './Delivery.module.css';

const Delivery = () => {
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
        const response = await axios.get(`http://localhost:9999/tomailsofemployee/${empId}`);
        setMails(response.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, [empId]);

  const updateStatus = async (mId, newStatus) => {
    try {
      const payload = { mId, status: newStatus };
      const response = await axios.post("http://localhost:9999/updateMailStatus", payload);
      if (response.data === "SUCCESS") {
        setMails(mails.map(mail =>
          mail.mId === mId ? { ...mail, status: newStatus, updated: true } : mail
        ));

        // Show success alert
        Swal.fire({
          title: 'Status Updated!',
          text: `Mail ID ${mId} status changed to ${newStatus}`,
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

  const getAvailableStatuses = (currentStatus) => {
    const statuses = ["Package Received", "Out for Delivery", "Delivered"];
    const index = statuses.indexOf(currentStatus);
    return index === -1 ? ["Package Received"] : statuses.slice(index + 1);
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

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-center">Delivery Dashboard</h2>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Mail ID</th>
                <th>Sender Name</th>
                <th>User Pincode</th>
                <th>To Name</th>
                <th>To Address</th>
                <th>To Phone Number</th>
                <th>To Pincode</th>
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
                  <td>{mail.address.toName}</td> {/* To Name */}
                  <td>{mail.address.toAddress}</td> {/* To Address */}
                  <td>{mail.address.toMobile || mail.user.phoneNumber}</td> {/* To Phone Number */}
                  <td>{mail.address.toPincode}</td> {/* To Pincode */}
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
                    {mail.updated && <span className="text-muted">Status Updated</span>}
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

export default Delivery;
