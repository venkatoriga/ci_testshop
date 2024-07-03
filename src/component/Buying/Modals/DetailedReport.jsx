import React, { useState } from "react";
import "./DetailedReport.css";
import {closeIcon} from "../../../helpers/Icons";
const DetailedReport = ({modalAction}) => {
    const [activeTab,setActiveTab] = useState("visual");
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                <div className="heading-600-20 heading-600-20-16">View Complete Inspection Report</div>
                <div className="tab-wrap">
                    <button onClick={() => setActiveTab("visual")} className={activeTab == "visual" ? "active btn" : "btn"} type="button">Visual</button>
                    <button onClick={() => setActiveTab("static")} className={activeTab == "static" ? "active btn" : "btn"} type="button">Staic</button>
                    <button onClick={() => setActiveTab("dynamics")} className={activeTab == "dynamics" ? "active btn" : "btn"} type="button">Dynamics</button>
                    <button onClick={() => setActiveTab("electric")} className={activeTab == "electric" ? "active btn" : "btn"} type="button">Electric & Pneumatics</button>
                    <button onClick={() => setActiveTab("history")} className={activeTab == "history" ? "active btn" : "btn"} type="button">History</button>
                </div>
                {activeTab == "visual" && (
                    <div className="content-wrap">
                        <div className="heading-600-14 heading-600-14-12">Machine Visual Inspection Remarks</div>
                        <ul className="lists">
                            <li className="heading-400-14-12 list light-txt">Table T slot broken at three places.</li>
                            <li className="heading-400-14-12 list light-txt">Some amount of machine paint and sticker is gone due ageing and uses.</li>
                            <li className="heading-400-14-12 list light-txt">Mitsubishi M70 controller keypad and MOP is in good condition. replacement.</li>
                        </ul>
                    </div>
                )}
                {(activeTab == "static" || activeTab == "dynamics" || activeTab == "electric" || activeTab == "history") && (
                    <p>Loading....</p>
                )}
                <button type="button" className="download-btn">Download reports</button>
            </div>
        </div>
    );
}
export default DetailedReport;