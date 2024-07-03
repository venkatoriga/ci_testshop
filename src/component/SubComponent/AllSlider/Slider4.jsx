import React from 'react'
import Slider from "react-slick";
import LeftArrow from '../LeftArrow';
import RightArrow from '../RightArrow';


const NextArrow = ({ onClick,hide }) => {
  return (
    <button className={`slider4-custom-arrow slider4-custom-next-arrow ${hide}`} onClick={onClick}>
    <LeftArrow/>
    </button>
  );
};

const PrevArrow = ({ onClick ,hide}) => {
  return (
    <button className={`slider4-custom-arrow slider4-custom-prev-arrow ${hide}`} onClick={onClick}>
      <RightArrow/>
    </button>
  );
};

const Slider4 = ({listofdata,hide,productCategory}) => {
  
  const settings = {
    infinite: true,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow hide={hide}/>,
    prevArrow: <PrevArrow hide={hide}/>,
  };
 
  console.log("block data==>", listofdata);
 
  return (
    <div className='xmax-container p-r'>
      <Slider {...settings}>
      {listofdata.map((product, index) => (
<div className='slick-gap5'>
      {React.cloneElement(productCategory, {product ,index})}
  </div>
                    
       ))}
      </Slider>
    </div>
  )
}

export default Slider4