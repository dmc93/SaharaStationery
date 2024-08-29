import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartNewCart = ({ clearCart, className }) => {
    const navigate = useNavigate();

    const handleClearCart = () => {
        localStorage.removeItem('cartId');
        localStorage.removeItem('cartStatus');
        localStorage.removeItem('isLoaded');

        clearCart();
        navigate('/shop');
    };

    return (
        <div className="start-new-cart">
            <button className={className} onClick={handleClearCart}>Start a New Cart</button>
        </div>
    );
};

export default StartNewCart;
