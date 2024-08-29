import React from 'react';
import '../CSS/CartItemRow.css';

const CartItemRow = ({ item, itemMap = {}, handleQuantityChange, handleRemoveItem }) => {
    if (!item) {
        return (
            <tr>
                <td colSpan="5">Item data is missing</td>
            </tr>
        );
    }

    const { id, name, price = 0, quantity = 1 } = item;

    return (
        <tr>
            <td>{name}</td>
            <td>£{price.toFixed(2)}</td>
            <td>
                <select
                    value={quantity}
                    onChange={(e) => handleQuantityChange(id, parseInt(e.target.value, 10))}
                >
                    {Array.from({ length: itemMap[id] || 0 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </td>
            <td>£{(price * quantity).toFixed(2)}</td>
            <td>
                <button onClick={() => handleRemoveItem(id)}>Remove</button>
            </td>
        </tr>
    );
};

export default CartItemRow;
