import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
// import './rating.css';

const StarRating = ({ ratingstars, onClick }) => { // Changed prop name to ratingstars
  const [hoverRating, setHoverRating] = useState(0);

  const handleClickedcx = (currentRate) => {
    onClick(currentRate);
  };

  return (
    <>
      {[...Array(5)].map((star, indexede) => {
        const currentRate = indexede + 1;
        return (
          <label
            key={indexede}
            className="labelefff"
            style={{
              transform:
                currentRate <= hoverRating || currentRate <= ratingstars
                  ? "scale(1.2)"
                  : "scale(1)",
              transition: "transform 0.3s ease-out",
              display: "inline-block",
            }}
            onMouseOver={() => setHoverRating(currentRate)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <input
              type="radio"
              name="rate"
              value={currentRate}
              checked={currentRate === ratingstars}
              onChange={() => handleClickedcx(currentRate)}
              className="visually-hidden33"
            />
            <IoIosStar  color={currentRate <= ratingstars ? "red" : "black"} />
          </label>
        );
      })}
    </>
  );
};

export default StarRating;
