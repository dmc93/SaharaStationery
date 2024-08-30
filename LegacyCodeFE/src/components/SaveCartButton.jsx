import React from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';
import CartSummary from './CartSummary';

function SaveCartButton() {
    const { cartItems, clearCart, isLoaded } = useCart();
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

 
    const { discountCode, discountPercentage } = useCart();

    const handleSaveCart = async () => {
        if (cartItems.length === 0) {
            setAlertMessage('No items in the cart to save.');
            setShowAlert(true);
            return;
        }

        try {
            const cartId = localStorage.getItem('cartId');

            const cartPayload = {
                items: cartItems,
                status: isLoaded ? 'in progress' : 'in progress',
                discountCode: discountCode || '', 
                discountPercentage: discountPercentage || 0 
            };

            let response;
            if (isLoaded && cartId) {
                response = await axios.patch(`http://localhost:8083/cart/update/${cartId}`, cartPayload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.status === 200) {
                    setAlertMessage('Cart successfully updated.');
                } else {
                    setAlertMessage('Failed to update cart.');
                }
            } else {
                response = await axios.post('http://localhost:8083/cart/add', cartPayload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.status === 201) {
                    const newCartId = response.data;
                    localStorage.setItem('cartId', newCartId);
                    setAlertMessage(`Cart successfully saved. Your order ID is ${newCartId}.`);
                } else {
                    setAlertMessage('Failed to save cart.');
                }
            }

            clearCart();
            setShowAlert(true);
        } catch (error) {
            console.error(`Error ${isLoaded ? 'updating' : 'saving'} cart:`, error);
            setAlertMessage(`Failed to ${isLoaded ? 'update' : 'save'} cart.`);
            setShowAlert(true);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="save-cart-btn" onClick={handleSaveCart}>
                {isLoaded ? 'Update Cart' : 'Save Cart'}
            </button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
}

export default SaveCartButton;
