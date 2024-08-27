import React from 'react';
import '../CSS/CartItemRow.css';

const CartItemRow = ({ item, itemMap, handleQuantityChange, handleRemoveItem }) => (
    <tr>
        <td>{item.name}</td>
        <td>£{item.price.toFixed(2)}</td>
        <td>
            <select
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e)}
            >
                {Array.from({ length: itemMap[item.id] || 0 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
        </td>
        <td>£{(item.price * item.quantity).toFixed(2)}</td>
        <td>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </td>
    </tr>
);

export default CartItemRow;
