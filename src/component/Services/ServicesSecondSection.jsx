import React from "react";
import OrigaService from "../OrigaService/OrigaService";
import { Container } from "react-bootstrap";
const ServicesSecondSection = () => {
  return (
    <Container fluid>
      <Container className="secondsection">
        <div>
          {" "}
          <OrigaService />
        </div>
        <h1>The Services offered by Us</h1>
        <p className="para">
          From Machines to tools to finance everything you need in one place
        </p>
      </Container>
    </Container>
  );
};

export default ServicesSecondSection;
