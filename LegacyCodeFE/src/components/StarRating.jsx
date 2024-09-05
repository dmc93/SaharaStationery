import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/StarRating.css';  // Add styles for the stars

const StarRating = ({ itemId, initialRating, totalRatingsCount, onRatingSubmit }) => {
  const [rating, setRating] = useState(initialRating || 0); // Start with the average rating if available
  const [hover, setHover] = useState(0);

  useEffect(() => {
    console.log('Initial rating received:', initialRating);
    setRating(initialRating); // Update rating when initialRating changes
  }, [initialRating]);

  const handleRatingSubmit = async (newRating) => {
    console.log('Submitting new rating:', newRating);
    try {
      const response = await axios.post(`http://localhost:8082/item/${itemId}/rate`, { rating: newRating });
      
      if (response.status === 200) {
        const updatedTotalRatingsCount = response.data.totalRatingsCount;
        const updatedAverageRating = response.data.averageRating;

        console.log('New rating submitted successfully:', newRating);
        console.log('Updated total ratings count:', updatedTotalRatingsCount);
        console.log('Updated average rating:', updatedAverageRating);

        // Update the frontend with the new rating and count
        setRating(updatedAverageRating);
        onRatingSubmit(updatedAverageRating, updatedTotalRatingsCount);  // Send data back to parent component
      } else {
        console.error('Error: Did not get a 200 response');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="star-rating-container">
  <div className="star-rating">
    {[...Array(5)].map((star, index) => {
      index += 1;
      return (
        <button
          type="button"
          key={index}
          className={index <= (hover || rating) ? "on" : "off"}
          onClick={() => handleRatingSubmit(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <span className="star">&#9733;</span> {/* Star symbol */}
        </button>
      );
    })}
  </div>
  <div className="ratings-count">
    <p>{totalRatingsCount} Ratings</p> {/* Display the total number of ratings */}
  </div>
</div>

  );
};

export default StarRating;
