import React, { useState } from 'react';
import axios from 'axios';

const EmployeeRegistration = () => {
    const [employee, setEmployee] = useState({
        empName: '',
        empMobile: '',
        area: '',
        slot: '',
        deliverydate: '',
        deliverytime: '',
        empEmail: '',
        password: ''
    });

    // Function to retrieve pincode from local storage or context
    const getPincode = () => {
        // Example: retrieve from localStorage
        return sessionStorage.getItem('pincode');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve pincode from local storage
        const pincode = getPincode();

        // Create FormData object
        
        const formData = new FormData();
        formData.append('empName', employee.empName);
        formData.append('empMobile', employee.empMobile);
        formData.append('area', employee.area);
        formData.append('slot', employee.slot);
        formData.append('deliverydate', employee.deliverydate);
        formData.append('deliverytime', employee.deliverytime);
        formData.append('empEmail', employee.empEmail);
        formData.append('password', employee.password);
        formData.append('pincode', pincode);

        // Send FormData in POST request
        axios.post('http://localhost:9999/addEmp', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert('Employee added successfully');
                // Reset form or handle success as needed
                setEmployee({
                    empName: '',
                    empMobile: '',
                    area: '',
                    slot: '',
                    deliverydate: '',
                    deliverytime: '',
                    empEmail: '',
                    password: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the employee!', error);
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields remain the same */}
            <label>
                Employee Name:
                <input
                    type="text"
                    name="empName"
                    value={employee.empName}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Mobile Number:
                <input
                    type="number"
                    name="empMobile"
                    value={employee.empMobile}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Area:
                <input
                    type="text"
                    name="area"
                    value={employee.area}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Slot:
                <input
                    type="number"
                    name="slot"
                    value={employee.slot}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Delivery Date:
                <input
                    type="date"
                    name="deliverydate"
                    value={employee.deliverydate}
                    onChange={handleChange}
                    
                />
            </label>
            <br />
            <label>
                Delivery Time:
                <input
                    type="time"
                    name="deliverytime"
                    value={employee.deliverytime}
                    onChange={handleChange}
                    
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="empEmail"
                    value={employee.empEmail}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default EmployeeRegistration;
