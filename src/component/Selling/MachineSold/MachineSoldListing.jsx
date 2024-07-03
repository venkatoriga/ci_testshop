import React,{useState} from 'react';
import MachineSaleImage from "../MachineSale/MachineSaleImage";
import Breadcrumbs from "../../Buying/Breadcrumbs/index";
import Footer from "../../Footer/Footer";
import {botIcon, downIcon, downloadIcon, editIcon,eyeIcon,heratfillIcon,inspectionIcon, shareIcon} from "../../../helpers/Icons";
import ScheduleWithoutTime from "../Modals/ScheduleWithoutTimeModal";
import MachineLocationModal from "../Modals/MachineLocationModal"
import UserModal from "../Modals/UserModal";
import RemoveMachineModal from "../Modals/RemoveMachineModal";
import "./MachineSoldListing.css";

const MachineSoldListing = () => {
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
        {name:"My Machines",link:"/my-machine"},
        {name:"Up for sale",link:"/machine-inspection"}
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
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">CNC Machine <span className='processing-btn heading-400-12-10'>Processing</span></div>
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
                                <div className="t-a-c light-txt">15th June 2023</div>
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
                    <div className="listing-box-wrap">
                        <div className="box-item col-md-6">
                            <div className="inner-wrap-info d-flex">
                                <div className="inner">
                                    <div className="views-wrap">
                                        <div className="views-wrap-left heading-400-14-10 light-txt">views <span className="number heading-500-16">(+10)</span></div>
                                        <div className="views-number heading-600">+145 <span className="heading-500-16 light-txt">(Total 1,200)</span></div>
                                    </div>
                                    <div>{eyeIcon({width:24,height:24})}</div>
                                </div>
                                <div className="inner">
                                    <div className="views-wrap">
                                        <div className="views-wrap-left heading-400-14-10 light-txt">Wishlist <span className="number heading-500-16">(+10)</span></div>
                                        <div className="views-number heading-600">+24 <span className="heading-500-16 light-txt">(Total 164)</span></div>
                                    </div>
                                    <div className="edit-icon">{heratfillIcon({width:24,height:24})}</div>
                                </div>
                            </div>
                            <div className="inner-info">
                                <div className="inner-wrap-price">
                                    <div className="inner-info-1">
                                        <div className="heading-400-14-12 light-txt">Listed Price</div>
                                        <div className="heading-500-16-14">₹ 4,00,000</div>
                                    </div>
                                    <div className="inner-info-1">
                                        <div className="heading-400-14-12 light-txt">Preferred Inspection Time</div>
                                        <div className="heading-500-16-14">₹ 3,50,000</div>
                                    </div>
                                </div>
                                <div className="price-breakdown text-right pt-3">View Price Breakdown <span>{downIcon({width:24,height:24})}</span></div>
                            </div>
                            <div className="inner remove-req">
                                <div className="heading-400-14-12 light-txt">Wish to remove your selling request from Origa?</div>
                                <button className="box-btn heading-600-14 heading-600-14-12" onClick={() => {setShowRemoveModal(true)}}>Remove Request</button>
                            </div>
                        </div>
                        <div className="box-item-1 col-md-6">
                            <div className="inner-info inner-bg">
                                <div className="inner-info-1">
                                    <div className="inner-info-left heading-400-16-12 text-white">
                                        <span>7 Years Old</span>
                                        <span className="ml-2">|  Origa Rating:</span>
                                        <span className="ml-2">A+</span>
                                        <span className="ml-2">{downloadIcon({width:20,height:20})}</span>
                                    </div>
                                </div>
                                <div className="edit-icon" onClick={() => {window.location ="/"}}>View on Website {shareIcon({width:24,height:24})}</div>
                            </div>
                            <div className="inner-info info-1">
                                <div className="inner-info-1">
                                    <div className="heading-400-14-12 light-txt">Visiting Days</div>
                                    <div className="heading-500-16-14">Monday, Wednesday, Friday</div>
                                </div>
                                <div className="inner-info-1">
                                    <div className="heading-400-14-12 light-txt">Visiting Hours</div>
                                    <div className="heading-500-16-14">9:00 AM - 7:00 PM</div>
                                </div>
                                <div className="edit-icon" onClick={() => handleModal(true)}>{editIcon({width:24,height:24})}</div>
                            </div>
                            <div className="inner-info info-1">
                                <div className="inner-info-1">
                                    <div className="heading heading-400-14-10 light-txt mb-2">Point of Contact Details</div>
                                    <div className="heading-500-16-14">Rajeev Singh</div>
                                    <div className="email heading-500-16-14">rajeev@gmail.com , 9833956203</div>
                                </div>
                                <div className="edit-icon" onClick={() => {setShowUserModal(true)}}>{editIcon({width:24,height:24})}</div>
                            </div>
                            <div className="inner-info info-1">
                                <div className="inner-info-1">
                                    <div className="heading heading-400-14-10 light-txt mb-2">Machine Location</div>
                                    <div className="address heading-500-16">Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093</div>
                                </div>
                                <div className="edit-icon" onClick={() => {setShowLocationModal(true)}}>{editIcon({width:24,height:24})}</div>
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

export default MachineSoldListing