import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MailsView.module.css'; // Import the CSS module
import Swal from 'sweetalert2'; // Import SweetAlert for notifications

const MailsView1 = () => {
    const [mails, setMails] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    // Retrieve pincode from session storage
    const toPincode = sessionStorage.getItem('pincode');

    useEffect(() => {
        if (!toPincode) {
            setError('No destination pincode found in session storage');
            setLoading(false);
            return;
        }

        const fetchMails = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/tomails/${toPincode}`);
                console.log('Fetched mails:', response.data); // Log the data
                setMails(response.data);
            } catch (error) {
                setError('Error fetching mail data');
                console.error('Error fetching mail data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/getAllEmployeebypincode/${toPincode}`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchMails();
        fetchEmployees();
    }, [toPincode]);

    const handleAssignEmployee = (mail) => {
        setSelectedMail(mail);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMail(null);
        setSelectedEmployee('');
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const handleAssign = async () => {
        try {
            await axios.post(`http://localhost:9999/mails/assign/${selectedMail.mId}`, { empId: selectedEmployee });
            Swal.fire('Success', 'Employee assigned successfully', 'success');
            setMails(mails.map(mail => 
                mail.mId === selectedMail.mId ? { ...mail, assignedEmployee: employees.find(emp => emp.empId === selectedEmployee) } : mail
            ));
            handleModalClose();
        } catch (error) {
            console.error('Error assigning employee:', error);
            Swal.fire('Error', 'Failed to assign employee', 'error');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.tableContainer}>
            <h1 className="text-center text-2xl font-semibold mb-6">Mails List (Pincode: {toPincode})</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>mId</th>
                        <th>Service</th>
                        <th>Article Type</th>
                        <th>Username</th>
                        <th>Phone Number</th>
                        <th>To Name</th>
                        <th>To Phone Number</th>
                        <th>Staff</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mails.map((mail) => (
                        <tr key={mail.mId}>
                            <td>{mail.mId}</td>
                            <td>{mail.service}</td>
                            <td>{mail.articleType}</td>
                            <td>{mail.user.firstName} {mail.user.lastName}</td>
                            <td>{mail.user.phoneNumber}</td>
                            <td>{mail.address.toName}</td>
                            <td>{mail.address.toMobile}</td>
                            <td>
                                {mail.assignedEmployee ? (
                                    <span>{mail.assignedEmployee.empName}</span>
                                ) : (
                                    <button className={styles.assignButton} onClick={() => handleAssignEmployee(mail)}>
                                        Assign Employee
                                    </button>
                                )}
                            </td>
                            <td>{mail.status}</td>
                            <td>
                                <button className={styles.actionButton}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleModalClose}>&times;</span>
                        <h2>Assign Employee</h2>
                        <p><strong>Mail ID:</strong> {selectedMail.mId}</p>
                        <label htmlFor="employee">Select Employee:</label>
                        <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange}>
                            <option value="">--Select Employee--</option>
                            {employees.map(employee => (
                                <option key={employee.empId} value={employee.empId}>
                                    {employee.empName}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAssign} className={styles.assignButton}>Assign</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MailsView1;
