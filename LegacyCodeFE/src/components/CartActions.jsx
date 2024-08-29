import React, { useState } from 'react';
import SaveCartButton from './SaveCartButton';
import CheckoutButton from './CheckoutButton';
import RetrieveCart from './RetrieveCart';
import StartNewCart from './StartNewCart'; 
import '../CSS/CartActions.css';
import { useCart } from './CartContext';

const CartActions = () => {
    const { clearCart } = useCart();
    const [inputValue, setInputValue] = useState(''); 
    const [cartLoaded, setCartLoaded] = useState(false);  

    const handleCartRetrieve = () => {
        setCartLoaded(true);  
    };

    return (
        <>
            <div className="button-container">
                <SaveCartButton className="save-cart-btn" isUpdate={cartLoaded} /> 
                <CheckoutButton className="checkout-btn" />              
                <StartNewCart className="new-cart-btn" clearCart={clearCart} />
            </div>
            <div className="retrieve-cart">
                <RetrieveCart 
                    clearInput={() => setInputValue('')} 
                    onRetrieve={handleCartRetrieve} 
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>
        </>
    );
};

export default CartActions;
