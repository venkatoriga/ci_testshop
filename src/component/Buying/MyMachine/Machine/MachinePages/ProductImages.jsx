import React, { useState } from "react";
import "./ProductImages.css";
import ImageSlider from "../../Modals/ImageSlider";
import { heartIcon } from "../../../../../helpers/Icons";

const ProductImages = ({ media }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = (status) => {
    setShowModal(status);
  };

  return (
    <>
      <div className="img-wrap">
        {showModal && <ImageSlider modalAction={handleModal} />}
      </div>
      <div className="product-img-wrap">
        {media.map((image, index) => (
          <div className="product" key={image.id}>
            <img className="product-img" src={image.url} alt={image.alt || ""} />
            {index === 0 && (
              <div className="drag" onClick={() => handleModal(true)}>
                View all
              </div>
            )}
            {index === media.length - 1 && (
              <button className="frame">
                {heartIcon({ width: 30, height: 30, fill: "none", stroke: "#fff" })}
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImages;
