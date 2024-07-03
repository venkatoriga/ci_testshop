import React,{useRef} from 'react';
import {quickPaymentIcon,largeNetworkIcon,completeSupportIcon,rightArrowIcon, leftArrowIcon} from "../../../helpers/Icons";
import './FourSection.css';
import Slider from 'react-slick';
import LeftArrow from '../../SubComponent/LeftArrow';
import RightArrow from '../../SubComponent/RightArrow';
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
  
const FourSection = () => {
    const sliderRef = useRef(null);

    const advantageData = [
        {title: "Uncover Your Machine's True Worth",description: "Rely on our expert team to assess your machine accurately, providing you with the optimal value for your equipment.",icon: "quick-payment"},
        {title: "Nationwide Market Reach",description: "Gain access to buyers across India, leveraging the network effect for maximum exposure",icon: "large-network"},
        {title: "Real-time Updates via WhatsApp",description: "Once you get in touch with us we will handle things till your machine is delivered",icon: "complete-support"}
    ];
    const getSVGIcons = (icon) => {
        if(icon == "quick-payment"){
            return quickPaymentIcon({width:54,height:54});
        }else if(icon == "large-network"){
            return largeNetworkIcon({width:54,height:54});
        }else if(icon == "complete-support"){
            return completeSupportIcon({width:54,height:54});
        }
    }
    const product_images = [
        {is_product_images: true},
        {
            images :[
                { product: "asset/unused-machine.png", name: "CNC / VMC", description: ""},
                { product: "asset/working-condition.png", name: "Injection Moulding", description: ""},
                { product: "asset/not-working.png", name: "Medical Equipment", description: ""}
            ]
        }
    ];
    const options = {
        autoplay: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
 
    return (
        <>
            <div className="container-fluid sectionfour">
                <div className="max-container padding-tb80">
                    <div className="row">
                        {advantageData.map((advantage,index) => (
                            <div key={index} className="col-lg-4">
                                <div className="cust-box-card">
                                    <div className="svg-icon">{getSVGIcons(advantage.icon)}</div>
                                    <div className="title heading-600-18">{advantage.title}</div>
                                    <div className="desc heading-400-16 heading-400-16-14">{advantage.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-3">
                <div className="max-container">
                    <div className='row pb-5'>
                        <div className='col col-lg-8 col-12 left-section'>
                        
                            <div className='heading heading-600-44-20'>Select a Category</div>
                            <div className='heading-400-16-14 op-80'></div>
                        </div>
                        <div className="col col-lg-4 d-flex align-self-center end-to-center view-shop-button">
                            <p className='heading-600-14-12 v-center' onClick={() => {window.location = "/sell/machine-detail"}}>View Shop</p>
                            <div className='arrow-div ml-2'  onClick={() => {window.location = "/sell/machine-detail"}}>{rightArrowIcon({width:24,height:24})}</div> 
                        </div>
                    </div>
                </div>
            </div>
            {product_images[0].is_product_images && (
                <div className="main-slide-wrap pb-mob-5rem">
                    <Slider {...options} ref={sliderRef}>
                        {product_images[1].images.map((product,index) => (
                            <div key={index} className="slider-card-item p-4">
                                <div className="prodcut-img-wrap">
                                    <img src={product.product} alt="" className="product-img"/>
                                </div>
                                <div className="contents-wrap">
                                    <div className="product-name">{product.name}</div>
                                    <div className="heading-400-16-12">{product.description}</div>
                                    <button className="avail-btn" onClick={() => {window.location = "/sell/machine-detail"}}>Sell Now</button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </>
    );
}
export default FourSection;
