// when you need only slider without prev and next button in desktop 
// when you need  slider with prev and next button in Mobile screen
import React,{useState,useEffect} from 'react'
import Slider from "react-slick";
import LeftArrow from '../LeftArrow';
import RightArrow from '../RightArrow';


const NextArrow = ({ onClick,hide }) => {
  return (
    <button className={`slider2-custom-arrow slider2-custom-next-arrow ${hide}`} onClick={onClick}>
    <LeftArrow/>
    </button>
  );
};

const PrevArrow = ({ onClick ,hide}) => {
  return (
    <button className={`slider2-custom-arrow slider2-custom-prev-arrow ${hide}`} onClick={onClick}>
      <RightArrow/>
    </button>
  );
};

const Slider5 = ({listofdata,hide,productCategory,prevview}) => {
  const [slidesToShow, setSlidesToShow] = useState(prevview);
  
  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow hide={hide}/>,
    prevArrow: <PrevArrow hide={hide}/>,
  };
 
  console.log("block data==>", listofdata);
    useEffect(() => {
      const handleResize = () => {
        // Adjust the number of slides to show based on screen width
        // if(window.innerWidth <1300 && window.innerWidth> 768){
        //   setSlidesToShow(prevview-1)
        // }
        if (window.innerWidth <= 768 && window.innerWidth>576 ) {
          setSlidesToShow(prevview-1);
        }
        if(window.innerWidth <=576 ){
          setSlidesToShow(prevview-2)
        }

      };
  
    
      window.addEventListener('resize', handleResize);

      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [slidesToShow,prevview]);
  return (
    <div className='xmax-container'>
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

export default Slider5