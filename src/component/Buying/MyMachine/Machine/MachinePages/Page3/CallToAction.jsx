import React from "react";
import "./CallToAction.css"
const CallToAction = () => {
    return (
        <>
            <div className="call-to-action-wrap-machine">
                <div className="container-fluid col-cust">
                    <div className="max-container my-0 benefits">
                        <div className="call-to-action">
                            <div className="">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">CNC Machine</div>
                            </div>
                            <div className="">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">₹4,50,000</div>
                            </div>
                            <div class="btns-wrap">
                                <button type="button" class="box-item-btn buy-now">Pay Advance of ₹ 1,00,000</button>
                                <button onClick={() => window.location = "/advance-payment"} type="button" class="box-item-btn">Pay Full Amount</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CallToAction;