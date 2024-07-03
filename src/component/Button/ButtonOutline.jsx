import React from 'react'
import './Button.css'
const ButtonOutline = ({message, callFunction}) => {
const onBtnClicked=()=>{
  if(callFunction){
    callFunction();
  }
  
}
  return (
   <button className='button-outline' onClick={onBtnClicked}>{message}</button>
  )
}

export default ButtonOutline