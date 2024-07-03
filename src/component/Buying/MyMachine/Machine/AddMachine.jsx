import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { botIcon, leftArrowIcon, ellipsePurpleIcon, ellipseWhiteIcon, vectorLineIcon } from "../../../../helpers/Icons";
import FooterBottom from "../../../Footer/FooterBottom";
import "./AddMachine.css";
const AddMachine = () => {
    const navigate = useNavigate();
    const [isDisabled,setIsDisabled]=useState(true);
    const [validation, setvalidaion] = useState({ fvalidation: false, lvalidation: false, mname: false, mmake: false, pvalidation: false, apvalidation: false, evalidation: false });
    const [profileData, setProfileData] = useState({
        mMachine: "",
        mMake: "",
        firstname: "",
        lastname: "",
        emailid: "",
        phonenumber: "",
        aphonenumber: "",
    })

    const onbtnHandler=()=>{
        if(profileData.firstname!=="" && profileData.lastname!=="" && profileData.phonenumber.length>=10 && profileData.mMachine!=="" && profileData.mMake!==""){
          
            setIsDisabled(false)  
        
         }else{
            setIsDisabled(true)
         }
        
    
    }

    useEffect(()=>{

        onbtnHandler()
    },[profileData.phonenumber.length===10,profileData.firstname,profileData.lastname ,profileData.mMachine , profileData.mMake])
    const onEmailChange = (e) => setProfileData({ ...profileData, emailid: e.target.value });
    const onFirstnameChange = (e) => {
        const newInputString = e.target.value;
        const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');
        // Update the state only if the input is empty or contains valid characters
        if (newInputString === '' || sanitizedInput === newInputString) {

            setProfileData({ ...profileData, firstname: sanitizedInput });
        }
    }
    const onMachineName = (e) => {
        setProfileData((prev) => ({ ...prev, mMake: e }))
    }
    const onMachineMake = (e) => {
        setProfileData((prev) => ({ ...prev, mMachine: e }))
    }
    const onLastname = (e) => {
        const newInputString = e.target.value;
        const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

        // Update the state only if the input is empty or contains valid characters
        if (newInputString === '' || sanitizedInput === newInputString) {
            setProfileData({ ...profileData, lastname: sanitizedInput });
        }
    }

    const onAlterPhoneNoChange = (e) => {
        const newInputString = e.target.value;
        const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

        // Update the state only if the input is empty or contains valid characters
        if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
            setProfileData({ ...profileData, aphonenumber: sanitizedInput })
        }
    }
    const onPhoneNoChange = (e) => {
        const newInputString = e.target.value;
        const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

        // Update the state only if the input is empty or contains valid characters
        if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
            setProfileData({ ...profileData, phonenumber: sanitizedInput })
        }
    }
    const onSubmitHandler = () => {
        if (profileData.firstname === "" || profileData.firstname === "" || profileData.phonenumber === "" || profileData.phonenumber.length !== 10 || profileData.mMachine == "" || profileData.mMake == "") {
            if (profileData.firstname == "") setvalidaion((prev) => ({ ...prev, fvalidation: true }))
            if (profileData.lastname == "") setvalidaion((prev) => ({ ...prev, lvalidation: true }))
            if (profileData.phonenumber == "" || profileData.phonenumber.length !== 10) setvalidaion((prev) => ({ ...prev, pvalidation: true }))
            if (profileData.mMachine == "") setvalidaion((prev) => ({ ...prev, mname: true }))
            if (profileData.mMake == "") setvalidaion((prev) => ({ ...prev, mmake: true }))

            return
        }
        if (profileData.emailid) {
            const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            const isValid = emailPattern.test(profileData.emailid);

            setvalidaion(prev => ({
                ...prev,
                evalidation: !isValid
            }));
            if (isValid === false) return
        }
        if (profileData.aphonenumber !== "") {

            if (profileData.aphonenumber.length !== 10) {
                setvalidaion(prev => ({ ...prev, apvalidation: true }))
                return
            }
        }
        navigate("/buy/machine-location");
    }
    return (
        <>
            <div className="container-fluid">
                <div className="max-container my-5">
                    <div className="machine-details-wrap">
                        <div className="btn-wrap">
                            <button onClick={() => navigate(-1)} className="back-btn">{leftArrowIcon({ width: 24, height: 24 })}</button>
                        </div>
                        <div className="body-wrap">
                            <div className="address-top-wrap">
                                <div className="dilevery-address heading-600-16">
                                    <span className='dilevery-address-1'>{ellipsePurpleIcon({ width: 32, height: 32 })}</span>
                                    Machine Details
                                </div>
                                <div className='line'>{vectorLineIcon({ width: 88, height: 1 })}</div>
                                <div className="order-sumary heading-600-16">
                                    <span className='order-sumary-2'>{ellipseWhiteIcon({ width: 32, height: 32 })}</span>
                                    Machine Location
                                </div>
                            </div>
                            <div className="head heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">Add your Machine</div>
                            <div className="details-main-wrap">
                                <div className="details-wrap">
                                    <div className="left-wrap">
                                        <div className="heading heading-500-20">Machine Details</div>
                                        <div className="text">Set your requirements for this project, the estimated price will be based on the project requirements</div>
                                    </div>
                                    <div className="right-wrap-add">
                                        <div className="field-group-wrap-add">
                                            <div className="input-group-wrap-add">
                                                <div className="form-group-add">
                                                    <input
                                                        type="text"
                                                        id="firstname"
                                                        className={`form-field-add heading-600-14 heading-600-14-12 ${validation.mname ? "error-red" : ""}`}
                                                        placeholder="Enter Machine Name"
                                                        //value={machineName}
                                                        onChange={(e) => onMachineName(e.target.value)}
                                                        onClick={() => setvalidaion((prev) => ({ ...prev, mname: false }))}
                                                    />
                                                    <label htmlFor="firstname" className="form-label-add">Machine Name<sup>*</sup></label>
                                                </div>
                                            </div>
                                            <div className="input-group-wrap-add">
                                                <div className="form-group-add">
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        className={`form-field-add heading-600-14 heading-600-14-12 ${validation.mmake ? "error-red" : ""}`}
                                                        placeholder="Enter Machine Brand"
                                                        //value={machineMake}
                                                        onChange={(e) => onMachineMake(e.target.value)}
                                                        onClick={() => setvalidaion((prev) => ({ ...prev, mmake: false }))}
                                                    />
                                                    <label htmlFor="email" className="form-label-add">Machine Brand<sup>*</sup></label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="details-wrap">
                                    <div className="left-wrap">
                                        <div className="heading heading-500-20">Point of Contact Details</div>
                                        <div className="text">Set your requirements for this project, the estimated price will be based on the project requirements</div>
                                    </div>
                                    <div className="right-wrap-add">
                                        <div className="field-group-wrap-add">
                                            <div className="input-group-wrap-add">
                                                <div className={`form-group-add ${validation.fvalidation ? "error-red" : ""}`}>
                                                    <input type="text" name="firstname" id="firstname" className={`form-field-add heading-600-14 heading-600-14-12 ${validation.fvalidation ? "error-red" : ""}`} placeholder="Name"
                                                        value={profileData.firstname} onChange={onFirstnameChange} onClick={() => setvalidaion(prev => ({ ...prev, fvalidation: false }))} autoComplete="off" />
                                                    <label htmlFor="firstname" className="form-label-add">First Name <sup>*</sup></label>
                                                </div>
                                                <div className={`form-group-add ${validation.lvalidation ? "error-red" : ""}`}>
                                                    <input type="text" name="lastname" id="lastname" className={`form-field-add heading-600-14 heading-600-14-12 ${validation.lvalidation ? "error-red" : ""}`} placeholder="Name"
                                                        value={profileData.lastname} onChange={onLastname} onClick={() => setvalidaion(prev => ({ ...prev, lvalidation: false }))} autoComplete="off" />
                                                    <label htmlFor="lastname" className="form-label-add">Last Name <sup>*</sup></label>
                                                </div>
                                            </div>
                                            <div className="input-group-wrap-add">
                                                <div className={`form-group-add ${validation.evalidation ? "error-red" : ""}`}>
                                                    <input type="text" name="email" id="email" value={profileData.emailid} onClick={() => setvalidaion(prev => ({ ...prev, evalidation: false }))} onChange={(e) => onEmailChange(e)} className={`form-field-add heading-600-14 heading-600-14-12 ${validation.evalidation ? "error-red" : ""}`} placeholder="Email Id" autoComplete="off" />
                                                    <label htmlFor="email" className="form-label-add">Email</label>
                                                </div>
                                            </div>
                                            <div className="input-group-wrap-add">
                                                <div className={`form-group-add ${validation.pvalidation ? "error-red" : ""}`}>
                                                    <input type="text" name="phone" id="phone" className={`form-field-add heading-600-14 heading-600-14-12 ${validation.pvalidation ? "error-red" : ""}`} placeholder=" Phone Number"
                                                        value={profileData.phonenumber} onChange={onPhoneNoChange} onClick={() => setvalidaion(prev => ({ ...prev, pvalidation: false }))} autoComplete="off" />
                                                    <label htmlFor="phone" className="form-label-add">Phone No <sup>*</sup></label>
                                                </div>
                                                <div className={`form-group-add  ${validation.apvalidation ? "error-red" : ""}`}>
                                                    <input type="text" name="phoneno" id="phoneno" className={`form-field-add heading-600-14 heading-600-14-12 ${validation.apvalidation ? "error-red" : ""}`} placeholder="Alternative Phone Number"
                                                        value={profileData.aphonenumber} onChange={onAlterPhoneNoChange} onClick={() => setvalidaion(prev => ({ ...prev, apvalidation: false }))} autoComplete="off" />
                                                    <label htmlFor="phoneno" className="form-label-add">Alternative Phone No</label>
                                                </div>
                                            </div>
                                            <div className="btn-wrap-proceed"><button className={`btn-proceed  ${isDisabled ? "disable-btn-bg":""}`}  type="button"  onClick={onSubmitHandler}>Proceed to machine Location</button></div>
                                            {/* <div className="btn-wrap-proceed"><button className="btn-proceed" type="button" onClick={onSubmitHandler}>Proceed to machine Location</button></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bot-icon-wrap mt-5">
                        <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
                    </div> */}
                </div>
            </div>
            <FooterBottom />
        </>
    );
}
export default AddMachine