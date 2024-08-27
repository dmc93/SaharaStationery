import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

const RetrieveCart = () => {
    const { setCart } = useCart(); 
    const [cartId, setCartId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleRetrieve = async () => {
        try {
            console.log(`Requesting cart from URL: http://localhost:8083/cart/${cartId}`);
            const response = await axios.get(`http://localhost:8083/cart/${cartId}`);
            if (response.status === 200) {
                console.log(`Cart retrieved. Cart ID: ${cartId}`);
                setCart(response.data);
                setAlertMessage('Cart successfully retrieved.');
            } else {
                setAlertMessage('Failed to retrieve cart.');
            }
        } catch (error) {
            console.error('Error retrieving cart:', error);
            setAlertMessage('Failed to retrieve cart.');
        }
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="retrieve-cart">
            <input
                type="text"
                placeholder="Enter Cart ID"
                value={cartId}
                onChange={(e) => {
                    setCartId(e.target.value);
                    console.log(`Cart ID set to: ${e.target.value}`);
                }}
            />
            <button className="retrieve-cart-btn" onClick={handleRetrieve}>Retrieve Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default RetrieveCart;
