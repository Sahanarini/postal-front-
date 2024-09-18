import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:9999/getuser/${userId}`);
        const userData = response.data;
        
        // Set user data to state
        setUser(userData);
        
        // Set form data from fetched user data
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          address: userData.address || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          country: userData.country || '',
          state: userData.state || '',
          city: userData.city || '',
          pincode: userData.pincode || '',
        });

        // Store user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setError(`Error fetching user data: ${error.response ? error.response.data.message : error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const parsedUser = JSON.parse(sessionUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:9999/userUpdate/${userId}`, formData);
      sessionStorage.setItem('user', JSON.stringify(formData));
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Error updating user data. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user); // Reset form data to user state
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <h4 className="text-gray-800 text-base font-semibold mt-6">
          {isEditing ? 'Edit Your Profile' : 'Your Profile'}
        </h4>
      </div>

      {user ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-8">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label className="text-gray-800 text-sm mb-2 block capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                {isEditing ? (
                  <input
                    type={key === 'email' ? 'email' : key === 'phoneNumber' ? 'tel' : 'text'}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    required
                  />
                ) : (
                  <span className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md block">
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="!mt-12">
            {isEditing ? (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
