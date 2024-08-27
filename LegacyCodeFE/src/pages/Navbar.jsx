import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
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
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
