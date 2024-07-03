import React,{useState} from "react";
import "./Benefits.css";
import DetailedInspection from "../Modals/DetailedInspection";
import {infoIcon} from "../../../helpers/Icons";
const Benefits = () => {
    const [showModal,setShowModal] = useState(false);
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }
    return (
        <>
            {showModal === "detailed-inspection" && (
                <DetailedInspection modalAction={handleModal}/>
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-4 benefits-main">
                    <div className="head">
                        <div className="heading-wrap">
                            <div className="heading-600-32 heading-600-32-20 text-left">Product Benefits</div>
                            <div className="heading-400-14-12 light-txt">From Machines to tools to finance everything you need in one place</div>
                        </div>
                        <button onClick={() => handleModal("detailed-inspection")} className="box-btn heading-600-14 heading-600-14-12">View Detailed Report</button>
                    </div>
                    <div className="benefits-content">
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">04/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Good</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>
                                    External Visual Condition
                                    <div className="svg-wrap">
                                        {infoIcon({ width:24,height:24,onClick:() => handleModal("external-visual")})}
                                        {showModal === "external-visual" && (
                                            <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                        )}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">05/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Great</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>
                                    Static Geometric Test
                                    <div className="svg-wrap">
                                        {infoIcon({ width:24,height:24,onClick:() => handleModal("static-geometric")})}
                                        {showModal === "static-geometric" && (
                                            <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                        )}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">02/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Workable</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>
                                    Electric & Pneumatic Condition
                                    <div className="svg-wrap">
                                        {infoIcon({ width:24,height:24,onClick:() => handleModal("electric-pneumatic")})}
                                        {showModal === "electric-pneumatic" && (
                                            <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                        )}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">03/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Fair</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>
                                    Machine Usage History
                                    <div className="svg-wrap">
                                        {infoIcon({ width:24,height:24,onClick:() => handleModal("machine-history")})}
                                        {showModal === "machine-history" && (
                                            <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                        )}
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Benefits;