import React, { useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import './ImagewithTppb.css'
import Button from '../../Button/Button'
const ImageWithTppb = ({ title, para, price, imgurl, time }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterhandler = () => {
    setIsHovered(true);
    console.log("i am working");
  };

  const onMouseLeavehandler = () => {
    setIsHovered(false);
    console.log("i am not working");
  };

  return (
    <Container fluid className={`imagewithtppb ${isHovered ? "hovered" : ""}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler} >
      <div>{isHovered && <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
        <path d="M13.5085 24L2.05049 12.9454C-4.17669 6.31258 4.97726 -6.42236 13.5085 3.88056C22.0397 -6.42236 31.1522 6.3568 24.9665 12.9454L13.5085 24Z" fill="#73509E" />
      </svg>
      }{!isHovered && <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
        <path d="M24.0283 2.76422C26.3092 5.18627 26.8945 9.41084 24.2538 12.2434L13.5085 22.6105L2.76321 12.2435C0.0998985 9.38695 0.689465 5.16287 2.97171 2.7491C4.08934 1.56707 5.55629 0.890425 7.16642 1.01469C8.78033 1.13924 10.7224 2.08382 12.7383 4.51833L13.5085 5.44851L14.2787 4.51833C16.2947 2.08366 18.2337 1.14261 19.8431 1.02103C21.4488 0.899737 22.9122 1.57902 24.0283 2.76422Z" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
      </svg>}
      </div>
      <Image src={imgurl} />
      <h1 className={`imagewithtppb-h1 ${isHovered ? "hovered" : ""}`}>{title}</h1>
      <p className="imagewithtppbpara">{para}</p>
      <Container fluid className="imagewithtppbcontainer">
        <Container fluid className={`imagewithtppbtime ${isHovered ? "hovered" : ""}`}><p>{time}</p></Container>
        <Container fluid><p className={`imagewithtppbprice ${isHovered ? "hovered" : ""}`}>{price}</p></Container>
      </Container>
      <Button message={"Avail Service"} />
    </Container>
  )
}

export default ImageWithTppb