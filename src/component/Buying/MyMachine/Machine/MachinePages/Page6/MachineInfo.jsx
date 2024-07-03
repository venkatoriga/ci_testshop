import React from "react";
import "./MachineInfo.css";
const MachineInfo = () => {
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-info">
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
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineInfo;