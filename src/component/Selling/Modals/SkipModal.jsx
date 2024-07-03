import React from "react";
import {closeIcon,skipIcon} from "../../../helpers/Icons";
const SkipModal = ({modalAction}) => {
    const closeModal = () => {
        modalAction(false);
        window.location = "/buy/my-machine?type=sale";
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={closeModal}></div>
            <div className="inner">
                <button onClick={closeModal} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-600-20 heading-600-20-16">Thank you for Choosing Origa!</div>
                <div className="skip-icon">{skipIcon({width:189,height:189})}</div>
                <div className="heading-400-14-10">Your inquiry has been received, and our team will be in touch within the next 24 hours. If you require any immediate assistance, please don't hesitate to call us at 8828099099</div>
            </div>
        </div>
    );
}
export default SkipModal;