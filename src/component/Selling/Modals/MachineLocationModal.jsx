import React,{useState} from "react";
import {closeIcon} from "../../../helpers/Icons";
import {hasValidationError,validationError,focusOnFeild} from "../../../helpers/Frontend";

import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://devextension.origa.market/graphql/',
  cache: new InMemoryCache(),
});

const Sell_MACHINE_MUTATION = gql`
  mutation($inputdraft: ProductDraftDetailsInput!) {
    createProductdraftdetails(inputdraft: $inputdraft) {
      productdraftdetails {
        id
        productName
        productVideo
        prodctImage
        __typename
      }
      message
      id
      processid
      __typename
    }
  }
`;

const UpdateProductDraftSchedule = gql`
mutation UpdateProductDraftSchedule($draftData: UpdateProductDraftScheduleInput!) {
    updateProductdraftschedule(draftData: $draftData) {
        message
        __typename
    }
}
`;

const MachineLocationModal = ({modalAction,machineSell,hasMultipleForm = true,machineDetail,handleCustomChange,handleSchedule}) => {
    const [form, setForm] = useState({
        address: machineDetail?.address || '',
        address1: machineDetail?.address1 || '',
        zipcode: machineDetail?.zipcode || '',
    });
    const [errors,setErrors] = useState([]);
    const nextBtnHandle = () => {
        const newError = {};
        let positionFocus = "";
        
        if(!form.address || !form.address.trim()){
            newError["address"] = "Required";
            positionFocus = positionFocus || "address";
        }else if(form.address && form.address.length > 255){
            newError["address"] = "Maximum 255 characters allowed";
            positionFocus = positionFocus || "address";
        }
        if(form.address1 && form.address1.length > 255){
            newError["address1"] = "Maximum 255 characters allowed";
            positionFocus = positionFocus || "address1";
        }
        if(!form.zipcode || !form.zipcode.trim()){
            newError["zipcode"] = "Required";
            positionFocus = positionFocus || "zipcode";
        }else if(form.zipcode && form.zipcode.length < 6){
            newError["zipcode"] = "Pincode must be exactly 6 digits";
            positionFocus = positionFocus || "zipcode";
        }
        setErrors(newError);
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }
        if(handleCustomChange && hasMultipleForm){
            handleCustomChange("address",form.address);
            handleCustomChange("address1",form.address1);
            handleCustomChange("zipcode",form.zipcode);
        }
        modalAction(false);
        const MachineLocation = {
            "address":form.address,
            "address1":form.address1,
            "zipcode":form.zipcode
        }
        handleSchedule(MachineLocation)
        if(machineSell){
            window.location ="/machine-sale-2"
        }
    }
    const handlepincode = (e) => {
        const userNameRE = /^\d{0,6}$/;
        if(e.target.value.length >= 6 || !userNameRE.test(e.key)){
            e.preventDefault();
        }
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
                    <div className="heading-600-20 heading-600-20-16">Machine Location</div>
                    <div className="heading-400-14-12 text">Please select a suitable reason</div>
                </div>
                <div className="bi-form-group">
                    <input type="text" name="address" id="address" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors,"address") ? "has-input-error" : "")}`} placeholder="Enter Address Line 1" autoCapitalize='off' onChange={onChange} value={form.address}/>
                    <label htmlFor="address" className="bi-form-label">Address Line 1</label>
                    {hasValidationError(errors,"address") ? (<span className="has-cust-error">{validationError(errors,"address")}</span>) : null}
                </div>
                <div className="bi-form-group">
                    <input type="text" name="address1" id="address1" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors,"address1") ? "has-input-error" : "")}`} placeholder="Enter Address Line 2" autoCapitalize='off' onChange={onChange} value={form.address1}/>
                    <label htmlFor="address1" className="bi-form-label">Address Line 2</label>
                    {hasValidationError(errors,"address1") ? (<span className="has-cust-error">{validationError(errors,"address1")}</span>) : null}
                </div>
                <div className="bi-form-group">
                    <input type="text" name="zipcode" id="zipcode" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors,"zipcode") ? "has-input-error" : "")}`} placeholder="Enter Pin Code" autoCapitalize='off' onChange={onChange} onKeyPress={handlepincode} value={form.zipcode}/>
                    <label htmlFor="zipcode" className="bi-form-label">Pin Code</label>
                    {hasValidationError(errors,"zipcode") ? (<span className="has-cust-error">{validationError(errors,"zipcode")}</span>) : null}
                </div>
                <div className="bi-btn-wrap">
                    <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                    <button type="button" className="btn-submit heading-600-16" onClick={nextBtnHandle }>Save</button>
                </div>
            </div>
        </div>
    );
}
export default MachineLocationModal;