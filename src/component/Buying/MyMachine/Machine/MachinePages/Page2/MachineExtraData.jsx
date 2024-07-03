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
                    <div className="extra-data-wrap-2">
                        <div className="extra-data-section">
                            <div className="extra-data-item yellow-bg">
                                <div className="head">
                                    <div className="heading-wrap">
                                        CNC Machine | Hitachi
                                        <span>₹6,50,000</span>
                                    </div>
                                    <button className="process">Token Expired</button>
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
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                        Machine Location
                                        <span>Andheri (E), Mumbai, 400093</span>
                                    </div>
                                    <button className="simple-btn">Schedule a visit</button>
                                </div>
                            </div>
                        </div>
                        <div className="extra-data-section">
                            <div className="extra-data-item">
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                        Still Interested in the Machine?
                                        <span>Get in touch with us if you are still interested in purchasing the machine</span>
                                    </div>
                                    <button className="main-btn">Get In touch</button>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineExtraData;