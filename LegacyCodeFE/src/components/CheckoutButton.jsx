import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function CheckoutButton() {
    const { cartItems, newCart, setNewCart, clearCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckout = async () => {
        let checkoutId = newCart; // Start with the value of newCart
        console.log(`Initial checkoutId: ${checkoutId}`); // Debugging

        try {
            if (checkoutId === null) {
                console.log("No existing cart ID, creating a new cart..."); // Debugging
                // Create a new cart if none exists
                const response = await axios.post('http://localhost:8083/cart/add', cartItems, {
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (response.status === 201) {
                    console.log(`Cart created with ID: ${response.data}`);
                    checkoutId = response.data; // Update checkoutId with the newly created cart's ID
                    setNewCart(checkoutId); // Store the new cart ID in state
                } else {
                    console.log("Something went wrong creating your cart");
                    return; // Exit if there's an error creating the cart
                }
            } else {
                console.log(`Using existing cart ID: ${checkoutId}`);
            }

            // Fetch all item data
            const itemDataList = await fetchAllItems(cartItems.map(item => item.id));

            let allItemsAvailable = true;
            let insufficientItems = [];

            // Check item quantities
            for (let item of cartItems) {
                console.log('Checking item id:', item.id);
                const itemStockLevel = itemDataList.find(data => data.id === item.id);
                if (itemStockLevel && itemStockLevel.quantity < item.quantity) {
                    allItemsAvailable = false;
                    insufficientItems.push(item.name);
                }
                console.log('Check for item complete');
            }

            if (allItemsAvailable) {
                console.log('All items available');
                // Update item quantities and order status
                await batchUpdateItemsAndCart(itemDataList, checkoutId, cartItems);
                setAlertMessage('Checkout complete!');
                clearCart(); // Clear the cart after successful checkout
            } else {
                // Notify user about insufficient items
                setAlertMessage(`The following items have insufficient quantities: ${insufficientItems.join(", ")}`);
            }
            setShowAlert(true);
        } catch (error) {
            console.error("Error during checkout:", error); // Improved error logging
            setAlertMessage("An error occurred during checkout. Please try again.");
            setShowAlert(true);
        }
    };

    const fetchAllItems = async (itemIds) => {
        try {
            console.log('Fetching item data...');
            const response = await axios.post('http://localhost:8082/items/getByIds', itemIds);
            console.log('Fetch complete:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch items:', error);
            return [];
        }
    };

    const batchUpdateItemsAndCart = async (itemDataList, checkoutId, cartItems) => {
        try {
            console.log('Batch updating items and cart...');
            for (let item of cartItems) {
                const itemStockLevel = itemDataList.find(data => data.id === item.id);
                if (itemStockLevel) {
                    const newStockLevel = itemStockLevel.quantity - item.quantity;
                    await axios.patch(`http://localhost:8082/item/update/${item.id}`, { quantity: newStockLevel });
                }
            }
        } catch (error) {
            console.error('Failed to update items in the cart:', error);
            throw error;
        }

        try {
            const response = await axios.patch(`http://localhost:8083/cart/update/${checkoutId}`, {
                status: "Completed",
            });
            if (response.status === 200) {
                console.log('Order status updated');
            } else {
                console.log("Something went wrong updating order status");
            }
        } catch (error) {
            console.error('Error during order status update:', error);
            setAlertMessage('Failed to complete checkout.');
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
