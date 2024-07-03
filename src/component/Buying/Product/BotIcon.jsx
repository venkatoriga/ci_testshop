import React from "react";
import {botIcon} from "../../../helpers/Icons";
const BotComp = () => {
    return (
        <>
            <div className="max-container my-5">
                <div className="bot-icon-wrap">
                    <div className="bot-icon">{botIcon({width:37,height:37})}</div>
                </div>
            </div>
        </>
    );
}
export default BotComp;