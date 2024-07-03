import React, { useState } from "react";
import "./MachineSold.css";
import { soldAllIcon1, soldAllIcon2 } from "../../../helpers/Icons";
const MachineSold = ({ OrderList }) => {
  console.log('OrderList--->', OrderList?.sell_machine);
  const [hoveredItems, setHoveredItems] = useState([]);
  const handleMouseEnter = (index) => {
    setHoveredItems((prevHovered) => [...prevHovered, index]);
  };

  const handleMouseLeave = (index) => {
    setHoveredItems((prevHovered) => prevHovered.filter((item) => item !== index));
  };

  //   const machineData = [
  //     {image: "/asset/image-536.png",processStatus: "Sold",name: "CNC MACHINE",name1:"| Hitachi",processingWork:"Processing Paperwork",buttonText:"View Details",buyersText:"Buyers Name",buyersName:"Manoj Shah",amountRecived:"Amount Received",recivedText:"Received",paymentStatus:"Payment Status",status:"Recieved",transactionText:"Transaction ID",transID:"53574646",transDate:"Transaction Date",date:"11th June 2023"},
  //     {image: "/asset/image-536.png",processStatus: "Sold",name: "CNC MACHINE",name1:"| Hitachi",processingWork:"Processing Paperwork",buttonText:"View Details",buyersText:"Buyers Name",buyersName:"Manoj Shah",amountRecived:"Amount Received",recivedText:"Received",paymentStatus:"Payment Status",status:"Recieved",transactionText:"Transaction ID",transID:"53574646",transDate:"Transaction Date",date:"11th June 2023"},
  // ];
  return (
    <>
      {OrderList?.sell_machine?.map((machine, index) => (
        <div key={index} className={`max-container sold-wrap ${hoveredItems.includes(index) ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
          <div className="img-wrap-1">
            <img className="img-1" src={machine?.product_image && machine?.product_image[0]?.imageUrl
              ? machine?.product_image[0]?.imageUrl
              : (machine?.product_image && machine?.product_image[0] ? machine?.product_image[0] : "/asset/placeholder.png")}
            />
            {/* <img className="img-1" src={machine?.product_image[0] || "/asset/placeholder.png"} alt="cnc machine"/> */}
          </div>
          <div className="price-wrap">
            <div className="top">
              <div className="left-wrap">
                <button className="process-btn">{machine?.product_status}</button>
                <div className="name heading-600-20 heading-600-20-16">{machine?.product_name} <span className="heading-400-20 heading-400-20-14">{machine?.brand ? '|' + machine.brand : ''}</span></div>
                {/* <div className="paperwork">{machine.processingWork}</div> */}
              </div>
              <div className="right">
                {hoveredItems.includes(index) ? soldAllIcon1({ width: 388, height: 38 }) : soldAllIcon2({ width: 388, height: 38 })}
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-left-wrap">
                <div className="info"><span className="light-txt heading-400-12-10">Buyers Name</span><span className="info-heading heading-600-14 heading-600-14-12">{machine?.buyer_details?.first_name}</span></div>
                <div className="info"><span className="light-txt heading-400-12-10">Amount Received</span><span className="info-heading heading-600-14 heading-600-14-12">Received</span></div>
                <div className="info"><span className="light-txt heading-400-12-10">Payment Status</span><span className="info-heading heading-600-14 heading-600-14-12">{machine.status}</span></div>
                <div className="info"><span className="light-txt heading-400-12-10">Transaction ID</span><span className="info-heading heading-600-14 heading-600-14-12">{machine.transID}</span></div>
                <div className="info"><span className="light-txt heading-400-12-10">Transaction Date</span><span className="info-heading heading-600-14 heading-600-14-12">{machine.date}</span></div>
              </div>
              <div className="advance-info">
                <button className="view-btn" type="button" onClick={() => window.location = `/sell/MachineSold1?id=${machine?.pdid}`}>View Details</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


export default MachineSold;
