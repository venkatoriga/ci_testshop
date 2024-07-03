import React, { useState } from "react";
import Delete from "../../SubComponent/AllSvgs/Delete";
import Checkbox from "../../SubComponent/AllSvgs/Checkbox";
const OrderSummarySection = ({ listofdata }) => {
  const [orderDone, setOrderDone] = useState(false);
const [onCheckBox,setOnCheckBox]=useState(true)
  const onClikeHandler = () => {
    setOrderDone(true);
  };
  const onCheckBoxHandler=(event)=>{
    setOnCheckBox(!onCheckBox);
    event.stopPropagation();
  }
  return (
    <div className="row border rounded mt-3">
      <div className="col col-md-12">
        <div className="row pt-3">
          <div className="col">
            <h3 className="heading-600-16">Order Summary</h3>
          </div>
        </div>
        <div className="border"></div>
      </div>
      <div className="pt-2"></div>
      {listofdata.map((listdata, index) => (
        <div className="col col-md-12" key={index}>
          <div className="row">
            <div className="col col-lg-6 col-6">
              <p className="heading-400-14-12 op-60">{listdata.title}</p>
            </div>
            <div className=" col col-lg-6 col-6 d-flex justify-content-end">
              <p className="heading-500-16 p-0">{listdata.price}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="col col-md-12 pt-3">
        <div className="row">
          <div className="col col-lg-6 col-6">
            {" "}
            <p className="heading-600-16">TOTAL AMOUNT</p>
          </div>
          <div className=" col col-lg-6 col-6 d-flex justify-content-end ">
            <p className="heading-600-16">₹39000</p>
          </div>
        </div>
      </div>

      <div className="col col-md-12 mt-1 pb-2 d-flex">
        <div className="d-j-a">
          {/*<img src='asset/check.svg' alt='check.svg'></img>*/}
          <div className="check-box d-j-a" onClick={onCheckBoxHandler}>
            <Checkbox fill={onCheckBox ? "#000000" :"#FFFFFF"}/>
          </div>
          <p className="heading-500-14 m-0"> &nbsp;Use GSTIN</p>
        </div>
        
        
          
        
      </div>

      {orderDone && (
        <div className="col col-11 h-center border border-4p">
          <div className="d-flex pt-2">
            <div className="col col-10 p-0">
              <h1 className="heading-600-16">ABC Enterprises Pvt Ltd</h1>
              <p className="heading-400-14 op-60">22AAAAA0000A1Z5</p>
            </div>
            <div className="col col-2">
              <Delete />
            </div>
          </div>
        </div>
      )}
      {!orderDone && (
        <div className="child-input-focus-none pt-2">
          <input placeholder="GST number" />

          <input className="mt-4" placeholder="Company Name" />
          <div className="col pt-5 d-flex justify-content-center">
            <button
              className="big-btn-outline heading-600-16-14"
              onClick={onClikeHandler}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="col pt-3 pb-5 d-flex justify-content-center">
        <button className="big-btn">Place Order (2 Products)</button>
      </div>
    </div>
  );
};

export default OrderSummarySection;
