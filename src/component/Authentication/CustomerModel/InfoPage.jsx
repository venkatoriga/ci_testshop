import React, { useState, useEffect } from 'react';
import './info.css'
import { Container, Image } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import Textarea from '@mui/joy/Textarea';
import { gql } from 'graphql-tag';
import { secondClient, CreateOtpVerification, UpdateOTPVerify } from '../../OrigaExtentionAPI/mutations';
import client from '../../Services/ServicesPopup/apolloclient';

const CREATE_CONTACT_US = gql`
  mutation CreateConatctUs($contactusinput: ContactUsInput!) {
    createContactUs(contactusinput: $contactusinput) {
      contactus {
        id
        firstname
        lastname
        emailid
        reasonId {
          id
          reasonTitle
          reasonDescription
        }
        queryDescription
      }
      message
      success
    }
  }
`;
const DelayedForm = ({ setCustomerInfoForm }) => {
  const [OTPID, setOTPID] = useState(null);
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('userToken');
  const phoneNumber = localStorage.getItem('number');
  const fname = localStorage.getItem('firstName');
  const lname = localStorage.getItem('lastName');
  const emailid = localStorage.getItem('emailId');
  // console.log('token----->',token);
  const [validation, setvalidaion] = useState({ NameValidation: false, EmailIdValidation: false, PhoneValidation: false })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
    otp: '',
    otpSent: false,
    otpVerified: false
  });


  useEffect(() => {
    if (token !== null) {
      setFormData(prevState => ({ ...prevState, phone: phoneNumber }));
      setFormData(prevState => ({ ...prevState, name: fname + " " + lname }));
      setFormData(prevState => ({ ...prevState, email: emailid }));
    }
  }, [token]);

  useEffect(() => {
    let timer
    if (formData.otpSent) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);

        }
      }, 1000);
    }
    return () => {

      if (formData.otpSent) clearInterval(timer)
    };
  }, [timeLeft, formData.otpSent]);


  const handleSubmit_2 = async (event) => {
    event.preventDefault();
    try {
      const { data } = await client.mutate({
        mutation: CREATE_CONTACT_US,
        variables: {
          contactusinput: {
            firstname: formData.name,
            lastname: '',
            emailid: formData.email,
            reasonid: 7,
            queryDescription: formData.comments,
            phonenumber: phoneNumber
          }
        }
      });
      if (data) {
        setCustomerInfoForm(false)
      }

    } catch (error) {
      console.error('API Error==>', error.message);

    }


  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.email === '' && formData.phone === '') {

      setvalidaion(prev => ({ ...prev, PhoneValidation: true, EmailIdValidation: true }));
      return
    }
    if (formData.email) {
      if (formData.email.length < 8) {
        setvalidaion(prev => ({
          ...prev,
          evalidation: true
        }));
        return;
      } else {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const isValid = emailPattern.test(formData.email);

        setvalidaion(prev => ({
          ...prev,
          EmailIdValidation: !isValid
        }));
        if (isValid === false) return
      }

    }
    

    if (formData.phone !== '' && otp.length !== 4) {
      setErrorMessage('Please enter the valid OTP sent to your phone number');
      if (formData.phone.length !== 10) {

        alert("Please enter a valid 10-digit Phone Number!!!")
        return
      }
      return
    }
    if ((formData.phone !== '' || formData.phone.length !== 10) && otp.length !== 4) {
      setErrorMessage('Please enter the valid OTP sent to your phone number');
      alert("Please enter a valid 10-digit Phone Number!!!")
      return
    }
    try {
      const { data } = await client.mutate({
        mutation: CREATE_CONTACT_US,
        variables: {
          contactusinput: {
            firstname: formData.name,
            lastname: '',
            emailid: formData.email,
            reasonid: 7,
            queryDescription: formData.comments,
            phonenumber: formData.phone
          }
        }
      });
      if (data) {
        setCustomerInfoForm(false)
      }

    } catch (error) {
      console.error('API Error==>', error.message);

    }

    // localStorage.setItem('formSubmitted', 'true');
    console.log('Form data:', formData);
  };

  const onPNumberChange = async (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
      setFormData(prevState => ({ ...prevState, phone: sanitizedInput }));
      if (sanitizedInput.length === 10) {
        setFormData(prevState => ({ ...prevState, otpSent: true }));
        try {
          const { data: createOtpData } = await secondClient.mutate({
            mutation: CreateOtpVerification,
            variables: {
              inputotp: {
                ompuserid: '',
                ompmobileno: sanitizedInput,
                verificationstatus: 'Not Verified',
                actiontype: 'LogIn',
              },
            },
          });
          const OTP_ID = createOtpData?.createOtpverification?.otpverification?.OtpID;
          setOTPID(OTP_ID)
        } catch (error) {
          console.error('Error sending OTP:', error);
        }
      }

    }


  };

  const onOtpChange = async (otpValue) => {
    setOtp(otpValue);
    // console.log('otpValue---->', otpValue);
    if (otpValue.length === 4) {
      try {
        let OTP_message;
        const { data: UpdateOTPData } = await secondClient.mutate({
          mutation: UpdateOTPVerify,
          variables: {
            updateOTP: {
              otpid: parseInt(OTPID),
              otpval: parseInt(otpValue),
              verificationstatus: 'Verified',
              otpstatus: 'Verified',
            },
          },
        });
        // Check the message in the response and set the OTP_message accordingly
        OTP_message = UpdateOTPData?.updateOtpverification?.message;
        if (OTP_message !== 'OTP verification was successful!') {
          setErrorMessage('Please enter the valid OTP sent to your phone number');
          return
        }
        else {
          setFormData(prevState => ({ ...prevState, otpSent: false }));
        }

      }
      catch (error) {
        console.error('Error verifying OTP:', error);
      }
    }
    else {
      setErrorMessage("")
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const onResendOtp = async () => {
    setTimeLeft(120)
    try {
      const { data: createOtpData } = await secondClient.mutate({
        mutation: CreateOtpVerification,
        variables: {
          inputotp: {
            ompuserid: '',
            ompmobileno: formData.phone,
            verificationstatus: 'Not Verified',
            actiontype: 'LogIn',
          },
        },
      });
      const OTP_ID = createOtpData?.createOtpverification?.otpverification?.OtpID;
      setOTPID(OTP_ID)
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }


  return (
    <>
      <div className='container-fluid hide-992 p-0 m-0'>
        <Container fluid className='d-j-a'>
          <div className='d-flex bg-white customerinfo-hw p-0  border-8p' >

            <div className='container-fluid p-0 m-0 row' style={{ height: formData.otpSent ? '700px' : 'auto' }}>
              <div className='p-2 hw-logo'>
                <Image fluid src="/asset/image 6.png" />
              </div>
              <div className="p-2 col col-10 ms-auto text-end">
                <img className='curser-pointer' src="/asset/close-fill.png" onClick={() => {
                  setCustomerInfoForm(false);
                  localStorage.setItem('formSubmitted', 'true');
                }} alt="close-tag" />
              </div>
              <div className='mt-2' style={{ height: '70px', background: '#73509E' }}>
                <h2 className='heading-600-20-16 mt-2' style={{ textAlign: 'center', color: 'white' }}>
                  Unlock Exclusive Offers!
                </h2>
                <h2 className='heading-400-14-12 mt-2' style={{ textAlign: 'center', color: 'white' }}>
                  Enter Your Contact Details to Stay Updated and Receive Special Deals!
                </h2>
              </div>
              <div className='col'>

                <div className='pb-1'>

                  <>
                    <div className="input-container m-0">
                      <div className={`bi-form-group-white ${validation.PhoneValidation ? "error-red" : ""}`}>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className={`bi-form-field-white ${validation.PhoneValidation ? "error-red" : ""}`}
                          maxLength={10}
                          value={formData.phone}
                          onChange={onPNumberChange}
                          onClick={() => setvalidaion(prev => ({ ...prev, PhoneValidation: false }))}
                          placeholder="Phone Number"
                        />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label-white ">Phone Number {<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    {formData.otpSent && (
                      <>
                        <div>
                          <h2 className='heading-400-14-12 mt-2' style={{ textAlign: 'center' }}>
                            Verify with OTP
                          </h2>
                          <p className='heading-400-12-10 op-80' style={{ textAlign: 'center' }}>Enter the OTP sent to +91-{`${formData.phone}`}</p>
                        </div>
                        <div className="input-container m-0">
                          <div className={`otp-container pr-0`}>
                            <OtpInput
                              value={otp}
                              onChange={onOtpChange}
                              numInputs={4}
                              renderSeparator={<span></span>}
                              renderInput={(props) => <input {...props} placeholder='-' className={`otp-inputs`} style={{ width: "4.8rem", height: "2rem", borderLeft: '0px', borderTop: '0px', borderBottom: '0px', borderRadius: '0px', textAlign: "center" }} />}
                            />
                          </div>
                        </div>
                        <p className="error-message heading-400-14-12 pt-3" style={{ textAlign: 'center' }}>{errorMessage}</p>
                        <div className='text-center mt-1' >
                          <p className='heading-600-16-12'>
                            <span className='heading-400-16-12'>{formatTime(timeLeft)}</span>
                            <span className='resend curser-pointer' onClick={formatTime(timeLeft) === `0:00` ? onResendOtp : null}>&nbsp;&nbsp;Resend OTP</span>
                          </p>
                        </div>
                      </>
                    )}
                    <div className="input-container m-0">
                      <div className={`bi-form-group-white ${validation.NameValidation ? "error-red" : ""}`}>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className={`bi-form-field-white ${validation.NameValidation ? "error-red" : ""}`}
                          placeholder="Name"
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          onClick={() => setvalidaion(prev => ({ ...prev, NameValidation: false }))}
                        />
                        <label htmlFor="name" className="heading-400-14-12 bi-form-label-white ">Name</label>
                      </div>
                    </div>
                    <div className="input-container m-0">
                      <div className={`bi-form-group-white ${validation.EmailIdValidation ? "error-red" : ""}`}>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className={`bi-form-field-white ${validation.EmailIdValidation ? "error-red" : ""}`}
                          placeholder="Email"
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          onClick={() => setvalidaion(prev => ({ ...prev, EmailIdValidation: false }))}
                        />
                        <label htmlFor="email" className="heading-400-14-12 bi-form-label-white ">Email ID {<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                  </>



                  <div className={`bi-form-group`}>
                    <Textarea minRows={2} placeholder="Leave a comment here" name="Comments" id="Comments" onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))} />
                    {/* <label htmlFor="email" className="heading-400-14-12 bi-form-label">{token === null ? "Comments" : "Comments"}</label> */}
                  </div>

                  <div className='mt-4 mb-5 text-center'>
                    <button className='button' onClick={token === null ? handleSubmit : handleSubmit_2} >Submit</button>
                    <button type="button" className='btn btn-warning' onClick={() => {
                      setCustomerInfoForm(false);
                      localStorage.setItem('formSubmitted', 'true');
                    }} style={{ height: '50px', width: '150px', marginLeft: '10px' ,borderRadius: '12px'}}>Skip</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* for mobile */}
      <div className='container-fluid show-992 bg-white p-0 m-0'>
        <div className='col col-12 p-0'>
          <div className="container-fluid p-0 m-0 row justify-content-between">
            <div className="col col-6 ">
              <div className='p-2 hw-logo'>
                <Image fluid src="/asset/image 6.png" />
              </div>
            </div>
            <div className="p-2 col col-6 text-end">
              <img className='curser-pointer' src="/asset/close-fill.png" onClick={() => setCustomerInfoForm(false)} alt="close-tag" />
            </div>
            <div className='mt-2' style={{ height: '70px', background: '#73509E' }}>
              <h2 className='heading-600-20-16 mt-2' style={{ textAlign: 'center', color: 'white' }}>
                Connect With Us for More Details
              </h2>
              <h2 className='heading-400-14-12 mt-2' style={{ textAlign: 'center', color: 'white' }}>
                Our team will get in touch with you within 24 hours.
              </h2>
            </div>
            <div className='d-flex bg-white customerinfo-hw p-0  border-8p' >
              <div className='container-fluid p-0 m-0 row'>
                <div className='col'>
                  <div className='pb-1' style={{ width: '285%' }}>

                    <>
                      <div className={`bi-form-group-white ${validation.PhoneValidation ? "error-red" : ""}`}>
                        <input type="text" name="phone" id="phone" className={`bi-form-field-white ${validation.PhoneValidation ? "error-red" : ""}`} maxLength={10} value={formData.phone} onChange={onPNumberChange} placeholder="Phone Number" onClick={() => setvalidaion(prev => ({ ...prev, PhoneValidation: false }))} />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label-white">Phone Number {<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>

                      {formData.otpSent && (
                        <>
                          <div>
                            <h2 className='heading-600-20-16 mt-2' style={{ textAlign: 'center' }}>
                              Verify with OTP
                            </h2>
                            <p className='heading-400-14-12 op-80' style={{ textAlign: 'center' }}>Enter the OTP sent to +91-{`${formData.phone}`}</p>
                          </div>
                          <div className="input-container m-0">
                            <div className={`otp-container pr-0`}>
                              <OtpInput
                                value={otp}
                                onChange={onOtpChange}
                                numInputs={4}
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input {...props} placeholder='-' className={`otp-inputs`} style={{ width: "4.8rem", height: "2rem", borderLeft: '0px', borderTop: '0px', borderBottom: '0px', borderRadius: '0px', textAlign: "center" }} />}
                              />
                            </div>
                          </div>
                          <p className="error-message heading-400-14-12 pt-2" style={{ textAlign: 'center' }}>{errorMessage}</p>
                          <div className='text-center mt-1' ><p className='heading-600-16-12'><span className='heading-400-16-12'>{formatTime(timeLeft)}</span><span className='resend  curser-pointer' onClick={formatTime(timeLeft) === `0:00` ? onResendOtp : null}>&nbsp;&nbsp;Resend OTP</span> </p></div>
                        </>
                      )}
                      <div className={`bi-form-group-white ${validation.NameValidation ? "error-red" : ""}`}>
                        <input type="text" name="name" id="name" className={`bi-form-field-white ${validation.NameValidation ? "error-red" : ""}`} placeholder="Name" onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} onClick={() => setvalidaion(prev => ({ ...prev, NameValidation: false }))} />
                        <label htmlFor="name" className="heading-400-14-12 bi-form-label-white ">Name</label>
                      </div>

                      <div className={`bi-form-group-white ${validation.EmailIdValidation ? "error-red" : ""}`}>
                        <input type="text" name="emailid" id="emailid" className={`bi-form-field-white ${validation.EmailIdValidation ? "error-red" : ""}`} placeholder="Email Id" onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} onClick={() => setvalidaion(prev => ({ ...prev, EmailIdValidation: false }))} />
                        <label htmlFor="emailid" className="heading-400-14-12 bi-form-label-white ">Email ID {<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </>

                    <div className={`bi-form-group`}>
                      <Textarea minRows={5} placeholder="Leave a comment here" name="Comments" id="Comments" onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))} />
                      {/* <label htmlFor="email" className="heading-400-14-12 bi-form-label">{token === null ? "Comments" : "Comments"}</label> */}
                    </div>

                    <div className='mt-4 mb-5 text-center'>
                      <button className='button' onClick={token === null ? handleSubmit : handleSubmit_2}  >Submit</button>
                      <button type="button" className='btn btn-warning' onClick={() => {
                        setCustomerInfoForm(false);
                        localStorage.setItem('formSubmitted', 'true');
                      }} style={{ height: '40px', width: '100px', marginLeft: '10px',borderRadius: '12px' }}>Skip</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </>
  );
};

export default DelayedForm;
