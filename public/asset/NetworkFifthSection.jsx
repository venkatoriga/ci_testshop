import React from 'react'
import RightArrow from '../SubComponent/RightArrow';
const NetworkFifthSection = () => {
    
const advantageData = [
    {
        datatime:"10 hours ago | 2 min read",
        description: "Indian paints & coatings industry estimated to grow to Rs one lakh crore in next 5 years",
        image: "/asset/networknews1.png",
    },
    {
        
        datatime:"10 hours ago | 2 min read",
        description: "Indian paints & coatings industry estimated to grow to Rs one lakh crore in next 5 years",
        image: "/asset/networknews2.png",
    },
    {
       
        datatime:"10 hours ago | 2 min read",
        description: "Indian paints & coatings industry estimated to grow to Rs one lakh crore in next 5 years",
        image: "/asset/event_b.png",
    },
    
];
  return (
    <div className='container-fluid bg-gray1 pb-5'>
    <div className='max-container pt-5'>
    <div className='d-flex justify-content-between'>
    <h1 className='heading-600-44-24 c-green'>Latest news</h1>
<div>

<div className="d-flex">

<p className='heading-600-14-12 v-center'>View All </p>
<div className='arrow-div ml-2' >
<RightArrow/>
</div> 
  </div>

</div>
    </div>
   
   <div className='d-flex pt-5 '>
   
    <div className="col col-lg-4 col-md-6 pl-0">
        <div className="row">
          
            <div className="col col-12">
                <img className='w-100' src={advantageData[0].image} alt={advantageData[0].image} />
            </div>
        
            <div className="col col-12 pt-3  pl-4 pr-5">
        
                <p className="heading-400-14-12 op-60">{advantageData[0].datatime}</p>
                <p className="heading-600-14-12  text-wrap">{advantageData[0].description}</p>
            </div>
        </div>
    </div>

    <div className="col col-lg-4 col-md-6 hide-network-768">
    <div className="row">
      
        <div className="col col-12">
            <img className='w-100' src={advantageData[1].image} alt={advantageData[1].image} />
        </div>
    
        <div className="col col-12 pt-3  pl-4 pr-5">
            <p className="heading-400-14-12 op-60">{advantageData[1].datatime}</p>
            <p className="heading-600-14-12 text-wrap">{advantageData[1].description}</p>
        </div>
    </div>
</div>

<div className="col col-lg-4 col-md-6 hide-network-576 ">
<div className="row">
  
    <div className="col col-12 ">
        <img className='w-100' src={advantageData[2].image} alt={advantageData[2].image} />
    </div>

    <div className="col col-12 pt-3  pl-4 pr-5 ">
        <p className="heading-400-14-12 op-60">{advantageData[2].datatime}</p>
        <p className="heading-600-14-12 text-wrap">{advantageData[2].description}</p>
    </div>
</div>
  </div>

   </div>
    </div>
    </div>
  )
}

export default NetworkFifthSection