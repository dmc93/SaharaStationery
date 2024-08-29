import React, { useState } from 'react';
import '../CSS/CartSummary.css';
import CustomAlert from './CustomAlert'; 

const CartSummary = ({ total, serviceCharge }) => {
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); 

    const validDiscountCode = 'SAHARA10'; 

    const handleApplyDiscount = () => {
        if (discountCode === validDiscountCode) {
            setDiscountApplied(true);
            setAlertMessage('Way Hay, you\'ve saved 10%');
            setShowSuccessAlert(true); 
            setShowAlert(false); 
        } else {
            setAlertMessage('Invalid discount code');
            setShowAlert(true); 
            setShowSuccessAlert(false); 
        }
    };

    const discount = discountApplied ? total * 0.10 : 0;
    const discountedTotal = total - discount;
    const finalTotal = discountedTotal + parseFloat(serviceCharge);

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
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            placeholder="Enter discount code"
                        />
                    </div>
                </td>
                <td>£{discount.toFixed(2)}</td>                 
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
