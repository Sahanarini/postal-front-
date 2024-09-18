import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 // Ensure this path is correct
 import './Adminnav.css';


function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in when the component mounts
        const user = sessionStorage.getItem('user');
        setIsLoggedIn(!!user); // Set isLoggedIn based on the presence of user data
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setIsLoggedIn(false); // Update the state
        navigate('/'); // Redirect to the home page or login page
    };

    return (
        <nav className="navbar navbar-fixed">
            {/* Logo on the left */}
            <div className="navbar-logo">
                <a href="javascript:void(0)">
                    <img
                        src="logo3.png" // Update to your logo path
                        className="img-thumbnail"
                        style={{ width: '250px', height: '40px' }}
                        alt="Logo"
                    />
                </a>
            </div>
            
            {/* Navigation Links */}
            <div className="navbar-nav">
                <a href="javascript:void(0)">About Us</a>
                <a href="javascript:void(0)">Performance Dashboard</a>
                
                {/* Dropdown Menu */}
                <div className="navbar-dropdown">
                    <a
                        className="dropdown-toggle"
                        href="javascript:void(0)"
                        onClick={toggleDropdown}
                    >
                        Mails & Stamps
                    </a>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="javascript:void(0)">Item 1</a>
                            <a href="javascript:void(0)">Item 2</a>
                            <a href="javascript:void(0)">Item 3</a>
                        </div>
                    )}
                </div>
                
                <a href="/addpostofficehead">Add Postoffice</a>
            </div>
            
            {/* Conditional Rendering of Buttons */}
            <div className="navbar-auth">
                {isLoggedIn ? (
                    <>
                        <button
                            className="navbar-button"
                            onClick={() => navigate('/profile')}
                        >
                            <i className="fa-solid fa-user"></i> Profile
                        </button>
                        <button
                            className="navbar-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <a href="/login" className="navbar-button">Login</a>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
