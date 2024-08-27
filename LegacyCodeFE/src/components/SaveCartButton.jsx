import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext'; 

function SaveCartButton({ isUpdate }) { 
    const { cartItems, clearCart } = useCart(); 
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
                setAlertMessage(`Cart successfully ${isUpdate ? 'updated' : 'saved'}. Your order ID is ${orderId}.`);
                clearCart();
            } else {
                setAlertMessage(`Failed to ${isUpdate ? 'update' : 'save'} cart.`);
            }
        } catch (error) {
            console.error(`Error ${isUpdate ? 'updating' : 'saving'} cart:`, error);
            setAlertMessage(`Failed to ${isUpdate ? 'update' : 'save'} cart.`);
        }
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="save-cart-btn" onClick={handleSaveCart}>
                {isUpdate ? 'Update Cart' : 'Save Cart'}
            </button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
}

export default SaveCartButton;
