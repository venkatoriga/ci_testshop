// MyAccManageAddress
import React, { useState, useEffect } from 'react'
import MALeftsection from './MALeftsection';
import Button from '../../Button/Button';
import ButtonOutline from '../../Button/ButtonOutline';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountFooter from '../AccountFooter';
import Breadcrumbs from '../../SubComponent/Breadcrumbs';
import useAddAddress from '../../SubComponent/useAddAddress';
import { locationIcon } from '../../../helpers/Icons';
import Loader from '../../SubComponent/Loader';
const MyAccAddAddress = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [firstname, setfirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const AddressId = queryParams.get('AddressId');
  const [alterPhoneNumber, setAlterPhoneNumber] = useState('');
  const [lastname, setlastname] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [isLoader, setIsLoader] = useState(false)

  const [isSmallScreen] = useState(window.innerWidth <= 576);

  const [validation, setvalidaion] = useState({ fvalidation: false, lvalidation: false, evalidation: false, MAdd1validation: false, MPinValidation: false, pvalidation: false, alterphovalidation: false, statevalidation: false, cityvalidation: false });
  const navigate = useNavigate();
  const boldtitle = location.state.status;
  const { createCustomerAddress, response, loading, error } = useAddAddress(boldtitle);
  const onAddressOneChange = (e) => {
    setAddress1(e.target.value);
  };
  const onAddressTwoChange = (e) => {
    setAddress2(e.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      if (pinCode.length === 6) {
        try {
          const response = await fetch(`https://origatest.shop/api/getpincodestate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "pincode": pinCode }),
          });

          const responseData = await response.json();

          // Handle responseData as needed
          console.log('responseData---->', responseData);
          setState(responseData.state)
          setCity(responseData.city)
        } catch (error) {
          // Handle errors if any
          console.error('Error fetching data:', error.message);
        }
      }
    };

    fetchData();

  }, [pinCode]); // Trigger the effect when pinCode changes

  const onCityChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setCity(sanitizedInput);
    }
  };


  const onStateChange = (e) => {
    setState(e);
  };
  const onPinCodeChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 6) {
      setPinCode(sanitizedInput)
    }

  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFirstnameChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setfirstname(sanitizedInput);
    }
  };
  const onPhoneNumberChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
      setPhoneNumber(sanitizedInput)
    }
  };
  const onAlterPhoneNumberChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
      setAlterPhoneNumber(sanitizedInput)
    }
  };

  const onLastnameChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    if (newInputString === '' || sanitizedInput === newInputString) {
      setlastname(sanitizedInput);
    }
  };
  // const isAddress= !!localStorage.getItem('userToken');
  const breadcrumbsItems = [{ name: "Home Page", link: "/" }, { name: "My Account", link: "/myaccount" }, { name: "Manage Address", link: '/manageaddress' }];


  const title1 = "Point of Contact"
  const title2 = "Address Details"
  const para1 = "We'd love to get in touch with you! Kindly share your contact details, and we'll reach out to discuss your machine"
  const para2 = "Please share the address where you'd like your machine to be delivered"

  const onCancelHandler = () => {
    navigate(location.state.cancelNavi)
  }
  const onSubmitHandler = () => {
    if (firstname === "" || lastname === "" || phoneNumber === "" || phoneNumber.length !== 10 || pinCode === "" || pinCode.length !== 6 || state === "" || city === "" || address1 === "") {
      if (firstname === "") setvalidaion(prev => ({ ...prev, fvalidation: true }));
      if (lastname === "") setvalidaion(prev => ({ ...prev, lvalidation: true }))
      //if (email === "" || email.length < 8) setvalidaion(prev => ({ ...prev, evalidation: true }))
      if (phoneNumber === "" || phoneNumber.length !== 10) setvalidaion(prev => ({ ...prev, pvalidation: true }))
      if (pinCode === "" || pinCode.length !== 6) setvalidaion(prev => ({ ...prev, MPinValidation: true }))
      if (state === "") setvalidaion(prev => ({ ...prev, statevalidation: true }))
      if (address1 === "") setvalidaion(prev => ({ ...prev, MAdd1validation: true }))
      if (city === "") setvalidaion(prev => ({ ...prev, cityvalidation: true }))
      console.log("validation working===", firstname, lastname, email, phoneNumber, alterPhoneNumber, pinCode, state, address1, address2, city);
      return;
    }

    // if (email) {
    //   const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    //   const isValid = emailPattern.test(email);

    //   setvalidaion(prev => ({
    //     ...prev,
    //     evalidation: !isValid
    //   }));
    //   if (isValid === false) return
    // }
    if (alterPhoneNumber !== "") {

      if (alterPhoneNumber.length !== 10) {
        setvalidaion(prev => ({ ...prev, alterphovalidation: true }))
        return
      }
    }
    var id;
    var customer_id;
    if (boldtitle === "Edit Address") {
      id = AddressId
      customer_id  = localStorage.getItem('id')
    } else {
      id = localStorage.getItem('id')
    }
    const formdata = {
      id: id,
      input: {
        city: city,
        cityArea: "",
        companyName: "Hanu ",
        country: 'IN',
        countryArea: state,
        firstName: firstname,
        lastName: lastname,
        phone: `${phoneNumber}`,
        postalCode: `${pinCode}`,
        streetAddress1: address1,
        streetAddress2: address2,
      }
    }
    if (boldtitle === "Edit Address") {
      formdata.customer_id = customer_id;
    }
    createCustomerAddress(formdata)
    setIsLoader(true)
  }
  if (response) {
    navigate(location.state.saveNavi)
  }
  // console.log("ADD ADDRESS==>>",response);
  useEffect(() => {
    if (location.state.edit_address) {
      console.log("location hai", location);
      setfirstname(location.state.edit_address?.firstName)
      setlastname(location.state.edit_address?.lastName)
      const phoneNumber = location.state.edit_address?.phone;
      const truncatedPhoneNumber = phoneNumber.substring(3);
      setPhoneNumber(truncatedPhoneNumber);
      // setPhoneNumber(location.state.edit_address?.phone)
      setCity(location.state.edit_address?.city)
      setState(location.state.edit_address?.countryArea)
      setPinCode(location.state.edit_address?.postalCode)
      setAddress1(location.state.edit_address?.streetAddress1)
      setAddress2(location.state.edit_address?.streetAddress2)
    }


  }, [])
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
        setPinCode(responseData?.postal_code)
        setState(responseData?.state)
        setCity(responseData?.city)
        //setFormData((prevData) => ({ ...prevData, pin: responseData?.postal_code }));
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

  return (<>
    {isLoader && <Loader />}
    <div className='container-fluid'>
      <div className='max-container pt-4'>
        <Breadcrumbs boldtitle={boldtitle} items={breadcrumbsItems} backnavi={() => navigate('/manageaddress')} />
      </div>
      <div className='max-container pt-5'>
        <div className='container-fluid p-0 m-0 row pb-4'>

          <div className={`col col-md-10 col-12 ${isSmallScreen ? "" : "pl-5 pr-5"} bg-F9F9F9 mx-auto`}>
            <div className='container pt-5 pb-5'>
              <div className='row'>
                <div className='col heading-600-24 p-0'>{boldtitle}</div>
              </div>
              <div className='row pb-5 d-flex justify-content-between border-bottom'>
                <div className='col col-lg-4 col-12 pl-0 pt-30px '>
                  <MALeftsection heading={title1} para={para1} />
                </div>
                <div className='col col-lg-7 col-12 p-0'>
                  <div className='row '>
                    <div className='col col-md-6 col-12'>
                      <div className={`bi-form-group ${validation.fvalidation ? "error-red" : ""}`}>
                        <input type="text" name="fname" id="fname" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red" : ""}`} placeholder="First Name" value={firstname}
                          onChange={onFirstnameChange} onClick={() => setvalidaion(prev => ({ ...prev, fvalidation: false }))} />
                        <label htmlFor="fname" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className='col col-md-6 col-12 '>
                      <div className={`bi-form-group ${validation.lvalidation ? "error-red" : ""}`}>
                        <input type="text" name="lname" id="lname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red" : ""}`} placeholder="Last Name" value={lastname}
                          onChange={onLastnameChange} onClick={() => setvalidaion(prev => ({ ...prev, lvalidation: false }))} />
                        <label htmlFor="lname" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>

                      </div>
                    </div>
                  </div>
                  {/* <div className='col col-12 p-0'>
                    <div className={`bi-form-group ${validation.evalidation ? "error-red" : ""}`}>
                      <input type="email" name="aemail" id="aemail" className={`bi-form-field bg-white ${validation.evalidation ? "error-red" : ""}`} placeholder="Email" value={email}
                        onChange={onEmailChange} onClick={() => setvalidaion(prev => ({ ...prev, evalidation: false }))} />
                      <label htmlFor="aemail" className="heading-400-14-12 bi-form-label">Email Id{<span style={{ color: '#CB1923' }}>*</span>}</label>
                    </div>
                  </div> */}

                  <div className='row '>
                    <div className='col col-md-6 col-12'>

                      <div className={`bi-form-group ${validation.pvalidation ? "error-red" : ""}`}>
                        <input type="text" name="phone" id="phone" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red" : ""}`} placeholder="Phone Number"
                          value={phoneNumber} onChange={onPhoneNumberChange} onClick={() => setvalidaion(prev => ({ ...prev, pvalidation: false }))} />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Phone Number{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className='col col-md-6 col-12'>

                      <div className={`bi-form-group ${validation.alterphovalidation ? "error-red" : ""}`}>
                        <input type="text" name="altphone" id="altphone" className={`bi-form-field  bg-white ${validation.alterphovalidation ? "error-red" : ""}`} placeholder="Alt Phone Number"
                          value={alterPhoneNumber} onChange={onAlterPhoneNumberChange} onClick={() => setvalidaion(prev => ({ ...prev, alterphovalidation: false }))} />
                        <label htmlFor="altphone" className="heading-400-14-12 bi-form-label">Alternative Phone Number</label>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {/* second section */}
              <div className='row d-flex justify-content-between'>
                <div className='col col-lg-4 col-12 pl-0 pt-30px'>
                  <MALeftsection heading={title2} para={para2} />
                </div>
                <div className='col col-lg-7  col-12 p-0'>
                  <div className='row'>

                    <div className='col col-12'>
                      <div className={`bi-form-group  ${validation.MPinValidation ? "error-red" : ""}`}>
                        <input type="text" name="pincode" id="pincode" className={`bi-form-field bg-white ${validation.MPinValidation ? "error-red" : ""}`} value={pinCode} onChange={onPinCodeChange} onClick={() => setvalidaion(prev => ({ ...prev, MPinValidation: false }))} placeholder="Pin Code" />
                        <label htmlFor="pincode" className="heading-400-14-12 bi-form-label">Pin Code{<span style={{ color: '#CB1923' }}>*</span>}</label>
                        <div onClick={getLocation} className="text-end p-r heading-600-14 heading-600-14-12 curser-pointer">Use My Current Location<span style={{ position: "absolute", top: "-40px", right: "0" }}>{locationIcon({ width: 32, height: 32 })}</span></div>
                      </div>
                      {/*update*/}

                    </div>
                    <div className='col col-12 '>
                      <div className={`bi-form-group ${validation.statevalidation ? "error-red" : ""}`}>
                        {/* <input type="type" name="State" id="State" className={`bi-form-field bg-white ${validation.statevalidation ? "error-red":""}`} value={state} onChange={onStateChange} onClick={()=>setvalidaion(prev=>({...prev,statevalidation:false}))} placeholder="State"/>
                                            */}
                        <select className={`bi-form-field bi-select-dropdown ${state ? "" : "empty"}`} value={state} placeholder="state" onChange={(e) => onStateChange(e.target.value)} autoCapitalize='off' >

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
                    </div>
                    <div className='col col-12'>

                      <div className={`bi-form-group ${validation.MAdd1validation ? "error-red" : ""}`}>
                        <input type="text" name="machine-add1" id="machine-add1" className={`bi-form-field bg-white ${validation.MAdd1validation ? "error-red" : ""}`} value={address1} onChange={onAddressOneChange} onClick={() => setvalidaion(prev => ({ ...prev, MAdd1validation: false }))} placeholder="Machine Make" />
                        <label htmlFor="machine-add1" className="heading-400-14-12 bi-form-label">Address Line 1{<span style={{ color: '#CB1923' }}>*</span>}</label>

                      </div>

                    </div>
                    <div className='col col-12'>
                      <div className={`bi-form-group `}>
                        <input type="text" name="machine-add2" id="machine-add2" className={`bi-form-field bg-white`} value={address2} onChange={onAddressTwoChange} placeholder="Address Line 2" />
                        <label htmlFor="machine-add2" className="heading-400-14-12 bi-form-label">Address Line 2</label>

                      </div>
                    </div>
                    <div className='col col-12'>
                      <div className={`bi-form-group ${validation.cityvalidation ? "error-red" : ""}`}>
                        <input type="text" name="city" id="city" className={`bi-form-field bg-white ${validation.cityvalidation ? "error-red" : ""}`} value={city} onChange={onCityChange} onClick={() => setvalidaion(prev => ({ ...prev, cityvalidation: false }))} placeholder="City" />
                        <label htmlFor="city" className="heading-400-14-12 bi-form-label">City{<span style={{ color: '#CB1923' }}>*</span>}</label>

                      </div>
                    </div>
                  </div>
                  <div className={`container-fluid p-0 m-0 row end-to-between gap-4 pt-4`}>
                    <ButtonOutline message={"Cancel"} callFunction={onCancelHandler} />
                    <Button message={"Save"} callFunction={onSubmitHandler} />
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        <div className='p-r pb-5 d-flex justify-content-end'>
          <img className='p-a pt-2 right-0' src='asset/Frame1000004018.png' alt='Frame1000004018.png' />
        </div>
      </div>

    </div>
    <AccountFooter />
  </>
  )
}

export default MyAccAddAddress
