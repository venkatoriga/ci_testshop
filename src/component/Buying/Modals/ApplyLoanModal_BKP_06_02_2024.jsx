import React from "react";
import "./ApplyLoanModal.css";
import {AdvancePaymentIcon, closeIcon, financeApplicationIcon} from "../../../helpers/Icons";
const ApplyLoanModal = ({modalAction}) => {
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-600-20 heading-600-20-16">Finance Application Recieved</div>
                <div className="payment-icon">{financeApplicationIcon({width:119,height:152})}</div>
                <div className="heading-400-14-10">Your application has been received and our experts will get in touch with you within the next 2 business days</div>
                <button type="button" className="continue-btn">Continue</button>
            </div>
        </div>
    );
}
export default ApplyLoanModal;