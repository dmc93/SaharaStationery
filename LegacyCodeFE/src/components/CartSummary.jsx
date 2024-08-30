import React, { useContext, useState } from 'react';
import { useCart } from './CartContext';
import '../CSS/CartSummary.css';
import CustomAlert from './CustomAlert';

const CartSummary = ({ total, serviceCharge }) => {
    const { applyDiscount, discountCode, discountPercentage } = useCart();
    const [inputDiscountCode, setInputDiscountCode] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const validDiscountCode = 'SAHARA10';
    const discountValue = discountPercentage > 0 ? total * (discountPercentage / 100) : 0;
    const discountedTotal = total - discountValue;
    const finalTotal = discountedTotal + parseFloat(serviceCharge);

    const handleApplyDiscount = () => {
        if (inputDiscountCode === validDiscountCode) {
            applyDiscount(inputDiscountCode, 10);
            setAlertMessage('Way Hay, you\'ve saved 10%');
            setShowSuccessAlert(true);
            setShowAlert(false);
        } else {
            setAlertMessage('Invalid discount code');
            setShowAlert(true);
            setShowSuccessAlert(false);
        }
    };

    return (
        <>
            <tr>
                <td colSpan="3">Subtotal</td>
                <td>£{total.toFixed(2)}</td>
                <td></td>
            </tr>

            <tr>
                <td colSpan="3">
                    <div className="discount-code-container">
                        <span className="discount-label">Discount</span>
                        <input
                            type="text"
                            value={inputDiscountCode}
                            onChange={(e) => setInputDiscountCode(e.target.value)}
                            placeholder="Enter discount code"
                        />
                    </div>
                </td>
                <td>£{discountValue.toFixed(2)}</td>
                <td>
                    <button onClick={handleApplyDiscount}>Apply</button>
                </td>
            </tr>

            <tr>
                <td colSpan="3">Service Charge (7.25%)</td>
                <td>£{serviceCharge}</td>
                <td></td>
            </tr>
            <tr>
                <td colSpan="3">Total</td>
                <td>£{finalTotal.toFixed(2)}</td>
                <td></td>
            </tr>

            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />
            )}

            {showSuccessAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={() => setShowSuccessAlert(false)}
                />
            )}
        </>
    );
};

export default CartSummary;
