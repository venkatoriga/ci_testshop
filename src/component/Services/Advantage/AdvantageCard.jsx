import React from "react";
import "../Advantage/index.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';

const advantageData = [
    {
        title: "Rapid response",
        description: "No additional calls for any service requests needed",
        image: "./advantage-responce.jpg",
    },
    {
        title: "Maximized service life",
        description: "No additional calls for any service requests needed",
        image: "./advantage-expert.jpg",
    },
    {
        title: "Fast Expert Support",
        description: "No additional calls for any service requests needed",
        image: "./advantage-support.jpg",
    },
    
];

const AdvantageCard = () => {
    return (
        <>
            <section className="lyt-Advanced-card">
                <div className="max-container">
                    <div className="container-fluid p-0 m-0 row">
                        <div className="col-lg-12 tablet-d-padding">
                            <div className="topContent container-fluid">
                                
                            </div>
                            <div className="main-heading " style={{ maxWidth: "820px" }}>
                                <h1>The Origa Advantage</h1>
                                <p className="">
                                    Our maintenance strategies are designed to be both efficient and cost-effective, enabling you to achieve optimal long-term performance of your plant.
                                </p>
                            </div>
                        </div>

                        {advantageData.map((advantage, index) => (
                            <div key={index} className="col-lg-4 pl-0 tab-hide">
                                <div className="mod-img-card">
                                    <div className="img-box">
                                        <img src={advantage.image} alt={advantage.title} />
                                    </div>
                                    <div className="bottom-content">
                                        <h2 className="title">{advantage.title}</h2>
                                        <p className="desc">{advantage.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="Advanced-card-mob-swiper">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={0}
                        navigation={{ // Set up Swiper's navigation options
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',

                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Navigation]}
                        // modules={[Pagination]}
                        autoplay={{
                            delay: 2000, // Autoplay with a 2-second delay
                            disableOnInteraction: false,
                        }}

                        loop={true}
                        className="mySwiper1"
                        breakpoints={{
                            280: {
                                slidesPerView: 1,

                            },
                            540: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 0
                            },
                        }}

                    >

                        {advantageData.map((advantage, index) => (
                            <SwiperSlide key={index} className="col-lg-4">
                                <div className="mod-img-card">
                                    <div className="img-box">
                                        <img src={advantage.image} alt={advantage.title} />
                                    </div>
                                    <div className="bottom-content">
                                        <h2 className="title">{advantage.title}</h2>
                                        <p className="desc">{advantage.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}



                        <div className="navigations">
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                        </div>

                    </Swiper>

                </div>
            </section>
        </>
    );
};

export default AdvantageCard;
