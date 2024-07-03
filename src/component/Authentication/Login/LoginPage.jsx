import React, { useState, useRef, useEffect } from 'react';
import './login.css'
import { Container, Image } from 'react-bootstrap';
import Button from '../../Button/Button';
import { TextField } from '@mui/material';
import { secondClient, CreateOtpVerification, UpdateOTPVerify} from '../../OrigaExtentionAPI/mutations';
import { authenticateUser } from './auth';
import { AccountRegister } from '../../SaleorAPI/AccountRegister';
import client from './apolloClient';
import { CurrentUser } from '../../SaleorAPI/CurrentUser';
import OtpInput from 'react-otp-input';
import { gql } from '@apollo/client';
import serverclient from '../../Services/ServicesPopup/apolloclient';
import { useLocation} from 'react-router-dom';

const WISHLIST_ADD_UPDATE = gql`
  mutation ($requestinput: CreateUpdateWishListItemInput!) {
    createOrUpdateWishlistItem(requestinput: $requestinput) {
      message
      success
    }
  }
`;

const LoginPage = ({ onHide, onSuccessPage }) => {
  const location = useLocation();
  console.log('currentURL-----*******________--->',location.pathname);
 
  const [phoneNumber, setPhoneNumber] = useState();
  const [otpPage, setOtpPage] = useState(false);
  const [otp, setOtp] = useState('');
  const [btnName, setBtnName] = useState(true);
  // const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes
  const [errorMessage, setErrorMessage] = useState('');

  const [OTPID, setOTPID] = useState(null);
  const [OTPValue, setOTPValue] = useState(null);
  
  useEffect(() => {
    //console.log('location.pathname===========>',location.pathname);
    if (location.pathname === '/buy/add-address' || location.pathname === '/buy/pay-token' ) {
      //console.log('workini');
      setBtnName(false);
    } else {
      setBtnName(true);
    }
  }, [location.pathname]);
  localStorage.setItem('number', phoneNumber);
  const onPNumberChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
      setPhoneNumber(sanitizedInput)
    }

  };


  const onWishlistHandler = async (userId,productid, imageurl, price, productName, productBrand, productCategory, productSubCategory, year, location) => {
    const { data } = await serverclient.mutate({
      mutation: WISHLIST_ADD_UPDATE,
      variables: {
        "requestinput": {
          "userid": userId,
          "addProductids": [productid],
          "names": ["My Wishlist"],
          "quantity": 1,
          "removeProductids": [],
          "category": "MACHINE",
          "productDetails": [{
            "productid": productid,
            "image": imageurl,
            "price": price,
            "product_name": productName,
            "brand": productBrand,
            "categories": productCategory,
            "subcategories": productSubCategory
          }
          ]
        }
      }
    })
  };

  
  // -------------------------------------------------------On submit Function---------------------
  const onResendOtp = () => {
    setTimeLeft(120)
    onMoveOtpPage()
  }
  const SubmitCall = async () => {
    console.log("submit button working", otp);
    if (otp !== null && otp.length === 4) {
      let OTP_message;
      try {
        const { data: UpdateOTPData } = await secondClient.mutate({
          mutation: UpdateOTPVerify,
          variables: {
            updateOTP: {
              otpid: parseInt(OTPID),
              otpval: parseInt(otp),
              verificationstatus: 'Verified',
              otpstatus: 'Verified',
            },
          },
        });
        // Check the message in the response and set the OTP_message accordingly
        OTP_message = UpdateOTPData?.updateOtpverification?.message;

      }
      catch (error) {
        console.error('Error verifying OTP:', error);
      }
      if (OTP_message === 'OTP verification was successful!') {
        var phoneNO = phoneNumber + "@origa.market"
        try {
          // ---------------------------------If New User Or Existing User-----------------------------------------------------------
          try {
            const result = await authenticateUser(phoneNumber);
            console.log('Login response:', result);
            if (result?.token) {
              const token = result?.token
              const id = result?.user?.id
              const firstName = result?.user?.firstName
              const lastName = result?.user?.lastName
              const email = result?.user?.email
              localStorage.setItem('userToken', token);
              localStorage.setItem('id', id);
              localStorage.setItem('firstName', firstName);
              localStorage.setItem('lastName', lastName);
              localStorage.setItem('refreshToken', result?.refreshToken);
              localStorage.setItem('user', result?.user);
              localStorage.setItem('emailId', email)
              //window.location.href = '/success';
              console.log("login Email ===>>>", firstName, lastName, email);
              const wishlistDataString = localStorage.getItem('wishlistPayload');
              if (wishlistDataString) {
                  const wishlistData = JSON.parse(wishlistDataString);
                  onWishlistHandler(
                      id,
                      wishlistData.productId,
                      wishlistData.thumbnail,
                      wishlistData.pricing,
                      wishlistData.productName,
                      wishlistData.Brands,
                      wishlistData.category,
                      wishlistData.subcategory
                  );

                  localStorage.removeItem('wishlistPayload');
              }

              if (firstName === "" || lastName === "" || email === "") {
                onSuccessPage(1)
              } else {
                onSuccessPage(0)
              }
            } else {
              var error_Message = result?.errors[0]?.message
              setErrorMessage(error_Message)
              console.log('Authentication failed:', error_Message);
            }
          }
          catch (error) {
            console.error('Login error:', error);
          }
        }
        catch (error) {
          console.log('error in Origa-Extention->', error);
        }
      }
      else {
        setErrorMessage('Please enter the valid OTP sent to your phone number');
      }
    }
    else {
      setErrorMessage("Please enter the valid OTP sent to your phone number")
    }
  }

  const onMoveOtpPage = async () => {
    console.log(phoneNumber)
    if (!phoneNumber) {
      alert('Please Enter your Phone Number');
      return;
    }
    setTimeLeft(120)
    if (phoneNumber.length === 10) {

      try {
        const { data: createOtpData } = await secondClient.mutate({
          mutation: CreateOtpVerification,
          variables: {
            inputotp: {
              ompuserid: '',
              ompmobileno: phoneNumber,
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

      setOtpPage(true);
    }
    else {
      alert("Please enter a valid 10-digit Phone Number!!!")
    }

  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const onEditHandler = () => {
    setOtpPage(false);
  }

  useEffect(() => {
    let timer
    if (otpPage) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);

        }
      }, 1000);
    }
    return () => {

      if (otpPage) clearInterval(timer)
    };
  }, [timeLeft, otpPage]);
  return (
    <>
      {/* for desktop */}
      <div className='container-fluid hide-992 p-0 m-0'>
        <Container fluid className='d-j-a'>
          <div className='d-flex bg-white login-hw p-0  border-8p' >
            <div className='container-fluid p-0 m-0 row'>
              <div className='col col-lg-5 col-12 pl-0'>
                <div className='container-fluid p-0 m-0'>
                  <img className='hw-100' src="/asset/LoginPageImage.png" alt="LoginPageImage" />
                </div>
              </div>

              <div className='col col-lg-7 col-12'>
                <div className='text-end p-3'>
                  {btnName === true && (
                  <img className='curser-pointer' src="/asset/close-fill.png" onClick={(e) => { onHide(); e.stopPropagation(); }} alt="close-tag" />
                  )}
                </div>
                <div className='h-center' style={{ maxWidth: "65%" }}>
                  <div className='mg-0'>
                    <div className='login-logo p-0'>
                      <Image fluid src="/asset/image 6.png" />
                    </div>

                  </div>
                  <div >
                    <h2 className='heading-600-20 mt-5'>
                      {otpPage ? "Verify with OTP" : "Welcome to Origa Market"}
                    </h2>

                    {otpPage && <p className='heading-400-14 d-flex '>Enter the OTP sent to +91-{`${phoneNumber}`} <span className='heading-600-16 m-0 pl-2 v-center' style={{ lineHeight: "18px" }}>Edit</span>
                      <span className='pl-1 d-flex align-items-center curser-pointer' onClick={onEditHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3347 1.36811C9.99328 0.710629 11.0598 0.710629 11.7184 1.36811L12.6319 2.2784C13.2894 2.93694 13.2894 4.00354 12.6319 4.66218L5.68366 11.6111C5.68128 11.6159 5.67722 11.619 5.67382 11.6216C5.6724 11.6226 5.67107 11.6236 5.67005 11.6246C5.67005 11.6266 5.66883 11.6274 5.66712 11.6285C5.66712 11.6285 5.6657 11.6294 5.66493 11.63L5.66341 11.6314C5.65836 11.6347 5.65329 11.6389 5.64822 11.6431C5.64314 11.6473 5.63806 11.6516 5.63304 11.6549C5.62806 11.6582 5.62227 11.6615 5.61648 11.6649C5.6105 11.6683 5.60449 11.6718 5.5994 11.6752C5.5975 11.677 5.59518 11.6782 5.59254 11.6785C5.58316 11.6844 5.57293 11.689 5.56227 11.6921C5.56025 11.694 5.5594 11.6948 5.5584 11.6951L5.55688 11.6954L5.55553 11.6954L1.32109 13.1081C1.28608 13.1187 1.2498 13.1244 1.21321 13.125C1.12367 13.1253 1.03762 13.0901 0.97382 13.0271C0.883021 12.9376 0.851594 12.804 0.892934 12.6833L2.30216 8.44519C2.30216 8.44343 2.30301 8.44256 2.30383 8.4417C2.30464 8.44087 2.30543 8.44005 2.30543 8.43844C2.3071 8.43359 2.30875 8.4295 2.31038 8.42545C2.31215 8.42106 2.31391 8.41671 2.31566 8.41144C2.31736 8.40969 2.31821 8.40799 2.31904 8.4063C2.31987 8.40464 2.32068 8.40299 2.3223 8.40132C2.32585 8.39608 2.32844 8.39175 2.33104 8.38738C2.33347 8.38331 2.33592 8.37921 2.33918 8.37432C2.33918 8.37263 2.34005 8.37179 2.34092 8.37094C2.34179 8.3701 2.34266 8.36926 2.34266 8.36757C2.34603 8.36243 2.3503 8.35732 2.35457 8.35221C2.35871 8.34725 2.36285 8.34229 2.36618 8.3373C2.36834 8.3373 2.36916 8.33595 2.37025 8.33415C2.37092 8.33305 2.37169 8.33179 2.37292 8.33055L2.38642 8.31694L8.73802 1.96812L9.3347 1.36811ZM3.10125 8.55656L5.44768 10.9031L11.3205 5.02973L8.97407 2.68318L3.10125 8.55656ZM2.77075 9.18011L4.82063 11.2301L1.74254 12.255L2.77075 9.18011ZM11.7993 4.55081L12.1567 4.19C12.5502 3.79535 12.5517 3.15695 12.1599 2.76039L11.243 1.84335C10.8482 1.4489 10.2083 1.4489 9.81361 1.84335L9.45274 2.20405L11.7993 4.55081Z" fill="#211E24" stroke="#211E24" stroke-width="0.3" />
                        </svg></span>
                    </p>}
                    {!otpPage && <p className='heading-400-14'>Login or sign-up to access our range of machine products</p>}
                  </div>
                  {!otpPage && <div className='d-f mt-5'>
                    <h2 className='heading-600-20'>Log in <span className='heading-400-20'>or</span> Sign-up</h2>
                  </div>}
                  <div className='pb-3'>
                    {!otpPage && <div className="input-container m-0">
                      <div className={`bi-form-group-white`}>
                        <input type="text" name="phone" id="phone" className={`bi-form-field-white `} placeholder="Phone Number" value={phoneNumber} onChange={onPNumberChange} />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label-white ">Phone Number</label>
                      </div>
                    </div>}
                    {otpPage && <div>
                      <div className={`otp-container pr-0 ${errorMessage ? " error-red" : ""}`}>

                        {
                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} placeholder='-' className={`otp-inputs ${errorMessage ? "error-message" : ""}`} style={{ width: "4.8rem", height: "2rem", borderLeft: '0px', borderTop: '0px', borderBottom: '0px', borderRadius: '0px', textAlign: "center" }} />}
                          />
                        }
                      </div>
                      <span className={`otp-text heading-400-14-12 ${errorMessage ? " error-message" : ""}`}>OTP</span>
                      {/* <div>{formatTime(timeLeft)}</div> */}
                    </div>}
                  </div>
                  {otpPage && <div style={{ maxWidth: "342px" }}><p className="error-message">{errorMessage}</p></div>}
                  {otpPage && <div className='text-center'><p><span className='heading-400-16-12'>{formatTime(timeLeft)}</span><span className='resend heading-600-16-12 curser-pointer' onClick={formatTime(timeLeft) === `0:00` ? onResendOtp : null}>&nbsp;&nbsp;Resend OTP</span> </p></div>}
                  <div className='mt-4 mb-5 text-center'>
                    <button className='button' onClick={otpPage ? SubmitCall : onMoveOtpPage} disabled={formatTime(timeLeft) === `0:00` ? true : false}>{otpPage ? 'Submit' : 'Send OTP'}</button>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* for mobile */}
      <div className='container-fluid show-992 hw-100 bg-white p-0 m-0'>
        <div className='container-fluid d-flex justify-content-center p-0 m-0'>
          <div className='d-flex p-0 m-0' style={{ maxWidth: "360px" }} >
            <div className='container-fluid p-0 m-0 row'>

              <div className='col col-12 p-0'>
                <div className="container-fluid p-0 m-0 row justify-content-between">
                  <div className="col col-6 ">
                    <div className='p-0 hw-logo'>
                      <Image fluid src="/asset/image 6.png" />
                    </div></div>
                  <div className="col col-6 text-end">
                  {btnName === true && (
                    <img className='curser-pointer' src="/asset/close-fill.png" onClick={(e) => { onHide(); e.stopPropagation(); }} alt="close-tag" />
                  )}
                  </div>
                </div>
              </div>
              <div className='col col-12 pl-0 pr-0'>
                <div className='container-fluid p-0 m-0 text-center'>
                  <img className='img-fluid' src="/asset/loginMobileScreen.png" alt="LoginPageImage" />
                </div>
              </div>

              <div className='col col-lg-7 col-12'>

                <div className='p-0 m-0'>

                  <div >
                    <h2 className='heading-600-20-16 mt-4'>
                      {otpPage ? "Verify with OTP" : "Welcome to Origa Market"}
                    </h2>

                    {otpPage && <p className='heading-400-14-12 op-80 d-flex'>Enter the OTP sent to +91-{`${phoneNumber}`} <span className='heading-600-16-12 pl-2 v-center'>Edit</span>
                      <span className='pl-1 d-flex align-items-center'> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3347 1.36811C9.99328 0.710629 11.0598 0.710629 11.7184 1.36811L12.6319 2.2784C13.2894 2.93694 13.2894 4.00354 12.6319 4.66218L5.68366 11.6111C5.68128 11.6159 5.67722 11.619 5.67382 11.6216C5.6724 11.6226 5.67107 11.6236 5.67005 11.6246C5.67005 11.6266 5.66883 11.6274 5.66712 11.6285C5.66712 11.6285 5.6657 11.6294 5.66493 11.63L5.66341 11.6314C5.65836 11.6347 5.65329 11.6389 5.64822 11.6431C5.64314 11.6473 5.63806 11.6516 5.63304 11.6549C5.62806 11.6582 5.62227 11.6615 5.61648 11.6649C5.6105 11.6683 5.60449 11.6718 5.5994 11.6752C5.5975 11.677 5.59518 11.6782 5.59254 11.6785C5.58316 11.6844 5.57293 11.689 5.56227 11.6921C5.56025 11.694 5.5594 11.6948 5.5584 11.6951L5.55688 11.6954L5.55553 11.6954L1.32109 13.1081C1.28608 13.1187 1.2498 13.1244 1.21321 13.125C1.12367 13.1253 1.03762 13.0901 0.97382 13.0271C0.883021 12.9376 0.851594 12.804 0.892934 12.6833L2.30216 8.44519C2.30216 8.44343 2.30301 8.44256 2.30383 8.4417C2.30464 8.44087 2.30543 8.44005 2.30543 8.43844C2.3071 8.43359 2.30875 8.4295 2.31038 8.42545C2.31215 8.42106 2.31391 8.41671 2.31566 8.41144C2.31736 8.40969 2.31821 8.40799 2.31904 8.4063C2.31987 8.40464 2.32068 8.40299 2.3223 8.40132C2.32585 8.39608 2.32844 8.39175 2.33104 8.38738C2.33347 8.38331 2.33592 8.37921 2.33918 8.37432C2.33918 8.37263 2.34005 8.37179 2.34092 8.37094C2.34179 8.3701 2.34266 8.36926 2.34266 8.36757C2.34603 8.36243 2.3503 8.35732 2.35457 8.35221C2.35871 8.34725 2.36285 8.34229 2.36618 8.3373C2.36834 8.3373 2.36916 8.33595 2.37025 8.33415C2.37092 8.33305 2.37169 8.33179 2.37292 8.33055L2.38642 8.31694L8.73802 1.96812L9.3347 1.36811ZM3.10125 8.55656L5.44768 10.9031L11.3205 5.02973L8.97407 2.68318L3.10125 8.55656ZM2.77075 9.18011L4.82063 11.2301L1.74254 12.255L2.77075 9.18011ZM11.7993 4.55081L12.1567 4.19C12.5502 3.79535 12.5517 3.15695 12.1599 2.76039L11.243 1.84335C10.8482 1.4489 10.2083 1.4489 9.81361 1.84335L9.45274 2.20405L11.7993 4.55081Z" fill="#211E24" stroke="#211E24" stroke-width="0.3" />
                      </svg></span>
                    </p>}
                    {!otpPage && <p className='heading-400-14'>Login or sign-up to access our range of machine products</p>}
                  </div>
                  {!otpPage && <div className='d-f mt-3'>
                    <h2 className='heading-600-24-14'>Log in or Sign-up</h2>
                  </div>}
                  <div>
                    {!otpPage && <div className="input-container m-0">


                      <div className={`bi-form-group`}>
                        <input type="text" name="phone" id="phone" className={`bi-form-field bg-white `} placeholder="Phone Number" value={phoneNumber} onChange={onPNumberChange} />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label bg-white">Phone Number</label>
                      </div>
                    </div>}
                    {otpPage && <div>
                      <div className={`otp-container pr-0 ${errorMessage ? "error-red" : ""}`}>

                        {
                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} placeholder='-' className={` ${errorMessage ? "error-message" : ""}`} style={{ width: "4.8rem", height: "2rem", borderLeft: '0px', borderTop: '0px', borderBottom: '0px', borderRadius: '0px', textAlign: "center" }} />}
                          />
                        }
                      </div>
                      <span className={`otp-text heading-400-14-12 ${errorMessage ? " error-message" : ""}`}>OTP</span>
                      {/* <div>{formatTime(timeLeft)}</div> */}
                    </div>}
                  </div>
                  {otpPage && <p className="error-message heading-400-14-12 pt-2">{errorMessage}</p>}
                  {otpPage && <div className='text-center' ><p className='heading-600-16-12'><span className='heading-400-16-12'>{formatTime(timeLeft)}</span><span className='resend  curser-pointer' onClick={formatTime(timeLeft) === `0:00` ? onResendOtp : null}>&nbsp;&nbsp;Resend OTP</span> </p></div>}
                  <div className='mt-5 mb-5 text-center'>
                    <Button message={otpPage ? 'Submit' : 'Send OTP'} callFunction={otpPage ? SubmitCall : onMoveOtpPage} disabled={formatTime(timeLeft) === `0:00` ? true : false} />
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

export default LoginPage;