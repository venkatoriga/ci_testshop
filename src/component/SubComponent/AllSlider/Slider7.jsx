import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import LeftArrow from '../LeftArrow';
import RightArrow from '../RightArrow';


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

const Slider7 = ({ listofdata, hide, productCategory, breakpoints }) => {
  const [slidesToShow, setSlidesToShow] = useState(breakpoints.a);

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

  // console.log("block data==>", listofdata);
  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of slides to show based on screen width
      if (window.innerWidth < 1300 && window.innerWidth > 1024) {
        setSlidesToShow(breakpoints.b)
      }
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setSlidesToShow(breakpoints.c);
      }
      if (window.innerWidth <= 768 && window.innerWidth > 576) {
        setSlidesToShow(breakpoints.d);
      }
      if (window.innerWidth <= 576 && window.innerWidth >= 360) {
        setSlidesToShow(breakpoints.e);
      }
      if (window.innerWidth < 360) {
        setSlidesToShow(1)
      }

    };


    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoints]);
  return (
    <div className='p-r pb-5'>
      <Slider {...settings}>
        {listofdata.map((product, index) => (
          <div className='slick-gap7' key={index}>
            {React.cloneElement(productCategory, { product, index })}
          </div>


        ))}
      </Slider>
    </div>
  )
}

export default Slider7