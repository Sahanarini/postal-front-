import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        password: '',
        country: '',
        state: '',
        city: '',
        pincode: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        const { firstName, lastName, address, email, phoneNumber, password, country, state, city, pincode } = user;

        if (!firstName || !lastName || !address || !email || !phoneNumber || !password || !country || !state || !city || !pincode) {
            return "All fields must be filled.";
        }

        if (!/^\d{6}$/.test(pincode)) {
            return "Pincode must be exactly 6 digits.";
        }

        if (!/^\d+$/.test(phoneNumber)) {
            return "Phone number must contain only numbers.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Email is not valid.";
        }

        if (password.length < 8 || !/\d/.test(password)) {
            return "Password must be at least 8 characters long and contain at least one number.";
        }

        return null; // No errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();

        if (validationError) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: validationError,
            });
            return;
        }

        axios.post('http://localhost:9999/addUser', user)
            .then(response => {
                console.log('User registered successfully:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User registered successfully!',
                }).then(() => {
                    navigate('/login'); // Redirect to login page
                });
                setUser({
                    firstName: '',
                    lastName: '',
                    address: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    country: '',
                    state: '',
                    city: '',
                    pincode: ''
                }); // Reset form
            })
            .catch(error => {
                console.error('There was an error registering the user!', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error registering the user.',
                });
            });
    };

    return (
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
            <div className="text-center mb-16">
                <h4 className="text-gray-800 text-base font-semibold mt-6">Registration</h4>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter first name"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter last name"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter address"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={user.country}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter country"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">State</label>
                        <input
                            type="text"
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter state"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">City</label>
                        <input
                            type="text"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter city"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={user.pincode}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter pincode"
                        />
                    </div>
                </div>

                <div className="!mt-12">
                    <button
                        type="submit"
                        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
