import React from 'react'
import Slider3 from '../SubComponent/AllSlider/Slider3/Slider3'
import ImageWithHP from '../SubComponent/ImageWithHP'
import RatingBlock from './RatingBlock'
const AddToCartSection3 = () => {
  return (
    <div>
    {/* top section */}
    <div className="max-container pt-5">
      <div className='row d-flex  pb-5'>
          <div className='col col-md-8 col-12 '>
          <img src="asset/OrigaService.png" alt='OrigaService.png'/>
          <h1 className='heading-600-44-20'>Often Purchased Together</h1>
          <p className='heading-400-16 op-80'>From Machines to tools to finance everything you need in one place</p>
          </div>
          <div className="col col-md-4 col-12 d-flex align-self-center justify-content-end">
          <p className='heading-600-16 align-self-center'>view Shop </p>
          <img src="asset/rightArrow.png" alt="rightArrow.png" />
            </div>
          </div>
      </div>
        {/* bottom section */}
    {/* <Slider3/> */}
    <div className='xmax-container d-flex over-hidden'>
      <RatingBlock/>
      <RatingBlock/>
      <RatingBlock/>
      <RatingBlock/>
  </div> 
    <div className='max-container'>
    <div className='row'>
   <div className='p-r d-flex justify-content-end'>
   <img src='asset/Frame1000004018.png' alt='Frame1000004018.png'/>
   </div>
    </div>
    </div>
    
    </div>
  )
}

export default AddToCartSection3