import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function CheckoutButton() {
    const { cartItems, clearCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckout = async () => {
        try {
            let checkoutId = localStorage.getItem('cartId');
            let isInsufficient = false;
            let updatePromises = [];

                    const cartItemsWithStringIds = cartItems.map(item => ({
                ...item,
                id: String(item.id)
            }));

          
            const itemIds = cartItemsWithStringIds.map(item => item.id);
            const itemResponse = await axios.post('http://localhost:8082/items/getByIds', itemIds, {
                headers: { 'Content-Type': 'application/json' }
            });

            const itemDataList = itemResponse.data.map(item => ({
                ...item,
                id: String(item.id)
            }));

            for (let item of cartItemsWithStringIds) {
                const itemData = itemDataList.find(data => data.id === item.id);
                if (itemData) {
                    const newQuantity = itemData.quantity - item.quantity;
                    if (newQuantity < 0) {
                        setAlertMessage(`Insufficient quantity for item ${item.name}`);
                        setShowAlert(true);
                        isInsufficient = true;
                        break;
                    }
                    updatePromises.push({
                        id: item.id,
                        quantity: newQuantity
                    });
                }
            }

            if (isInsufficient) {
                return;
            }

            if (!checkoutId) {
               
                const response = await axios.post('http://localhost:8083/cart/add', {
                    items: cartItemsWithStringIds,
                    status: 'Completed'
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 201) {
                    checkoutId = response.data;
                    localStorage.setItem('checkoutID', checkoutId); 
                    localStorage.removeItem('retrievedID'); 
                } else {
                    setAlertMessage("Failed to create a new cart. Please try again.");
                    setShowAlert(true);
                    return;
                }
            } else {
              
                localStorage.setItem('retrievedID', checkoutId);
                localStorage.removeItem('checkoutID'); 
            }

           
            const statusResponse = await axios.patch(`http://localhost:8083/cart/update/${checkoutId}`, {
                status: "Completed"
            });

            if (statusResponse.status === 200) {
               
                if (updatePromises.length > 0) {
                    const updatePromisesQuantity = updatePromises.map(item =>
                        axios.patch(`http://localhost:8082/item/update/${item.id}`, { quantity: item.quantity })
                    );

                    try {
                        await Promise.all(updatePromisesQuantity);
                    } catch (error) {
                        setAlertMessage('Failed to update item quantities. Please try again.');
                        setShowAlert(true);
                        return;
                    }
                }

             
                if (localStorage.getItem('checkoutID')) {
                  
                    setAlertMessage(`Checkout complete! Your order ID is ${localStorage.getItem('checkoutID')}`);
                } else if (localStorage.getItem('retrievedID')) {
                   
                    setAlertMessage('Checkout complete!');
                }

              
                clearCart();
                localStorage.removeItem('cartId');
            } else {
                setAlertMessage("Failed to complete checkout. Please try again.");
            }

            setShowAlert(true);
        } catch (error) {
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
