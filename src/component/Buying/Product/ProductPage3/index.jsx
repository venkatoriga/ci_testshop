import React,{useState,useEffect} from "react";
import "./ViewProduct.css";
import Breadcrumbs from "../../Breadcrumbs/index";
import SpeakToExpert from "../SpeakToExpert";
import Footer from "../../../Footer/Footer";
import {heartIcon,locationIcon,botIcon} from "../../../../helpers/Icons";
const ViewProductAbove5Lakhs = () => {
    const breadcrumbsItems = [
        {name:"Buy Machhines",link:"/"},
        {name:"CNC Machine",link:"/product-listing"},
        {name:"Hitachi CNC Machine",link:"/cnc-machine"},
    ];
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-5">
                    <div className="top-wrap">
                        <Breadcrumbs items={breadcrumbsItems}/>
                        <div className="form-group">
                            <input type="text" placeholder="Set Delivery Location"/>
                            {locationIcon({width:24,height:24})}
                        </div>
                    </div>
                    <div className="name-wrap">
                        <div className="heading-wrap">
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">Hitachi CNC Machine</div>
                            <div className="heading-400-14-12 light-txt">Hitachi</div>
                        </div>
                        <div className="people heading-400-14-12">
                            <span>200+ people shortlisted</span>
                            {heartIcon({width:25,height:25,fill:"#fff",stroke:"#000"})}
                        </div>
                    </div>
                </div>
            </div>
            <SpeakToExpert/>
            {/* <div className="max-container my-5">
                <div className="bot-icon-wrap">
                    <div className="bot-icon">{botIcon({width:37,height:37})}</div>
                </div>
            </div> */}
            <Footer/>
        </>
    );
}
export default ViewProductAbove5Lakhs;