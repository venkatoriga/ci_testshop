import React from "react";
import "./Scheduled.css";
import { closeIcon, mobileIcon } from "../../helpers/Icons";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({Setservicerequest}) => {
    const navigate = useNavigate();
    //console.log('props----->',props.payment_name);
    return (
        <>
            <div className="bi-popup-wrap">
                <div className="back" onClick={() => Setservicerequest(false)}></div>
                <div className="inner">
                    <button onClick={() => Setservicerequest(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                    <div className="heading-600-20 heading-600-20-16">Booking Confirmed</div>
                    <div className="mobile-icon">{mobileIcon({ width: 189, height: 189 })}</div>
                    <div className="heading-400-14-12">Service Process has been Initiated.</div>
                    <button type="button" onClick={() =>Setservicerequest(false)} className="continue-btn" >Continue</button>
                </div>
            </div>

        </>

    );
}
export default PaymentModal;