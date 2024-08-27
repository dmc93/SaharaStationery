import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomAlert from './CustomAlert'; 
import '../CSS/Modal.css'; 

const API_URL = 'http://localhost:8082/item/remove/';

const DeleteProduct = ({ productIdToDelete, onCancel, onConfirm }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (productIdToDelete !== null) {
            setShowConfirmation(true);
        }
    }, [productIdToDelete]);

    const handleConfirm = async () => {
        try {
            const response = await axios.delete(`${API_URL}${productIdToDelete}`);
            if (response.status === 200) {
                setAlertMessage(`Product with ID ${productIdToDelete} successfully deleted.`);
            } else {
                setAlertMessage(`Failed to delete the product with ID ${productIdToDelete}.`);
            }
        } catch (error) {
            setAlertMessage('Error during deletion.');
        } finally {
            setShowConfirmation(false);
            setShowAlert(true);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        onConfirm(); 
    };

    return (
        <>
            {showConfirmation && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => {
                        setShowConfirmation(false);
                        onCancel(); 
                    }}
                    contentLabel="Confirmation Dialog"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="button-group">
                        <button
                            className="confirm-btn"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                        <button className="cancel-btn" onClick={() => {
                            setShowConfirmation(false);
                            onCancel(); 
                        }}>Cancel</button>
                    </div>
                </Modal>
            )}
            
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={handleAlertClose} 
                />
            )}
        </>
    );
};

export default DeleteProduct;
