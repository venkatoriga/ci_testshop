
 import React from 'react'
import './Block.css'
const  BuyBlock = ({product,index,shadow}) => {
  // console.log("Block data==>>",product);
  const {imageUrl,heading,message}=product;
  // console.log("Block data imageUrl==>>",imageUrl,"Heading==>>",heading);
  return (
    <div className={`block-home p-3 m-0 ${shadow ? "shadow1":""}`} style={{backgroundColor:"#F5F5F5"}} key={index}>
      <div >
  <img src={imageUrl} alt={imageUrl} />
      </div>
      <h2 className='heading-600-16'>{heading}</h2>
      <p className='heading-400-16-12 op-60'>{message}</p>
    </div>
  )
}

export default  BuyBlock