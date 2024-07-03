import React,{useState} from "react";
import DatePicker from "react-multi-date-picker";
import {closeIcon,morningIcon,afternoonIcon,eveningIcon} from "../../../helpers/Icons";
import {hasValidationError,validationError,focusOnFeild} from "../../../helpers/Frontend";
import Icon from "react-multi-date-picker/components/icon";
import dayjs from 'dayjs';
const ScheduleModal = ({modalAction,setShowUserModel,hasMultipleForm = true,machineDetail,handleCustomChange}) => {
    const [selectedDates, setSelectedDates] = useState(machineDetail?.dates || []);
    const [form, setForm] = useState({
        dates: machineDetail?.dates || [],
        times: machineDetail?.times || [],
    });
    const [errors,setErrors] = useState([]);
    const timePreferences = [
        {name:"Morning",time:"10 AM - 01 PM",icon:"morning"},
        {name:"Afternoon",time:"01 PM - 06 PM",icon:"afternoon"},
        {name:"Evening",time:"06 PM - 10 PM",icon:"evening"},
    ];
    const removeDate = (index) => {
        let dates = Object.assign([],selectedDates);
        dates.splice(index,1);
        setSelectedDates(dates);
    }
    const getSVGIcons = (icon) => {
        if(icon == "morning"){
            return morningIcon({width:22,height:22,fill:"#211E24"});
        }else if(icon == "afternoon"){
            return afternoonIcon({width:22,height:22,fill:"#211E24"});
        }else if(icon == "evening"){
            return eveningIcon({width:22,height:22,fill:"#211E24"});
        }
    }
    const handleTimeChange = (value) => {
        let timeObj = Object.assign([],form.times);
        if(!timeObj.includes(value)){
            timeObj.push(value);
        }else{
            timeObj = timeObj.filter((x) => x != value);
        }
        setForm((prevState) => ({...prevState,times: timeObj}));
    }
    const handleSave = () => {
        const newError = {};
        let positionFocus = "";
        if(!selectedDates.length){
            newError["dates"] = "Required";
            positionFocus = positionFocus || "dates";
        }
        if(!form.times.length){
            newError["times"] = "Required";
            positionFocus = positionFocus || "times";
        }
        setErrors(newError);
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }
        modalAction(false);
        if(handleCustomChange){
            handleCustomChange("dates",selectedDates);
            handleCustomChange("times",form.times);
        }
        if(setShowUserModel && hasMultipleForm){
            setShowUserModel(true);
        }
   
    }
       const handleDateChange = (value) => {
    // Filter out past dates
    const filteredDates = value.filter((date) => !dayjs(date).isBefore(dayjs(), 'day'));

    // Limit the selection to a maximum of 3 dates
    const limitedDates = filteredDates.slice(0, 3);

    setSelectedDates(limitedDates);
  };
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="head-wrap">
                    <div className="heading-600-20 heading-600-20-16">Preferred inspection schedule</div>
                    <div className="heading-400-14-12 text">Please select a Suitable Date and Time</div>
                </div>
                <div className="datePickerWraper mt20">
                    <div className="datePickerWrap">
                        {selectedDates.length > 0 ? selectedDates.map((selectedDate,index) => (
                            <div className="datePickerItem heading-600-12" key={index}>{selectedDate.day} {selectedDate.month.shortName}{closeIcon({width:12,height:12,onClick: () => removeDate(index)})}</div>
                        )) : <span className="placeholder">Select upto 3 dates</span>}
                    </div>
                    <DatePicker multiple disabled={selectedDates.length >= 3} className="datePickerCalender" onChange={handleDateChange} value={selectedDates} render={<Icon/>}/>
                </div>
                {hasValidationError(errors,"dates") ? (<span className="has-cust-error">{validationError(errors,"dates")}</span>) : null}
                {selectedDates.length > 0 ? (
                    <div className="timePreferences">
                        <label>Select Time Preference</label>
                        <div className="timePreference-wrap">
                            {timePreferences.map((timePreference,index) => (
                                <div className={`timePreference-item column ${(form.times.includes(timePreference.time) ? "selected" : "")}`} onClick={() => handleTimeChange(timePreference.time)} key={index}>
                                    <div className="icon">{getSVGIcons(timePreference.icon)}</div>
                                    <div className="data">
                                        <div className="name">{timePreference.name}</div>
                                        <div className="time">{timePreference.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {hasValidationError(errors,"times") ? (<span className="has-cust-error">{validationError(errors,"times")}</span>) : null}
                    </div>
                ) : null}
                <div className="bi-btn-wrap">
                    <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                    <button type="button" className="btn-submit heading-600-16" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
export default ScheduleModal;