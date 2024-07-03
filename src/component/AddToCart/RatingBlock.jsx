import React from 'react'
import Heart from '../SubComponent/AllSvgs/Heart'
import GoldenStart from '../SubComponent/AllSvgs/GoldenStart'
import HalfGoldenStar from '../SubComponent/AllSvgs/HalfGoldenStar'
import { useState } from 'react'

const RatingBlock = ({imageurl,heading,price,rating}) => {
const [isHovered,setIsHovered]=useState(false);
const onHovered=()=>{
    setIsHovered(!isHovered)
}
  return (
    <div className={`row p-4   h-500 m-1 ${isHovered ? "bg-green border-8p shadow":''}`} onMouseEnter={onHovered} onMouseLeave={onHovered}>
        <div className="col  col-12 d-flex justify-content-end">
            <Heart fill={isHovered ? "#73509E":''}/>
        </div>
        <div className="col col-12 d-j-a">
            <div className='hw-216'>
            <img  src="asset/castrol.svg" alt="castrol.svg"/>
            </div>
        </div>
        <div className="col col-12 p-0 text-start">
            <h1 className={`heading-600-20-16 ${isHovered ? "bottom-halfline1":"bottom-halfline"}`}>Castrol Gear Oil 20 L EP</h1>
        </div>
        <div className="col col-6  p-0 text-start">
            <p className='heading-400-14-12 op-50 m-0'>Castrol</p>
            <div className='d-flex'>
                <div className='heading-400-16-14'>4.2</div>
                {[0,1,2,3].map(()=><div><GoldenStart/></div>)}
                <div><HalfGoldenStar/></div>
            </div>
        </div>
        <div className="col col-6 p-0">
        <div className='p-r text-end'>
            <p className='heading-600-20-16 m-0'>₹5,499</p>
            <p className='heading-400-14-12 op-80'>MRP<strike className='pl-1'> ₹6,499</strike> <span className='c-active heading-600-14-12'>66% Off</span></p> 
        </div>
        </div>
        <div className='col col-12 p-0 d-flex justify-content-start'>
           {isHovered && <button className='button'>Avail Service</button>} 
        </div>
    </div>
  )
}

export default RatingBlock