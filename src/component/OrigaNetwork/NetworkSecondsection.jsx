
import React from 'react'
import RightArrow from '../SubComponent/RightArrow';
const NetworkSecondsection = () => {
    
const advantageData = [
    {
        title:"Maximize Healthcare Venture",
        description: "10 Mantras to maximize Return On Investment of your healthcare venture!",
        image: "/asset/Blog1.png",
    },
    {
        
        title:"Maximize Healthcare Venture",
        description: "10 Mantras to maximize Return On Investment of your healthcare venture!",
        image: "/asset/Blog2.png",
    },
    {
       
        title:"Maximize Healthcare Venture",
        description: "10 Mantras to maximize Return On Investment of your healthcare venture!",
        image: "/asset/Blog3.png",
    },
    
];
  return (
    <div className='container-fluid py-5'>
    <div className='max-container pt-5 pb-5'>
    <div className='d-flex justify-content-between'>
    <h1 className='heading-600-44-24 c-green'>Blogs</h1>
<div>
<div className="d-flex">
<p className='heading-600-14-12 v-center'>View All </p>
<div className='arrow-div ml-2' >
<RightArrow/>
</div> 
  </div>
</div>
    </div>
   
   <div className='d-flex pt-5'>
   
    <div className="col col-lg-4 col-md-6 pl-0">
        <div className="row">
          
            <div className="col col-12">
                <img className='w-100' src={advantageData[0].image} alt={advantageData[0].image} />
            </div>
        
            <div className="col col-12 pt-3  pl-4 pr-5">
            
        <p className='heading-500-14 op-60 bg-gray1 w-fit' style={{padding:"10px 4px",borderRadius:"12px"}}>Healthcare</p>
                <p className="heading-400-14-12 op-60">{advantageData[0].datatime}</p>
                <p className="heading-400-16-14  text-wrap">{advantageData[0].description}</p>
                <div className='d-flex align-items-center'>
                <div><img src='/asset/userpic.png'/></div><p className='heading-500-12-10 op-60 m-0'>By Shrirang Tambe</p><p className='m-0 heading-400-12 op-60'>28th Oct, 2015 </p>
                </div>
                </div>
        </div>
    </div>

    <div className="col col-lg-4 col-md-6 hide-network-768">
    <div className="row">
      
        <div className="col col-12">
            <img className='w-100' src={advantageData[1].image} alt={advantageData[1].image} />
        </div>
    
        <div className="col col-12 pt-3  pl-4 pr-5">
        <p className='heading-500-14 op-60 bg-gray1 w-fit' style={{padding:"10px 4px",borderRadius:"12px"}}>Healthcare</p>
            <p className="heading-400-14-12 op-60">{advantageData[1].datatime}</p>
            <p className="heading-400-16-14 text-wrap">{advantageData[1].description}</p>
        <div className='d-flex align-items-center'>
        <div><img src='/asset/userpic.png'/></div><p className='heading-500-12 op-60 m-0'>By Shrirang Tambe</p><p className='m-0 heading-400-12 op-60'>28th Oct, 2015 </p>
        </div>
            </div>
        
    </div>
</div>

<div className="col col-lg-4 col-md-6 hide-network-576 ">
<div className="row">
  
    <div className="col col-12 ">
        <img className='w-100' src={advantageData[2].image} alt={advantageData[2].image} />
    </div>

    <div className="col col-12 pt-3  pl-4 pr-5 ">
    
    <p className='heading-500-14 op-60 bg-gray1 w-fit' style={{padding:"10px 4px",borderRadius:"12px"}}>Healthcare</p>
        <p className="heading-400-14-12 op-60">{advantageData[2].datatime}</p>
        <p className="heading-400-16-14 text-wrap">{advantageData[2].description}</p>
        <div className='d-flex align-items-center w-100'>
        <div><img src='/asset/userpic.png'/></div><p className='heading-500-12 op-60 m-0'>By Shrirang Tambe</p><p className='m-0 heading-400-12 op-60'>28th Oct, 2015 </p>
        </div>
        </div>
</div>
  </div>

   </div>
    </div>
    </div>
  )
}

export default NetworkSecondsection