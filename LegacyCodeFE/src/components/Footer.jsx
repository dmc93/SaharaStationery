import React from 'react';
import '../CSS/Footer.css';



const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h4>Contact Us</h4>
                    <p>123 Stationery Lane<br />London, UK<br />SW1A 1AA</p>
                    <p>Phone: +44 20 7946 0958</p>
                </div>
                <div className="footer-right">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Sahara Stationery. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
