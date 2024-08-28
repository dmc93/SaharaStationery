import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function CheckoutButton() {
    const { cartItems, setCart, clearCart, isLoaded } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckout = async () => {
        if (!isLoaded) {
            console.log("Cart is not loaded");
            setAlertMessage("Cart is not loaded properly.");
            setShowAlert(true);
            return;
        }

        try {
            let checkoutId = localStorage.getItem('cartId');

            if (!checkoutId) {
                console.log("No existing cart ID, creating a new cart...");
                const response = await axios.post('http://localhost:8083/cart/add', cartItems, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 201) {
                    checkoutId = response.data;
                    console.log(`Cart created with ID: ${checkoutId}`);
                    localStorage.setItem('cartId', checkoutId);
                    setCart(cartItems); 
                } else {
                    console.log("Failed to create a new cart");
                    setAlertMessage("Failed to create a new cart. Please try again.");
                    setShowAlert(true);
                    return;
                }
            }

            console.log(`Updating cart status to "Completed" for ID: ${checkoutId}`);
            const response = await axios.patch(`http://localhost:8083/cart/update/${checkoutId}`, {
                status: "Completed"
            });

            if (response.status === 200) {
                console.log('Cart status updated to "Completed"');
                setAlertMessage('Checkout complete!');
                clearCart();
            } else {
                console.log("Failed to update cart status");
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
