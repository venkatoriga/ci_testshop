import React from "react";
// import SwiperCore, { Swiper, Navigation } from 'swiper/core';
// import 'swiper/css';
// import 'swiper/css/navigation';
import "../Partners/index.css";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';

// Initialize Swiper modules
// SwiperCore.use([Navigation]);

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
    },
];

const Partners = () => {
    return (
        <>
            <section className="Partners_layout pb-5 mb-5">
                <div className="max-container">
                    <div className="container-fluid p-0 m-0 row">
                        <div className="col-lg-12 tablet-d-padding">
                            <div className="main-heading typ-partner">
                                <h1 className="heading-600-32-20">Our OEM Partners</h1>
                                <p className="">
                                    From Machines to tools to finance everything you need in one place
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xmax-container">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={0}
                        navigation={{ // Set up Swiper's navigation options
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',

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
                        <div className="navigations">
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                           
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default Partners;
