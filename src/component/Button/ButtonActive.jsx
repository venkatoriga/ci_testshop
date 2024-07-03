import React from 'react'
import './Button.css'
const ButtonActive = ({message, callFunction}) => {
const onBtnClicked=()=>{
  if(callFunction){
    callFunction();
  }
  
}
  return (
   <button className='button-active' onClick={onBtnClicked}>{message}</button>
  )
}

export default ButtonActive