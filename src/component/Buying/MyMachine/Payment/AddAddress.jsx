import React, { useEffect, useState } from "react";
import { botIcon, leftArrowIcon, locationIcon } from "../../../../helpers/Icons";
import FooterBottom from "../../../Footer/FooterBottom";
import "./AddAddress.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const AddAddress = ({ onCallFun }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const loggedin = localStorage.getItem('userToken');
    const productId = queryParams.get('id')
    const buyMachineId = queryParams.get('buyMachineId')
    const FinanceFlow = queryParams.get('FinanceFlow')
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        phoneno: "",
        address: "",
        addressLine2: "",
        state: "",
        pin: "",
        city: '',
        companyName: ''
    });

    const [message, setMessage] = useState(false)
    const [pincode, setpincode] = useState(null)
    const [validation, setvalidaion] = useState({ fvalidation: false, lvalidation: false, evalidation: false, MPinValidation: false, pvalidation: false, statevalidation: false, Line1validation: false, cityvalidation: false });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // if (name === "state") {    
        //     setFormData((prevData) => ({ ...prevData, [name]: sanitizedInput }));
        //     return
        // }
        if (name === "firstname" || name === "lastname") {
            const newInputString = value;
            const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

            // Update the state only if the input is empty or contains valid characters
            if (newInputString === '' || sanitizedInput === newInputString) {
                setFormData((prevData) => ({ ...prevData, [name]: sanitizedInput }));
            }
            return
        }


        if (name === "email" || name === "companyName" || name === "address" || name === "addressLine2" || name === "city" || name === "state") {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
            return
        }

        if (name === "phoneno" || name == "phone") {
            const newInputString = value;
            const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

            // Update the state only if the input is empty or contains valid characters
            if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
                setFormData((prevData) => ({ ...prevData, [name]: sanitizedInput }));
            }
            return
        }
        if (name === "pin") {
            const newInputString = value;
            const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

            // Update the state only if the input is empty or contains valid characters
            if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 6) {
                setFormData((prevData) => ({ ...prevData, [name]: sanitizedInput }));
            }
        }
    };


    const navigate = useNavigate();
    const onCallFunHandler = async () => {

        if (onCallFun) {
            onCallFun();
        } else {
            console.log("Form Data:", formData);


            if (onCallFun) {
                onCallFun();
            } else {

                if (formData.firstname === "" || formData.lastname === "" || formData.phone === "" || formData.phone.length !== 10 || formData.pin === "" || formData.pin.length !== 6 || formData.state === "" || formData.address === "" || formData.city === "") {
                    if (formData.firstname === "") setvalidaion(prev => ({ ...prev, fvalidation: true }));
                    if (formData.lastname === "") setvalidaion(prev => ({ ...prev, lvalidation: true }))
                    //   if(email==="" || email.length<8)setvalidaion(prev=>({...prev,evalidation:true}))
                    if (formData.phone === "" || formData.phone.length !== 10) setvalidaion(prev => ({ ...prev, pvalidation: true }))
                    if (formData.pin === "" || formData.pin.length !== 6) setvalidaion(prev => ({ ...prev, MPinValidation: true }))
                    if (formData.state === "") setvalidaion(prev => ({ ...prev, statevalidation: true }))
                    if (formData.address === "") setvalidaion(prev => ({ ...prev, Line1validation: true }))
                    if (formData.city === "") setvalidaion(prev => ({ ...prev, cityvalidation: true }))
                    // console.log("woking...");
                    window.scrollTo(0, 0)
                    return;
                }



                setMessage(true);
                console.log("Form Data:", formData);
                const id = localStorage.getItem('id');
                // navigate('/buy/order-summary')
                var Endpoint;
                var mappingId;
                if (location?.state?.userDetails?.id) {
                    Endpoint = 'updatecustomeraddress'
                    mappingId = location?.state?.userDetails?.id
                }
                else {
                    Endpoint = 'createcustomeraddress'
                    mappingId = id
                }
                const url = `https://devextension.origa.market/api/${Endpoint}`;
                //const url = 'https://devextension.origa.market/api/createcustomeraddress';

                const requestBody = {
                    id: mappingId,
                    "input": {
                        "city": formData.city,
                        "cityArea": "",
                        "companyName": formData.companyName,
                        "country": "IN",
                        "countryArea": formData.state,
                        "firstName": formData.firstname,
                        "lastName": formData.lastname,
                        "phone": formData.phone,
                        "postalCode": formData.pin,
                        "streetAddress1": formData.address,
                        "streetAddress2": formData.addressLine2,
                    }
                };
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });
                    const data = await response.json();
                    console.log('Response:', data);
                    if (!FinanceFlow) {
                        navigate(`/buy/add-address?id=${productId}&buyMachineId=${buyMachineId}`)
                    }
                    else {
                        navigate(`/buy/add-address?id=${productId}&buyMachineId=${buyMachineId}&FinanceFlow=${true}`)
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setMessage(false);
                }
            }
        }
    }
    const addressPage = () => {
        if (!FinanceFlow) {
            navigate(`/buy/add-address?id=${productId}&buyMachineId=${buyMachineId}`)
        }
        else {
            navigate(`/buy/add-address?id=${productId}&buyMachineId=${buyMachineId}&FinanceFlow=${true}`)
        }
    }
    const getLocation = async () => {

        try {
            if (navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://devextension.origa.market/api/getlatlngpincode`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ latitude, longitude }),
                });

                const responseData = await response.json();
                //setpincode(responseData?.postal_code)
                console.log('responseData--->',responseData);
                setFormData((prevData) => ({ ...prevData, pin: responseData?.postal_code }));
                setFormData((prevData) => ({ ...prevData, state: responseData?.state }));
                setFormData((prevData) => ({ ...prevData, city: responseData?.city }));
                //setFormData(...formData,formData.pin = responseData?.postal_code)
                //setDeliveryLocation(responseData?.postal_code)
                console.log("API response:", responseData?.postal_code)

                // Handle response data here
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        } catch (error) {
            console.error('Error getting location:', error.message);
        }
    };
    const removeCountryCode = (inputNumber) => {
        // Remove any non-numeric characters
        var numericOnly = inputNumber.replace(/\D/g, '');

        // Check if the number starts with a country code like +91
        if (numericOnly.length > 10 && numericOnly.startsWith('91')) {
            numericOnly = numericOnly.slice(2); // Remove the '+91' prefix
        }

        return numericOnly;
    }
    useEffect(() => {

        if (location?.state?.userDetails !== undefined) {
            console.log("user Edit details==>>", location?.state?.userDetails);
            setFormData((prev) => ({
                ...prev,
                firstname: location?.state?.userDetails?.firstName,
                lastname: location?.state?.userDetails?.lastName,
                email: "",
                phone: removeCountryCode(location?.state?.userDetails?.phone),
                phoneno: "",
                address: location?.state?.userDetails?.streetAddress1,
                addressLine2: location?.state?.userDetails?.streetAddress2,
                state: location?.state?.userDetails?.countryArea,
                pin: location?.state?.userDetails?.postalCode,
                city: location?.state?.userDetails?.city,
                companyName: location?.state?.userDetails?.companyName
            }))
        }
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="max-container my-5">
                    <div className="new-details-wrap">
                        <div className="btn-wrap" onClick={addressPage}><button className="back-btn">{leftArrowIcon({ width: 24, height: 24 })}</button></div>
                        <div className="body-wrap">
                            <div className="head heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">Add a new Delivery Address</div>
                            <div className="details-wrap">
                                <div className="left-wrap">
                                    <div className="heading heading-500-20">Point Of Contact</div>
                                    <div className="text">We'd love to get in touch with you! Kindly share your contact details, and we'll reach out to discuss your machine</div>
                                </div>
                                <div className="right-wrap-add">
                                    <div className="field-group-wrap-add">
                                        <div className="input-group-wrap-add">
                                            <div className={`bi-form-group ${validation.fvalidation ? "error-red" : ""}`}>
                                                <input onChange={handleInputChange} value={formData.firstname} type="text" name="firstname" id="firstname" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red" : ""}`} placeholder="First Name" autoCapitalize="off" onClick={() => setvalidaion(prev => ({ ...prev, fvalidation: false }))} />
                                                <label htmlFor="firstname" className="heading-400-14-12 bi-form-label">First Name <sup>*</sup></label>
                                            </div>
                                            <div className={`bi-form-group ${validation.lvalidation ? "error-red" : ""}`}>
                                                <input onChange={handleInputChange} value={formData.lastname} type="text" name="lastname" id="lastname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red" : ""}`} placeholder="Last Name" onClick={() => setvalidaion(prev => ({ ...prev, lvalidation: false }))} autoCapitalize="off" />
                                                <label htmlFor="lastname" className="heading-400-14-12 bi-form-label">Last Name <sup>*</sup></label>
                                            </div>
                                        </div>
                                        {/* <div className="input-group-wrap-add">
                                            <div className="form-group-add">
                                                <input onChange={handleInputChange} value={formData.email} type="text" name="email" id="email" className="form-field-add heading-600-14 heading-600-14-12" placeholder="Email Id" autoCapitalize="off" />
                                                <label htmlFor="email" className="form-label-add">Email</label>
                                            </div>
                                        </div> */}
                                        {/* <div className="input-group-wrap-add">
                                            <div className="form-group-add">
                                                <input onChange={handleInputChange} value={formData.companyName} type="text" name="companyName" id="companyName" className="form-field-add heading-600-14 heading-600-14-12" placeholder="Email Id" autoCapitalize="off" />
                                                <label htmlFor="companyName" className="form-label-add">Company</label>
                                            </div>
                                        </div> */}
                                        <div className="input-group-wrap-add">
                                            <div className={`bi-form-group ${validation.pvalidation ? "error-red" : ""}`}>
                                                <input onChange={handleInputChange} value={formData.phone} type="text" name="phone" id="phone" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red" : ""}`} placeholder="Phone No" autoCapitalize="off" onClick={() => setvalidaion(prev => ({ ...prev, pvalidation: false }))} />
                                                <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Phone No <sup>*</sup></label>
                                            </div>
                                            <div className="form-group-add">
                                                <input onChange={handleInputChange} value={formData.phoneno} type="text" name="phoneno" id="phoneno" className="form-field-add heading-600-14 heading-600-14-12" placeholder="First Name" autoCapitalize="off" />
                                                <label htmlFor="phoneno" className="form-label-add">Alternative Phone No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="details-wrap">
                                <div className="left-wrap">
                                    <div className="heading heading-500-20">Address</div>
                                    <div className="text">Please share the address where you'd like your machine to be delivered</div>
                                </div>
                                <div className="right-wrap-add">
                                    <div className="field-group-wrap-add">
                                        <div className="input-group-wrap-add">
                                            <div className={`form-group-add ${validation.MPinValidation ? "error-red" : ""}`}>
                                                <input onChange={handleInputChange} value={formData.pin} type="text" name="pin" id="pin" className="form-field-add heading-600-14 heading-600-14-12" placeholder="" autoCapitalize="off" onClick={() => setvalidaion(prev => ({ ...prev, MPinValidation: false }))} />
                                                <label htmlFor="pin" className="form-label-add">Pin Code <sup>*</sup></label>
                                                <div className="location-icon" onClick={getLocation}>{locationIcon({ width: 32, height: 32 })}</div>
                                                <div onClick={getLocation} className="text heading-600-14 heading-600-14-12 curser-pointer">Use My Current Location</div>
                                            </div>
                                        </div>
                                        <div className="input-group-wrap-add">
                                            <div className={`bi-form-group ${validation.statevalidation ? "error-red" : ""}`}>
                                                {/* <input type="type" name="State" id="State" className={`bi-form-field bg-white ${validation.statevalidation ? "error-red":""}`} value={state} onChange={onStateChange} onClick={()=>setvalidaion(prev=>({...prev,statevalidation:false}))} placeholder="State"/>
                                            */}
                                                <select className={`bi-form-field bi-select-dropdown ${formData.state ? "" : "empty"}`} name="state"value={formData.state} placeholder="state" onChange={handleInputChange} onClick={() => setvalidaion(prev => ({ ...prev, statevalidation: false }))} autoCapitalize='off' >

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
                                            {/* <div className={`bi-form-group ${validation.statevalidation ? "error-red":""}`}>
                                                <input onChange={handleInputChange} value={formData.state} type="text" name="state" id="state" className={`bi-form-field bg-white ${validation.statevalidation ? "error-red":""}`} placeholder="State" autoCapitalize="off" onClick={() => setvalidaion(prev => ({ ...prev, statevalidation: false }))}/>
                                                <label htmlFor="state" className="heading-400-14-12 bi-form-label">State<sup>*</sup></label>
                                            </div> */}
                                        </div>
                                        <div className="input-group-wrap-add">
                                            <div className={`bi-form-group ${validation.Line1validation ? "error-red" : ""}`}>
                                                <input onChange={handleInputChange} value={formData.address} type="text" name="address" id="address" className={`bi-form-field bg-white ${validation.Line1validation ? "error-red" : ""}`} placeholder="Address Line 1" autoCapitalize="off" onClick={() => setvalidaion(prev => ({ ...prev, Line1validation: false }))} />
                                                <label htmlFor="address" className="heading-400-14-12 bi-form-label">Address Line 1<sup>*</sup></label>
                                            </div>
                                        </div>
                                        <div className="input-group-wrap-add">
                                            <div className="form-group-add">
                                                <input onChange={handleInputChange} value={formData.addressLine2} type="text" name="addressLine2" id="addressLine2" className="form-field-add heading-600-14 heading-600-14-12" placeholder="Address Line 2" autoCapitalize="off" />
                                                <label htmlFor="addressLine2" className="form-label-add">Address Line 2</label>
                                            </div>
                                        </div>
                                        <div className="input-group-wrap-add">
                                            <div className={`bi-form-group ${validation.cityvalidation ? "error-red" : ""}`}>
                                                <input onChange={handleInputChange} value={formData.city} type="text" name="city" id="city" className={`bi-form-field bg-white ${validation.cityvalidation ? "error-red" : ""}`} placeholder="State" autoCapitalize="off" onClick={() => setvalidaion(prev => ({ ...prev, cityvalidation: false }))} />
                                                <label htmlFor="city" className="heading-400-14-12 bi-form-label">City<sup>*</sup></label>
                                            </div>
                                        </div>


                                        <div className="btn-wraps">
                                            <button class="address-save-btn heading-600-16" onClick={onCallFunHandler}>Save Address</button>
                                            {message && <p>Please wait...</p>}
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
    )
}

export default AddAddress