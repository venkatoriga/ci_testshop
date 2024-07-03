import React, { useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import Button from '../../../Button/Button'
import './ImageWithTPB.css'
const ImageWithTPB = ({ title, para, imagurl }) => {
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
    <Container className={`homeCardBorder p-4`}>
      <div className="imagewithtpb">
        <Image src={imagurl} className='w-100 h-100'/>
      </div>
      <h1>{title}</h1>
      <p className={`bar`}>{para}</p>
      <Button message={"Search"} />
    </Container>
  )
}

export default ImageWithTPB