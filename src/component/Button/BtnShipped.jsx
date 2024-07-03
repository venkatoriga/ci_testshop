import React from 'react'
import './Button.css'
const BtnShipped = ({message, callFunction}) => {
const onBtnClicked=()=>{
  if(callFunction){
    callFunction();
  }
  
}
  return (
   <button className='button-shipped' onClick={onBtnClicked}>{message}</button>
  )
}

export default BtnShipped