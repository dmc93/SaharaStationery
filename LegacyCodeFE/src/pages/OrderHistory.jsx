import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/CartPage.css';
import CartItemRow from '../components/CartItemRow';
import CartSummary from '../components/CartSummary';
import CartActions from '../components/CartActions';


const OrderHistory = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const cartId = localStorage.getItem('cartId');
            if (cartId) {
                try {
                    const response = await axios.get(`http://localhost:8083/cart/${cartId}`);
                    if (response.status === 200) {
                        setOrder(response.data);
                    } else {
                        setError('Failed to fetch order.');
                    }
                } catch (error) {
                    console.error('Error fetching order:', error);
                    setError('Failed to fetch order.');
                }
                setLoading(false);
            } else {
                setError('No cart ID found.');
                setLoading(false);
            }
        };

        fetchOrder();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

   
    const cartItems = order ? order.items : [];
    const total = order ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
    const serviceCharge = (total * 0.0725).toFixed(2); 

    return (
        <div className="order-history">
            <h1>Order History</h1>
            {cartItems.length === 0 ? (
                <p>No items found in this order.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <CartItemRow
                                key={item.id}
                                item={item}
                                handleQuantityChange={() => {}}
                                handleRemoveItem={() => {}}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <CartSummary total={total} serviceCharge={serviceCharge} />
                        <tr>
                            <td colSpan="5">
                                <CartActions onRetrieve={() => {}} /> 
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;
