import React, { useState } from 'react';
import SaveCartButton from './SaveCartButton';
import CheckoutButton from './CheckoutButton';
import RetrieveCart from './RetrieveCart';
import ClearCartButton from './ClearCartButton';
import '../CSS/CartActions.css';
import { useCart } from './CartContext';

const CartActions = () => {
    const { clearCart } = useCart(); 
    const [inputValue, setInputValue] = useState(''); 

 
    const clearAll = () => {
        clearCart();
        setInputValue(''); 
    };

    return (
        <>
            <div className="button-container">
                <SaveCartButton className="save-cart-btn" />
                <CheckoutButton className="checkout-btn" />
                <ClearCartButton className="clear-cart-btn" onClear={clearAll} />
            </div>
            <div className="retrieve-cart">
                <RetrieveCart 
                    clearInput={() => setInputValue('')} 
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>
        </>
    );
};

export default CartActions;
