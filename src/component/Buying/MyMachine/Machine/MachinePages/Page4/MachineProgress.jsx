import React from "react";
import "./MachineProgress.css"
import {progressIcon3} from "../../../../../../helpers/Icons";
const MachineProgress = () => {
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-progress-4">
                        {progressIcon3({width:700,height:46})}
                        <div className="machine-content">
                            <div className="content-item">
                                <div className="t-a-c light-txt">01 July 2023</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">03 July 2023</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Arranging Finance</div>
                            </div>
                            <div className="content-item">
                            <div className="t-a-c">Paid Full Amount</div>
                                <div className="t-a-c light-txt">Applied on 07 July 2023</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Delivered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineProgress;