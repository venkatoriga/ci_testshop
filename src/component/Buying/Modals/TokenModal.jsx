import React from "react";
import "./TokenModal.css";
import {closeIcon,mobileIcon} from "../../../helpers/Icons";
import { useNavigate } from "react-router-dom";

const TokenModal = (props) => {
    const navigate = useNavigate();

    //console.log("id for Advance payment===>>>", props.id);
    //console.log('message..', props?.message);
    return (
        <>
            {props?.message === "Paid" ? (
                <div className="bi-popup-wrap">
                    <div className="back" onClick={()=>navigate(`/buy/advance-payment?id=${props.proid}&buyMachineId=${props.buymachine_id}`)}></div>
                    <div className="inner">
                        <button onClick={()=>navigate(`/buy/advance-payment?id=${props.proid}&buyMachineId=${props.buymachine_id}`)} className="close">
                            {closeIcon({ width: 16, height: 16 })}
                        </button>
                        <div className="heading-600-20 heading-600-20-16">Token Payment Successful</div>
                        <div className="mobile-icon">{mobileIcon({ width: 189, height: 189 })}</div>
                        <div className="heading-400-14-12">Token amount has been paid successfully.</div>
                        <button
                            type="button"
                            className="continue-btn"
                            onClick={() => navigate(`/buy/advance-payment?id=${props.proid}&buyMachineId=${props.buymachine_id}`)}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bi-popup-wrap">
                    <div className="back" onClick={() => navigate(`/buy/my-machine`)}></div>
                    <div className="inner">
                        <button onClick={() => navigate(`/buy/my-machine`)} className="close">
                            {closeIcon({ width: 16, height: 16 })}
                        </button>
                        <div className="heading-600-20 heading-600-20-16 text-danger">Token Payment Failed</div>
                        <div className="mobile-icon">{mobileIcon({ width: 189, height: 189 })}</div>
                        <div className="heading-400-14-12 text-danger">Payment failed. Please try again later.</div>
                        <button
                            type="button"
                            className="btn btn-danger" 
                            onClick={() => navigate(`/buy/my-machine`)}
                        >
                            Continue
                        </button>

                    </div>
                </div>
            )}
        </>

    );
}
export default TokenModal;