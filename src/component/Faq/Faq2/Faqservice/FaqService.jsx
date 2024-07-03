import React,{useState} from 'react'
import { Container,Image } from "react-bootstrap";
import './FaqService.css'
const FaqService = ({title,imageSource,index,onCallFun,activediv}) => {
 
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnterhandler = () => {
      setIsHovered(true)
    };
  
    const onMouseLeavehandler = () => {
      setIsHovered(false);
    };
  return (
    <Container fluid onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler} className={`m-0 mt-3 pt-2 faqservices  ${isHovered ? "hovered":""} ${activediv}`} key={index} onClick={onCallFun}>
<div className='op-50'>      {React.cloneElement(imageSource, { fill: isHovered ? "#FFF" : null })}</div>
    <p className={`faqservice-title mt-3 ${isHovered ? "hovered":""}`} style={{fontSize:"14px"}}>{title}</p>
    </Container>
  )
}

export default FaqService