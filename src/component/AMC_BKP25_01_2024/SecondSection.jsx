import React,{useEffect,useState} from 'react'
import LeftArrow from '../SubComponent/LeftArrow';
import RightArrow from '../SubComponent/RightArrow';
import Slider from 'react-slick';
import EventBlockline from '../SubComponent/AllBlock/EventBlockline';
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
const SecondSection = () => {
    const [slidesToShow, setSlidesToShow] = useState(4);
 
    const productCategory=<EventBlockline/>
const settings = {
  infinite: false,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 3000,
  cssEase: "linear",
  nextArrow: <NextArrow hide={"show-992"}/>,
  prevArrow: <PrevArrow hide={"show-992"}/>,
};


  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of slides to show based on screen width
      if(window.innerWidth <1300 && window.innerWidth> 768){
        setSlidesToShow(3)
      }
      if (window.innerWidth <= 768 && window.innerWidth>576 ) {
        setSlidesToShow(2);
      }
      if(window.innerWidth <=576 ){
        setSlidesToShow(1)
      }

    };

  
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slidesToShow]);
  const listofdata=[
    {title:"Remote Assist",message:"24x7 assistance from our trained technician in case of any problem related to your machines",imageurl:"/asset/safeguard-img.png"},
    {title:"Evolve program",message:"24x7 assistance from our trained technician in case of any problem related to your machines",imageurl:"/asset/safeguard-img.png"},
    {title:"Updates",message:"24x7 assistance from our trained technician in case of any problem related to your machines",imageurl:"/asset/safeguard-img.png"},
    {title:"Quality assurances",message:"24x7 assistance from our trained technician in case of any problem related to your machines",imageurl:"/asset/safeguard-img.png"},
    {title:"Remote Assist",message:"24x7 assistance from our trained technician in case of any problem related to your machines",imageurl:"/asset/safeguard-img.png"}
]
    return (
        <>
         <div className='container-fluid pt-5'>
                <div className='max-container pt-5 pb-5'>
                    <div className="secondsection mt-0">
                        
                        <h1 className='heading-600-44-20 pt-3'>Our AMC Features</h1>
                        <p className="heading-400-16-14">From Machines to tools to finance everything you need in one place</p>

                    </div>
                </div>
                <div>
                </div>
                <div className='xmax-container'>
                <Slider {...settings}>
                {listofdata.map((product, index) => (
          <div className='slick-gap5 h-400'>
          {React.cloneElement(productCategory, {product ,index})}
            </div>
                              
                
                 ))}
                </Slider>
              </div>
            </div>
        </>
    );
};

export default SecondSection