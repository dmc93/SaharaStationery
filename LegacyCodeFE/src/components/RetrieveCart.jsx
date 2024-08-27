import React from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';
import { useState } from 'react';

const RetrieveCart = ({ clearInput, inputValue, setInputValue }) => {
    const { setCart } = useCart(); 
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleRetrieve = async () => {
        try {
            console.log(`Requesting cart from URL: http://localhost:8083/cart/${inputValue}`);
            const response = await axios.get(`http://localhost:8083/cart/${inputValue}`);
            if (response.status === 200) {
                console.log(`Cart retrieved. Cart ID: ${inputValue}`);
                setCart(response.data);
                setAlertMessage('Cart successfully retrieved.');
                clearInput(); 
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="retrieve-cart-btn" onClick={handleRetrieve}>Retrieve Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default RetrieveCart;
