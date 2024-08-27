import React, { useEffect } from 'react';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import CartActions from './CartActions';
import '../CSS/CartTable.css';
import { useCart } from './CartContext';

const CartTable = ({ itemMap, handleQuantityChange, handleRemoveItem, total, serviceCharge, onRetrieve }) => {
    const { cartItems } = useCart();

    useEffect(() => {
    }, [cartItems]); 

    return (
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
                        itemMap={itemMap}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}
            </tbody>
            <tfoot>
                <CartSummary total={total} serviceCharge={serviceCharge} />
                <tr>
                    <td colSpan="5">
                        <CartActions onRetrieve={onRetrieve} />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default CartTable;
