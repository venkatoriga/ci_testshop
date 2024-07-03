import React, { useState,useEffect } from "react";
import "./PhoneModal.css";
import { closeIcon } from "../../../helpers/Icons";
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://devextension.origa.market/graphql/',
  cache: new InMemoryCache(),
});



const createOtpverification = gql`

mutation createOtpverification($inputotp:CreateOtpVerificationInput!) {
  createOtpverification(inputotp: $inputotp) {
    otpverification {
      OtpID
      ompUserId
      ompMobileNo
      otpVal
      verificationStatus
      actionType
      otpStatus
      createdAt
      updatedAt
    }
  }
}

`;




const UpdateOTPVerify = gql`
mutation UpdateOTPVerify($updateOTP: UpdateOtpVerificationInput!) {
  updateOtpverification(otpData: $updateOTP) {
    message
    __typename
  }
}


`;


const PhoneModal = ({ modalAction,productId,buymachineId }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpverification, setotpverification] = useState();
  const [otp, setOtp] = useState("");
  const [isVerificationMode, setIsVerificationMode] = useState(false);

  useEffect(() => {
    navigate(`/buy/add-address?id=${(productId)}&buyMachineId=${buymachineId || 0}`);
    // const loggedin = !!localStorage.getItem('userToken');
    // if (loggedin) {
    //   navigate(`/buy/add-address?id=${(productId)}&buyMachineId=${buymachineId || 0}`);
    //   return
    // }
  }, []);
  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSendOtp = async () => {
    // Perform actions like sending OTP to the provided phone number
    // For now, let's just log the phone number and switch to verification mode
    console.log("Phone Number:", phoneNumber);

        try {
     

        const { data } =  await client.mutate({
      mutation:createOtpverification ,
      variables: {"inputotp":{
        "ompmobileno":phoneNumber,
	    "verificationstatus": "Not Verified",
        "actiontype": "LogIn"
	}},
 // console.log(data)
    });
  //   console.log(data?.createOtpverification?.otpverification)
  // setotpverification(data?.createOtpverification?.otpverification)
 
        // setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    setIsVerificationMode(true);
  };

  console.log(otpverification)
  const handleVerifyOtp = () => {
    // Perform actions like verifying the entered OTP
    console.log("Entered OTP:", otp);
    modalAction(false)
  };

  return (
    <div className="bi-popup-wrap">
      <div className="back" onClick={() => modalAction(false)}></div>
      <div className="inner">
        <button onClick={() => modalAction(false)} className="close">
          {closeIcon({ width: 16, height: 16 })}
        </button>
        <div className="head-wrap">
          <div className="heading-600-20 heading-600-20-16">
            {isVerificationMode ? "Verify with OTP" : "Enter your Phone Number"}
          </div>
          <div className="heading-400-14-12 text">
            {isVerificationMode
              ? "Enter the OTP sent to your phone to verify your number"
              : "To schedule a visit for us to evaluate your machine, let us know you better"}
          </div>
        </div>
        <div className="field-group">
          {isVerificationMode ? (
            <>
              <input
                type="text"
                name="otp"
                className="input-field"
                autoComplete="off"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label htmlFor="otp" className="heading-400-14-12 input-label">
                OTP
              </label>
            </>
          ) : (
            <>
              <input
                type="text"
                name="phone"
                className="input-field"
                autoComplete="off"
                value={phoneNumber}
                onChange={handleInputChange}
              />
              <label htmlFor="phone" className="heading-400-14-12 input-label">
                Phone Number
              </label>
            </>
          )}
        </div>
        <button
          type="button"
          className="otp-btn heading-600-16"
          onClick={isVerificationMode ? handleVerifyOtp : handleSendOtp}
        >
          {isVerificationMode ? "Submit" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default PhoneModal;
