import React,{useState} from "react";
import "./Benefits.css";
import DetailedReport from "../../../Modals/DetailedReport";
import {infoIcon} from "../../../../../../helpers/Icons";
const Benefits = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }
    return (
        <>
            {showModal && (
                <DetailedReport modalAction={handleModal}/>
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-4 benefits">
                    <div className="head">
                        <div className="heading-wrap">
                            <div className="heading-600-32 heading-600-32-20 text-left">Product Benefits</div>
                            <div className="heading-400-14-12 light-txt">From Machines to tools to finance everything you need in one place</div>
                        </div>
                        <button onClick={() => handleModal(true)} className="box-btn heading-600-14 heading-600-14-12">View Detailed Report</button>
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
                                <span>Static Geometric Test</span>
                                {infoIcon({width:24,height:24})}
                            </div>
                        </div>
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">04/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Good</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>Static Geometric Test</span>
                                {infoIcon({width:24,height:24})}
                            </div>
                        </div>
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">04/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Good</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>Static Geometric Test</span>
                                {infoIcon({width:24,height:24})}
                            </div>
                        </div>
                        <div className="item">
                            <div className="circle">
                                <div className="score-wrap">
                                    <div className="heading-600-20 heading-600-20-16 t-a-c">04/05</div>
                                    <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Good</div>
                                </div>
                            </div>
                            <div className="title t-a-c">
                                <span>Static Geometric Test</span>
                                {infoIcon({width:24,height:24})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Benefits;