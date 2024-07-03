import React from 'react'
import './Button.css'
const ViewAllButton = ({message, callFunction}) => {
    
    const onBtnClicked=()=>{
        if(callFunction){
          callFunction();
        }
        
      }
        return (
         <button className='viewallbtn' onClick={onBtnClicked}>{message}</button>
        )
}

export default ViewAllButton