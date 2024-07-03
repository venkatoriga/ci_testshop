import React from 'react'
import NewsBlock from '../Block/NewsBlock';
import RightArrow from '../SubComponent/RightArrow';
const NetworkThirdSection = () => {
    const heading="Articles";
    // onClick={()=>navigate('/buy/product-listing',{state:{redirectPage:"store"}})}
    const newsBlock=<NewsBlock/>
    const listofdata=[{
        imageurl:"/asset/image1.png",
        title:"Maximize Healthcare Venture",
        message:"In India, one of the industries that is witnessing massive growth in entrepreneurship is the healthcare industry.",
        date:"15 May, 2023"
    },
    { imageurl:"/asset/image1.png",
    title:"Maximize Healthcare Venture",
    message:"In India, one of the industries that is witnessing massive growth in entrepreneurship is the healthcare industry.",
    date:"15 May, 2023"
    }]
  return (
    <div className='container-fluid bg-gray1 py-5'>
    <div className='max-container pt-5 pb-3'>
    <div className='d-flex justify-content-between'>
    <h1 className='heading-600-44-24 c-green'>{heading}</h1>
<div>
<div className="d-flex">
<p className='heading-600-14-12 v-center'>View All </p>
<div className='arrow-div ml-2' >
<RightArrow/>
</div> 
  </div>
</div>
    </div>
    <div className='row pt-5'>
    <div className='col col-md-6 col-12'>
    <NewsBlock product={listofdata[0]}/>
    </div>
    <div className='col col-md-6 hide-network-576'>
    <NewsBlock product={listofdata[1]}/>
    </div>
    
    </div>
   
    </div>
    </div>
  )
}

export default NetworkThirdSection