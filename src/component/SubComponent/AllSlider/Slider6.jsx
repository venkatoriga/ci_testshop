import React,{useState,useEffect} from 'react'
import Slider from "react-slick";
import LeftArrow from '../LeftArrow';
import RightArrow from '../RightArrow';


const NextArrow = ({ onClick }) => {
  return (
    <button className={`slider6-custom-arrow slider6-custom-next-arrow `} onClick={onClick}>
    <LeftArrow/>
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button className={`slider6-custom-arrow slider6-custom-prev-arrow `} onClick={onClick}>
      <RightArrow/>
    </button>
  );
};

const Slider6 = ({listofdata,productCategory}) => {
  const [slidesToShow, setSlidesToShow] = useState(2);
  
  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
 
  console.log("block data==>", listofdata);
    useEffect(() => {
      const handleResize = () => {
        // Adjust the number of slides to show based on screen width
        
      
        if (window.innerWidth <=576) {
          setSlidesToShow(1);
        }

      };
      window.addEventListener('resize', handleResize);

      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <div className='max-container p-r'>
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

export default Slider6