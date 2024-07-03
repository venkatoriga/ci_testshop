import React from "react";
import "./MachinePurchaseModal.css";
import {closeIcon, machinePurchaseSuccess} from "../../../../helpers/Icons";
import {useNavigate} from 'react-router-dom';

const MachinePurchaseModal = ({ message, modalAction }) => {
    const navigate = useNavigate();
    return (
        <>
            {message === "Paid" ? (
                <div className="popup-wrap-machine">
                    <div className="back" onClick={() => navigate(`/buy/my-machine`)} ></div>
                    <div className="inner">
                        <button onClick={() => navigate(`/buy/my-machine`)}  className="close">{closeIcon({ width: 16, height: 16 })}</button>
                        <div className="heading-600-20 heading-600-20-16">Machine Purchase Successful</div>
                        <div className="purchase-icon">{machinePurchaseSuccess({ width: 189, height: 189 })}</div>
                        {/* <div className="heading-400-14-12">Advance amount has been paid successfully. You have almost completed the purchase!!</div> */}
                        <button type="button" onClick={() => navigate(`/buy/my-machine`)} className="continue-btn">Continue</button>
                    </div>
                </div>
            ) : (
                <div className="popup-wrap-machine">
                    <div className="back" onClick={() => navigate(`/buy/my-machine`)} ></div>
                    <div className="inner">
                        <button onClick={() => navigate(`/buy/my-machine`)}  className="close">{closeIcon({ width: 16, height: 16 })}</button>
                        <div className="heading-600-20 heading-600-20-16 text-danger">Machine Payment Failed</div>
                        <div className="purchase-icon">{machinePurchaseSuccess({ width: 189, height: 189 })}</div>
                        {/* <div className="heading-400-14-12 text-danger">Advance amount has been paid successfully. You have almost completed the purchase!!</div> */}
                        <button type="button" onClick={() => navigate(`/buy/my-machine`)} className="btn btn-danger">Continue</button>
                    </div>
                </div>
            )}
        </>

    );
}
export default MachinePurchaseModal;