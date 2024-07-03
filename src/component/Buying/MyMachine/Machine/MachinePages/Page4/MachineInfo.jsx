import React from "react";
import "./MachineInfo.css";
import {progressIcon} from "../../../../../../helpers/Icons";
const MachineInfo = () => {
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-info-3">
                        <div className="machine-item">
                            <div className="inner-item">
                                <div className="heading-wrap">
                                    <span className="heading-600-24 heading-600-24-20 heading-600-24-16">CNC Machine</span>
                                    <span className="machine-label">In Process</span>
                                </div>
                                <div className="light-txt">Hitachi</div>
                            </div>
                            <div className="inner-item">
                                <div className="">₹6,50,000</div>
                            </div>
                        </div>
                        <div className="machine-item">
                            <div className="inner-item-2">
                                <div className="light-txt">Add Delivery Detailsl</div>
                                <div className="">Enter the delivery location to receive Payment Details</div>
                            </div>
                            <div className="inner-item">
                                <button className="head-btn">Add Location</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineInfo;