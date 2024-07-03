import React,{useState,useRef} from "react";
import {closeIcon,pencilIcon} from "../../../helpers/Icons";
import {hasValidationError,validationError,focusOnFeild} from "../../../helpers/Frontend";
import {authenticateUser} from '../../Authentication/Login/auth';
import {AccountRegister} from '../../SaleorAPI/AccountRegister';
import {ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client';
import {gql} from '@apollo/client';
import "./LoginModal.css";
const client = new ApolloClient({uri: 'https://dev.origa.market/graphql/',cache: new InMemoryCache()});
const httpLink = createHttpLink({uri: "https://devextension.origa.market/graphql/"});
const UpdateOTPVerify = gql`
  mutation UpdateOTPVerify($updateOTP : UpdateOtpVerificationInput!){
    updateOtpverification(otpData:$updateOTP)
    {
      message
    }
  }
`;
const UsersFilterQuery = gql`
query UsersFilter($first: Int, $userMobileno: BigInt) {
  usersFilter(first: $first, userMobileno: $userMobileno) {
    edges {
      node {
        ompUserId
      }
    }
  }
}
`;
const createUserDetailsMutation = gql`
  mutation CreateUserDetails($inputusers: CreateUserInput!) {
    createUserdetails(inputusers: $inputusers) {
      userdetails {
        ompUserId
        userMobileno
        createdBy
        createdAt
      }
    }
  }
`;
const secondClient = new ApolloClient({link: httpLink,cache: new InMemoryCache()});
const CreateOtpVerification = gql`
mutation CreateOtpVerification($inputotp: CreateOtpVerificationInput!) {
  createOtpverification(inputotp: $inputotp) {
    otpverification {
      OtpID
      ompMobileNo
      ompUserId
    }
  }
}`;
const LoginModal = ({modalAction,setShowUserModel,type}) => {
    const [form,setForm] = useState({phone: "",otp: ""});
    const [otp,setOtp] = useState(['', '', '', '']);
    const inputRefs = [useRef(),useRef(),useRef(),useRef()];
    const [modelType,setModelType] = useState(type);
    const [errors,setErrors] = useState([]);
    const [OTPID,setOTPID] = useState(null);
    const sendOTP = async () => {
        const newError = {};
        let positionFocus = "";
        if(!form.phone || !form.phone.trim()){
            newError["phone"] = "Required";
            positionFocus = positionFocus || "phone";
        }else if(form.phone.length < 10){
            newError["phone"] = "Enter valid phone number";
            positionFocus = positionFocus || "phone";
        }else{
              try {
          const { data: createOtpData } = await secondClient.mutate({
            mutation: CreateOtpVerification,
            variables: {
              inputotp: {
                ompuserid: '',
                ompmobileno: form.phone,
                verificationstatus: 'Not Verified',
                actiontype: 'LogIn',
              },
            },
          });
          console.log(createOtpData)
          const OTP_ID = createOtpData?.createOtpverification?.otpverification?.OtpID;
          setOTPID(OTP_ID)
        } catch (error) {
          console.error('Error sending OTP:', error);
        }
        }
        
        setErrors(newError);
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }
        setModelType("otp");
    }
    const submitOTP = async () => {
        const newError = {};
        let positionFocus = "";
        if(!form.otp || !form.otp.trim()){
            newError["otp"] = "Required";
            positionFocus = positionFocus || "otp";
        }
        setErrors(newError);
         if (form.otp !== null && form.otp.length === 4) {
      let OTP_message;
      try {
        const { data: UpdateOTPData } = await secondClient.mutate({
          mutation: UpdateOTPVerify,
          variables: {
            updateOTP: {
              otpid: parseInt(OTPID),
              otpval: parseInt(form.otp),
              verificationstatus: 'Verified',
              otpstatus: 'Verified',
            },
          },
        });
        // Check the message in the response and set the OTP_message accordingly
        OTP_message = UpdateOTPData?.updateOtpverification?.message;
console.log("otp done===>>>",OTP_message);
      }
      catch (error) {
        console.error('Error verifying OTP:', error);
      }
      if (OTP_message === 'OTP verification was successful!') {
        var phoneNO = form.phone + "@origa.market"
        var password = '12345678'
        try {
          const { data: ISUserAvailable } = await secondClient.query({
            query: UsersFilterQuery,
            variables: {
              first: 1,
              userMobileno: form.phone,
            },
            fetchPolicy: 'network-only',
          });
          const CurrentUserID = ISUserAvailable?.usersFilter?.edges; // If There is No user In Our Database 0 Records
          // ---------------------------------If New User-----------------------------------------------------------
          if (CurrentUserID.length === 0) {
            try {
              const { data: NewUSer } = await client.mutate({
                mutation: AccountRegister,
                variables: {
                  email: phoneNO,
                  password: "12345678"
                }
              });
              const saleor_UserId = NewUSer?.accountRegister?.user?.id
              console.log('saleor_UserId----->', saleor_UserId);
              const { data: NewUSerOrigaExtention } = await secondClient.mutate({
                mutation: createUserDetailsMutation,
                variables: {
                  inputusers: {
                    ompuserid: saleor_UserId,
                    userType: "",
                    userMobileNo: form.phone,
                    createdBy: "",
                  },
                },
              });
              const result = await authenticateUser(phoneNO, password);
              if (result?.token) {
                const token = result?.token
                const id = result?.user?.id
                const firstName = result?.user?.firstName
                const lastName = result?.user?.lastName
                localStorage.setItem('userToken', token);
                localStorage.setItem('id', id);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('refreshToken', result?.refreshToken);
            
 
              }
              else {
                newError["otp"] =  result?.errors[0]?.message
                // setErrorMessage(error_Message)
                // console.log('Authentication failed:', error_Message);
              }


            }
            catch (error) {
              console.log('error in Origa-Extention->', error);
            }
          }
          // ---------------------------------If Existing User-----------------------------------------------------------
          else {
            try {
              const result = await authenticateUser(phoneNO, password);
              console.log('Login response:', result);
              if (result?.token) {
                const token = result?.token
                const id = result?.user?.id
                const firstName = result?.user?.firstName
                const lastName = result?.user?.lastName
                localStorage.setItem('userToken', token);
                localStorage.setItem('id', id);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('refreshToken', result?.refreshToken);
                //window.location.href = '/success';
                //   onSuccessPage(true)
              } else {
                newError["otp"] =  result?.errors[0]?.message
                // setErrorMessage(error_Message)
                // console.log('Authentication failed:', error_Message);
              }
            }
            catch (error) {
              console.error('Login error:', error);
            }

          }

        }
        catch (error) {
          console.log('error in Origa-Extention->', error);
        }
      }
      else {
         newError["otp"] = "Please enter the valid OTP sent to your phone number"
        // setErrorMessage('Please enter the valid OTP sent to your phone number');
      }
    }
    else { newError["otp"] = "Please enter the valid OTP sent to your phone number"
    //   setErrorMessage("Please enter the valid OTP sent to your phone number")
    }
        if(positionFocus){
            focusOnFeild(positionFocus);
            return false;
        }
        modalAction(false);
        setShowUserModel(true);
    }
    const onChange = (e) => {
        const {name,value} = e.target;
        if(name == "phone"){
            let newValue = value.replace(/[^0-9]/gi,'');
            if(newValue == "" || newValue.length <= 10){
                handleCustom(name,newValue);
            }
        }
    }
    const handleInputChange = (value,index) => {
        if(isNaN(value)){
            return;
        }
        let otpObj = Object.assign([],otp);
        otpObj[index] = value;
        setOtp(otpObj);
        if(value !== '' && index < 3){
            inputRefs[index + 1].current.focus();
        }
        handleCustom("otp",otpObj.join(''));
    }
    const handleCustom = (name,value) => {
        setForm((prevState) => ({...prevState,[name]: value}));
    }
    const editPhoneHandle = () => {
        setModelType("phone");
        handleCustom("otp","");
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                {modelType == "phone" && (
                    <>
                        <div className="head-wrap">
                            <div className="heading-600-20 heading-600-20-16">Log in to proceed</div>
                            <div className="heading-400-14-12 text text-left">To schedule a visit for us to evaluate your machine, let us know you better </div>
                        </div>
                        <div className="bi-form-group">
                            <input type="text" name="phone" id="phone" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors,"phone") ? "has-input-error" : "")}`} placeholder="Enter Phone Number" autoCapitalize='off' onChange={onChange} value={form.phone}/>
                            <label htmlFor="phone" className="bi-form-label light-txt">Phone Number</label>
                            {hasValidationError(errors,"phone") ? (<span className="has-cust-error">{validationError(errors,"phone")}</span>) : null}
                        </div>
                        <button type="button" className="otp-btn heading-600-16-14" onClick={sendOTP}>Send OTP</button>
                    </>
                )}
                {modelType == "otp" && (
                    <>
                        <div className="head-wrap">
                            <div className="heading-600-20 heading-600-20-16">Enter OTP</div>
                            <div className="heading-400-14-12 text">Enter the OTP Sent to {form.phone} <button type="button" className="btn-edit heading-600-14" onClick={editPhoneHandle}>Edit {pencilIcon({width:14,height:14})}</button></div>
                        </div>
                        <div className={`opt-wrap ${(hasValidationError(errors,"otp") ? "has-error-wrap" : "")}`}>
                            <span className="label">OTP</span>
                            {otp.map((digit,index) => (
                                <input key={index} type="text" maxLength="1" value={digit} onChange={(e) => handleInputChange(e.target.value,index)} ref={inputRefs[index]} placeholder="-"/>
                            ))}
                        </div>
                        {hasValidationError(errors,"otp") ? (<span className="has-cust-error">{validationError(errors,"otp")}</span>) : null}
                        <div className="bottom-text">
                            <span className="timer">01:20</span>
                            <button className="btn-resend">resend</button>
                        </div>
                        <button type="button" className="otp-btn heading-600-16-14" onClick={submitOTP}>Submit</button>
                    </>
                )}
            </div>
        </div>
    );
}
export default LoginModal;