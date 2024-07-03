import React from "react";
import classes from "./LookingForBuySellRight.module.css";
import Block from "../../../../Block/Block";
import Slider7 from "../../../../SubComponent/AllSlider/Slider7";
const LookingForBuySellRight = ({product}) => {
  const block =<Block/>
  const breakpoints={
    a:2.3,
    b:2.3,
    c:2,
    d:2.1,
    e:1.3
  }
  const shadow=true
  return (
    
    <div className={classes.maindiv}>
    <div className="container-fluid p-0 m-0  row pl-3 for-desktop">
      {product.map((product, index) => (
        <div className="col-lg-6 col-md-6 col-12 p-0">
          {React.cloneElement(block, {product ,index})}
        </div>
      ))}
    </div>
     <div className=" row for-mobile w-100 pt-3  card-slider-controller ">
        {<Slider7 breakpoints={breakpoints} listofdata={product} productCategory={block} shadow={true}/>}
     </div>     
     
  
  </div>

  );
};

export default LookingForBuySellRight;
