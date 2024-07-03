import React, { useState } from "react";
import './ImagewithTitle.css'
const ImagewithTitlep = ({ title, imageSource, message,fillColor}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterhandler = () => {
    setIsHovered(true);
  };

  const onMouseLeavehandler = () => {
    setIsHovered(false);
  };
  return (
    <div 
      onMouseEnter={onMouseEnterhandler}
      onMouseLeave={onMouseLeavehandler}
      className={`listofservices ${isHovered ? "hovered" : null} p-0`}
    >
      <div className="icon-div d-flex align-items-end">
      {React.cloneElement(imageSource, { fill: isHovered ? fillColor : null })}
      </div>

      <p className={`listofservice-title ${isHovered ? "hovered" : ""}`}>
        {title}
      </p>
     {message && <p className={`listofservice-message ${isHovered ? "hovered" : ""}`}>
        {message}
      </p>}
    </div>
  );
};

export default ImagewithTitlep;