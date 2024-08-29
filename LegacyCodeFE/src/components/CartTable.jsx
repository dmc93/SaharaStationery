import React from 'react';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import CartActions from './CartActions';
import '../CSS/CartTable.css';

const CartTable = ({ cartItems, itemMap, handleQuantityChange, handleRemoveItem, total, serviceCharge }) => {
    if (!Array.isArray(cartItems)) {
        return <div>No items in cart</div>;
    }

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
                {cartItems.map(item => (
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
                        <CartActions />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default CartTable;
