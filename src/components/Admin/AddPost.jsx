import React, { useState } from 'react';
import axios from 'axios';

const AddPostOfficeHeadForm = () => {
    // Initialize form state
    const [formData, setFormData] = useState({
        pincode: '',
        postOfficeName: '',
        officeType: '',
        location: '',
        telephone: '',
        role: '',
        password: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9999/addPo', formData);
            if (response.status === 200) {
                alert('Post Office Head added successfully!');
                // Clear form after successful submission
                setFormData({
                    pincode: '',
                    postOfficeName: '',
                    officeType: '',
                    location: '',
                    telephone: '',
                    role: '',
                    password: ''
                });
            }
        } catch (error) {
            console.error('Error adding Post Office Head:', error);
            alert('Failed to add Post Office Head.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <div className="text-center mb-16">
                <h4 className="text-gray-800 text-base font-semibold mt-6">Add New Post Office Head</h4>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Pincode</label>
                        <input
                            type="number"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter pincode"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Post Office Name</label>
                        <input
                            type="text"
                            name="postOfficeName"
                            value={formData.postOfficeName}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter post office name"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Office Type</label>
                        <input
                            type="text"
                            name="officeType"
                            value={formData.officeType}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter office type"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Telephone</label>
                        <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter telephone"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter role"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-white border border-gray-300 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <button
                        type="submit"
                        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPostOfficeHeadForm;
