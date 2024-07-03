import React, { useState } from "react";
import img1 from "../assets/carouselimg/image1.png";
import "./ninth.css";
const Ninth = ({topSliderData,bottomSliderData,product}) => {
  const [isSmallscreen]=useState(window.innerWidth<992);
 
  return (
    <>
       <div className="container-fluid liner-background-50 margin-b5-hide" >
    <div className="xmax-container p-0 ">
    <div className="r-max-container ">
      <div className=" row">
        <div className="col-sm-12 col-lg-6 d-flex align-items-center py-5" style={{backgroundColor:"#F5F5F5"}}>
          
          <div className={`row p-0 m-0 `}>
            <div className="col col-lg-10 col-12 p-0">
            
            <h1 className="heading-600-44-20 ">{product.heading} </h1>
            <p className="heading-400-16-14 op-80 ">
             { product.para}
            </p>
            </div>
          </div>
         
        </div>
        <div className="col col-lg-6 col-12 p-0 py-5 bg-white-gray">

<marquee direction="left" scrolldelay="150">
<div className="d-flex">
{topSliderData.map((e) => (
                 <div className="b">
                   <div className="marquee_image">
                     <img className="w-100 h-100" src={img1} alt="img1" />
                   </div>
                  <p
                    className="fs-5 text-center pninthbar m-3"
                     style={{ fontWeight: 500 }}
                   >
                     {e.message}
                   </p>
                 </div>
               ))}
               </div>
</marquee>
              <div className="pt-5">

  <marquee direction="right" scrolldelay="150">
<div className="d-flex">
{bottomSliderData.map((e) => (
                 <div className="b">
                   <div className="marquee_image">
                     <img className="w-100 h-100" src={img1} alt="img1" />
                   </div>
                  <p
                    className="fs-5 text-center pninthbar m-3"
                     style={{ fontWeight: 500 }}
                   >
                     {e.message}
                   </p>
                 </div>
               ))}
               </div>
 </marquee>
              </div>
        </div>
       
      </div>
      </div>
    </div>
    </div>
    </>

  );
};

export default Ninth;
