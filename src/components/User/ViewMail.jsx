import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserMailView.module.css'; // Import the CSS module
import Swal from 'sweetalert2'; // Import SweetAlert

const UserMailView = () => {
    const [mails, setMails] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId'); // Get user ID from session storage

        if (!userId) {
            setError('No user ID found in session storage');
            setLoading(false);
            return;
        }

        const fetchMails = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/getallusermail/${userId}`);
                setMails(response.data);
            } catch (error) {
                setError('Error fetching mail data');
                console.error('Error fetching mail data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMails();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.tableContainer}>
            <h1 className="text-center text-2xl font-semibold mb-6">User Mails</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>mId</th>
                        <th>Service</th>
                        <th>Price</th>
                        <th>Created Date</th>
                        <th>To Address</th>
                        <th>To Pincode</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mails.map((mail) => (
                        <tr key={mail.mId}>
                            <td>{mail.mId}</td>
                            <td>{mail.service}</td>
                            <td>{mail.price}</td>
                            <td>{mail.createdAt}</td>
                            <td>{mail.address.toAddress}</td>
                            <td>{mail.address.toPincode}</td>
                            <td>{mail.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserMailView;
