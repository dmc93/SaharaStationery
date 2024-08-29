import '../CSS/CartPage.css';
import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import useFetchItems from '../components/FetchItems';
import CartTable from '../components/CartTable';

const CartPage = () => {
    const { cartItems = [], updateQuantity, removeFromCart, } = useCart(); 
    const { items } = useFetchItems();
    const [itemMap, setItemMap] = useState({});

    useEffect(() => {
        const map = items.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        setItemMap(map);
    }, [items]);

    const handleQuantityChange = (id, quantity) => {
       
        if (Number.isInteger(quantity) && quantity >= 0) {
            updateQuantity(id, quantity);
        } else {
            console.error('Invalid quantity:', quantity);
        }
    };
    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const calculateTotal = () => {
        
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
            <CartTable
                cartItems={cartItems} 
                itemMap={itemMap}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                total={total}
                serviceCharge={serviceCharge}
            />
        </div>
    );
};

export default CartPage;
