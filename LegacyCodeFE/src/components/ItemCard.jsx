import React, { useState, useCallback } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';

const ItemCard = ({ id, name, price, imageUrl, quantity }) => {
    const [inputQuantity, setInputQuantity] = useState(1);
    const { cartItems, addToCart } = useCart();
    const navigate = useNavigate(); 
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleQuantityChange = useCallback((event) => {
        setInputQuantity(parseInt(event.target.value, 10));
    }, []);

    const handleAddToCart = () => {
        const existingCartItem = cartItems.find(item => item.id === id);
        const totalQuantity = existingCartItem ? existingCartItem.quantity + inputQuantity : inputQuantity;

        if (totalQuantity > quantity) {
            setAlertMessage(`Cannot add more than ${quantity} items to the cart.`);
            setShowAlert(true);
        } else {
            addToCart({ id, name, price, imageUrl, quantity: inputQuantity });
            setShowPopup(true);  
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const goToCart = () => {
       navigate('/cart');  
    };

    return (
        <div className="card">
            <h2>{name}</h2>
            <h3>£{price?.toFixed(2)}</h3>
            <img className="card-image" src={imageUrl} alt={name} height={"50px"} />
            <br />
            <p className="stock-info">Amount Available: {quantity}</p>
            {quantity > 0 ? (
                <div className="quantityContainer">
                    <label htmlFor={`quantity-${id}`} className="quantityLabel">Qty:</label>
                    <select
                        id={`quantity-${id}`}
                        value={inputQuantity}
                        onChange={handleQuantityChange}
                        className="quantityDropdown"
                    >
                        {Array.from({ length: quantity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <br />
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            ) : (
                <h3 className="outOfStock">Out of Stock</h3>
            )}
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
            {showPopup && (
                <div className="popup">
                    <p>Item added to cart!</p>
                    <button onClick={goToCart}>Go to Cart</button>
                    <button onClick={closePopup}>Continue Shopping</button>
                </div>
            )}
        </div>
    );
};

export default ItemCard;
