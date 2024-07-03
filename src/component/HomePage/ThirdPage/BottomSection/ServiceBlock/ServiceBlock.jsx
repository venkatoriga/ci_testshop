import React, { useState } from 'react';
import './ServiceBlock.css';
import Button from '../../../../Button/Button'
import { Container, Image } from 'react-bootstrap';
const ServiceBlock = ({ title, message, imageurl, bottomTitle, pos }) => {
  const [posi, setPosi] = useState(pos % 2 === 0);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterhandler = () => {
    setIsHovered(true);
  };
  const onMouseLeavehandler = () => {
    setIsHovered(false);
  };

  return (
    <Container fluid className={`serviceblockmaindiv ${isHovered ? "hovered" : ""}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
      {posi && <Container fluid className="innerdiv">
        <Container fluid className="imagediv">
          <Image src={imageurl} alt={imageurl} />
        </Container>

        <Container fluid className={`details ${isHovered ? "hovered" : ""}`}>
          <h1>{title}</h1>
          <p>{message}</p>
          <Button message={"Avail Service"} />
        </Container>
        <Container fluid className={`bottomdiv ${isHovered ? "hovered" : ""}`}>
          <h1 className="bottomTitleLeft">{bottomTitle}</h1></Container>
      </Container>
      }
      {!posi && <Container fluid className="innerdiv">
        <Container fluid className="imagediv">
          <Image src={imageurl} alt={imageurl} />
        </Container>

        <Container fluid className={`details ${isHovered ? "hovered" : ""}`}>
          <h1>{title}</h1>
          <p>{message}</p>
          <Button message={"Avail Service"} />
        </Container>
        <Container fluid className={`bottomdiv ${isHovered ? "hovered" : ""}`}>
          <h1 className="bottomTitleLeft">{bottomTitle}</h1></Container>
      </Container>}
    </Container>
  )
}

export default ServiceBlock