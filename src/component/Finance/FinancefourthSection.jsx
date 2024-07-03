import React, { useState, useEffect,useRef } from 'react'
import './Finance.css'
import Slider from 'react-slick';
import LeftArrow from '../SubComponent/LeftArrow';
import RightArrow from '../SubComponent/RightArrow';
import FinanceBlock from './FinanceBlock';
const NextArrow = ({ onClick, hide }) => {
  return (
    <button className={`slider4-custom-arrow slider4-custom-next-arrow ${hide} f-alider-btn`} onClick={onClick}>
      <LeftArrow />
    </button>
  );
};

const PrevArrow = ({ onClick, hide }) => {
  return (
    <button className={`slider4-custom-arrow slider4-custom-prev-arrow ${hide}  f-alider-btn`} onClick={onClick}>
      <RightArrow />
    </button>
  );
};
const FinancefourthSection = ({ listofdata }) => {
  const slidermoving = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const productCategory = <FinanceBlock />
  const settings = {
    infinite: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    // nextArrow: <NextArrow onClick={() => slidermoving.current.slickNext()} hide={"show-992"} />,
    // prevArrow: <PrevArrow onClick={() => slidermoving.current.slickPrev()} hide={"show-992"} />,
  };


  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of slides to show based on screen width
      if (window.innerWidth < 1300 && window.innerWidth > 768) {
        setSlidesToShow(3)
      }
      if (window.innerWidth <= 768 && window.innerWidth > 576) {
        setSlidesToShow(2);
      }
      if (window.innerWidth <= 576) {
        setSlidesToShow(1.1)
      }

    };


    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slidesToShow]);

  return (
    <div className='container-fluid bg-gray1 mt-60 f-pb-30'>
      <div className='max-container'>
        <div className='text-center pt-32'>
          <img src="/OrigaService.svg" alt="OrigaService" />
          <div className='heading-600-24-20 c-green'>
            Other Benefits
          </div>
          <p className='heading-400-16-14 op-80 m-0'>ORIGA offers a 360 degree solutions for your equipment</p>

        </div>
      </div>
      <div className='max-container mt-32'>
        <Slider {...settings}  ref={slidermoving}>
          {listofdata.map((product, index) => (
            <div className='slick-gap5 h-400'>
              {React.cloneElement(productCategory, { product, index })}
            </div>


          ))}
        </Slider>
      </div>
    </div>
  )
}

export default FinancefourthSection