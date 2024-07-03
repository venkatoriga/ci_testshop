import React,{useState,useEffect} from 'react'
import Slider from "react-slick";
import LeftArrow from '../../LeftArrow';
import RightArrow from '../../RightArrow';
import Button from '../../../Button/Button';
import {Container,Image} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
const NextArrow = ({ onClick }) => {
  return (
    <button className={`slider2-custom-arrow slider2-custom-next-arrow show-992`} onClick={onClick}>
    <LeftArrow/>
    </button>
  );
};

const PrevArrow = ({ onClick}) => {
  return (
    <button className={`slider2-custom-arrow slider2-custom-prev-arrow show-992`} onClick={onClick}>
      <RightArrow/>
    </button>
  );
};

const Slider3 = ({listofdata}) => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isSmallScreen]=useState(window.innerWidth<576)
  const navigate=useNavigate();
  const settings = {
    infinite: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
  };
 
    useEffect(() => {
      const handleResize = () => {
        // Adjust the number of slides to show based on screen width
        
        if(window.innerWidth<=1267 && window.innerWidth > 992){
          setSlidesToShow(2.4)
        }
        if (window.innerWidth <= 992 && window.innerWidth > 768) {
          setSlidesToShow(2);
        } 
        if (window.innerWidth <= 768 ) {
          setSlidesToShow(1.3);
        }

      };
  
    
      window.addEventListener('resize', handleResize);

      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <div className='xmax-container'>
      <Slider {...settings}>
      {listofdata.map((product, index) => (
    <div className='slick-gap'>
    <div className={`homeCardBorder imagewithtpb ${!isSmallScreen ?"p-4":""} buymachine-fifth-page`} key={index} >
    <Container className='h-392-245'>
      <div className=''>
        <Image src={product.imageurl} className='w-100 h-100'/>
      </div>
      <h1 className='heading-600-20-16'>{product.title}</h1>
      <p className={`bar`}>{product.para}</p>
    
     
   
    </Container>
   <div className={`btn-left-to-right ${isSmallScreen ? "py-3":""}`} style={{paddingLeft:"15px",paddingRight:"15px"}}>
   <Button message={"Search"} callFunction={()=>navigate(`/buy/product-listing?searchInput=${''}`)}/>
   </div>
  </div>     
     </div>
      
       ))}
      </Slider>
    </div>
  )
}

export default Slider3