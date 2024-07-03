import React from 'react'
import './Button.css'
/* const Button = ({message, callFunction}) => {
const onBtnClicked=()=>{
  if(callFunction){
    callFunction();
  }
  
}
  return (
   <button className='button' onClick={onBtnClicked}>{message}</button>
  )
}

export default Button */


const EmailButton = ({ subject, body }) => {
    const emailAddress = 'info@origa.market'; 
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <a href={mailtoLink} style={{ textDecoration: 'none' }}>
            <button className='button'>Join our Team</button>
        </a>
    );
};

export default EmailButton;