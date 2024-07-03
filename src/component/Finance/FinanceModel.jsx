import React, { useState } from "react";
import { closeIcon } from "../../helpers/Icons";
import OtpPage from "./ModelOtpPage";
// import { authenticateUser } from './auth';
import { authenticateUser } from '../Authentication/Login/auth';
import { secondClient, updateUserdetails } from '../OrigaExtentionAPI/mutations';
// import "./UserModal.css";
import Loader from "../SubComponent/Loader";
import { FallingLines } from "react-loader-spinner";

const FinanceModel = ({ modalAction, interestRate }) => {
    const [form, setForm] = useState({ name: "", email: "", });
    const [validation, setvalidaion] = useState({ ename: false, evalidation: false });
    const [otpvalidation, setotpvalidation] = useState(false);
    const [loading, setloading] = useState(false);
    const [otpVerified, setotpVerified] = useState(false);
    const onChangeHandelr = (e) => {
        const { name, value } = e.target;
        if (name === "name") {

            const newInputString = e.target.value;
            const sanitizedInput = newInputString.replace(/[^a-zA-Z\s]/g, "");

            // Update the state only if the input is empty or contains valid characters
            if (newInputString === '' || sanitizedInput === newInputString) {
                setForm((prev) => ({ ...prev, [name]: value }))
            }

        } else {


            const newInputString = value;
            const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
            if (sanitizedInput.length === 10) {
                setotpvalidation(true)
            }
            else {
                setotpvalidation(false)
            }
            // Update the state only if the input is empty or contains valid characters
            if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
                setForm((prev) => ({ ...prev, [name]: sanitizedInput }))

            }
        }

        console.log("check name and email-->", name, value)
    }


    const onSaveHandler = async () => {
        if (form.name === "" || form.email === "" || form.email.length !== 10) {
            if (form.name === "") { setvalidaion((prev) => ({ ...prev, ename: true })); }
            if (form.email === "" || form.email.length !== 10) { setvalidaion((prev) => ({ ...prev, evalidation: true })); }
            return;
        }

        try {
            setloading(true)
            // Check if the user exists or is a new user
            const result = await authenticateUser(form.email);
            console.log('Login response:', result);

            if (result?.token) {
                // If user exists, save user details to localStorage
                const token = result.token;
                const id = result.user.id;
                localStorage.setItem('userToken', token);
                localStorage.setItem('id', id);
                if (id) {
                    try {
                        const { data: updateUser } = await secondClient.mutate({
                            mutation: updateUserdetails,
                            variables: {
                                inputusers: {
                                    ompuserid: id,
                                    firstname: form.name,
                                    lastname: '',
                                    useremailid: ''
                                }
                            }
                            ,
                        });
                        localStorage.setItem('firstName', form.name);
                        localStorage.setItem('lastName', '');
                        localStorage.setItem('number',form.email)
                        localStorage.setItem('emailId', '')
                        // localStorage.setItem('refreshToken', result?.refreshToken);
                        // localStorage.setItem('user', result?.user);
                        setloading(false)
                        modalAction(false);
                        interestRate();

                    }
                    catch (error) {
                        console.log('error while Updating User details------->', error);
                        setloading(false)
                    }
                }
                // console.log("Login Email ===>>>", firstName, lastName, email);
            } else {
                setloading(false)
                // Handle authentication failure
                const errorMessage = result?.errors[0]?.message;
                // setErrorMessage(errorMessage);
                console.log('Authentication failed:', errorMessage);
            }
        } catch (error) {
            setloading(false)
            // Handle any errors that occur during the authentication process
            console.error('Login error:', error);
        }

    }



    return (
        <>
            {loading && <Loader />}
            <div className="bi-popup-wrap">
                <div className="back" onClick={() => modalAction(false)}></div>
                <div className="inner f-popup">
                    <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                    <div className="head-wrap">
                        <div className="heading-600-20-16">Point of contact details</div>
                        <div className="heading-400-14-12 text">Provide your details to access the interest rate</div>
                    </div>
                    <div className={`field-group-wrap`}>
                        <div className={`bi-form-group  ${validation.ename ? "error-red" : ""}`}>
                            <input type="text" name="name" id="name" className={`bi-form-field heading-600-14-12  ${validation.ename ? "error-red" : ""}`} placeholder="Enter First Name" autoComplete='off' onChange={onChangeHandelr} value={form.name} onClick={() => setvalidaion((prev) => ({ ...prev, ename: false }))} />
                            <label htmlFor="name" className={`bi-form-label light-txt  ${validation.ename ? "error-red" : ""}`}>Name</label>
                        </div>

                    </div>


                    <div className={`bi-form-group `}>
                        <input type="text" name="email" id="email" className={`bi-form-field heading-600-14-12 ${validation.evalidation ? "error-red" : ""}`} maxLength="10" placeholder="Enter Email Address" autoComplete='off' onChange={onChangeHandelr} value={form.email} onClick={() => setvalidaion((prev) => ({ ...prev, evalidation: false }))} />
                        <label htmlFor="email" className={`bi-form-label light-txt ${validation.evalidation ? "error-red" : ""}`}>Mobile Number</label>
                    </div>
                    {otpvalidation && (
                        <OtpPage phoneNumber={form.email} setloading={setloading} setotpvalidation={setotpvalidation} setotpVerified={setotpVerified} />
                    )}
                    {otpVerified && (
                        <div className="d-flex justify-content-between w-100 bi-form-group">
                            <button type="button" className="button-outline heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                            <button type="button" className="button heading-600-16" onClick={onSaveHandler}>Save</button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
export default FinanceModel