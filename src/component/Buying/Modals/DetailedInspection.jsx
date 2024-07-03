import React, { useEffect, useState } from "react";
import "./DetailedInspection.css";
import {closeIcon,detailedReportIcon,mobileIcon, timeLineIcon} from "../../../helpers/Icons";
const DetailedInspection = ({modalAction,productId}) => {
   const[docurl,setdocurl]=useState();
    const download=()=>{
        console.log("url inspection===>>>",docurl)
        window.location.href = docurl;
    }
    useEffect(()=>{
        const downloadInspectionReport = async () => {
            try {
                const response = await fetch('https://devextension.origa.market/api/getinspectionreport', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "id": 1 }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setdocurl(data?.docurl)
                // handleModal("detailed-report")
                console.log(data, 'response');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        downloadInspectionReport();
    },[])
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">Get a detailed Inspection Report</div>
                <div className="report-icon">{detailedReportIcon({width:189,height:189})}</div>
                <div className="heading-400-14-12">Get a clear idea of the machine by reading our detailed inspection report. Our Engineers do a thorough on ground inspection of the machine to assess every aspect of the machine.</div>
                <div className="price heading-600-20 heading-600-20-16">Free <span>Worth ₹5,000</span></div>
                <div className="offer-valid heading-300-14-10"> <span>{timeLineIcon({width:24,height:24})}</span>Offer Valid ends in 2 Days, 4 hours and 24 minutes</div>
                <button type="button" className="awail-btn" onClick={download}>Avail Now for Free</button>
            </div>
        </div>
    );
}
export default DetailedInspection;