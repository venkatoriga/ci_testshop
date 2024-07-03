import React,{useState} from "react";
import "./MachineSale2.css";
import Breadcrumbs from "../../Buying/Breadcrumbs/index";
import Footer from "../../Footer/Footer";
import {botIcon, editIcon, inspectionIcon} from "../../../helpers/Icons";
import MachineSaleImage from "./MachineSaleImage";
import ScheduleWithoutTime from "../Modals/ScheduleWithoutTimeModal";
import MachineLocationModal from "../Modals/MachineLocationModal"
import UserModal from "../Modals/UserModal";
import RemoveMachineModal from "../Modals/RemoveMachineModal";


const MachineSale2 = () => {
    const [showModal, setShowModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
            document.body.classList.add('no-overflow');
        }else{
            setShowModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const breadcrumbsItems = [
        {name:"Account",link:"/"},
        {name:"My Machine",link:"/my-machine"},
        {name:"Up for Sale",link:"/machine-sale-2"},
    ];
    return (
        <>
            {showModal && (
                <ScheduleWithoutTime modalAction={handleModal}/>
            )}
            {showLocationModal && (
                <MachineLocationModal modalAction={setShowLocationModal}/>
            )}
            {showUserModal && (
                <UserModal modalAction={setShowUserModal}/>
            )}
            {showRemoveModal && (
                <RemoveMachineModal modalAction={setShowRemoveModal}/>
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-5">
                    <div className="top-wrap">
                        <Breadcrumbs items={breadcrumbsItems}/>
                    </div>
                    <div className="name-wrap">
                        <div className="heading-wrap">
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">CNC Machine <span className='procesing-btn heading-400-12-10'>processing</span></div>
                            <div className="heading-400-14-12 light-txt">Hitachi</div>
                        </div>
                        <button type="button" className="contact-btn heading-400-14-12">Contact Origa</button>
                    </div>
                </div>
            </div>
            <MachineSaleImage/>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-sell-progress">
                        <div className="machine-content">
                            <div className="content-item">
                                <span className="first">{inspectionIcon({width: 28, height: 28 })}</span>
                                <div className="t-a-c">Registration</div>
                                <div className="t-a-c light-txt">12th June 2023</div>
                            </div>
                            <div className="content-item">
                                <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                                <div className="t-a-c light-txt">Inspection</div>
                            </div>
                            <div className="content-item">
                                <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                                <div className="t-a-c light-txt">Documentation</div>
                            </div>
                            <div className="content-item">
                                <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                                <div className="t-a-c light-txt enlisting">Enlisting</div>
                            </div>
                            <div className="content-item">
                                <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                                <div className="t-a-c light-txt">Sale</div>
                            </div>
                            <div className="content-item">
                                <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                                <div className="t-a-c light-txt">Payment Received</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="sale2-box-wrap">
                        <div className="box-item">
                            <div className="inner">
                                <div className="inner-info">
                                    <div className="inner-info-1">
                                        <div className="heading heading-400-14-10 light-txt">Preferred Inspection Time</div>
                                        <div className="date-details heading-500-16-14">Morning, Afternoon</div>
                                    </div>
                                    <div className="inner-info-1">
                                        <div className="heading heading-400-14-10 light-txt">Preferred Inspection Date</div>
                                        <div className="date-details heading-500-16-14">1st May 2023, 8th May 2023, 11th May 2023</div>
                                    </div>
                                </div>
                                <div className="edit-icon" onClick={() => handleModal(true)}>{editIcon({width:24,height:24})}</div>
                            </div>
                            <div className="inner remove-req">
                                <div className="heading-400-14-12 light-txt">Wish to remove your selling request from Origa?</div>
                                <button className="box-btn heading-600-14 heading-600-14-12" onClick={() => {setShowRemoveModal(true)}}>Remove Request</button>
                            </div>
                        </div>
                        <div className="box-item-1">
                            <div className="inner-info">
                                <div className="inner-info-1">
                                    <div className="heading heading-400-14-10 light-txt text-white mb-2">Point of Contact Details</div>
                                    <div className="heading-500-16-14">Rajeev Singh</div>
                                    <div className="email heading-500-16-14">rajeev@gmail.com , 9833956203</div>
                                </div>
                                <div className="edit-icon" onClick={() => {setShowUserModal(true)}}>{editIcon({width:24,height:24})}</div>
                            </div>
                            <div className="inner-info info-1">
                                <div className="inner-info-1">
                                    <div className="heading heading-400-14-10 light-txt mb-2">Machine Location</div>
                                    <div className="address heading-500-16-14">Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093</div>
                                </div>
                                <div className="edit-icon-location" onClick={() => {setShowLocationModal(true)}}>{editIcon({width:24,height:24})}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="max-container my-5">
                <div className="bot-icon-wrap">
                    <div className="bot-icon">{botIcon({width:37,height:37})}</div>
                </div>
            </div> */}
            <Footer/>
        </>
    );
}
export default MachineSale2;