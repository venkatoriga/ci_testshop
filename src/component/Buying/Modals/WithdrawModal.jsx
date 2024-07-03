import React,{useState} from "react";
import "./WithdrawModal.css";
import {closeIcon, withDrawIcon,customSelectIcon,customTickIcon} from "../../../helpers/Icons";
import {hasValidationError,validationError,focusOnFeild} from "../../../helpers/Frontend";
import {useLocation,useNavigate} from "react-router-dom";
import {ApolloClient,InMemoryCache} from "@apollo/client";
import gql from "graphql-tag";
import { secondClient, Withdraworder } from '../../OrigaExtentionAPI/mutations'

const clientMachine = secondClient






const WithdrawModal = (modaldata) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [form,setForm] = useState({reason: "",other_reason: ""});
    const reasons = [{id:1,name:"Don’t wish to purchase the Machine anymore"},{id:2,name:"Found a better Deal"},]
    const [errors,setErrors] = useState([]);
    const navigate=useNavigate();
    const yesBtn = () => {
        setShowConfirmModal(true);
    };
    const submitWithdraw = async () => {
        const newError = {};
        let positionFocus = "";
      
        if((!form.reason || !form.reason.trim()) && (!form.other_reason || !form.other_reason.trim())){
            newError["other_reason"] = "Required";
            positionFocus = positionFocus || "other_reason";
        }
        setErrors(newError);
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }

           try{
            const id = localStorage.getItem('id');
            
    const requestinput= {
        "productid": modaldata?.productID,
        "buymachineid": modaldata?.buyMachineId,
        "withdraworder": true,
        "withdrawreason": form.reason?form.reason:form.other_reason
    }
  
    console.log(requestinput)
            const {data} = await clientMachine.mutate({mutation:Withdraworder,variables:{requestinput: requestinput}});
            // setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
            // updateFormattedPrice()
            navigate('/buy/my-machine')
        }catch(error){
            console.error('Error fetching data:', error);
        }
        // navigate('/buy/my-machine-grid-view')
        console.log(form,'gfdgdsfgdsfgform')
    };
    const onChange = (e) => {
        const {name,value} = e.target;
        setForm((prevState) => ({...prevState,[name]: value}));
    }
    const handleReasonChange = (value) => {
        setForm((prevState) => ({...prevState,reason: value}));
    }

    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modaldata.modalAction(false)}></div>
            <div className={`inner ${showConfirmModal ? "withdraw-inner" : ""}`}>
                <button onClick={() => modaldata.modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                {!showConfirmModal && (
                    <>
                        <div className="heading-600-24-14 text-center">Withdraw Order</div>
                        <div className="sure-text heading-600-20-16">Are you sure you want to Withdraw orders?</div>
                        <div className="withdraw-icon">{withDrawIcon({width:189,height:189})}</div>
                        <div className="heading-400-14-12">You will loose the token amount if you withdraw</div>
                        <div className="btn-wrap-withdraw">
                            <button type="button" className="no-btn heading-600-16" onClick={() => modaldata.modalAction(false)}>No</button>
                            <button type="button" className="yes-btn heading-600-16" onClick={yesBtn}>Yes</button>
                        </div>
                    </>
                )}
                {showConfirmModal && (
                    <>
                        <div className="withdraw-head-wrap">
                            <div className="heading-600-20-16 text-left withdraw">Withdraw Order</div>
                            <div className="heading-400-14-12 text-left mb-4 txt-light">Why do you wish to withdraw your Order?</div>
                        </div>
                        <div className="reasons-wrap">
                            {reasons.map((reason,index) => (
                                <div className={`reason ${((form.reason == reason.name) ? "selected" : "")}`} key={index} onClick={() => handleReasonChange(reason.name)}>
                                    <span>{reason.name}</span>
                                    <span className="tick">
                                        {customSelectIcon({width:50,height:24})}
                                        <span className="main-tick">{customTickIcon({width:16,height:16,fill:"#9B9E51"})}</span>    
                                    </span>
                                </div>
                            ))}
                        </div>
                        {hasValidationError(errors,"reason") ? (<span className="has-cust-error">{validationError(errors,"reason")}</span>) : null}
                        <div className="bi-form-group-white">
                            <textarea  rows="3" type="text" name="other_reason" id="other_reason" className={`bi-form-field-white heading-600-14-12 ${(hasValidationError(errors,"other_reason") ? "has-input-error" : "")}`} style={{minHeight:"100px",paddingTop:"10px"}} placeholder="Type other reason" autoCapitalize='off' onChange={onChange} value={form.other_reason}/>
                            <label htmlFor="other_reason" className="bi-form-label-white light-txt ">Type Other Reason</label>
                            {hasValidationError(errors,"other_reason") ? (<span className="has-cust-error">{validationError(errors,"other_reason")}</span>) : null}
                        </div>
                        <button type="button" className="send-btn heading-600-16" onClick={submitWithdraw}>Send</button>
                    </>
                )}
            </div>
        </div>
    );
}
export default WithdrawModal;