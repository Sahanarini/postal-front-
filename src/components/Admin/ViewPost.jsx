// src/components/PostOfficeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostOfficeList = () => {
    const [postOffices, setPostOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostOffices = async () => {
            try {
                const response = await axios.get('http://localhost:9999/getAllPostoffice');
                setPostOffices(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPostOffices();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Post Office List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Pincode</th>
                        <th>Post Office Name</th>
                        <th>Office Type</th>
                        <th>Location</th>
                        <th>Telephone</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {postOffices.map((postOffice) => (
                        <tr key={postOffice.pincode}>
                            <td>{postOffice.pincode}</td>
                            <td>{postOffice.postOfficeName}</td>
                            <td>{postOffice.officeType}</td>
                            <td>{postOffice.location}</td>
                            <td>{postOffice.telephone}</td>
                            <td>{postOffice.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostOfficeList;
