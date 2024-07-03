import React, { useState, useEffect } from 'react';
import './MachineLocation.css';
import { botIcon, ellipsePurpleIcon, emailIcon, leftArrowIcon, locationIcon, successNumberIcon, vectorLineIcon } from "../../../../helpers/Icons";
import FooterBottom from "../../../Footer/FooterBottom";
import WithdrawModal from '../../Modals/WithdrawModal';
import { useNavigate } from 'react-router-dom';
import AddYourMachinePopup from '../../../SubComponent/AllBlock/AddYourMachinePopup'

const MachineLocation = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [validation, setvalidaion] = useState({ pinvalidation1: false, pinvalidation2: false, statevalidation: false });
    const [profileData, setProfileData] = useState({
        pincode1: "",
        pincode2: "",
        state: "",
        address1: "",
        address2: "",

    })
    const onStateChange = (e) => {
        setProfileData((prev) => ({ ...prev, state: e }));
    };

    const navigate = useNavigate('/buy/add-machine')
    const onPinCodeChange = (e) => {
        const newInputString = e.target.value;
        const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

        // Update the state only if the input is empty or contains valid characters
        if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 6) {
            setProfileData((prev) => ({ ...prev, pincode1: sanitizedInput }))
        }

    };
    const onPinCodeChange2 = (e) => {
        const newInputString = e.target.value;
        const sanitizedInput = newInputString

        // Update the state only if the input is empty or contains valid characters
        if ((newInputString === '' || sanitizedInput === newInputString)) {
            setProfileData((prev) => ({ ...prev, pincode2: sanitizedInput }))
        }

    };

    const handleModal = (status) => {
        if (profileData.pincode1 === "" || profileData.pincode1.length !== 6 || profileData.state === "") {
            console.log("STATE ==>> >>", profileData.state);
            if (profileData.pincode1 === "" || profileData.pincode1.length !== 6) { setvalidaion((prev => ({ ...prev, pinvalidation1: true }))); return }
            if (profileData.state === "") { setvalidaion((prev) => ({ ...prev, statevalidation: true })); return }
        }
        if (profileData.pincode2 !== "") {
            if (profileData.pincode2 === '') { setvalidaion((prev => ({ ...prev, pinvalidation2: true }))); return }
        }

        if (status) {
            setShowModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const onbtnHandler = () => {
        if (profileData.pincode1.length === 6 && profileData.state !== "" && profileData.pincode2 !== "") {

            setIsDisabled(false)

        } else {
            setIsDisabled(true)
        }


    }
    useEffect(() => {

        onbtnHandler()
    }, [profileData.pincode1.length === 6, profileData.state, profileData.pincode2])
    return (
        <>
            {showModal && (
                <AddYourMachinePopup onNavi={() => navigate('/buy/product-listing')} message={"Congratulations, your machine was added successfully"} />
            )}
            <div className="container-fluid">
                <div className="max-container my-5">
                    <div className="machine-location-wrap">
                        <div className="btn-wrap"><button className="back-btn" onClick={() => navigate('/buy/add-machine')}>{leftArrowIcon({ width: 24, height: 24 })}</button></div>
                        <div className="content-wrap">
                            <div className="address-top-wrap">
                                <div className="dilevery-address heading-600-16"><span className='dilevery-address-1'>{successNumberIcon({ width: 32, height: 32 })}</span>Delivery Address</div>
                                <div className='line'>{vectorLineIcon({ width: 88, height: 1 })}</div>
                                <div className="order-sumary heading-600-16"><span className='order-sumary-2'>{ellipsePurpleIcon({ width: 32, height: 32 })}</span>Order Summary</div>
                            </div>
                            <div className="bottom-wrap">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14 select-heading">Add Your Machine</div>
                                <div className="Withdraw-wrap">
                                    <div className="left-wrap">
                                        <div className="heading heading-500-20">Point Of Contact Details</div>
                                        <div className="text">Set your requirements for this project, the estimated price will be based on the project requirements</div>
                                    </div>
                                    <div className="right-wrap-add">
                                        <div className="field-group-wrap-add">
                                            <div className="input-group-wrap-add">
                                                <div className={`form-group-add  ${validation.pinvalidation1 ? "error-red" : ""}`}>
                                                    <input type="text" name="pin" id="pin" value={profileData.pincode1} onChange={onPinCodeChange} onClick={() => setvalidaion((prev) => ({ ...prev, pinvalidation1: false }))} className={`form-field-add heading-600-14 heading-600-14-12 ${validation.pinvalidation1 ? "error-red" : ""}`} placeholder="Pin Code" autoComplete="off" />
                                                    <label htmlFor="pin" className="form-label-add">Pin Code <sup>*</sup></label>
                                                    <div className="location-icon">{locationIcon({ width: 32, height: 32 })}</div>
                                                    <div className="text heading-600-14 heading-600-14-12">Use My Current Location</div>
                                                </div>
                                            </div>
                                            { /*<div className="input-group-wrap-add">
                                            <div className="form-group-add">
                                                <input type="text" name="state" id="state" className="form-field-add heading-600-14 heading-600-14-12" placeholder="State" autoComplete="off"/>
                                                <label htmlFor="state" className="form-label-add">State</label>
                                            </div>
            </div>*/}
                                            <div className={`bi-form-group ${validation.statevalidation ? "error-red" : ""}`}>
                                                <select className={`bi-form-field bi-select-dropdown ${profileData.state ? "" : "empty"} ${validation.statevalidation ? "error-red" : ""}`} value={profileData.state} placeholder="state" onChange={(e) => onStateChange(e.target.value)} onClick={() => setvalidaion((prev) => ({ ...prev, statevalidation: false }))} autoCapitalize='off' >

                                                    <option value=""></option>
                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                    <option value="Assam">Assam</option>
                                                    <option value="Bihar">Bihar</option>
                                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                                    <option value="Goa">Goa</option>
                                                    <option value="Gujarat">Gujarat</option>
                                                    <option value="Haryana">Haryana</option>
                                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                    <option value="Jharkhand">Jharkhand</option>
                                                    <option value="Karnataka">Karnataka</option>
                                                    <option value="Kerala">Kerala</option>
                                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Manipur">Manipur</option>
                                                    <option value="Meghalaya">Meghalaya</option>
                                                    <option value="Mizoram">Mizoram</option>
                                                    <option value="Nagaland">Nagaland</option>
                                                    <option value="Odisha">Odisha</option>
                                                    <option value="Punjab">Punjab</option>
                                                    <option value="Rajasthan">Rajasthan</option>
                                                    <option value="Sikkim">Sikkim</option>
                                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                                    <option value="Telangana">Telangana</option>
                                                    <option value="Tripura">Tripura</option>
                                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                    <option value="Uttarakhand">Uttarakhand</option>
                                                    <option value="West Bengal">West Bengal</option>
                                                </select>
                                                <label className="heading-400-14-12 bi-form-label">State{<span style={{ color: '#CB1923' }}>*</span>}</label>

                                            </div>
                                            <div className="input-group-wrap-add">
                                                <div className="form-group-add">
                                                    <input type="text" name="address" id="address" className="form-field-add heading-600-14 heading-600-14-12" placeholder="Address Line 1" autoComplete="off" />
                                                    <label htmlFor="address" className="form-label-add">Address Line 1</label>
                                                </div>
                                            </div>
                                            <div className="input-group-wrap-add">
                                                <div className="form-group-add">
                                                    <input type="text" name="address" id="address" className="form-field-add heading-600-14 heading-600-14-12" placeholder="Address Line 2" autoComplete="off" />
                                                    <label htmlFor="address" className="form-label-add">Address Line 2</label>
                                                </div>
                                            </div>
                                            <div className="input-group-wrap-add">
                                                <div className={`form-group-add  ${validation.pinvalidation2 ? "error-red" : ""}`}>
                                                    <input type="text" name="pin" id="pin" value={profileData.pincode2} onChange={onPinCodeChange2} onClick={() => setvalidaion((prev) => ({ ...prev, pinvalidation2: false }))} className={`form-field-add heading-600-14 heading-600-14-12 ${validation.pinvalidation2 ? "error-red" : ""}`} placeholder="Pin Code" autoComplete="off" />
                                                    <label htmlFor="pin" className="form-label-add">City <sup>*</sup></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="machine-btn-wrap"><button class={`machine-add-btns  ${isDisabled ? "disable-btn-bg" : ""}`} onClick={() => handleModal(true)}>Add Machine</button></div>
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

export default MachineLocation;