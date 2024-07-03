import React from "react";
import {closeIcon,thanksIcon} from "../../../helpers/Icons";
const ThankModal = ({modalAction}) => {
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-600-20 heading-600-20-16">Congratulations</div>
                <div className="mobile-icon">{thanksIcon({width:189,height:189})}</div>
                <div className="heading-400-14-12">Fill in these details in order to quickly proceed</div>
            </div>
        </div>
    );
}
export default ThankModal;