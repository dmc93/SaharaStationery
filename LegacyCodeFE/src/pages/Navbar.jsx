import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

// import Security pages
import UserService from '../security/UserService';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
// Security related coding
const isAuthenticated = UserService.isAuthenticated();
const isAdmin = UserService.isAdmin();

useEffect(() => {
    console.log("User Admin is: " + isAdmin); // Pass the userId to fetchUserDataById
  }, [isOpen]); //wheen ever there is a chane in userId, run this

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout?');
        if (confirmDelete) {
            UserService.logout();
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
