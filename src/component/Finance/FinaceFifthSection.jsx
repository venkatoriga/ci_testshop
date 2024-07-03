import React,{useRef} from "react";
import "../Services/Partners/index.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider from "react-slick";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import { leftArrowIcon,starIcon,rightArrowIcon ,searchIcon,botIcon} from "../../helpers/Icons";
const partnerData = [
    {
        title: "Yamaha",
        image: "/yamaha.png",
    },
    {
        title: "Hartford",
        image: "/hartford.png",
    },
    {
        title: "MAXMILLS",
        image: "/maxmill.png",
    },
    {
        title: "Hitachi",
        image: "/hitachi.png",
    },
    {
        title: "Yamaha",
        image: "/yamaha.png",
    },
    {
        title: "Hartford",
        image: "/hartford.png",
    },
    {
        title: "MAXMILLS",
        image: "/maxmill.png",
    },
    {
        title: "Hitachi",
        image: "/hitachi.png",
    }, {
        title: "Yamaha",
        image: "/yamaha.png",
    },
    {
        title: "Hartford",
        image: "/hartford.png",
    },
    {
        title: "MAXMILLS",
        image: "/maxmill.png",
    },
    {
        title: "Hitachi",
        image: "/hitachi.png",
    },
    {
        title: "Yamaha",
        image: "/yamaha.png",
    },
    {
        title: "Hartford",
        image: "/hartford.png",
    },
    {
        title: "MAXMILLS",
        image: "/maxmill.png",
    },
    {
        title: "Hitachi",
        image: "/hitachi.png",
    },
];

const FinaceFifthSection = ({title,para,searchHide,searchbtn}) => {
    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    const BuyerOptions = {
        autoplay: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.24,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1357, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 1258, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
            { breakpoint: 1080, settings: { slidesToShow: 2.4, slidesToScroll: 1 } },
            { breakpoint: 992, settings: { slidesToShow: 2.2, slidesToScroll: 1 } },
            { breakpoint: 933, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 843, settings: { slidesToShow: 1.8, slidesToScroll: 1 } },
            { breakpoint: 760, settings: { slidesToShow: 1.7, slidesToScroll: 1 } },
            { breakpoint: 725, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
            { breakpoint: 651, settings: { slidesToShow: 1.3, slidesToScroll: 1 } },
            { breakpoint: 567, settings: { slidesToShow: 1.4, slidesToScroll: 1 } },
            { breakpoint: 539, settings: { slidesToShow: 1.3, slidesToScroll: 1 } },
            { breakpoint: 517, settings: { slidesToShow: 1.2, slidesToScroll: 1 } },
            { breakpoint: 510, settings: { slidesToShow: 1.15, slidesToScroll: 1 } },
            { breakpoint: 461, settings: { slidesToShow: 1.1, slidesToScroll: 1 } },
            { breakpoint: 444, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            
        ]
    };

    const product=[{imgurl:"/asset/fuser1.png", name:"Ketan Joshi",post:"Madhu Engineering Works, Founder",message:"I recently bought two machines from ORIGA, one Tsugami, a top-notch Japanese model, and another top-quality Indian machine. When I learned they were in Chennai, I was worried about transportation logistics. But ORIGA made it hassle-free, providing an inspection report beforehand. Thanks to the ORIGA team's cooperation, I was tension-free throughout...",bottomMessage:"CNC Machine | Purchased on Feb 2021"},
    {imgurl:"/asset/fuser2.png",name:"Rahul Yadav",post:"Quality Officer at F2P-10",message:"Hello, as the Quality Officer at F2P-10, we recently engaged ORIGA services for the first time for our LMW and Ace MicroMatic VMC Turning machines. ORIGA presented us with comprehensive AMC packages, including preventive and breakdown services. We found their services to be both affordable and efficient. Their technicians were highly professional,...",bottomMessage:"CNC Machine | Purchased on Feb 2021"}
,{imgurl:"/asset/user.png",name:"SM Sowthri",post:"SM Design Engineering Works, Founder",message:"Located in Coimbatore, we opted to lease a machine from ORIGA. While banks typically involve a delay of 3-4 months in such processes, ORIGA surprised us by providing the leased machine within just 15 days. Their swift and efficient service was truly impressive.",bottomMessage:"CNC Machine | Purchased on Feb 2021"}
,{imgurl:"/asset/fuser4.png",name:"Dr.Vikram Kamath",post:"Vidli Restaurant Ltd. Owner",message:"I recently bought two machines from ORIGA, one Tsugami, a top-notch Japanese model, and anotherI recently bought two machines from ORIGA, one Tsugami, a top-notch Japanese model anotherI recently bought two machines from ORIGA, one Tsugami, a top-notch Japanese model, and anotherI recently bought two machines from ORIGA, ....",bottomMessage:"CNC Machine | Purchased on Feb 2021"}

]
    return (
        <>
            <section className="Partners_layout mt-60">
                <div className="max-container">
                    <div className="container-fluid p-0 m-0 row">
                        <div className="col-lg-12 tablet-d-padding">
                            <div className="main-heading typ-partner">
                            <img src="/OrigaPartner.svg" alt="OrigaPartner"/>
                                <h1 className="heading-600-24-20">{title}</h1>
                                <p className="heading-400-16-14 op-80">
                                   {para}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={0}
                        navigation={{ // Set up Swiper's navigation options
                            prevEl: '.f-swiper-button-prev',
                            nextEl: '.f-swiper-button-next',

                        }}
                      
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            delay: 2000,
                        }}
                        
                        loop={true}
                        className="mySwiperPartner"
                        breakpoints={{
                            400: {
                                slidesPerView: 2,
                                centeredSlides: false,
                               
                            },
                            767: {
                                slidesPerView: 3,
                               
                            },
                            992: {
                                slidesPerView: 4,
                                centeredSlides: false,
                                spaceBetween: 0
                            },
                            1200: {
                                slidesPerView: 6,
                                centeredSlides: false,
                                spaceBetween: 0
                            },
                             1400: {
                                slidesPerView: 8,
                                centeredSlides: false,
                                spaceBetween: 0
                            },
                        }}
                        >
                        {partnerData.map((partner, index) => (
                            <SwiperSlide key={index}>
                            <div  className="mod-partner">
                                <div className="img-box">
                                    <img src={partner.image} alt={partner.title} className="img-fluid"/>
                                </div>
                                <h2 className="title">{partner.title}</h2>
                            </div>
                            </SwiperSlide>
                        ))}
                        <div className="navigations" style={{marginTop:"0px"}}>
                            <div className="f-swiper-button-prev"></div>
                            <div className="f-swiper-button-next"></div>
                           
                        </div>
                    </Swiper>
                </div>
            </section>

          <div className="xmax-container fplr-25 mt-60-992">
            <div className="market-buyers-main" style={{overflow:"visible"}}>
                    <div className="container-fluid col-cust p-0">
                        <div className="max-container market-buyers-inner">
                            <div className="head">
                                <div className="heading-wrap">
                                <img src="/OrigaReviews.svg" alt="OrigaReviews"/>
                                    <div className="heading-600-32 heading-600-32-20 text-left">Customers Stories</div>
                                    <div className="heading-400-14-12 light-txt f-cust-para line-height-26">From Machines to tools to finance everything you need in one place</div>
                                </div>
                                <div className="f-slider-button-wrap">
                                    <button className="slider-button" onClick={previous}>{leftArrowIcon({ width: 24, height: 24 })}</button>
                                    <button className="slider-button" onClick={next}>{rightArrowIcon({ width: 24, height: 24 })}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                <div className="f-main-slider-wrap">
                    <Slider ref={sliderRef} {...BuyerOptions} className="cust-slider">
                        {product.map((item,index) => (
                            <div key={index} className="story-card-item">
                           
                                <div className="main-content-wrap">
                                    <div className="story-top-wrap">
                                        <div className="user-wrap">
                                            <img src={item.imgurl} className="user-img" />
                                            <div className="user-info">
                                                <div className="heading-600-16-14">{item.name}</div>
                                                <div className="f-heading-400-10">{item.post}</div>
                                            </div>
                                        </div>
                                        <div className="star heading-400-14-12">
                                            <span className="heading-500-12-10">4 Stars</span>
                                            {starIcon({ width: 24, height: 24, fill: "#000" })}
                                        </div>
                                    </div>
                                    <div className="story-message-container">
                                    <div className="f-stories-message heading-400-12-10 op-80">{item.message}</div>
                                    <div className="f-heading-400-10 pt-16">{item.bottomMessage}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
        {/* {!searchHide &&<div className="search-bar-wrappper p-r searchbar-m-60">
             
              
              <div className="search-bar">
                    <div class="searchbar-icon">{searchIcon({width:20,height:20})}</div>
                    <input type="text" className='heading-400-16-12 get-input' placeholder='Which Machine do you wish to Sell?'/>
                    <button type='button' className='f-button heading-600-16-14'>{searchbtn}</button>
                   
                </div>  
            </div>} */}
        </>
    )
}

export default FinaceFifthSection;
