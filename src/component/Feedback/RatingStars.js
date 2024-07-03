import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import './rating.css';

const RatingStars = ({ ratingstars, onClick }) => {
  const [hoverStarRating, setHoverStarRating] = useState(0);
  const [totalStars] = useState(5); // Assuming totalStars is fixed at 5

  const handleClickedcx = (currentRates) => {
    onClick(currentRates);
  };

  return (
    <div className="rating-stars-container">
      {[...Array(totalStars)].map((star, index) => {
        const currentRates = index + 1;
        return (
          <div
            key={index}
            className="star-wrapper"
            style={{
              transform:
                currentRates <= hoverStarRating || currentRates <= ratingstars
                  ? 'scale(1.1)'
                  : 'scale(1)',
              transition: 'transform 0.3s ease-out',
            }}
            onMouseOver={() => setHoverStarRating(currentRates)}
            onMouseLeave={() => setHoverStarRating(0)}
            onClick={() => handleClickedcx(currentRates)}
          >
            <input
              type="radio"
              name="rate"
              value={currentRates}
              checked={currentRates === ratingstars}
              onChange={() => handleClickedcx(currentRates)}
              className="visually-hidden"
            />
            <IoStar
              className="star-icon"
              style={{ marginRight: '5px' }} 
              color={currentRates <= (hoverStarRating || ratingstars) ? 'green' : 'gray'}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
