import React from 'react'
import './Finance.css'
const FinancefirstSection = ({topSliderData,bottomSliderData,product}) => {
  return (
    <div className="container-fluid liner-background-50 " >
    <div className="xmax-container p-0 ">
    <div className="r-max-container ">
      <div className=" row">
        <div className="col-sm-12 col-lg-6 d-flex align-items-center marquee-din-padding" style={{backgroundColor:"#F5F5F5"}}>
          
          <div className={`row p-0 m-0 `}>
            <div className="col col-lg-10 col-12 p-0">
            <img src={product.imgurl} alt={product.imgurl} />
            <h1 className="heading-600-24-20 ">{product.heading} </h1>
            <p className="heading-400-16-14 op-80 m-0">
             { product.para}
            </p>
            </div>
          </div>
         
        </div>
        <div className="col col-lg-6 col-12 p-0 pt-5 pb-4 bg-white-gray">

<marquee direction="left" scrolldelay="150" scrollamount="15">
<div className="d-flex">
{topSliderData.map((e) => (
                 <div className="f-marquee-div">
                   <div className="marquee_image-f">
                     <img className="w-100 h-100" src={e.imgsrc} alt="img1" />
                   </div>
                  <p
                    className="fs-5 text-center pninthbar m-3 c-green"
                     style={{ fontWeight: 500 }}
                   >
                     {e.message}
                   </p>
                 </div>
               ))}
               </div>
</marquee>
              <div className="pt-3">

  <marquee direction="right" scrolldelay="150" scrollamount="15">
<div className="d-flex">
{bottomSliderData.map((e) => (
                 <div className="f-marquee-div">
                   <div className="marquee_image-f">
                     <img className="w-100 h-100" src={e.imgsrc} alt="img1" />
                   </div>
                  <p
                    className="fs-5 text-center pninthbar m-3 c-green"
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
  )
}

export default FinancefirstSection