import React,{useState} from "react";
import "./ProductInfo.css";
import VideoModal from "../../Modals/VideoModal";

import DateModal from "../../Modals/DateModal";
import {infoIcon} from "../../../../helpers/Icons";

const ProductInfo = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab,setActiveTab] = useState("basic-info");
    const [showInfo,setShowinfo] = useState(false);
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }
    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    return (
        <>
            {showModal === "video" && (
                <VideoModal modalAction={handleModal}/>
            )}
            {showModal === "date-modal" && (
                <DateModal modalAction={handleModal}/>
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="box-wraps">
                        <div className="box-inner">
                            <div className="box-item">
                                <div className="inner">
                                    <div className="heading-400-14-12 light-txt">Watch Video The machine is working perfectly</div>
                                    <button onClick={() => handleModal("video")} className="box-btn heading-600-14 heading-600-14-12">Watch Video</button>
                                </div>
                            </div>
                            <div className="box-item">
                                <div className="inner">
                                    <div className="heading-400-14-12 light-txt">Inspect this machine in person</div>
                                    <button onClick={() => handleModal("date-modal")} className="box-btn heading-600-14 heading-600-14-12">Schedule a visit</button>
                                </div>
                            </div>
                            <div className="box-item">
                                <div className="tabs-wrap">
                                    <button onClick={() => handleActiveTab("basic-info")} className={activeTab === "basic-info" ? "active tab-btn heading-600-14 heading-600-14-12" : "tab-btn heading-600-14 heading-600-14-12"} type="button">Basic Information</button>
                                    <button onClick={() => handleActiveTab("table-stroke")} className={activeTab === "table-stroke" ? "active tab-btn heading-600-14 heading-600-14-12" : "tab-btn heading-600-14 heading-600-14-12"} type="button">Table & Stroke Size</button>
                                    <button onClick={() => handleActiveTab("spindle")} className={activeTab === "spindle" ? "active tab-btn heading-600-14 heading-600-14-12" : "tab-btn heading-600-14 heading-600-14-12"} type="button">Spindle</button>
                                    <button onClick={() => handleActiveTab("other")} className={activeTab === "other" ? "active tab-btn heading-600-14 heading-600-14-12" : "tab-btn heading-600-14 heading-600-14-12"} type="button">Other Details</button>
                                </div>
                                <div className="items-wrap">
                                    {activeTab === "basic-info" ? (
                                        <>
                                            <div className="item">
                                                <span className="heading-400-14-12 light-txt">Machine Name</span>
                                                <span className="heading-500-16">CNC Machine</span>
                                            </div>
                                            <div className="item">
                                                <span className="heading-400-14-12 light-txt">Brand</span>
                                                <span className="heading-500-16">Hitachi</span>
                                            </div>
                                            <div className="item">
                                                <span className="heading-400-14-12 light-txt">Make</span>
                                                <span className="heading-500-16">2019</span>
                                            </div>
                                            <div className="item">
                                                <span className="heading-400-14-12 light-txt">Machine Location</span>
                                                <span className="heading-500-16">Andheri, Mumbai</span>
                                            </div>
                                            <div className="item">
                                                <span className="heading-400-14-12 light-txt">Current Owner</span>
                                                <span className="heading-500-16">1st Owner</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="item">
                                            <span className="heading-400-14-12 light-txt">No Data</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="box-inner">
                            <div className="box-item">
                                <div className="inner">
                                    <div className="heading-400-14-12"><span className="light-txt">Year of Purchase:</span> <b>2019</b></div>
                                    <div className="heading-400-14-12"><span className="light-txt">Machine Location:</span> <b>Andheri Mumbai</b></div>
                                </div>
                            </div>
                            <div className="box-item">
                                <div className="extra-wrap">
                                    <div className="top">
                                        <div className="inner">
                                            <div className="heading-400-14-12 light-txt">Machine Price</div>
                                            <a href="#finance"><button className="box-btn heading-600-14 heading-600-14-12">Check Finance Options</button></a>
                                        </div>
                                        <div className="inner">
                                            <div className="box-btn heading-600-14 heading-600-14-12">₹4,60,000 <span>or ₹5,629/month</span></div>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="heading-600-18">What’s Included?</div>
                                        <div className="inner">
                                            <div className="heading-400-14-12 light-txt">Machine</div>
                                            <div className="box-btn heading-600-14 heading-600-14-12">₹4,50,000</div>
                                        </div>
                                        <div className="inner">
                                            <div className="heading-400-14-12 light-txt">AMC</div>
                                            <div className="box-btn heading-600-14 heading-600-14-12">₹50,000 Free</div>
                                        </div>
                                        <div className="inner">
                                            <div className="heading-400-14-12 light-txt">Delivery Price (401 202)</div>
                                            <div className="box-btn heading-600-14 heading-600-14-12">₹10,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-item">
                                <div className="heading-600-18">Get this Machine Now</div>
                                <div className="heading-400-14-12 light-txt">
                                    <span>You can choose to block this machine with a token or Buy it at full price.</span>
                                </div>
                                <div className="info-text-wrap">
                                    <span className="svg" onClick={() => setShowinfo(!showInfo)}>{infoIcon({width:24,height:24})}</span>
                                    {showInfo && (
                                        <span className="info-text">If you are interested to purchase the machine and wish to block it so that no one else can purchase it you would need to pay a non refundable token. This will block the machine for 7 days, in this period you would need to either complete or finance the rest of the payment.</span>
                                    )}
                                </div>
                                <div className="btns-wrap">
                                    <button onClick={() => window.location = "/pay-token"} type="button" className="box-item-btn buy-now">Buy Now</button>
                                    <button onClick={() => window.location = "/pay-token"} type="button" className="box-item-btn">Pay Token</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductInfo;