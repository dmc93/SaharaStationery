import React from 'react';
import { useCart } from './CartContext';
import '../CSS/CartSummary.css';
import CustomAlert from './CustomAlert';

const CartSummary = ({ total, serviceCharge }) => {
    const { discountCode, discountPercentage, applyDiscount } = useCart();
    const [inputDiscountCode, setInputDiscountCode] = React.useState(discountCode || '');
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

    const validDiscountCode = 'SAHARA10'; // Assuming this is your valid discount code
    const discountValue = discountPercentage > 0 ? total * (discountPercentage / 100) : 0;
    const discountedTotal = total - discountValue;
    const finalTotal = discountedTotal + parseFloat(serviceCharge);

    const handleApplyDiscount = () => {
        if (inputDiscountCode === validDiscountCode) {
            applyDiscount(inputDiscountCode, 10); // Apply a 10% discount
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
                            disabled={discountPercentage > 0} // Disable if discount is already applied
                        />
                    </div>
                </td>
                <td>£{discountValue.toFixed(2)}</td>
                <td>
                    <button onClick={handleApplyDiscount} disabled={discountPercentage > 0}>
                        Apply
                    </button>
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
