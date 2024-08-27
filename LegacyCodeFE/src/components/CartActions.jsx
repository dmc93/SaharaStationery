import React, { useState } from 'react';
import SaveCartButton from './SaveCartButton';
import CheckoutButton from './CheckoutButton';
import RetrieveCart from './RetrieveCart';
import '../CSS/CartActions.css';


const CartActions = ({ onRetrieve }) => {
    


    return(
    <>
        <div className="button-container">
            <SaveCartButton className="save-cart-btn"/>
            <CheckoutButton className="checkout-btn"/>
        </div>
        <div className="retrieve-cart">
            <RetrieveCart onRetrieve={onRetrieve} />
        </div>
    </>
    )
};

export default CartActions;
