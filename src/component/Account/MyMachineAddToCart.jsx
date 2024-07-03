import React,{useEffect,useState} from "react";
import Breadcrumbs from "../SubComponent/Breadcrumbs";
import Footer from "../Footer/Footer";
import ReactPaginate from "react-paginate";
import {dollerIcon,filterIcon,tagIcon,leftArrowIcon, rightArrowIcon} from "../../helpers/Icons";
import { FinancIcon,AdvancePaidIcon,TagIcon,DeliveredIcon,FullPaymentIcon } from "../SubComponent/AllSvgs/MasterIcon";
import { useNavigate } from "react-router-dom";
const  MyMachineAddToCart= () => {
    const [activeTab,setActiveTab] = useState("owned");
    const [currentPage, setCurrentPage] = useState(0); 
    const [defaultPageCount] = useState(7);
    const [isSmallScreen]=useState(window.innerWidth<=375);
    const navigate=useNavigate();
    useEffect(() => {
        let search = (window.location.search).replace("?type=","");
        if(search === ""){
            search = "owned";
        }
        setActiveTab(search);
    },[])
    const onCallFunHandler = () => {
        navigate('/buy/add-machine')
    }
    const breadcrumbsItems = [
        { name: "Account", link: "#" },
    ];
    const boldtitle= "My Machines"
    const machineData = [
        {image: "./asset/image-560.png",processStatus: "In Process",name: "CNC MACHINE | Hitachi",price: "₹6,50,000",blockText:"", date: "",payText:"Apply for Lease/Loan",buttonText:"View Details",url:"#"},
        {image: "./asset/image-536.png",processStatus: "In Process",name: "CNC MACHINE | Hitachi",price: "₹6,50,000",blockText:"Lease Status",date: "Approved",payText:"",buttonText:"View Details",url:"#"},
        {image: "./asset/image-536.png",processStatus: "Owned",name: "CNC MACHINE | Hitachi",price: "₹6,50,000",blockText:"Transaction ID",date: "42229586",payText:"Track Machine Delivery",buttonText:"View Details",url:"#"},
        {image: "./asset/image-536.png",processStatus: "Owned",name: "CNC MACHINE | Hitachi",price: "₹6,50,000",blockText:"Delivered on",date: "20 July 2023",payText:"",buttonText:"View Details",url:"#"}
    ];
    const Machines = [
        {id: 1, machine_img: "/asset/image529(1).png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",scheduleBtn:"Schedule Now",details:"Machine Registered"},
        {id: 2, machine_img: "/asset/image 562.png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",bloked: "1 , 8 , 15 Dec 2023",insepectTime:"Morning, Evening",details:"Machine Registered",inspectionDate:"Preferred Inspection Date",inspectionTime:"Preferred Inspection Time"},
        {id: 3, machine_img: "/asset/image 562.png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",bloked: "1 , 8 , 15 Dec 2023",details:"Machine Registered",insepectTime:"Evening,(4 PM- 10 PM)",inspectionDate:"Preferred Inspection Date",inspectionTime:"Preferred Inspection Time"},
        {id: 4, machine_img: "/asset/image 536.png",is_processing: true,machine_name: "CNC Machine", machine_brand: "Hitachi",bloked: "11 May 2023",insepectTime:"5-7 Days",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Inspection Date",inspectionTime:"Estimated Processing Time"},
        {id: 5, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"},
        {id: 6, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"},
        {id: 7, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"},
        {id: 8, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"},
        {id: 9, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"},
        {id: 10, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"},
        {id: 11, machine_img: "/asset/image 536.png",is_processing: false,machine_name: "CNC Machine", machine_brand: "Hitachi",transaction_id: "42229586",details:"Machine Registered",inspectionDate:"Listing Price",inspectionTime:"Amount Receivable",insepectTime:"₹6,50,000",bloked:"₹6,50,000"}
    ];
    const machinesPerPage = 8;
    const indexOfLastMachine = (currentPage + 1) * machinesPerPage;
    const indexOfFirstMachine = indexOfLastMachine - machinesPerPage;
    const currentMachines = Machines.slice(indexOfFirstMachine, indexOfLastMachine);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };
    return (
        <>
            <div className="container-fluid">
                <div className="max-container my-5">
                    <Breadcrumbs boldtitle={boldtitle} items={breadcrumbsItems} />
                    <div className="header-wrap-my-machine">
                        <div className="tab-wrap-my-machine">
                            <button onClick={() => setActiveTab("owned")} className={activeTab === "owned" ? "active btn" : "btn"}type="button">Owned</button>
                            <button onClick={() => setActiveTab("sale")} className={activeTab === "sale" ? "active btn" : "btn"} type="button">Up for Sale</button>
                        </div>
                        <div className="btn-wrap">
                            {(activeTab === "owned") && (
                                <button className="btn machine heading-600-16-14" onClick={onCallFunHandler}>Add Your Machine</button>
                            )}
                            {activeTab === "sale" && (
                                <button className="btn machine heading-600-16-14">Sell Another Machine</button>
                            )}
                            <div className="short-wrap">
                                <button className="btn short-btn">{filterIcon({width:22,height:22,fill:"#73509E"})}Filters</button>
                            </div>
                        </div>
                    </div>
                    <div className="layout-wrap-machine">
                        {activeTab === "owned" && (
                            <>
                                {machineData.map((machine,index) => (
                                    <div key={index} className="max-container detail-wrap">
                                        <div className="img-wrap-1">
                                            <img className="img-1" src={machine.image} alt="cnc machine"/>
                                        </div>
                                        <div className="price-wrap">
                                            <div className="top">
                                                <button className={machine.processStatus === "Owned" ? "bi-process-btn owned" : "bi-process-btn"}>{machine.processStatus}</button>
                                                <div className="right bi-process-wrap">
                                                    <span className="completed">{TagIcon({w:isSmallScreen ? 28:38,h:isSmallScreen ? 28:38,fill:"#9B9E51"})}</span>
                                                    <span className="active">{AdvancePaidIcon({w:isSmallScreen ? 28:38,h:isSmallScreen ? 28:38,fill:"#73509E"})}</span>
                                                    <span className="completed">{FinancIcon({w:isSmallScreen ? 28:38,h:isSmallScreen ? 28:38,fill:"#9B9E51"})}</span>
                                                    <span className="active">{FullPaymentIcon({w:isSmallScreen ? 28:38,h:isSmallScreen ? 28:38,fill:"#73509E"})}</span>
                                                    <span className="completed">{DeliveredIcon({w:isSmallScreen ? 28:38,h:isSmallScreen ? 28:38,fill:"#9B9E51"})}</span>
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <div className="left-wrap">
                                                    <div className="name heading-600-20 heading-600-20-16">{machine.name}</div>
                                                    <div className="price">{machine.price}</div>
                                                </div>
                                                <div className="right-wrap">
                                                    <div className="block-info">
                                                        <div className="block-info__text heading-400-14-12">{machine.blockText}</div>
                                                        <div className="heading-400-14-12">{machine.date}</div>
                                                    </div>
                                                    <div className="advance-info">
                                                        <div className="heading-600-14 heading-600-14-12 advance-text">{machine.payText}</div>
                                                        <button onClick={()=> {navigate(machine.url)}} className="view-btn" type="button">{machine.buttonText}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {activeTab === "sale" && (
                            <>
                            {currentMachines.length > 0 ? (
                        <div className="machine-sale-grid-wrap">
                            {currentMachines.map((machine) => (
                                <div className="item">
                                    <div className="image-wrap">
                                        <img src={machine.machine_img} alt={machine.machine_name} className="product-img"/>
                                    </div>
                                    <div className={machine.is_processing ? "label-item" : "label-item listed"}>{machine.is_processing ? "Processing" : "Listed"}</div>
                                    <div className=""><span className="heading-600-20 heading-600-20-16">{machine.machine_name} | </span>{machine.machine_brand}</div>
                                    <div className="sale-details">{machine.details}</div>
                                    {machine.scheduleBtn ? (
                                        <div className="machine-info mt-5 mb-5 sch-view">
                                            <span>{machine.scheduleBtn}  {rightArrowIcon({width:22,height:22})}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="machine-info">
                                                <div className="light-txt heading-400-12-10">{machine.inspectionDate}</div>
                                                <div className="light-txt heading-400-12-10">{machine.inspectionTime}</div>
                                            </div>
                                            <div className="machine-info">
                                                <div className="heading-400-16">{machine.bloked}</div>
                                                <div className="heading-400-16">{machine.insepectTime}</div>
                                            </div>
                                        </>
                                    )}
                                    <div className="btns-wrap-view">
                                        <button className="item-btn" onClick={() => {window.location = "machine-sale-2"}}>View Details</button>
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
                    </>
                        )}
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default  MyMachineAddToCart;
