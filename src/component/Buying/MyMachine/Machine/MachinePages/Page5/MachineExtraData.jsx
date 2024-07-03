import React,{useState} from "react";
import "./MachineExtraData.css";
import {settingIcon} from "../../../../../../helpers/Icons";
const MachineExtraData = () => {
    const [activetab, setActiveTab] = useState("lease");
    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="extra-data-wrap">
                        <div className="extra-data-section">
                            <div className="extra-data-item yellow-bg">
                                <div className="head">
                                    <div className="heading-wrap">
                                        CNC Machine | Hitachi
                                        <span>₹6,50,000</span>
                                    </div>
                                    <button className="process">In Process</button>
                                </div>
                                <div className="tiles-wrap">
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
                                        <span className="">20 pockets</span>
                                    </div>
                                </div>
                            </div>
                            <div className="extra-data-item">
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
                            </div>
                            <div className="extra-data-item">
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                        <span className="light-txt">Delivery Address</span>
                                        <span>Kamla Mills, Andheri East, Behind Holy Cross Church Mumbai, 400093</span>
                                    </div>
                                    <button className="simple-btn">Edit</button>
                                </div>
                            </div>
                        </div>
                        <div className="extra-data-section">
                            <div className="extra-data-item">
                                <div className="head">
                                    <div className="heading-wrap">Payment instructions</div>
                                    <button onClick={() => window.location = "/advance-payment"} className="main-btn">Upload payment receipt</button>
                                </div>
                                <div className="tiles-wrap">
                                    <div className="tile">
                                        <span className="">Total Payable</span>
                                        <span className="">₹ 6,30,000</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Account Name</span>
                                        <span className="">Origa Market</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Account Number</span>
                                        <span className="">5378 5455 9975</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Bank Name</span>
                                        <span className="">ICICI Bank</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">IFSC Code</span>
                                        <span className="">ICI00042266</span>
                                    </div>
                                </div>
                                <div className="body">
                                    <div className="light-txt">Kindly note that the transaction will be complete only after we have verified the receipt of payment uploaded by you.</div>
                                </div>
                            </div>
                            <div className="extra-data-item">
                                <div className="head">
                                    <div>Price Breakdown</div>
                                </div>
                                <div className="tiles-wrap">
                                    <div className="tile">
                                        <span className="">Machine Price</span>
                                        <span className="">₹ 6,30,000</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Delivery Charges</span>
                                        <span className="">₹ 20,000</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">Repairing cost</span>
                                        <span className="">₹40,000 Free</span>
                                    </div>
                                    <div className="tile">
                                        <span className="">1 Year AMC</span>
                                        <span className="">₹60,000 Free</span>
                                    </div>
                                    <div className="tile total-tile">
                                        <span className="">Total</span>
                                        <span className="">₹ 6,50,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="extra-data-item">
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                        Machine Location
                                        <span>Andheri (E), Mumbai, 400093</span>
                                    </div>
                                    <button className="simple-btn">Schedule a visit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineExtraData;