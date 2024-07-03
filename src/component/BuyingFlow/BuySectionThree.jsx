import React from 'react'

import ImagewithTitlep from '../SubComponent/ImagewithTitlep/ImagewithTitlep';
import IBM from '../SubComponent/AllSvgs/IBM'
import Dell from '../SubComponent/AllSvgs/Dell'
import LG from '../SubComponent/AllSvgs/LG'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Services/Partners/index.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';

const BuySectionThree = () => {
// const ListOfBuySectionThree=[{
// imageurl:<IBM/>,
// title:"IBM"
// },{
//     imageurl:<Dell/>,
// title:"Dell"
// },{
// imageurl:<LG/>,
// title:'LG'},
//     {
//     imageurl:<IBM/>,
//     title:"IBM"
//     },{
//         imageurl:<Dell/>,
//     title:"Dell"
//     },{
//     imageurl:<LG/>,
//     title:'LG'}
// ]

  return (<>
   {/*
    <div className='container-fluid pt-5'>
    <section className="Partners_layout">
    <div className="max-container">
        <div className="container-fluid p-0 m-0 row">
            <div className="col  col-lg-12 p-0">
                <div className="main-heading typ-partner">
                <h2 className='heading-600-32-20'>Looking for a specific Brand?</h2>
                <p className='heading-400-16 op-60'>From Machines to tools to finance everything you need in one place</p>
                </div>
            </div>
        </div>
    </div>
    <div className="max-container">
        <Swiper
            slidesPerView={3}
            spaceBetween={0}
            navigation={{ // Set up Swiper's navigation options
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',

            }}
          
            modules={[Autoplay, Navigation]}
            // autoplay={{
            //     delay: 2000,
            // }}
            
            // loop={true}
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
                1024:{
                    slidesPerView: 5,
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
            
            {ListOfBuySectionThree.map((product, index) => (
                <SwiperSlide key={index}>
                <div className='col col-lg-2' key={index}>
                <ImagewithTitlep imageSource={product.imageurl} title={product.title} fillColor={"#007DB8"}/>
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
</div>
    */}
    </>
  )
}

export default BuySectionThree