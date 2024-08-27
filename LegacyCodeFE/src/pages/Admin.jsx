import React, { useState } from 'react';
import useFetchItems from '../components/FetchItems';
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import ProductListTable from '../components/ProductListTable';
import DeleteProduct from '../components/DeleteProduct'; 
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';

const AdminPage = () => {
    const { items: products, error, refetch } = useFetchItems();
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

   
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div>
            <div className="container2">               
                <AddProduct onAddProduct={refetch} /> 
            </div>
            <div className="table-wrapper">
                <ProductListTable
                    products={products}
                    onUpdate={(product) => {
                        setProductToUpdate(product);
                        setShowUpdateDialogue(true);
                    }}
                    onDelete={(id) => setProductIdToDelete(id)} // Set ID to delete
                    onRequestSort={requestSort}
                    sortConfig={sortConfig}
                />
            </div>
            {productIdToDelete !== null && (
                <DeleteProduct
                    productIdToDelete={productIdToDelete}
                    onCancel={() => setProductIdToDelete(null)} // Clear the ID
                    onConfirm={() => {
                        refetch(); // Refresh the products list
                        setProductIdToDelete(null); // Clear the product ID
                    }}
                />
            )}
            {showUpdateDialogue && productToUpdate && (
                <UpdateProduct
                    product={productToUpdate}
                    onCancel={() => setShowUpdateDialogue(false)}
                    onUpdateSuccess={() => {
                        refetch(); // Refresh the products list
                        setShowUpdateDialogue(false);
                        setProductToUpdate(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminPage;
