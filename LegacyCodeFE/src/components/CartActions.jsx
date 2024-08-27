import React, { useState } from 'react';
import SaveCartButton from './SaveCartButton';
import CheckoutButton from './CheckoutButton';
import RetrieveCart from './RetrieveCart';
import ClearCartButton from './ClearCartButton';
import '../CSS/CartActions.css';
import { useCart } from './CartContext'; // Import useCart

const CartActions = ({ onRetrieve }) => {
    const { clearCart } = useCart(); // Use useCart to get clearCart function
    const [inputValue, setInputValue] = useState(''); // State for the input field

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const clearAll = () => {
        // Clear the cart
        clearCart();

        // Clear the input field
        setInputValue('');
    };

    return (
        <>
            <div className="button-container">
                <SaveCartButton className="save-cart-btn" />
                <CheckoutButton className="checkout-btn" />
                <ClearCartButton className="clear-cart-btn" onClear={clearAll} />
            </div>
            <div className="retrieve-cart">
                <RetrieveCart onRetrieve={onRetrieve} />
            </div>
    
        </>
    );
};

export default CartActions;
