import React from "react";
import "./PaymentModal.css";
import {AdvancePaymentIcon, closeIcon} from "../../../helpers/Icons";
import { useNavigate } from "react-router-dom";

const PaymentModal = (product) => {
    const navigate = useNavigate()
    return (
        <>
            {product?.message === "Paid" ? (
                <div className="bi-popup-wrap">
                    <div className="back" onClick={() => navigate(`/buy/machine-page?id=${product.productID}&buyMachineId=${product.buyMachineId}`)}></div>
                    <div className="inner">
                        <button onClick={() => navigate(`/buy/machine-page?id=${product.productID}&buyMachineId=${product.buyMachineId}`)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                        <div className="heading-600-20 heading-600-20-16">Advance Payment Successful</div>
                        <div className="payment-icon">{AdvancePaymentIcon({ width: 189, height: 189 })}</div>
                        <div className="heading-400-14-12">Advance amount has been paid successfully. You have almost completed the purchase!!</div>
                        <button type="button" className="continue-btn" onClick={() => navigate(`/buy/machine-page?id=${product.productID}&buyMachineId=${product.buyMachineId}`)}>Continue</button>
                    </div>
                </div>

            ) : (
                <div className="bi-popup-wrap">
                    <div className="back" onClick={() => navigate(`/buy/my-machine`)}></div>
                    <div className="inner">
                        <button onClick={() => navigate(`/buy/my-machine`)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                        <div className="heading-600-20 heading-600-20-16 text-danger">Advance Payment Failed</div>
                        <div className="payment-icon">{AdvancePaymentIcon({ width: 189, height: 189 })}</div>
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
export default PaymentModal;
