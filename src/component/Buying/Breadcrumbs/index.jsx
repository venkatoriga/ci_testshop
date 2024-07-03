import React from "react";
import "./Breadcrumbs.css";
import {backIcon} from "../../../helpers/Icons";

const Breadcrumbs = ({items}) => {
    return(
        <div className="d-flex breadcrumbs-wrap">
            <button className="back-btn">{backIcon({width:30,height:20})}</button>
            {items.length > 0 ? (
                <ul className="breadcrumbs-list">
                    {items.map((item,index) => (
                        <li key={index}><a href={item.link} className="heading-400-14-12">{item.name}</a></li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
export default Breadcrumbs;