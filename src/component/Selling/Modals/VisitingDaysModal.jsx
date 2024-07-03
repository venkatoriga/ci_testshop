import React,{useEffect, useState} from "react";
import {closeIcon} from "../../../helpers/Icons";
import {hasValidationError,validationError,focusOnFeild} from "../../../helpers/Frontend";
const VisitingDaysModal = ({modalAction,machineDetail,handleCustomChange}) => {
    const [form, setForm] = useState({days: machineDetail.visiting_days, times: machineDetail.visiting_hours});
    const [errors,setErrors] = useState([]);
    const days = ["Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday","Sunday"];
    const times = ["6 AM - 8 AM","8 AM - 10 AM","10 AM - 12 PM","12 PM - 2 PM","2 PM - 4 PM","4 PM - 6 PM","6 PM - 8 PM","8 PM - 10 PM","10 PM - 12 AM"];
    const nextBtnHandle = () => {
        const newError = {};
        let positionFocus = "";
        if(form.days.length < 1){
            newError["days"] = "Required";
            positionFocus = positionFocus || "days";
        }
        if(form.times.length < 1){
            newError["times"] = "Required";
            positionFocus = positionFocus || "times";
        }
        setErrors(newError);
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }
        if (handleCustomChange) {
            handleCustomChange("visiting_days", form.days);
            handleCustomChange("visiting_hours", form.times);
        }
        modalAction(false);
    }
    const onDayClick = (value) => {
        let dayObj = Object.assign([],form.days);
        if(!dayObj.includes(value)){
            dayObj.push(value);
        }else{
            dayObj = dayObj.filter((x) => x != value);
        }
        setForm((prevState) => ({...prevState,days: dayObj}));
    }
    const onTimeClick = (value) => {
        let timeObj = Object.assign([],form.times);
        if(!timeObj.includes(value)){
            timeObj.push(value);
        }else{
            timeObj = timeObj.filter((x) => x != value);
        }
        setForm((prevState) => ({...prevState,times: timeObj}));
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="head-wrap">
                    <div className="heading-600-20 heading-600-20-16">Visiting Days</div>
                    <div className="heading-400-14-12 text">Please select a  Suitable Date and Time</div>
                </div>
                <div className="bi-cust-group mb20">
                    <label className="heading-400-14">Select Day</label>
                    <div className="days-time-wrap">
                        {days.map((day,index) => (
                            <div className={`day-time ${(form.days.includes(day) ? "selected" : "")}`} key={index} onClick={() => onDayClick(day)}>{day}</div>
                        ))}
                    </div>
                    {hasValidationError(errors,"days") ? (<span className="has-cust-error">{validationError(errors,"days")}</span>) : null}
                </div>
                <div className="bi-cust-group">
                    <label className="heading-400-14">Select Time</label>
                    <div className="days-time-wrap">
                        {times.map((time,index) => (
                            <div className={`day-time ${(form.times.includes(time) ? "selected" : "")}`} key={index} onClick={() => onTimeClick(time)}>{time}</div>
                        ))}
                    </div>
                    {hasValidationError(errors,"times") ? (<span className="has-cust-error">{validationError(errors,"times")}</span>) : null}
                </div>
                <div className="bi-btn-wrap">
                    <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                    <button type="button" className="btn-submit heading-600-16" onClick={nextBtnHandle}>Save</button>
                </div>
            </div>
        </div>
    );
}
export default VisitingDaysModal;