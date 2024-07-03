import React from 'react'
import './Second.css';
import ListofService from './ListofService';
import LookingForBuySell from './LokkingBuySell/LookingForBuySell';
const SecondPage = ({product,productData}) => {
  return (
    <div className='container-fluid p-0'>
    <div className='max-container'>
      <div className="secondsection pt-4">
        
        <h1 className='heading-600-44-20 text-center'>{product.heading}</h1>
        <p className="heading-400-16 text-center op-80">{productData.para}</p>
        <div className='w-100 p-0 m-0 pt-5'>
        <div className="container-fluid p-0 m-0 row d-flex j-content-between-center ">
        <ListofService services={productData}/>
        </div>
        </div>
      </div>
      </div>
      <div className='container-fluid p-0 liner-background-r'>
      <div className='max-container pb-4'>
      <LookingForBuySell />
     
      </div>
      </div>
   
    </div>

  )
}

export default SecondPage