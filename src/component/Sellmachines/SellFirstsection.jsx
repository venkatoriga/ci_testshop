import React from "react";
import { Container } from "react-bootstrap";
import OrigaService from "../OrigaService/OrigaService";
import HeadingPara from "../HeadingPara/HeadingPara";
import VectorBlock from "../Vector/VectorBlock";
const FirstSection = () => {
  const heading = "Origa Maintenance Service";
  const para =
    "Our efficient and cost-effective maintenance strategies help you to ensure top plant performance for the long term.";
  return (
    <Container fluid className="firstsection-maindiv">
      <Container className="firstsection">
        <Container className="firstsection-left" style={{marginBottom:"7rem"}}>
          <Container
            fluid
            className="firstsection-left-top"
            style={{ paddingRight: 0 }}
          >
            <OrigaService />
            <HeadingPara heading={heading} para={para} />
          </Container>
        </Container>

        <Container className="firstsection-right">
          <img src="asset/image555a.png" alt="image536a.png" />
        </Container>
      </Container>
    </Container>
  );
};

export default FirstSection;
