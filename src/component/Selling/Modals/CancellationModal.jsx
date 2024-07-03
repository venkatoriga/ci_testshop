import React,{useState} from "react";
import {closeIcon} from "../../../helpers/Icons";
import {hasValidationError,validationError,focusOnFeild} from "../../../helpers/Frontend";
const CancellationModal = ({modalAction}) => {
    const [form,setForm] = useState({reason: ""});
    const [errors,setErrors] = useState([]);
    const nextBtnHandle = () => {
        const newError = {};
        let positionFocus = "";
        if(!form.reason || !form.reason.trim()){
            newError["reason"] = "Required";
            positionFocus = positionFocus || "reason";
        }
        setErrors(newError);
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }
        modalAction(false);
    }
    const onChange = (e) => {
        const {name,value} = e.target;
        setForm((prevState) => ({...prevState,[name]: value}));
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="head-wrap">
                    <div className="heading-600-20 heading-600-20-16">Request Cancellation</div>
                    <div className="heading-400-14-12 text">Select reason for cancellation</div>
                </div>
                <div className="bi-form-group">
                    <select name="reason" id="reason" className={`bi-form-field bi-select-dropdown heading-600-14-12 ${(hasValidationError(errors,"reason") ? "has-input-error" : "")}`} placeholder="Select Reason" autoCapitalize='off' onChange={onChange} value={form.reason}>
                        <option value="">Select Reason</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Interested">Interested</option>
                    </select>
                    <label htmlFor="reason" className="bi-form-label">Select Reason</label>
                    {hasValidationError(errors,"reason") ? (<span className="has-cust-error">{validationError(errors,"reason")}</span>) : null}
                </div>
                <div className="bi-btn-wrap">
                    <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                    <button type="button" className="btn-submit heading-600-16" onClick={nextBtnHandle}>Request</button>
                </div>
            </div>
        </div>
    );
}
export default CancellationModal;