import React,{useState} from 'react'
import { Col } from 'react-bootstrap'
const Cart = () => {
  const [isHover,setIshover]=useState(false);  
  const onEnter=()=>{
setIshover(true);
  }
  const onLeave=()=>{
      setIshover(false)
  }
  return (
    <Col style={{paddingRight:'0'}} onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9.1071 20.0014C9.52868 20.0014 9.87045 19.6758 9.87045 19.2741C9.87045 18.8725 9.52868 18.5469 9.1071 18.5469C8.68551 18.5469 8.34375 18.8725 8.34375 19.2741C8.34375 19.6758 8.68551 20.0014 9.1071 20.0014Z" stroke={isHover?"#999e51":"#211E24"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.7946 20.0014C20.2162 20.0014 20.5579 19.6758 20.5579 19.2741C20.5579 18.8725 20.2162 18.5469 19.7946 18.5469C19.373 18.5469 19.0312 18.8725 19.0312 19.2741C19.0312 19.6758 19.373 20.0014 19.7946 20.0014Z" stroke={isHover?"#999e51":"#211E24"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 4H6.05339L8.34344 16.3636H20.557" stroke={isHover?"#999e51":"#211E24"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.3431 13.4544H20.2437C20.332 13.4544 20.4175 13.4253 20.4858 13.372C20.5541 13.3188 20.6009 13.2446 20.6182 13.1621L21.9922 6.61664C22.0033 6.56386 22.002 6.50939 21.9883 6.45717C21.9746 6.40495 21.9489 6.35627 21.9131 6.31466C21.8773 6.27304 21.8322 6.23952 21.7811 6.21652C21.73 6.19352 21.6742 6.1816 21.6177 6.18164H6.81641" stroke={isHover?"#999e51":"#211E24"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
</Col>
  )
}

export default Cart