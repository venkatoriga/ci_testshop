import React from "react";
import "./PaymentModal.css";
import {closeIcon,mobileIcon} from "../../helpers/Icons";
import { useNavigate } from "react-router-dom";
const PaymentModal = (props) => {
    const navigate=useNavigate();
    console.log('props----->',props.payment_name);
    return (
        <>
        {props.message === "Paid" ? (
                <div className="bi-popup-wrap">
                <div className="back" onClick={() => props.modalAction(false)}></div>
                <div className="inner">
                    <button onClick={() => props.modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                    <div className="heading-600-20 heading-600-20-16">Service Payment Successful</div>
                    <div className="mobile-icon">{mobileIcon({width:189,height:189})}</div>
                    <div className="heading-400-14-12">Service amount has been paid successfully.</div>
                    <button type="button"onClick={() => navigate('/service')} className="continue-btn" >Continue</button>
                </div>
            </div>
        ) : (
            <div className="popup-wrap-machine">
                <div className="back" onClick={() => props.modalAction(false)}></div>
                <div className="inner">
                    <button onClick={() => props.modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                    <div className="heading-600-20 heading-600-20-16 text-danger">Service Payment Failed</div>
                    {/* <div className="purchase-icon">{machinePurchaseSuccess({ width: 189, height: 189 })}</div> */}
                    {/* <div className="heading-400-14-12 text-danger">Advance amount has been paid successfully. You have almost completed the purchase!!</div> */}
                    <button type="button" onClick={() => navigate(`/buy/my-machine`)} className="btn btn-danger">Continue</button>
                </div>
            </div>
        )}
    </>

    );
}
export default PaymentModal;