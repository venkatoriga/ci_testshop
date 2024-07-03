import React,{useState} from 'react'
import { Col } from 'react-bootstrap'
const Phone = ({...res}) => {
  const [isHover,setIshover]=useState(false);  
  const onEnter=()=>{
setIshover(true);
  }
  const onLeave=()=>{
      setIshover(false)
  }
  return (
    <Col style={{paddingRight:'0'}} onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <svg xmlns="http://www.w3.org/2000/svg" {...res} fill="none" >
    <path d="M19.4996 16.5375C18.8888 15.9221 17.4096 15.0241 16.692 14.6622C15.7574 14.1914 15.6805 14.153 14.9459 14.6987C14.4559 15.0629 14.1302 15.3883 13.5567 15.266C12.9833 15.1437 11.7372 14.4541 10.6461 13.3665C9.55498 12.2788 8.8254 10.9966 8.70271 10.425C8.58002 9.85353 8.91078 9.53162 9.27153 9.04049C9.77997 8.34821 9.74151 8.23283 9.30691 7.29825C8.96808 6.57136 8.04389 5.10604 7.42623 4.49837C6.76549 3.84571 6.76549 3.96109 6.33973 4.13801C5.99312 4.28384 5.66059 4.46111 5.34632 4.6676C4.73096 5.07643 4.38943 5.41603 4.1506 5.92639C3.91176 6.43675 3.80446 7.63324 5.03787 9.87391C6.27128 12.1146 7.13662 13.2603 8.9277 15.0464C10.7188 16.8325 12.096 17.7928 14.1094 18.922C16.6001 20.3169 17.5554 20.045 18.0673 19.8066C18.5792 19.5681 18.9203 19.2297 19.3299 18.6143C19.537 18.3006 19.7146 17.9684 19.8607 17.622C20.038 17.1978 20.1534 17.1978 19.4996 16.5375Z" stroke={isHover?"#999e51":"#211E24"} strokeWidth="1.5" strokeMiterlimit="10"/>
  </svg></Col>
  )
}

export default Phone