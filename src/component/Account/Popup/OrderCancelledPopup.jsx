
import React from "react";
import {closeIcon} from "../../../helpers/Icons";
const OrderCancelledPopup = ({modalAction}) => {
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-600-20 heading-600-20-16">We’re sorry to see you go!</div>
                <div className="mobile-icon">
                <img src="/asset/OrderCancelled.png" alt="OrderCancelled"/>
                </div>
                <div className="heading-400-14-12">Your order has been cancelled successfully !</div>
                
            </div>
        </div>
    );
}
export default OrderCancelledPopup;