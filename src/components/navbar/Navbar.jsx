import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in when the component mounts
        const user = sessionStorage.getItem('userId');
        setIsLoggedIn(!!user); // Set isLoggedIn based on the presence of user data
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleAuthDropdown = () => setAuthDropdownOpen(!authDropdownOpen);

    const handleLogout = () => {
        sessionStorage.clear();
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
                        alt="Logo"
                    />
                </a>
            </div>
            
            {/* Navigation Links */}
            <div className="navbar-nav">
                <a href="javascript:void(0)">About Us</a>
                <a href="">Performance Dashboard</a>
                
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
                            <a href="/addMail">Domestic</a>
                            <a href="javascript:void(0)">International</a>
                            <a href="javascript:void(0)">Premium</a>
                        </div>
                    )}
                </div>
                
                <a href="/PostLogin">Banking & Remittance</a>
            </div>
            
            {/* Conditional Rendering of Buttons */}
            <div className="navbar-auth">
                {isLoggedIn ? (
                    <>
                        <button
                            className="navbar-button"
                            onClick={() => navigate('/profile')}
                        >
                            <FontAwesomeIcon icon={faUser} /> Profile
                        </button>
                        <button
                            className="navbar-button"
                            onClick={() => navigate('/usermailview')}
                        >
                            Mail History
                        </button>
                        <button
                            className="navbar-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="auth-dropdown">
                        <FontAwesomeIcon
                            icon={faUser}
                            onClick={toggleAuthDropdown}
                            className="auth-icon"
                        />
                        {authDropdownOpen && (
                            <div className="auth-dropdown-menu">
                                <a href="/login">Login</a>
                                <a href="/PostLogin">Admin</a>
                                <a href="/emplogin">Employee</a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
