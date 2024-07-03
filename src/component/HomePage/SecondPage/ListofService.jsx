import React from "react";
import './ListofService.css'
import ImagewithTitlep from "../../SubComponent/ImagewithTitlep/ImagewithTitlep";
import { useNavigate } from "react-router-dom";

const ListofService = ({ services }) => {
  const navigate=useNavigate();
  const handleNavigation = (index) => {
    if(index === 0){
      navigate(`/buy/product-listing?searchInput=${'MSME'}`);
    }
    else if(index === 1){
      navigate(`/buy/product-listing?searchInput=${'HealthCare'}`);
    }
    else{
      navigate(`/buy/product-listing?searchInput=${''}`);
    }
  };
  return (
    <>
      {services.map(({ title, imageSource, message, url }, index) => (
        <div
          className="col-lg-2 col-md-3 col-6 p-0 curser-pointer"
          key={index}
          style={{ height: "200px" }}
          onClick={() => handleNavigation(index)}
        >
          <ImagewithTitlep
            title={title}
            imageSource={imageSource}
            message={message}
            fillColor={"#9BA24C"}
            // Add target="_blank" only if URL is external
            {...(url && url.startsWith('http') && !url.includes(window.location.hostname) && { target: "_blank" })}
          />
        </div>
      ))}
    </>
  );
};

export default ListofService;
