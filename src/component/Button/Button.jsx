import React from 'react'
import './Button.css'
const Button = ({message, callFunction}) => {
const onBtnClicked=()=>{
  if(callFunction){
    callFunction();
  }
  
}
  return (
   <button className='button' onClick={onBtnClicked}>{message}</button>
  )
}

export default Button