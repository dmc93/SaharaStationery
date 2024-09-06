import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

// import Security pages
import UserService from '../security/UserService';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

    // UseEffect to track changes in authentication status via localStorage
    useEffect(() => {
        const checkAuthStatus = () => {
            setIsAuthenticated(UserService.isAuthenticated());
            setIsAdmin(UserService.isAdmin());
        };

        // Listen for changes in localStorage to detect login/logout
        const handleStorageChange = () => {
            checkAuthStatus();
        };

        // Listen for localStorage changes (triggered by login/logout)
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array ensures this runs only on mount/unmount

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            UserService.logout();
            setIsAuthenticated(false); // Update state immediately after logout
            setIsAdmin(false); // Reset admin status

            // This will trigger `storage` event to update the navbar across components
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="site-title">Sahara Stationery</h1>
                <div
                    className="menu-toggle"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span>Menu</span>
                </div>
                <ul
                    className={`nav ${isOpen ? 'active' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {!isAuthenticated && <li className="nav-item">
                        <Link to="/">Login</Link>
                    </li>}
                    {isAuthenticated && <li className="nav-item">
                        <Link to="/home">Home</Link>
                    </li>}
                    {isAuthenticated && <li className="nav-item">
                        <Link to="/shop">Shop</Link>
                    </li>}
                    {isAuthenticated && <li className="nav-item">
                        <Link to="/cart">Cart</Link>
                    </li>}
                    {isAdmin && <li className="nav-item">
                        <Link to="/product">Product</Link>
                    </li>}
                    {isAdmin && <li className="nav-item">
                        <Link to="/user-management">User</Link>
                    </li>}
                    {isAuthenticated && <li className="nav-item">
                        <Link to="/chat">Chat with AI</Link>
                    </li>}
                    {isAuthenticated && <li className="nav-item">
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
