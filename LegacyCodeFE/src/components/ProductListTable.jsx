import React, { useState } from 'react';

const ProductListTable = ({ products, onUpdate, onDelete }) => {
    
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });

    const sortedProducts = [...products].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const onRequestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onRequestSort('id')}>Product ID</th>
                        <th onClick={() => onRequestSort('name')}>Product Name</th>
                        <th onClick={() => onRequestSort('price')}>Price</th>
                        <th onClick={() => onRequestSort('quantity')}>Quantity</th>
                        <th>Image</th>
                        <th>Update Product</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>£{product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                />
                            </td>
                            <td>
                                <button className="update-btn" onClick={() => onUpdate(product)}>Update</button>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListTable;
