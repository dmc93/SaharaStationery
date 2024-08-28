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

         
            console.log('Fetched item data:', itemDataList);
            console.log('Cart items:', cartItemsWithStringIds);

          
            for (let item of cartItemsWithStringIds) {
                const itemData = itemDataList.find(data => data.id === item.id);
                console.log(`Processing item ID ${item.id}:`, itemData);
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

            console.log('Update promises before checking insufficiency:', updatePromises);

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
                    console.log(`Cart created with ID: ${checkoutId}`);
                    localStorage.setItem('cartId', checkoutId);
                } else {
                    setAlertMessage("Failed to create a new cart. Please try again.");
                    setShowAlert(true);
                    return;
                }
            }

          
            const statusResponse = await axios.patch(`http://localhost:8083/cart/update/${checkoutId}`, {
                status: "Completed"
            });

            if (statusResponse.status === 200) {
                console.log('Cart status updated to Completed');

               
                if (updatePromises.length > 0) {
                    console.log('Item quantity updates:', updatePromises);
                    const updatePromisesQuantity = updatePromises.map(item =>
                        axios.patch(`http://localhost:8082/item/update/${item.id}`, { quantity: item.quantity })
                    );

                    try {
                        await Promise.all(updatePromisesQuantity);
                        console.log('Item quantities updated successfully');
                    } catch (error) {
                        console.error('Error during item quantity update:', error);
                        setAlertMessage('Failed to update item quantities. Please try again.');
                        setShowAlert(true);
                    }
                } else {
                    console.log('No item quantity updates to process');
                }

                setAlertMessage(`Checkout complete! Your order ID is ${checkoutId}`);
                clearCart();
                localStorage.removeItem('cartId'); 
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
