import React from 'react'
import Slider from "react-slick";
const BuySectionFive = () => {

    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        arrows: false
      };
    const fiveSectionDetails=[{
        imageurl:"asset/image276-1.png",
        title:'Wood Working'
    },
{
    imageurl:"asset/image277.png",
    title:'Food Processing'
},
{
    imageurl:"asset/image276-1.png",
    title:'Wood Working'
},
{
    imageurl:"asset/image277.png",
    title:'Food Processing'
}
]
  return (
    <div className='container-fluid liner-background-h-f mt-5'>
    <div className='max-container pt-5'>
    <div className="container-fluid p-0 pb-5 m-0 row justify-content-between">
    <div className="col-lg-5 col-md-12 col-sm-12 p-0">
     <div className=" d-flex align-items-center justify-content-center w-100 h-100 py-5">
        <div className="l">
    
        <h1 className='heading-600-44-20'>What Category are you looking for?</h1>
        <p className='heading-400-16 op-80'>Browse through our machine catalogues in various categories of machine types</p>
        </div>
   </div>
    </div>
    <div className="col-lg-6 col-md-12 col-sm-12 ">
      <div className="row g-4 mt-auto mb-auto">
        <div className="col-lg-12 col-md-12 col-12 p-0">
          <Slider {...settings}>
            {fiveSectionDetails.map((product,index) => (
              <div  key={index}>
                <div className='p-3'>
                  <div><img className="w-100 " src={product.imageurl} alt="img1" /></div>
                 <div><p className="heading-500-18-14 c-green text-center pninthbar m-3">{product.title}</p></div>
                </div>    
              </div>
            ))}
          </Slider>
        </div>
       
      </div>
    </div>
  </div>
    </div>
    </div>
  )
}

export default BuySectionFive