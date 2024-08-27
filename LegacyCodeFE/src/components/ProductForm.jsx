import React from 'react';

const ProductForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isUpdateMode = false
}) => {
  const handlePriceChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      onChange({ ...formData, price: value });
    }
  };

  const handleQuantityChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      onChange({ ...formData, quantity: value });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label className="label1">Name:</label>
        <input
          className="input1"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1">Price:</label>
        <input
          className="input1"
          type="text"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handlePriceChange}
          onBlur={() => onChange({ ...formData, price: parseFloat(formData.price).toFixed(2) })}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1">Quantity:</label>
        <input
          className="input1"
          type="text" 
          name="quantity"
          value={formData.quantity}
          onChange={handleQuantityChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1">Image URL:</label>
        <input
          className="input1"
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => onChange({ ...formData, imageUrl: e.target.value })}
          required
        />
      </div>

      <div className="button-group">
        <button className="add-btn" type="submit">
          {isUpdateMode ? 'Update' : 'Submit'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
