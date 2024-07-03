import React,{useState} from "react";
import DatePicker from "react-multi-date-picker";
import {closeIcon} from "../../../helpers/Icons";
import Icon from "react-multi-date-picker/components/icon";
const ScheduleWithoutTimeModal = ({modalAction}) => {
    const [selectedDates,setSelectedDates] = useState([]);
    const [form,setForm] = useState({dates:[]});
    const removeDate = (index) => {
        let dates = Object.assign([],selectedDates);
        dates.splice(index,1);
        setSelectedDates(dates);
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="head-wrap">
                    <div className="heading-600-20 heading-600-20-16">Preferred Inspectaion Schedule</div>
                    <div className="heading-400-14-12 text">Fill in these details in order to quickly proceed</div>
                </div>
                <div className="datePickerWraper">
                    <div className="datePickerWrap">
                        {selectedDates.length > 0 ? selectedDates.map((selectedDate,index) => (
                            <div className="datePickerItem heading-600-12" key={index}>{selectedDate.day} {selectedDate.month.shortName}{closeIcon({width:12,height:12,onClick: () => removeDate(index)})}</div>
                        )) : <span className="placeholder">Select upto 3 dates</span>}
                    </div>
                    <DatePicker multiple disabled={selectedDates.length >= 3} className="datePickerCalender" onChange={setSelectedDates} value={selectedDates} render={<Icon/>}/>
                </div>
                <div className="bi-btn-wrap">
                    <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                    <button type="button" className="btn-submit heading-600-16" onClick={() => modalAction(false)}>Save</button>
                </div>
            </div>
        </div>
    );
}
export default ScheduleWithoutTimeModal;