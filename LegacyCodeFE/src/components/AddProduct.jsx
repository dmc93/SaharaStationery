import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import Modal from 'react-modal';
import ProductForm from './ProductForm';
import useFetchItems from './FetchItems';  

Modal.setAppElement('#root');

const AddProduct = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

 
  const { items: existingProducts, error } = useFetchItems();

  useEffect(() => {
    if (error) {
      setAlertMessage('Failed to fetch existing products.');
      setIsModalVisible(false); 
      setShowAlert(true);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity || !formData.imageUrl) {
      setAlertMessage('All fields are required.');
      setIsModalVisible(false); 
      setShowAlert(true);
      return;
    }

    const productExists = existingProducts.some(p => p.name.toLowerCase() === formData.name.toLowerCase());

if (productExists) {
  setAlertMessage('Product already exists. Please enter a different product.');
  setIsModalVisible(false); 
  setShowAlert(true);
  return;
}


    try {
      const postResponse = await axios.post('http://localhost:8082/item/add', {
        ...formData,
        price: parseFloat(formData.price).toFixed(2),
        quantity: parseInt(formData.quantity, 10)
      });
      const data = postResponse.data;
      setAlertMessage(`New Product Added. Your Unique ID is ${data.id}`);
      setShowAlert(true);
      setFormData({
        name: '',
        price: '',
        quantity: '',
        imageUrl: ''
      });
      onAddProduct();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setAlertMessage('Failed to add product.');
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setIsModalVisible(true); 
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="addproduct-btn">Add Product</button>

      {isModalOpen && isModalVisible && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          contentLabel="Add Product Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Add Product</h2>
          <ProductForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={closeAlert} 
        />
      )}
    </div>
  );
};

export default AddProduct;
