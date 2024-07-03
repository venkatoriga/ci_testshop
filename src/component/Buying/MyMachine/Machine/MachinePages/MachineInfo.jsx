import React from "react";
import "./MachineInfo.css";
import {progressIcon} from "../../../../../helpers/Icons";
const MachineInfo = (machine) => {
  console.log(machine, 'machine');
//   console.log(blocked_details, 'blocked_details');  
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-info">
                        <div className="machine-item">
                            <div className="inner-item">
                                <div className="heading-wrap">
                                    <span className="heading-600-24 heading-600-24-20 heading-600-24-16">{machine.machine.product?.name}</span>
                                    <span className="machine-label">{machine?.product_status}</span>
                                </div>
                              
                            </div>
                            <div className="inner-item">
                                <div className="">₹{machine.machine.product?.pricing?.priceRange?.start?.gross?.amount}</div>
                            </div>
                        </div>
                               { machine?.product_status!='Owned'&& (    <div className="machine-item">
                            <div className="inner-item-2">
                                <div className="light-txt">Blocked Till</div>
                                <div className="">{machine?.blocked_details?.blocked_till_date}</div>
                            </div>
                            <div className="inner-item-column">
                                {progressIcon({width:60,height:60})}
                                <div className="inner-item">
                                    <div className="light-txt">Time Remaining</div>
                                    <div className="">{machine?.blocked_details?.remaining_time}</div>
                                </div>
                            </div>
                            <div className="inner-item">
                                <div className="light-txt">Next Step</div>
                                <div className="">{machine?.blocked_details?.next_step}</div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineInfo;