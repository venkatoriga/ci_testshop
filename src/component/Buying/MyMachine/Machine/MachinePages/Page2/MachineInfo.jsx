import React from "react";
import "./MachineInfo.css";
import {progressIcon} from "../../../../../../helpers/Icons";
const MachineInfo = () => {
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-info-2">
                        <div className="machine-item">
                            <div className="inner-item">
                                <div className="heading-wrap">
                                    <span className="heading-600-24 heading-600-24-20 heading-600-24-16">CNC Machine</span>
                                    <span className="machine-label">Token Expired</span>
                                </div>
                                <div className="light-txt">Hitachi</div>
                            </div>
                            <div className="inner-item">
                                <div className="">₹6,50,000</div>
                            </div>
                        </div>
                        <div className="machine-item">
                            <div className="inner-item-2">
                                <div className="light-txt">Blocked Till</div>
                                <div className="">04 July 2023, 23:59</div>
                            </div>
                            <div className="inner-item-column">
                                {progressIcon({width:60,height:60})}
                                <div className="inner-item">
                                    <div className="light-txt">Time Remaining</div>
                                    <div className="">0 mins</div>
                                </div>
                            </div>
                            <div className="inner-item">
                                <div className="light-txt">Next Step</div>
                                <div className="">NA</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineInfo;