import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import LeftArrow from '../../LeftArrow';
import RightArrow from '../../RightArrow';


const NextArrow = ({ onClick, hide }) => {
  return (
    <button className={`slider2-custom-arrow slider2-custom-next-arrow ${hide}`} onClick={onClick}>
      <LeftArrow />
    </button>

  );
};

const PrevArrow = ({ onClick, hide }) => {
  return (
    <button className={`slider2-custom-arrow slider2-custom-prev-arrow ${hide}`} onClick={onClick}>
      <RightArrow />
    </button>

  );
};

const Slider2 = ({ listofdata, hide, productCategory, shadow }) => {
  const [slidesToShow, setSlidesToShow] = useState(3.5);

  const settings = {
    infinite: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow hide={hide} />,
    prevArrow: <PrevArrow hide={hide} />,
  };

  console.log("block data==>", listofdata);
  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of slides to show based on screen width
      if (window.innerWidth < 1300 && window.innerWidth > 1024) {
        setSlidesToShow(3.2)
      }
      if (window.innerWidth <= 992 && window.innerWidth > 768) {
        setSlidesToShow(2.5);
      }
      if (window.innerWidth <= 768 && window.innerWidth > 576) {
        setSlidesToShow(1.5);
      }
      if (window.innerWidth <= 576) {
        setSlidesToShow(1.2);
      }

    };


    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='xmax-container p-r'>
      <Slider {...settings}>
        {listofdata.map((product, index) => (
          <div className='slick-gap' key={index}>
            {React.cloneElement(productCategory, { product, index, shadow })}
          </div>


        ))}
      </Slider>
    </div>
  )
}

export default Slider2