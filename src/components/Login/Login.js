import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a GET request to check login credentials
      const response = await axios.get(`http://localhost:9999/Login/${email}/${password}`);
      
      if (response.status === 200) {
        // Extract the userId from the response data
        const { userId } = response.data;
  
        // Store only the userId in sessionStorage
        sessionStorage.setItem('userId', userId);
  
        // Navigate to the home page
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Redirect to registration page if user is not found
        navigate('/register');
      } else {
        alert('Login failed');
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-red-700"
          style={{
            backgroundImage: `url(https://t4.ftcdn.net/jpg/05/42/63/27/360_F_542632798_u9A5PploqHtAYzASlzm45nw5kyAJ5HSh.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center"></p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-red-700"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-red-700"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2 block"
            >
              
            </a>
          </div>
          <div className="mt-8">
            <button
              className="bg-red-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-red-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
             
              <span className="text-red-700 cursor-pointer" onClick={() => navigate('/register')}> register</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
