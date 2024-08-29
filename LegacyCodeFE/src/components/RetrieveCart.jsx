import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const RetrieveCart = ({ clearInput, inputValue, setInputValue, onRetrieve }) => {
    const { setCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedCartId = localStorage.getItem('cartId');
        if (savedCartId) {
            setInputValue(savedCartId);
        }
        const isLoaded = localStorage.getItem('isLoaded') === 'true';
        if (isLoaded) {
            // Optionally handle already loaded cart
        }
    }, [setInputValue]);

    const handleRetrieve = async () => {
        try {
            console.log(`Requesting cart from URL: http://localhost:8083/cart/${inputValue}`);
            const response = await axios.get(`http://localhost:8083/cart/${inputValue}`);
            if (response.status === 200) {
                const { items, status } = response.data;
                setCart(items);
                localStorage.setItem('cartId', inputValue);
                localStorage.setItem('isLoaded', 'true');

                if (status === 'Completed') {
                    setAlertMessage('Cart successfully retrieved and is completed.');
                    navigate(`/order-history?cartId=${inputValue}`); // Navigate to Order History with cartId
                } else {
                    setAlertMessage('Cart successfully retrieved.');
                }

                clearInput();
                if (onRetrieve) {
                    onRetrieve(items);
                }
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
