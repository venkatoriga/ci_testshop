import React from "react";
import "./CallToAction.css"
import { useNavigate } from 'react-router-dom';



const CallToAction = (productDETAILS,onCallfun) => {
      const navigate = useNavigate();
    console.log(productDETAILS,"CallToAction")
    const onCallFunHandler=()=>{
    navigate(`/add-address?id=${productDETAILS.productDETAILS?.machine_details?.data?.product?.id}`);
    }
          const onShowPortal = () => {
            // const navigate = useNavigate();
            navigate(`/advance-payment?id=${productDETAILS.productDETAILS?.machine_details?.data?.product?.id}&message=Unpaid`);
       
            // window.location = payTokenUrl;
            // onClick={() => window.location = "/pay-token"}
    
    }
    
    return (
        <>
            <div className="call-to-action-wrap-machine">
                <div className="container-fluid col-cust">
                    <div className="max-container my-0 benefits">
                        <div className="call-to-action">
                            <div className="">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16"> {productDETAILS.productDETAILS?.machine_details?.data?.product?.name}</div>
                            </div>
                            <div className="">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">₹{productDETAILS.productDETAILS?.price_details?.machine_price?productDETAILS.productDETAILS?.price_details?.machine_price:'1,00,000'}</div>
                            </div>
                            <div class="btns-wrap">
          { productDETAILS.productDETAILS?.price_details?.advance_payment_status!='PAYMENT_SUCCESS'&&productDETAILS.productDETAILS?.price_details?.advance_payment_status!='PAYMENT_INITIATED' && (   <button type="button" onClick={() => onShowPortal()}  class="box-item-btn buy-now">Pay Advance of ₹ {productDETAILS.productDETAILS?.price_details?.advance_amount?productDETAILS.productDETAILS?.price_details?.advance_amount:'1,00,000'} </button>)}
                             { productDETAILS.productDETAILS?.price_details?.full_payment_status!='PAYMENT_SUCCESS'&&productDETAILS.productDETAILS?.price_details?.full_payment_status!='PAYMENT_INITIATED' && (              <button onClick={onCallFunHandler} type="button" class="box-item-btn">Pay Full Amount</button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CallToAction;