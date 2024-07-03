import React from "react";
import "./MachineSaleProgress.css"
import {soldProgressIcon} from "../../../helpers/Icons";
const MachineSaleProgress = () => {
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-sell-progress">
                        {soldProgressIcon({width:798,height:38})}
                        <div className="machine-content">
                            <div className="content-item">
                                <div className="t-a-c">Registration</div>
                                <div className="t-a-c light-txt">12th June 2023</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Inspection</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Documentation</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt enlisting">Enlisting</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Sale</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Payment Received</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineSaleProgress;