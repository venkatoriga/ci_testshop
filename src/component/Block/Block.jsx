import React, { useState } from 'react'
import './Block.css'
const Block = ({product,index}) => {
  // console.log("Block data==>>",product);
  const {imageUrl,heading,message}=product;
  const [iSshadow]=useState(window.innerWidth<=767)
  // console.log("Block data imageUrl==>>",imageUrl,"Heading==>>",heading);
  return (
    <div className={`block-home p-2 ml-3 m-0 ${iSshadow ? "shadow1":""} my-2`} key={index}>
      <div >
  <img src={imageUrl} alt={imageUrl} />
      </div>
      <h2 className='heading-600-16'>{heading}</h2>
      <p className='heading-400-16-12 op-60'>{message}</p>
    </div>
  )
}

export default Block