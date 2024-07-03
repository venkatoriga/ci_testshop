import React, { useState } from "react";
import {backIcon} from "../../helpers/Icons";
import Slash from "./Slash";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({items,boldtitle,backnavi,}) => {
    const navigate=useNavigate();
    const [isSmallScreen]=useState(window.innerWidth<=576)
    return(
        <div className="d-flex">

            <div className="d-j-a pr-2 curser-pointer" onClick={backnavi}>{backIcon({width:20,height:20})}</div>
            {items.length > 0 ? (
                <div className="d-flex align-items-center">
                    {!isSmallScreen && items.map((item,index) => (
                        <p key={index} className="m-0 heading-400-14-12 pr-2 curser-pointer op-80" onClick={()=>navigate(item.link)}>{item.name}&nbsp;<Slash/> </p>
                    
                    ))}
                    {isSmallScreen && items.length>1 &&   <p key={0} className="m-0 heading-400-14-12 pr-2 curser-pointer op-80" onClick={()=>navigate(items[0].link)}>{items[0].name}&nbsp;<Slash/>...</p>}
                </div>
            ) : null}
           {!isSmallScreen &&  <p className="heading-600-14 m-0">{boldtitle}</p>}
           {isSmallScreen && items.length<2 &&  <p className="d-flex align-items-center m-0 heading-400-14-12 pr-2 curser-pointer op-80" onClick={()=>navigate(items[0].link)}>{items[0].name}</p>}
           {isSmallScreen &&  <p className="heading-600-14 m-0">/ &nbsp;{boldtitle}</p>}
        </div>
    );
}
export default Breadcrumbs;