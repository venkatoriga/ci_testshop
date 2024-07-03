import React, {useState} from "react";
import ReactPaginate from "react-paginate";
import Breadcrumbs from "../../Buying/Breadcrumbs/index";
import "./MachineSoldGrid.css";
import {filterIcon, leftArrowIcon, rightArrowIcon} from "../../../helpers/Icons";


const MachineSoldGrid = () => {
    const [activeTab, setActiveTab] = useState("owned");
    const [currentPage, setCurrentPage] = useState(0); 
    const [defaultPageCount] = useState(7);

    const breadcrumbsItems = [
        {name: "Account",link: "/"},
        {name: "My Machines",link: "/buy/my-machine-grid-view" }
    ];
    const Machines = [
        {id: 1, machine_img: "/asset/image529(1).png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:false,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 2, machine_img: "/asset/image 562.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 3, machine_img: "/asset/image 562.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 4, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 5, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 6, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 7, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 8, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 9, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"},
        {id: 10, machine_img: "/asset/image 536.png",is_processing:"Sold" ,machine_name: "CNC Machine", machine_brand: "Hitachi",isRegister:true,amountText:"Amount Receivable",paymentText:"Payment Status",payemntStatus:"Completed",amount:"₹6,50,000"}
    ]       
    const machinesPerPage = 8;
    const indexOfLastMachine = (currentPage + 1) * machinesPerPage;
    const indexOfFirstMachine = indexOfLastMachine - machinesPerPage;
    const currentMachines = Machines.slice(indexOfFirstMachine, indexOfLastMachine);
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
    return (
        <>
            <div className="container-fluid pb-5">
                <div className="max-container my-5">
                    <Breadcrumbs items={breadcrumbsItems}/>
                    <div className="header-wrap-sale-grid">
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
                    {currentMachines.length > 0 ? (
                        <div className="machine-sold-grid-wrap">
                            {currentMachines.map((machine) => (
                                <div className="item">
                                    <div className="image-wrap">
                                        <img src={machine.machine_img} alt={machine.machine_name} className="product-img"/>
                                    </div>
                                    <div className="label-item">{machine.is_processing}</div>
                                    <div className=""><span className="heading-600-20 heading-600-20-16">{machine.machine_name} | </span>{machine.machine_brand}</div>
                                    <div className="sale-details">{machine.isRegister ? "Machine Registered" : "Inspection Schedule Pending"}</div>
                                    {machine.scheduleBtn ? (
                                        <div className="machine-info mt-5 mb-5">
                                            {machine.scheduleBtn}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="machine-info">
                                                <div className="light-txt heading-400-12-10">{machine.amountText}</div>
                                                <div className="light-txt heading-400-12-10">{machine.paymentText}</div>
                                            </div>
                                            <div className="machine-info">
                                                <div className="heading-400-16">{machine.amount}</div>
                                                <div className="heading-400-16">{machine.payemntStatus}</div>
                                            </div>
                                        </>
                                    )}
                                    <div className="btns-wrap-view">
                                        <button className="item-btn">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No Data</div>
                    )}
                     {Machines.length > machinesPerPage && (
                        <ReactPaginate
                        previousLabel={leftArrowIcon({width:24,height:24})}
                        nextLabel={rightArrowIcon({width:24,height:24})}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={defaultPageCount} 
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
export default MachineSoldGrid;