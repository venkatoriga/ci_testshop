import React, { useState } from "react";
import { closeIcon } from "../../../helpers/Icons";
import { hasValidationError, validationError, focusOnFeild } from "../../../helpers/Frontend";
import "./UserModal.css";
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { gql } from '@apollo/client';
const client = new ApolloClient({
    uri: 'https://devextension.origa.market/graphql/',
    cache: new InMemoryCache(),
});
const updateUserdetails = gql`
mutation updateUserdetails($inputusers: CreateUserInput!) {
  updateUserdetails(inputusers: $inputusers) {
    userdetails {
      id
      ompUserId
      firstName
      lastName
      userEmailId
      __typename
    }
    message
    success
    __typename
  }
}
`;

const UserModal = ({ modalAction, setShowThanksModel, hasThanksModel, setShowLocationModal = false, hasMultipleForm = true, machineDetail, handleCustomChange }) => {
    const [form, setForm] = useState({
        first_name: machineDetail?.first_name || "",
        last_name: machineDetail?.last_name || "",
        email: machineDetail?.email || "",
        phone_no: machineDetail?.phone_no || "",
        alternate_no: machineDetail?.alternate_no || "",
    });
    const [errors, setErrors] = useState([]);
    const nextBtnHandle = async () => {
        const newError = {};
        const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let positionFocus = "";
        if (!form.first_name || !form.first_name.trim()) {
            newError["first_name"] = "Required";
            positionFocus = positionFocus || "first_name";
        } else if (form.first_name && form.first_name.length > 100) {
            newError["first_name"] = "Maximum 100 characters allowed";
            positionFocus = positionFocus || "first_name";
        }
        if (!form.last_name || !form.last_name.trim()) {
            newError["last_name"] = "Required";
            positionFocus = positionFocus || "last_name";
        } else if (form.last_name && form.last_name.length > 100) {
            newError["last_name"] = "Maximum 100 characters allowed";
            positionFocus = positionFocus || "last_name";
        }
        if (!form.email || !form.email.trim()) {
            newError["email"] = "Required";
            positionFocus = positionFocus || "email";
        } else if (form.email && form.email.length > 100) {
            newError["email"] = "Maximum 100 characters allowed";
            positionFocus = positionFocus || "email";
        } else if (form.email && !emailRE.test(form.email)) {
            newError["email"] = "Enter a valid email";
            positionFocus = positionFocus || "email";
        }
        setErrors(newError);

        const id = localStorage.getItem('id');
        try {
            // const inputusers = {
            //     "ompuserid": id,
            //     "firstname": form.first_name,
            //     "lastname": form.last_name,
            //     "useremailid": form.email

            // }

            // const { data } = await client.mutate({
            //     mutation: updateUserdetails,
            //     variables: {
            //         inputusers: inputusers
            //     },
            // });

            localStorage.setItem('email', form.email);
            // setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        if (positionFocus) {
            focusOnFeild(positionFocus);
            return false;
        }
        modalAction(false);
        if (hasThanksModel) {
            setShowThanksModel(true);
        }
        if (handleCustomChange) {
            handleCustomChange("first_name", form.first_name);
            handleCustomChange("last_name", form.last_name);
            handleCustomChange("email", form.email);
            handleCustomChange("phone_no", form.phone_no);
            handleCustomChange("alternate_no", form.alternate_no);
        }
        if (setShowLocationModal && hasMultipleForm) {
            setShowLocationModal(true);
        }
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        if(name === "phone_no" || name === "alternate_no"){
            let newValue = value.replace(/[^0-9]/gi,'');
            if(newValue === "" || newValue.length <= 10){
                setForm((prevState) => ({ ...prevState, [name]: newValue }));
                // handleCustom(name,newValue);
            }
        }else{
            setForm((prevState) => ({ ...prevState, [name]: value }));
        }
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                <div className="head-wrap">
                    <div className="heading-600-20 heading-600-20-16">Personal Details</div>
                    <div className="heading-400-14-12 text">Fill in these details in order to quickly proceed</div>
                </div>
                <div className="field-group-wrap">
                    <div className="bi-form-group">
                        <input type="text" name="first_name" id="first_name" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "first_name") ? "has-input-error" : "")}`} placeholder="Enter First Name" autoComplete='off' onChange={onChange} value={form.first_name} />
                        <label htmlFor="first_name" className="bi-form-label light-txt">First Name</label>
                        {hasValidationError(errors, "first_name") ? (<span className="has-cust-error">{validationError(errors, "first_name")}</span>) : null}
                    </div>
                    <div className="bi-form-group">
                        <input type="text" name="last_name" id="last_name" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "last_name") ? "has-input-error" : "")}`} placeholder="Enter Last Name" autoComplete='off' onChange={onChange} value={form.last_name} />
                        <label htmlFor="last_name" className="bi-form-label light-txt">Last Name</label>
                        {hasValidationError(errors, "last_name") ? (<span className="has-cust-error">{validationError(errors, "last_name")}</span>) : null}
                    </div>
                </div>
                <div className="bi-form-group">
                    <input type="text" name="email" id="email" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "email") ? "has-input-error" : "")}`} placeholder="Enter Email Address" autoComplete='off' onChange={onChange} value={form.email} />
                    <label htmlFor="email" className="bi-form-label light-txt">Email Address</label>
                    {hasValidationError(errors, "email") ? (<span className="has-cust-error">{validationError(errors, "email")}</span>) : null}
                </div>
                <div className="field-group-wrap">
                    <div className="bi-form-group">
                        <input type="text" name="phone_no" id="phone_no" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "phone_no") ? "has-input-error" : "")}`} placeholder="Enter First Name" autoComplete='off' onChange={onChange} value={form.phone_no} />
                        <label htmlFor="phone_no" className="bi-form-label light-txt">Phone No</label>
                        {hasValidationError(errors, "phone_no") ? (<span className="has-cust-error">{validationError(errors, "first_name")}</span>) : null}
                    </div>
                    <div className="bi-form-group">
                        <input type="text" name="alternate_no" id="alternate_no" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "alternate_no") ? "has-input-error" : "")}`} placeholder="Enter Last Name" autoComplete='off' onChange={onChange} value={form.alternate_no} />
                        <label htmlFor="alternate_no" className="bi-form-label light-txt">Alternative Phone No</label>
                        {hasValidationError(errors, "alternate_no") ? (<span className="has-cust-error">{validationError(errors, "alternate_no")}</span>) : null}
                    </div>
                </div>
                <button type="button" className="otp-btn heading-600-16" onClick={nextBtnHandle}>Continue</button>
            </div>
        </div>
    );
}
export default UserModal;