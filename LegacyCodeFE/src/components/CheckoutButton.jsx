import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function CheckoutButton() {
    const { cartItems, setCart, clearCart, isLoaded } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckout = async () => {
        try {
            let checkoutId = localStorage.getItem('cartId');

            if (!checkoutId) {
               
                const response = await axios.post('http://localhost:8083/cart/add', { items: cartItems, status: 'Completed' }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 201) {
                    checkoutId = response.data;
                    console.log(`Cart created with ID: ${checkoutId}`);
                    localStorage.setItem('cartId', checkoutId);
                    setCart(cartItems);
                } else {
                    setAlertMessage("Failed to create a new cart. Please try again.");
                    setShowAlert(true);
                    return;
                }
            }

            
            const response = await axios.patch(`http://localhost:8083/cart/update/${checkoutId}`, {
                status: "Completed"
            });

            if (response.status === 200) {
                if (!isLoaded) {
                   
                    setAlertMessage(`Checkout complete! Your new order ID is ${checkoutId}.`);
                } else {
                    setAlertMessage('Checkout complete!');
                }
                clearCart();
            } else {
                setAlertMessage("Failed to complete checkout. Please try again.");
            }
            setShowAlert(true);
        } catch (error) {
            console.error("Error during checkout:", error);
            setAlertMessage("An error occurred during checkout. Please try again.");
            setShowAlert(true);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
}

export default CheckoutButton;
