import React from "react";
import {closeIcon, thankYouIcon,} from "../../../helpers/Icons";
const ThankYouModal = ({modalAction,onPayReciHandler}) => {
    const closeModal = () => {
        onPayReciHandler()
        modalAction(false);
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={closeModal}></div>
            <div className="inner">
                <button onClick={closeModal} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-600-20 heading-600-20-16">Thank you</div>
                <div className="skip-icon">{thankYouIcon({width:189,height:189})}</div>
                <div className="heading-400-14-10">You have submitted your receipt, we will review and get back to you in 2 Business day</div>
            </div>
        </div>
    );
}
export default ThankYouModal;