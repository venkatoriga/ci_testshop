import React, { useEffect } from 'react';
import { closeIcon, skipIcon } from '../../../helpers/Icons';
const SuccessPopup = ({ onHide, message }) => {
    const success = '/asset/charm_circle-tick.png'
    useEffect(() => {
        if (onHide) {
            setTimeout(() => { onHide() }, 5000);
        }
    }

        , []);


    return (
        <>
            <div className="bi-popup-wrap">
                <div className="back" ></div>
                <div className="inner">
                    <button onClick={onHide} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                    <div className="heading-600-20 heading-600-20-16 t-a-c">{message}</div>
                    <div>
                        <div className="skip-icon">{skipIcon({ width: 189, height: 189 })}</div>
                        {/* <img src={success} alt={success}/> */}
                    </div>
                    <div className="heading-400-14-10">
                        {message === "Thanks for Contact Us" || message === "Thankyou. Our team will reach out to you soon" ? (
                            <>
                                Your inquiry has been received, and our team will be in touch within the next 24 hours. If you require any immediate assistance, please don't hesitate to call us at <span style={{ fontWeight: 'bold' }}>8828099099</span>.
                            </>
                        ) : message.includes("Loan") || message.includes("Lease") ?(
                            <>
                                Your loan/lease application has been successfully submitted and is now under review. We appreciate your interest in our financial products. If you have any questions or need to provide additional information, please do not hesitate to contact us at <span style={{ fontWeight: 'bold' }}>info@origa.market</span> or call us at <span style={{ fontWeight: 'bold' }}>+91-8828099099</span>.
                            </>
                        ):(null)}
                    </div>

                </div>

            </div>

        </>
    );
};

export default SuccessPopup;
