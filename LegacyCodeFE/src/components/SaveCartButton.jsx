import React from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function SaveCartButton() {
    const { cartItems, clearCart, isLoaded } = useCart();
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

    const handleSaveCart = async () => {
        try {
            const cartId = localStorage.getItem('cartId'); 

            const cartPayload = {
                items: cartItems, 
                status: 'updated' 
            };

            let response;
            if (isLoaded && cartId) {
               
                response = await axios.patch(`http://localhost:8083/cart/update/${cartId}`, cartPayload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
             
                response = await axios.post('http://localhost:8083/cart/add', cartItems, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (response.status === (isLoaded ? 200 : 201)) {
          
                const orderId = response.data;
                if (isLoaded) {
                  
                    setAlertMessage('Cart successfully updated.');
                } else {
                   
                    setAlertMessage(`Cart successfully saved. Your order ID is ${orderId}.`);
                }
                clearCart(); 
            } else {
                setAlertMessage(`Failed to ${isLoaded ? 'update' : 'save'} cart.`);
            }
        } catch (error) {
            console.error(`Error ${isLoaded ? 'updating' : 'saving'} cart:`, error);
            setAlertMessage(`Failed to ${isLoaded ? 'update' : 'save'} cart.`);
        }
        setShowAlert(true);
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
