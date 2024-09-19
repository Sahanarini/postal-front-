import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmployeeRegistration = () => {
    const [employee, setEmployee] = useState({
        empName: '',
        empMobile: '',
        area: '',
        empEmail: '',
        password: ''
    });

    const getPincode = () => {
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

        const pincode = getPincode();

        const formData = new FormData();
        formData.append('empName', employee.empName);
        formData.append('empMobile', employee.empMobile);
        formData.append('area', employee.area);
        formData.append('empEmail', employee.empEmail);
        formData.append('password', employee.password);
        formData.append('pincode', pincode);
        formData.append('slot', 1);
        formData.append('deliverydate', '2024-10-20');
        formData.append('deliverytime', '10:44:00.000000');

        axios.post('http://localhost:9999/addEmp', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setEmployee({
                    empName: '',
                    empMobile: '',
                    area: '',
                    empEmail: '',
                    password: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the employee!', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding the employee.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const labelStyle = {
        marginBottom: '8px',
        fontWeight: 'bold'
    };

    const inputStyle = {
        marginBottom: '16px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <label style={labelStyle}>
                Employee Name:
                <input
                    type="text"
                    name="empName"
                    value={employee.empName}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Mobile Number:
                <input
                    type="number"
                    name="empMobile"
                    value={employee.empMobile}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Area:
                <input
                    type="text"
                    name="area"
                    value={employee.area}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Email:
                <input
                    type="email"
                    name="empEmail"
                    value={employee.empEmail}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Password:
                <input
                    type="password"
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </label>
            <button type="submit" style={buttonStyle}>Add Employee</button>
        </form>
    );
};

export default EmployeeRegistration;


