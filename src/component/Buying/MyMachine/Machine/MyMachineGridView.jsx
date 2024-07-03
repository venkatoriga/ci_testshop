import React, {useState} from "react";
import Breadcrumbs from "../Breadcrumbs/index";
import "./MyMachineGridView.css";
import {filterIcon} from "../../../../helpers/Icons";
import Footer from "../../../Footer/Footer";
const MyMachineGridView = () => {
    const [activeTab, setActiveTab] = useState("owned");
    const breadcrumbsItems = [
        {name: "Account",link: "/"},
        {name: "My Machines",link: "/buy/my-machine-grid-view" }
    ];
    const Machines = [
        {id: 1, machine_img: "/asset/image529(1).png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",amount: "₹6,50,000",bloked: "04 July 2023, 23:59"},
        {id: 2, machine_img: "/asset/image 562.png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",amount: "₹6,50,000",bloked: "04 July 2023, 23:59"},
        {id: 3, machine_img: "/asset/image 562.png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",amount: "₹6,50,000",bloked: "04 July 2023, 23:59"},
        {id: 4, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",amount: "₹6,50,000",transaction_id: "42229586"},
        {id: 5, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",amount: "₹6,50,000",transaction_id: "42229586"}
    ];
    return (
        <>
            <div className="container-fluid">
                <div className="max-container my-5">
                    <Breadcrumbs items={breadcrumbsItems}/>
                    <div className="header-wrap-my-machine">
                        <div className="tab-wrap-my-machine">
                            <button onClick={() => setActiveTab("owned")} className={activeTab === "owned" ? "active btn" : "btn"}type="button">Owned</button>
                            <button onClick={() => setActiveTab("sale")} className={activeTab === "sale" ? "active btn" : "btn"} type="button">Up for Sale</button>
                            <button onClick={() => setActiveTab("sold")} className={activeTab === "sold" ? "active btn" : "btn"} type="button">Sold machines</button>
                        </div>
                        <div className="btn-wrap">
                            <button className="btn machine">Add Your Machine</button>
                            <div className="short-wrap">
                                <button className="btn short-btn">{filterIcon({width:22,height:22,fill:"#73509E"})}Filters</button>
                            </div>
                        </div>
                    </div>
                    {Machines.length > 0 ? (
                        <div className="machine-grid-wrap">
                            {Machines.map((machine) => (
                                <div className="item">
                                    <div className="image-wrap">
                                        <img src={machine.machine_img} alt={machine.machine_name} className="product-img"/>
                                    </div>
                                    <div className={machine.is_processing ? "label-item" : "label-item owned"}>{machine.is_processing ? "Processing" : "Owned"}</div>
                                    <div className=""><span className="heading-600-20 heading-600-20-16">{machine.machine_name} | </span>{machine.machine_brand}</div>
                                    <div className="heading-600-16">{machine.amount}</div>
                                    {machine.bloked ? (
                                        <div className="machine-info">
                                            <div className="light-txt p-12">Blocked till</div>
                                            <div className="">{machine.bloked}</div>
                                        </div>
                                    ) : (
                                        <div className="machine-info">
                                            <div className="light-txt p-12">Transaction ID</div>
                                            <div className="">{machine.transaction_id}</div>
                                        </div>
                                    )}
                                    <div className="btns-wrap">
                                        <button className="item-btn simple-btn">Pay Advance</button>
                                        <button className="item-btn">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No Data</div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default MyMachineGridView;