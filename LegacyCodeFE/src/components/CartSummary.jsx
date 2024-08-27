import React from 'react';
import '../CSS/CartSummary.css';
const CartSummary = ({ total, serviceCharge }) => (
    <>
        <tr>
            <td colSpan="3">Subtotal</td>
            <td>£{total}</td>
            <td></td>
        </tr>
        <tr>
            <td colSpan="3">Service Charge (7.25%)</td>
            <td>£{serviceCharge}</td>
            <td></td>
        </tr>
        <tr>
            <td colSpan="3">Total</td>
            <td>£{(total + parseFloat(serviceCharge)).toFixed(2)}</td>
            <td></td>
        </tr>
    </>
);

export default CartSummary;
