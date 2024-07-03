import React,{useState} from "react";
import "./Benefits.css";
import DetailedReport from "../../Modals/DetailedReport";
import {visualIcon,machineDynamicIcon,machineStaticIcon,conditionIcon} from "../../../../helpers/Icons";
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
                    <div className="benefits-content-2">
                        <div className="item">
                            <div className="title">
                                {visualIcon({width:24,height:24})}
                            </div>
                            <div className="content-section">
                                <div className="heading-600-16">Visual Inspection Remarks</div>
                                <div className="desc heading-400-16-14 light-txt">Table T slot broken Normal wear and tear due to ageing and uses</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="title">
                                {machineDynamicIcon({width:28,height:28})}
                            </div>
                            <div className="content-section">
                                <div className="heading-600-16">Machine Dynamic Remarks</div>
                                <div className="desc heading-400-16-14 light-txt">Origa will provide servicing for your machine so you don’t need to worry about anything...</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="title">
                                {machineStaticIcon({width:30,height:30})}
                            </div>
                            <div className="content-section">
                                <div className="heading-600-16">Machine Static Geometrical Test</div>
                                <div className="desc heading-400-16-14 light-txt">Spindle Runout :- 3 micron TIR with needs dial gauge Axis Backlash :-X axis 10 microns,Y axis 5 microns , Z axis 5 microns</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="title">
                                {conditionIcon({width:28,height:28})}
                            </div>
                            <div className="content-section">
                                <div className="heading-600-16">Electrical & Pneumatic Condition</div>
                                <div className="desc heading-400-16-14 light-txt">Origa can provide a lease and loan to enable you to purchase the machine you need</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Benefits;