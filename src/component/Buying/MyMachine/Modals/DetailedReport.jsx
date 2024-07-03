import React, { useState,useEffect } from "react";
import "./DetailedReport.css";
import {closeIcon} from "../../../../helpers/Icons";
import TabSlider from "../../../SubComponent/AllSlider/TabSlider";
const DetailedReport = (docurl) => {
    const [activeTab,setActiveTab] = useState("visual");
    const [isSmallscreen,setIsSmallScreen]=useState(window.innerWidth<=576);
    const download=()=>{
        console.log(docurl)
        window.location.href = docurl?.docurl;
    }
    const breakpoints={
        def:1,
        a:3,
        b:3,
        c:3,
        d:4.3,
        e:2
      }
    //   useEffect(() => {
    //     document.addEventListener("DOMContentLoaded", function() {
    //         var childElement = document.querySelector(".tabchild");
    //         var grandparentElement = childElement.parentElement.parentElement; // Accessing grandparent element
          
    //         // Set the desired width for the grandparent element
    //         grandparentElement.style.width = "fit-content"; // You can adjust this value as needed
    //       });
    //   }, [])
      
    return (
        <div className="popup-wrap-detailed-report">
            <div className="back" onClick={() => docurl.modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => docurl.modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                <div className="heading-600-20 heading-600-20-16">View Complete Inspection Report</div>
                {!isSmallscreen ? <div className="tab-wrap">
                    <button onClick={() => setActiveTab("visual")} className={activeTab == "visual" ? "active btn " : "btn"} type="button">Visual</button>
                    <button onClick={() => setActiveTab("static")} className={activeTab == "static" ? "active btn" : "btn"} type="button">Staic</button>
                    <button onClick={() => setActiveTab("dynamics")} className={activeTab == "dynamics" ? "active btn" : "btn"} type="button">Dynamics</button>
                    <button onClick={() => setActiveTab("electric")} className={activeTab == "electric" ? "active btn" : "btn"} type="button">Electric & Pneumatics</button>
                    <button onClick={() => setActiveTab("history")} className={activeTab == "history" ? "active btn" : "btn"} type="button">History</button>
                </div>:
                    <>
                    <div className="scroller-tabs-container">
                    <div className="scroller-tabs">
                    <div onClick={() => setActiveTab("visual")} className={` ${activeTab == "visual" ? "active-tab w-fit" : "heading-400-16-14 op-60 "}`} >Visual</div>
                    <div onClick={() => setActiveTab("static")} className={activeTab == "static" ? "active-tab w-fit" : "heading-400-16-14 op-60"} >Staic</div>
                    <div onClick={() => setActiveTab("dynamics")} className={activeTab == "dynamics" ? "active-tab w-fit" : "heading-400-16-14 op-60"} >Dynamics</div>
                    <div onClick={() => setActiveTab("electric")} className={activeTab == "electric" ? "active-tab w-fit" : "heading-400-16-14 op-60"} >Electric & Pneumatics</div>
                    <div onClick={() => setActiveTab("history")} className={activeTab == "history" ? "active-tab w-fit" : "heading-400-16-14 op-60"} >History</div>
                    </div>
                    </div>
                    </>
            }
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
                <button type="button"   onClick={() => download()}  className="download-btn">Download reports</button>
            </div>
        </div>
    );
}
export default DetailedReport;