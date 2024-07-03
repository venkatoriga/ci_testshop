import React, { useState } from 'react'
import RightArrow from '../SubComponent/RightArrow';
const NetworkFourthSection = () => {
    const [ishover,setIsHover]=useState(false);
    const [ishover1,setIsHover1]=useState(false);
    const [ishover2,setIsHover2]=useState(false);
const advantageData = [
    {
        title:"Maximize Healthcare Venture",
        description: "10 Mantras to maximize Return On Investment of your healthcare venture!",
        image: "/asset/Upcomming3.png",
    },
    {
        
        title:"Maximize Healthcare Venture",
        description: "10 Mantras to maximize Return On Investment of your healthcare venture!",
        image: "/asset/Upcomming2.png",
    },
    {
       
        title:"Maximize Healthcare Venture",
        description: "10 Mantras to maximize Return On Investment of your healthcare venture!",
        image: "/asset/Upcomming1.png",
    },
    
];
  return (
    <div className='container-fluid py-5'>
    <div className='max-container pt-5'>
    <div className='d-flex justify-content-between'>
    <h1 className='heading-600-44-24 c-green'>Upcoming Events</h1>
<div>
<div className="d-flex">
<p className='heading-600-14-12 v-center'>View All </p>
<div className='arrow-div ml-2' >
<RightArrow/>
</div> 
  </div>
</div>
    </div>
   
   <div className='d-flex gap-2 pt-5'>
   
    <div className="col col-lg-4 col-md-6 ">
        <div className={`row curser-pointer shadow2`} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
          
            <div className="col col-12 p-0" >
                <img className='w-100' src={advantageData[0].image} alt={advantageData[0].image} />
            </div>
        
            <div className={`col col-12 ${ishover ? "networok-event-hover":"networok-event"}`}>
            <div className='d-flex justify-content-between align-items-center bottom-border-network '>
                <div className={`p-r network-div ${ishover ? "network-div-hover":""}`}>
                <p className='heading-600-24 m-0'>18</p>
                <p className='heading-400-16-12 op-80'>SEP</p>
                </div>
                <div ><span className='heading-400-16 op-80'>Time</span><span className='heading-400-16-14'>4:00 pm</span></div>
                <div ><span className='heading-400-16 op-80'>Place </span><span className='heading-400-16-14'>Mumbai </span></div>
            </div>
                <p className="heading-400-14-12 op-60">{advantageData[0].datatime}</p>
                <p className="heading-400-16-14  text-wrap">{advantageData[0].description}</p>
                <div className='d-flex align-items-center'>
               
                </div>
                </div>
        </div>
    </div>

    <div className="col col-lg-4 col-md-6 hide-network-768 ">
    <div className={`row curser-pointer shadow2`} onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)}>
          
            <div className="col col-12 p-0" >
                <img className='w-100' src={advantageData[0].image} alt={advantageData[0].image} />
            </div>
        
            <div className={`col col-12 ${ishover1 ? "networok-event-hover":"networok-event"}`}>
            <div className='d-flex justify-content-between align-items-center bottom-border-network '>
                <div className={`p-r network-div ${ishover1 ? "network-div-hover":""}`}>
                <p className='heading-600-24 m-0'>18</p>
                <p className='heading-400-16-12 op-80'>SEP</p>
                </div>
                <div ><span className='heading-400-16 op-80'>Time</span><span className='heading-400-16-14'>4:00 pm</span></div>
                <div ><span className='heading-400-16 op-80'>Place </span><span className='heading-400-16-14'>Mumbai </span></div>
            </div>
                <p className="heading-400-14-12 op-60">{advantageData[0].datatime}</p>
                <p className="heading-400-16-14  text-wrap">{advantageData[0].description}</p>
                <div className='d-flex align-items-center'>
               
                </div>
                </div>
        </div>
</div>

<div className="col col-lg-4 col-md-6 hide-network-576 ">
<div className={`row curser-pointer shadow2`} onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)}>
          
            <div className="col col-12 p-0" >
                <img className='w-100' src={advantageData[0].image} alt={advantageData[0].image} />
            </div>
        
            <div className={`col col-12 ${ishover2 ? "networok-event-hover":"networok-event"}`}>
            <div className='d-flex justify-content-between align-items-center bottom-border-network '>
                <div className={`p-r network-div ${ishover2 ? "network-div-hover":""}`}>
                <p className='heading-600-24 m-0'>18</p>
                <p className='heading-400-16-12 op-80'>SEP</p>
                </div>
                <div ><span className='heading-400-16 op-80'>Time</span><span className='heading-400-16-14'>4:00 pm</span></div>
                <div ><span className='heading-400-16 op-80'>Place </span><span className='heading-400-16-14'>Mumbai </span></div>
            </div>
                <p className="heading-400-14-12 op-60">{advantageData[0].datatime}</p>
                <p className="heading-400-16-14  text-wrap">{advantageData[0].description}</p>
                <div className='d-flex align-items-center'>
               
                </div>
                </div>
        </div>
  </div>

   </div>
    </div>
    </div>
  )
}

export default NetworkFourthSection