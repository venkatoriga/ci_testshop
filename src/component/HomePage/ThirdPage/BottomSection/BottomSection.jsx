import React from "react";
import classes from "./BottomSection.module.css";
import ServiceBlock from "./ServiceBlock/ServiceBlock";
import { Container } from "react-bootstrap";
import Button from "../../../Button/Button";
const BottomSection = () => {
  const data = [
    { title: "One Time Repair", message: "Avail transportation services from to get your machine moved tansportation services from to get your machine moved across", imageurl: "asset/maintenanceService1.jpeg", bottomTitle: "One Time Repair" },
    { title: "AMC", message: "Avail transportation services from to get your machine moved tansportation services from to get your machine moved across", imageurl: "asset/MaintenanceService2.png", bottomTitle: "AMC" },
    { title: "AMC", message: "Avail transportation services from to get your machine moved tansportation services from to get your machine moved across", imageurl: "asset/MaintenanceService3.jpg", bottomTitle: "AMC" },
    { title: "Logistics", message: "Avail transportation services from to get your machine moved tansportation services from to get your machine moved across", imageurl: "asset/maintenanceService1.jpeg", bottomTitle: "Logistics" },
  ];
  return (
    <Container fluid>
      <div className="row">
        {data.map((item, index) => (
          <>
            {/* <ServiceBlock key={index} pos={index} title={item.title} message={item.message} imageurl={item.imageurl} bottomTitle={item.bottomTitle} /> */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
              <div className={`${classes.servicescointainer} px-3 py-4`}>
                <div className={`row align-items-center ${classes.afterHover}`}>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12" >
                    <div className="serviceImg" style={{width: "474px",height: "359px"}}>
                      <img src={item.imageurl} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className={`container ${classes.serviceTitleContainer}`}>
                      <h1>{item.title}</h1>
                      <p>{item.message}</p>
                      <Button message={"Avail service"}></Button>
                    </div>
                    <h2 className={`float-end m-5 ${classes.serviceBottomTitle}`}>{item.bottomTitle}</h2>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </Container>
  );
};

export default BottomSection;
