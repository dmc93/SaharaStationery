import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function SaveCartButton() {
    const { cartItems, newCart, setNewCart, clearCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSaveCart = async () => {
        try {
            const response = await axios.post('http://localhost:8083/cart/add', cartItems, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                const orderId = response.data;  
                console.log(orderId)
                setAlertMessage(`Cart successfully saved. Your order ID is ${orderId}.`);
                
                setNewCart(orderId);
            } else {
                setAlertMessage('Failed to save cart.');
            }
        } catch (error) {
            console.error('Error saving cart:', error);
            setAlertMessage('Failed to save cart.');
        }
        setShowAlert(true);
        clearCart();
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="save-cart-btn" onClick={handleSaveCart}>Save Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default SaveCartButton;
