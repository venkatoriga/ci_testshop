import React from "react";
import "./model.css";
import { closeIcon, machinePurchaseSuccess } from "../../../../../helpers/Icons";
import { useNavigate } from 'react-router-dom';

const MachinePurchaseModal = ({ SetQuationModel }) => {
    //const navigate = useNavigate();
    return (
        <>
            <div className="popup-wrap-machine">
                <div className="back" onClick={() => SetQuationModel(false)}></div>
                <div className="inner">
                    <button onClick={() => SetQuationModel(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                    <div className="heading-600-20 heading-600-20-16">Thank you for your interest!</div>
                    <div className="purchase-icon">{machinePurchaseSuccess({ width: 189, height: 189 })}</div>
                    <div className="heading-400-14-12">Your quote request has been successfully submitted. We'll review it carefully and get back to you with a personalized offer as soon as possible.
In the meantime, feel free to continue browsing our store for more amazing products.
Thank you for choosing origa.market!</div>
                    <button type="button" onClick={() => SetQuationModel(false)} className="continue-btn">Close</button>
                </div>
            </div>
        </>

    );
}
export default MachinePurchaseModal;