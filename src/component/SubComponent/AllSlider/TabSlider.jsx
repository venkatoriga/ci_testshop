import React from 'react'
import Slider from "react-slick";
const TabSlider = ({ children ,breakpoints}) => {
    const settings = {
        infinite:false,
        arrows: false,
        speed: 500,
        slidesToShow: breakpoints.def, 
        slidesToScroll: 1,
        responsive: [
           
          {
                breakpoint: 992, 
                settings: {
                  slidesToShow: breakpoints.a,
                },
              },
          {
            breakpoint: 768, 
            settings: {
              slidesToShow: breakpoints.b,
            },
          },
          {
            breakpoint: 576, 
            settings: {
              slidesToShow: breakpoints.c,
            },
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: breakpoints.d,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: breakpoints.e,
            },
          },
        ],
      };
  return (
    <div className='container-fluid p-0'>
<Slider {...settings}>
{ children }
    </Slider>
    </div>
    
  )
}

export default TabSlider