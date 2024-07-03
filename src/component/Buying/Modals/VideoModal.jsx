import React from "react";
import "./VideoModal.css";
import {closeIcon,playIcon,playLineIcon,} from "../../../helpers/Icons";
const VideoModal = (parms) => {
    console.log(parms)
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => parms.modalAction(false)}></div>
            <div className="inner-video">
                <button onClick={() => parms.modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="video-wrap">
                    <video className="machine-video" src={parms.video} controls="controls" poster={parms.video}></video>
                </div>
            </div>
        </div>
    );
}
export default VideoModal;