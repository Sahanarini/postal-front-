import React, { useState } from 'react';
import axios from 'axios';
import styles from './LocatePost.module.css'; // Ensure correct import

const LocatePost = () => {
    const [pincode, setPincode] = useState('');
    const [postOffice, setPostOffice] = useState(null);
    const [error, setError] = useState('');

    const fetchPostOffice = async (pincode) => {
        try {
            if (!pincode) {
                setError('Pincode is required');
                return;
            }

            // Construct the URL with the provided pincode
            const url = `http://localhost:9999/postoffice/${pincode}`;
            console.log(`Fetching data from URL: ${url}`); // Debug log

            // Make the request
            const response = await axios.get(url);
            
            // Check if response data is valid
            if (response.data) {
                setPostOffice(response.data);
                setError(''); // Clear any previous errors
            } else {
                setPostOffice(null);
                setError('No data found for the provided pincode');
            }
        } catch (error) {
            setPostOffice(null);
            setError('Error fetching post office data');
            console.error('Error fetching post office data:', error);
        }
    };

    const handleSearch = () => {
        fetchPostOffice(pincode);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Locate Post Office</h1>
            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleSearch} className={styles.button}>
                    Search
                </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {postOffice && (
                <div className={styles.detailsBox}>
                    <h2>Post Office Details</h2>
                    <p><strong>Name:</strong> {postOffice.postOfficeName}</p>
                    <p><strong>Type:</strong> {postOffice.officeType}</p>
                    <p><strong>Location:</strong> {postOffice.location}</p>
                    <p><strong>City:</strong> {postOffice.city}</p>
                    <p><strong>State:</strong> {postOffice.state}</p>
                    <p><strong>Telephone:</strong> {postOffice.telephone}</p>
                </div>
            )}
        </div>
    );
};

export default LocatePost;
