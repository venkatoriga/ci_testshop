import React from "react";
import './ListofService.css'
import { Container } from "react-bootstrap";
import ImagewithTitlep from "./ImagewithTitlep";
const ListofService = () => {

  const services = [
    { title: "Buy Machine", imageSource: "buy_machine", message: 'Over 5000 Machines Available' },
    { title: "Sell Machine", imageSource: "sell_machine", message: 'Over 5000 Machines Available' },
    { title: "Servicing", imageSource: "Servicing", message: 'Over 5000 Machines Available' },
    { title: "Lease Equipment", imageSource: "lease_equipment", message: 'Over 5000 Machines Available' },
  ];
  return (
    <Container fluid className="row g-5 typ-m-auto">
      {
        services.map(({ title, imageSource, message }, index) =>
          <div className="col-lg-3 col-md-3 col-6">
            <ImagewithTitlep title={title} imageSource={imageSource} index={index} message={message} />
          </div>
        )
      }
    </Container>
  );
};

export default ListofService;
