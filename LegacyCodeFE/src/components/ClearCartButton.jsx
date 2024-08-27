import React from 'react';
import { useCart } from './CartContext';
import '../CSS/CartActions.css';

const ClearCartButton = ({ onClear }) => {
    const { clearCart } = useCart();

    const handleClearCart = () => {
        clearCart();
        if (onClear) {
            onClear(); // Call the onClear function to clear additional fields
        }
    };

    return (
        <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
        </button>
    );
};

export default ClearCartButton;
