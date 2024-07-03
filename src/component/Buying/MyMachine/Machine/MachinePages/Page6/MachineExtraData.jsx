import React,{useState} from "react";
import "./MachineExtraData.css";
const MachineExtraData = () => {
    const [activetab, setActiveTab] = useState("lease");
    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="extra-data-wrap-6">
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
                                <div className="head no-boder">
                                    <div className="heading-wrap">
                                        <span className="light-txt">Machine location</span>
                                        <span>Andheri (E), Mumbai, 400093</span>
                                    </div>
                                    <div className="heading-wrap">
                                        <span className="light-txt">Visit Completed</span>
                                        <span>05 July 2023, 4:00 pm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="extra-data-section">
                            <div className="extra-data-item">
                                <div className="head">
                                    <div className="heading-wrap">Payment instructions</div>
                                    <button onClick={() => window.location = "/advance-payment"} className="simple-btn">Contact Origa Finance</button>
                                </div>
                                <div className="body">
                                    <div className="light-txt">Thank you for uploaded the Payment receipt and we are currently verifying it and we will get back within 24-48 working hours.</div>
                                </div>
                                <div className="body">
                                    <div className="heading-wrap">Payment receipt</div>
                                    <div className="light-txt">You can edit and view your payment receipt here</div>
                                </div>
                                <div className="btn-wraps">
                                    <button class="basic btns">View receipt</button>
                                    <button class="btns">Edit Document</button>
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