import React,{useState} from "react";
import "./MachineExtraData.css";
import {settingIcon} from "../../../../../helpers/Icons";
import { useNavigate } from 'react-router-dom';
// import DateModal from "../../Modals/DateModal";
import { format } from 'date-fns';

import DateModal from "../../../Modals/DateModal";
const MachineExtraData = (productDETAILS) => {
    const navigate = useNavigate();
    const [activetab, setActiveTab] = useState("lease");
    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    const DatePipe = ({ date, formatString }) => {
  const formattedDate = format(date, formatString);
  return <span>{formattedDate}</span>;
};
       const [showModal, setShowModal] = useState(false);
    console.log('MachineExtraData',productDETAILS)
   const onShowPortal = () => {
            // const navigate = useNavigate();
            navigate(`/advance-payment?id=${productDETAILS.productDETAILS?.machine_details?.data?.product?.id}&message=Unpaid`);
       
            // window.location = payTokenUrl;
            // onClick={() => window.location = "/pay-token"}
    
    }

       const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }
    return (
        <>

            {showModal === "date-modal" && (
                <DateModal productId={productDETAILS.productDETAILS?.machine_details?.data?.product?.id} modalAction={handleModal}/>
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="extra-data-wrap">
                        <div className="extra-data-section">
                            <div className="extra-data-item yellow-bg">
                                <div className="head">
                                    <div className="heading-wrap">
                                        {productDETAILS.productDETAILS?.machine_details?.data?.product?.name} 
                                        <span>₹{productDETAILS.productDETAILS?.price_details?.machine_price?productDETAILS.productDETAILS?.price_details?.machine_price:'0'}</span>
                                    </div>
                                    <button className="process">{productDETAILS?.productDETAILS?.product_status}</button>
                                </div>
                                 {/* <div className="tiles-wrap">
                                    <div className="tile">
                                        <span className="">CNC System</span>
                                        <span className="">Fanuc Series Oi-MB</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Table</span>
                                        <span className="">1100 x 550 mm</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Travels</span>
                                        <span className="">1000 x 555 x 600 mm</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Spindle</span>
                                        <span className="">BT40 / 8000 rpm</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">ATC</span>
                                        <span className="">{productDETAILS.productDETAILS?.machine_details?.data?.product?.attributes['ATC']} </span>
                                    </div>
                                </div>  */}
                            </div>
                       {productDETAILS.productDETAILS?.product_status!='Owned'&&  (        <div className="extra-data-item">
                                <div className="head">
                                    <div>Finance This Machine with Origa</div>
                                    <button className="main-btn">Check Eligibility</button>
                                </div>
                                <div className="tab-wrap">
                                    <div className="body-wrap">
                                        <div className="btn-wrap">
                                            <button onClick={() => handleActiveTab("lease")} className={activetab === "lease" ? "active tab-btn" : "tab-btn"}>Lease</button>
                                            <button onClick={() => handleActiveTab("loan")} className={activetab === "loan" ? "active tab-btn" : "tab-btn"}>Loan</button>
                                        </div>
                                        <div className="content-wrap">
                                            {activetab === "lease" ? (
                                                <>
                                                    <div>Starting From</div>
                                                    <div class="heading-600-24-20">₹ 4,000<span class="heading-400-14-12 light-txt">/ Month</span></div>
                                                    <div className="">Tenure of 10 years</div>
                                                    <div className="">*Subject to change as per terms and conditions</div>
                                                </>
                                            ) : (
                                                <div>Loading...</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="icon-wrap">
                                        <div className="icon-item">
                                            <div className="">Smaller Payments</div>
                                            <span>{settingIcon({width:15,height:15})}</span>
                                        </div>
                                        <div className="icon-item">
                                            <div className="">No Ownership risks</div>
                                            <span>{settingIcon({width:15,height:15})}</span>
                                        </div>
                                        <div className="icon-item">
                                            <div className="">Flexibility to upgrade</div>
                                            <span>{settingIcon({width:15,height:15})}</span>
                                        </div>
                                        <div className="icon-item">
                                            <div className="">Potential Tax Benefits</div>
                                            <span>{settingIcon({width:15,height:15})}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        <div className="extra-data-section">
                           { productDETAILS.productDETAILS?.price_details?.advance_payment_status!='PAYMENT_SUCCESS'&&productDETAILS.productDETAILS?.price_details?.advance_payment_status!='PAYMENT_INITIATED' && (   <div className="extra-data-item">
                             <div className="head">
                                    <div className="heading-wrap">
                                        Advance Amount
                                        <span>₹ {productDETAILS.productDETAILS?.price_details?.advance_amount?productDETAILS.productDETAILS?.price_details?.advance_amount:'0'} </span>
                                    </div>
                                    <button onClick={() => onShowPortal()} className="main-btn">Pay Now</button>
                                </div>
                                <div className="body">
                                    <div className="light-txt">Why do I pay an advance?</div>
                                    <div className="">The time will expire and you can arrange for your finance in the meantime. It will also make you eligible for Origa Lease and Loan.</div>
                                </div>
                            </div>)}
                            <div className="extra-data-item">
                                <div className="head">
                                    <div>Price Breakdown</div>
                                </div>
                                <div className="tiles-wrap">
                                    <div className="tile">
                                        <span className="">Machine Price</span>
                                        
                                        <span className="">₹ {productDETAILS.productDETAILS?.price_details?.machine_price?productDETAILS.productDETAILS?.price_details?.machine_price:'0'}</span>
                                           
                                    </div>
                                    <div className="tile">
                                        <span className="">Delivery Charges</span>
                                        {productDETAILS.productDETAILS?.price_details?.delivery_charges_excluded?(      <strike className="">₹ {productDETAILS.productDETAILS?.price_details?.delivery_charges?productDETAILS.productDETAILS?.price_details?.delivery_charges:'0'}</strike>
                                  ):(      <span className="">₹ {productDETAILS.productDETAILS?.price_details?.delivery_charges?productDETAILS.productDETAILS?.price_details?.delivery_charges:'0'}</span>
                                  )}
                                    </div>
                                    <div className="tile">
                                        <span className="">Repairing cost</span>
                                            {productDETAILS.productDETAILS?.price_details?.repairing_cost_excluded?(      <strike className="">₹ {productDETAILS.productDETAILS?.price_details?.repairing_cost?productDETAILS.productDETAILS?.price_details?.repairing_cost:'0'}</strike>
                                  ):(      <span className="">₹ {productDETAILS.productDETAILS?.price_details?.repairing_cost?productDETAILS.productDETAILS?.price_details?.repairing_cost:'0'}</span>
                                  )}
                                   </div>
                                    <div className="tile">
                                        <span className="">1 Year AMC</span>
                                            {productDETAILS.productDETAILS?.price_details?.amc_cost_excluded?(      <strike className="">₹ {productDETAILS.productDETAILS?.price_details?.amc_cost?productDETAILS.productDETAILS?.price_details?.amc_cost:'0'}</strike>
                                  ):(      <span className="">₹ {productDETAILS.productDETAILS?.price_details?.amc_cost?productDETAILS.productDETAILS?.price_details?.amc_cost:'0'}</span>
                                  )}
                                   </div>
                                    <div className="tile total-tile">
                                        <span className="">Total</span>
                                        <span className="">₹{productDETAILS.productDETAILS?.price_details?.amc_cost?productDETAILS.productDETAILS?.price_details?.machine_total_price:'0'}</span>
                                    </div>
                                </div>
                            </div>


                             {productDETAILS?.productDETAILS?.schedule_visit_details?.schedule_visit_date?( 
                                 <div className="extra-data-item">
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                      {productDETAILS?.productDETAILS?.machine_details?.data?.product?.attributes['Machine Location']}    {productDETAILS?.productDETAILS?.schedule_visit_details?.schedule_visit_date} {productDETAILS?.productDETAILS?.schedule_visit_details?.schedule_visit_time}
                                       
                                    </div>
                                    <button className="simple-btn">Schedule a visit</button>
                                </div>
                            </div>
                                ):( 
                                    
                                     <div className="extra-data-item">
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                    Inspect this machine in person
                                       
                                    </div>
                                    <button className="simple-btn" onClick={() => handleModal("date-modal")} >Schedule a visit</button>
                                </div>
                            </div>
                                    
                                    
                                )}
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineExtraData;