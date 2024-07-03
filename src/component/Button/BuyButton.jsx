import React from 'react'
import './Button.css'
const BuyButton = ({message, callFunction}) => {
const onBtnClicked=()=>{
  if(callFunction){
    callFunction();
  }
  
}
  return (
   <button className='buy-button' onClick={onBtnClicked}>{message}</button>
  )
}

export default BuyButton