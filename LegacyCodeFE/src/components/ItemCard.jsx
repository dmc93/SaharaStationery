import React, { useState, useCallback } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import StarRating from "./StarRating";

const ItemCard = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  category,
  averageRating,
  totalRatingsCount,
}) => {
  const [inputQuantity, setInputQuantity] = useState(1);
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(averageRating || 0); // Pre-populate with the average rating
  const [ratingsCount, setRatingsCount] = useState(totalRatingsCount || 0); // Track total ratings count

  const handleQuantityChange = useCallback((event) => {
    setInputQuantity(parseInt(event.target.value, 10));
  }, []);

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find((item) => item.id === id);
    const totalQuantity = existingCartItem
      ? existingCartItem.quantity + inputQuantity
      : inputQuantity;

    if (totalQuantity > quantity) {
      setAlertMessage(`Cannot add more than ${quantity} items to the cart.`);
      setShowAlert(true);
    } else {
      addToCart({ id, name, price, imageUrl, quantity: inputQuantity });
      setShowPopup(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  // This function will be called when a new rating is submitted
  const handleRatingSubmit = (newAverageRating, newTotalRatingsCount) => {
    console.log("New Average Rating:", newAverageRating);
    console.log("New Total Ratings Count:", newTotalRatingsCount);
    
    setRating(newAverageRating); // Update the displayed average rating
    setRatingsCount(newTotalRatingsCount); // Update the displayed rating count
  };

  return (
    <div className="card">
      <h2 title={name}>{name}</h2>
      <p>Category: {category}</p>
      <img className="card-image" src={imageUrl} alt={name} height={"50px"} />
      <br />
      <h3>£{price?.toFixed(2)}</h3>
      <p className="stock-info">
        Stock Available: {quantity > 10 ? "10+" : quantity}
      </p>

      {quantity > 0 ? (
        <div className="quantityContainer">
          <label htmlFor={`quantity-${id}`} className="quantityLabel">
            Qty:
          </label>
          <select
            id={`quantity-${id}`}
            value={inputQuantity}
            onChange={handleQuantityChange}
            className="quantityDropdown"
          >
            {Array.from({ length: quantity }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <br />
          <button onClick={handleAddToCart}>Add to Cart</button>

          <StarRating
            itemId={id}
            initialRating={rating} // Use the updated average rating
            totalRatingsCount={ratingsCount} // Use the updated total rating count
            onRatingSubmit={handleRatingSubmit}
          />
        </div>
      ) : (
        <h3 className="outOfStock">Out of Stock</h3>
      )}
      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
      {showPopup && (
        <div className="popup">
          <p>Item added to cart!</p>
          <button onClick={goToCart}>Go to Cart</button>
          <button onClick={closePopup}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
