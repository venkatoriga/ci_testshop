import React from "react";
import ForSlider from "../SubComponent/ForSlider";
import { useNavigate } from "react-router-dom";

const BuySectionOne = () => {
  const navigate=useNavigate();

  const headingLeft = "Your search for the top quality pre-owned equipment ends here";
  const paraLeft ="Explore our extensive range of industrial & medical equipment at the best price";
  const headingRight = "";
  const paraRight ="We strive for your satisfaction, making us the preferred choice for reliable and affordable equipment.";
  const bannerImage = "asset/image555a.png";

  const onNavigate = (searchText) => {
    // Do something with the entered value (searchText)
    console.log("Search Text:", searchText);

    // Navigate to the desired route, e.g., product listing
    navigate(`/buy/product-listing?searchInput=${searchText}`);
  };
 
  return (
    <div className="container-fluid m-0 liner-background-50">
      <div className="max-container">
        <ForSlider
          
          bannerImage={bannerImage}
          headingLeft={headingLeft}
          paraLeft={paraLeft}
          headingRight={headingRight}
          paraRight={paraRight}
          buttonLeft={"Search"}
          btnfunction={onNavigate}
          inputLeft={"Which machine are you looking for?"}
          //inputLeft={false}
          viewall={true}
          microtrue={false}
          onMicro={false}
          dropdown={onNavigate}
        />
      </div>
    </div>
  );
};

export default BuySectionOne;
