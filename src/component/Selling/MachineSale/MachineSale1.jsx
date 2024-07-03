import React from "react";
import "./MachineSale1.css";
import Breadcrumbs from "../../Buying/Breadcrumbs/index";
import Footer from "../../Footer/Footer";
import {botIcon} from "../../../helpers/Icons";
import MachineSaleImage from "./MachineSaleImage";
import MachineSaleProgress from "./MachineSaleProgress";
import RemoveSalling from "./RemoveSalling";
const MachineSale1 = () => {
    const breadcrumbsItems = [
        {name:"Account",link:"/"},
        {name:"My Machine",link:"/my-machine"},
    ];
    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-5">
                    <div className="top-wrap">
                        <Breadcrumbs items={breadcrumbsItems}/>
                    </div>
                    <div className="name-wrap">
                        <div className="heading-wrap">
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">CNC Machine</div>
                            <div className="heading-500-16 light-txt">Hitachi</div>
                        </div>
                        <button type="button" className="contact-btn heading-400-14-12">Contact Origa</button>
                    </div>
                </div>
            </div>
            <MachineSaleImage/>
            <MachineSaleProgress/>
            <RemoveSalling/>
            {/* <div className="max-container my-5">
                <div className="bot-icon-wrap">
                    <div className="bot-icon">{botIcon({width:37,height:37})}</div>
                </div>
            </div> */}
            <Footer/>
        </>
    );
}
export default MachineSale1;