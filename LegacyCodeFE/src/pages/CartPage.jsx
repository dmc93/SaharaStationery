import '../CSS/CartPage.css';
import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import useFetchItems from '../components/FetchItems';
import CartTable from '../components/CartTable';
import StartNewCart from '../components/StartNewCart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems = [], updateQuantity, removeFromCart, clearCart } = useCart(); 
    const { items } = useFetchItems();
    const [itemMap, setItemMap] = useState({});
    const [isCartCompleted, setIsCartCompleted] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const cartStatus = localStorage.getItem('cartStatus');
        if (cartStatus === 'Completed') {
            setIsCartCompleted(true);
        } else {
            setIsCartCompleted(false);
        }

        if (!isCartCompleted) {
            const map = items.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
            }, {});
            setItemMap(map);
        }
    }, [items, isCartCompleted]);

    const handleQuantityChange = (id, quantity) => {
        if (isCartCompleted) return; 

        if (Number.isInteger(quantity) && quantity >= 0) {
            updateQuantity(id, quantity);
        } else {
            console.error('Invalid quantity:', quantity);
        }
    };

    const handleRemoveItem = (id) => {
        if (isCartCompleted) return; 
        removeFromCart(id);
    };

    const calculateTotal = () => {
        if (isCartCompleted) return '0.00'; 

        if (Array.isArray(cartItems)) {
            return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        }
        return '0.00';
    };

    const calculateServiceCharge = (total) => {
        return (total * 0.0725).toFixed(2);
    };

    const total = parseFloat(calculateTotal());
    const serviceCharge = calculateServiceCharge(total);

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {isCartCompleted ? (
                <div>
                    <p>The cart has been completed and cannot be modified.</p>
                    <div className="start-new-cart-page-btn">
                        <StartNewCart clearCart={clearCart} />
                    </div>
                </div>
            ) : (
                <div>
                    <CartTable
                        cartItems={cartItems}
                        itemMap={itemMap}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                        total={total}
                        serviceCharge={serviceCharge}
                    />                  
                </div>
            )}
        </div>
    );
};

export default CartPage;
