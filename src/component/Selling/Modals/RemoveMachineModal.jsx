import React, { useState,useEffect } from "react";
import { closeIcon, removeMachineErrorIcon, thankYouIcon, customSelectIcon, customTickIcon } from "../../../helpers/Icons";
import { hasValidationError, validationError, focusOnFeild } from "../../../helpers/Frontend";
import "./RemoveMachineModal.css";
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const clientMachine = new ApolloClient({
    uri: 'https://devextension.origa.market/graphql/',
    cache: new InMemoryCache(),
});

const sellCancelReason = gql`
{
    sellCancelReason {
      message
      code
      response
    }
  }
`;
const Sellcancelrequest = gql`
mutation updateSellcancelrequest($requestinput : UpdateCancelRequestInput!) {
  updateSellcancelrequest(requestinput: $requestinput) {
    draftdata {
      PdId
      approvedStatus
    }
    message
  }
}
`;
const RemoveMachineModal = (modalAction) => {
    const [activeStep, setActiveStep] = useState(1);
    const [RejectReason, SetRejectReason] = useState([]);
    const [form, setForm] = useState({ reason: "", other_reason: "", email: "" });
    const [errors, setErrors] = useState([]);
    //const reasons = [{ id: 1, name: "Reason 1" }, { id: 2, name: "Reason 2" }, { id: 3, name: "Reason 3" }, { id: 4, name: "Reason 4" }, { id: 5, name: "Reason 5" }]
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleReasonChange = (value) => {
        setForm((prevState) => ({ ...prevState, reason: value }));
    }
    useEffect(() => {
        const RejectReason = async () => {
            try {
                const { data } = await clientMachine.mutate({
                    mutation: sellCancelReason,
                    // variables: { requestinput: reqBody },
                });
                console.log("API Response data*******==>", data?.sellCancelReason?.response?.reason);
                SetRejectReason(data?.sellCancelReason?.response?.reason)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        RejectReason();
    }, []);
    
    const removeMachineHandler = () => {
        const newError = {};
        let positionFocus = "";
        // if (!form.reason || !form.reason.trim()) {
        //     newError["reason"] = "Required";
        //     positionFocus = positionFocus || "reason";
        // }
        // if ((!form.reason || !form.reason.trim()) && (!form.other_reason || !form.other_reason.trim())) {
        //     newError["other_reason"] = "Required";
        //     positionFocus = positionFocus || "other_reason";
        // }
        setErrors(newError);
        if (positionFocus) {
            focusOnFeild(positionFocus);
            return false;
        }
        setActiveStep(2);
        console.log(form)
    }
    const removesell = async () => {
        try {
            const id = localStorage.getItem('id');
            // const productId = queryParams.get('id');
            let reqBody = {
                "pdid": modalAction.id,
                "approvedstatus": "Cancel",
                "cancelreason": form.reason
            }; // Ensure the variable names match your GraphQL query

            const { data } = await clientMachine.mutate({
                mutation: Sellcancelrequest,
                variables: { requestinput: reqBody },
            });
            setActiveStep(3)
            // Handle the response data as needed (not shown in the provided code).
            console.log("API Response ==>", data?.customerSellMachineDetails?.response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction.modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction.modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                {activeStep == 1 ? (
                    <>
                        <div className="head-wrap">
                            <div className="heading-600-20 heading-600-20-16">We’re sorry to see you go!</div>
                            <div className="heading-400-14-12 text">Please select a suitable reason</div>
                        </div>
                        <div className="reasons-wrap">
                            {RejectReason?.map((reason, index) => (
                                <div className={`reason ${((form.reason == reason.name) ? "selected" : "")}`} key={index} onClick={() => handleReasonChange(reason.name)}>
                                    <span>{reason.reason}</span>
                                    <span className="tick">
                                        {customSelectIcon({ width: 50, height: 24 })}
                                        <span className="main-tick">{customTickIcon({ width: 16, height: 16, fill: "#9B9E51" })}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        {hasValidationError(errors, "reason") ? (<span className="has-cust-error">{validationError(errors, "reason")}</span>) : null}
                        <div className="bi-form-group">
                            <textarea rows="3" type="text" name="other_reason" id="other_reason" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "other_reason") ? "has-input-error" : "")}`} placeholder="Type other reason" autoCapitalize='off' onChange={onChange} value={form.other_reason} />
                            <label htmlFor="other_reason" className="bi-form-label">Other Reason</label>
                            {hasValidationError(errors, "other_reason") ? (<span className="has-cust-error">{validationError(errors, "other_reason")}</span>) : null}
                        </div>
                        <div className="bi-btn-wrap">
                            <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction.modalAction(false)}>Cancel</button>
                            <button type="button" className="btn-submit heading-600-16" onClick={removeMachineHandler}>Remove Machine</button>
                        </div>
                    </>
                ) : null}
                {activeStep == 2 ? (
                    <>
                        <div className="heading-600-20 heading-600-20-16">We’re sorry to see you go!</div>
                        <div className="mobile-icon">{removeMachineErrorIcon({ width: 189, height: 189 })}</div>
                        <div className="heading-400-14-12">Origa will reach out to you in regarding your remove request</div>
                        <div className="bi-btn-wrap">
                            <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction.modalAction(false)}>Cancel</button>
                            <button type="button" className="btn-submit heading-600-16" onClick={() => removesell()}>Remove Machine</button>
                        </div>
                    </>
                ) : null}
                {activeStep == 3 ? (
                    <>
                        <div className="heading-600-20 heading-600-20-16">Thank you for Choosing Origa!</div>
                        <div className="mobile-icon">{thankYouIcon({ width: 189, height: 189 })}</div>
                        <div className="heading-400-14-12">We will shortly share the details of the engineer coming to inspect the machine.</div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
export default RemoveMachineModal;