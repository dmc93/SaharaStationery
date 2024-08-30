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
    imageUrl: '',
    category: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [newCategory, setNewCategory] = useState('');

  const { items: existingProducts, error, refetch } = useFetchItems();
  const [categories, setCategories] = useState([]);


  const updateCategories = (products) => {
    const uniqueCategories = [...new Set(products.map(item => item.category))];
    setCategories(uniqueCategories);
  };


  const handleOpenModal = async () => {
    await refetch(); 
    updateCategories(existingProducts);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (error) {
      setAlertMessage('Failed to fetch existing products.');
      setIsModalVisible(false); 
      setShowAlert(true);
    }
  }, [error]);

  useEffect(() => {
    if (newCategory) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: '' 
      }));
    }
  }, [newCategory]);

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity || !formData.imageUrl || (!formData.category && !newCategory)) {
      setAlertMessage('All fields are required.');
      setIsModalVisible(false); 
      setShowAlert(true);
      return;
    }

    const categoryToSubmit = newCategory ? newCategory : formData.category;

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
        category: categoryToSubmit,
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
        imageUrl: '',
        category: ''
      });
      setNewCategory('');
      
      await refetch(); 
      updateCategories(existingProducts); 
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
      <button onClick={handleOpenModal} className="addproduct-btn">Add Product</button>

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
            categories={categories} 
            onCategoryChange={handleCategoryChange}
            newCategory={newCategory}
            onNewCategoryChange={handleNewCategoryChange}
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
