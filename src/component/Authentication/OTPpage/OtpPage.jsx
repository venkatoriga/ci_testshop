import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../Button/Button';
import { Container,Image } from 'react-bootstrap';
import './otpPage.css';

const OtpPage = () => {
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [errorMessage, setErrorMessage] = useState('');
    const [timer, setTimer] = useState(90); // 01:30 in seconds
    const [isRunning, setIsRunning] = useState(true);
    const location = useLocation(); // Use useLocation to access URL parameters
    const phoneNumber = new URLSearchParams(location.search).get("phoneNumber");
    const handleOtpInputChange = (e, index) => {
        const value = e.target.value;
        otpValues[index] = value;
        setOtpValues([...otpValues]);


        if (index < otpInputRefs.length - 1 && value !== '') {
            otpInputRefs[index + 1].current.focus();
        }
    };

    const handleSubmit = () => {
        const enteredOTP = otpValues.join('');

        if (enteredOTP === '1234') {

            window.location.href = '/success';
        } else {

            setErrorMessage('Please enter the valid OTP sent to your phone number');
        }
    };

    const timerRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 0) {

                        clearInterval(timerRef.current);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Container fluid className='d-j-a'>
        <Container className='d-j-a mt-50 w-70'>
            <Container className='mg-0 p-0 w-50'>
                    <Image fluid src="asset/LoginPageImage.png" alt="LoginPageImage" />
            </Container>

            <Container className='flex-column w-50 ml-5'>
                <Container className='d-f-r'><img src="asset/close-fill.png" alt="close-tag" /></Container>
                <Container>
                <Container className='login-logo w-100 mg-0'><Image fluid src="asset/image 6.png" /></Container>
                <Container>
                
                <Container className='pl-0'>
                <h2 className='heading-600-20 mt-5'>Verify with OTP</h2>
                <p className='heading-400-14'>Enter the OTP sent to +91-8723124352 <span className='heading-600-16'>{`  Edit`}</span> <span > <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3347 1.36811C9.99328 0.710629 11.0598 0.710629 11.7184 1.36811L12.6319 2.2784C13.2894 2.93694 13.2894 4.00354 12.6319 4.66218L5.68366 11.6111C5.68128 11.6159 5.67722 11.619 5.67382 11.6216C5.6724 11.6226 5.67107 11.6236 5.67005 11.6246C5.67005 11.6266 5.66883 11.6274 5.66712 11.6285C5.66712 11.6285 5.6657 11.6294 5.66493 11.63L5.66341 11.6314C5.65836 11.6347 5.65329 11.6389 5.64822 11.6431C5.64314 11.6473 5.63806 11.6516 5.63304 11.6549C5.62806 11.6582 5.62227 11.6615 5.61648 11.6649C5.6105 11.6683 5.60449 11.6718 5.5994 11.6752C5.5975 11.677 5.59518 11.6782 5.59254 11.6785C5.58316 11.6844 5.57293 11.689 5.56227 11.6921C5.56025 11.694 5.5594 11.6948 5.5584 11.6951L5.55688 11.6954L5.55553 11.6954L1.32109 13.1081C1.28608 13.1187 1.2498 13.1244 1.21321 13.125C1.12367 13.1253 1.03762 13.0901 0.97382 13.0271C0.883021 12.9376 0.851594 12.804 0.892934 12.6833L2.30216 8.44519C2.30216 8.44343 2.30301 8.44256 2.30383 8.4417C2.30464 8.44087 2.30543 8.44005 2.30543 8.43844C2.3071 8.43359 2.30875 8.4295 2.31038 8.42545C2.31215 8.42106 2.31391 8.41671 2.31566 8.41144C2.31736 8.40969 2.31821 8.40799 2.31904 8.4063C2.31987 8.40464 2.32068 8.40299 2.3223 8.40132C2.32585 8.39608 2.32844 8.39175 2.33104 8.38738C2.33347 8.38331 2.33592 8.37921 2.33918 8.37432C2.33918 8.37263 2.34005 8.37179 2.34092 8.37094C2.34179 8.3701 2.34266 8.36926 2.34266 8.36757C2.34603 8.36243 2.3503 8.35732 2.35457 8.35221C2.35871 8.34725 2.36285 8.34229 2.36618 8.3373C2.36834 8.3373 2.36916 8.33595 2.37025 8.33415C2.37092 8.33305 2.37169 8.33179 2.37292 8.33055L2.38642 8.31694L8.73802 1.96812L9.3347 1.36811ZM3.10125 8.55656L5.44768 10.9031L11.3205 5.02973L8.97407 2.68318L3.10125 8.55656ZM2.77075 9.18011L4.82063 11.2301L1.74254 12.255L2.77075 9.18011ZM11.7993 4.55081L12.1567 4.19C12.5502 3.79535 12.5517 3.15695 12.1599 2.76039L11.243 1.84335C10.8482 1.4489 10.2083 1.4489 9.81361 1.84335L9.45274 2.20405L11.7993 4.55081Z" fill="#211E24" stroke="#211E24" stroke-width="0.3"/>
              </svg></span></p>
                </Container>
                  <Container className='pl-0 ml-0'>
                  <div className='otp-boxes ml-0 pl-0'>
                  {otpValues.map((value, index) => (
                      <input
                          type="text"
                          value={value}
                          onChange={(e) => handleOtpInputChange(e, index)}
                          ref={otpInputRefs[index]}
                          key={index}
                      />
                  ))}
      </div>
      
<Container >{isRunning ? <></> : <p className='resend-otp '>OTP is resend successfully</p>}</Container>
<p className="error-message">{errorMessage}</p>
                  </Container>
                  <Container ><p><span className='resend'><span className='time'>{formatTime(timer)}</span>Resend OTP</span> </p></Container>
                </Container>
            <Container className='mt-4 mb-5'> <Button message={"Send OTP"} callFunction={handleSubmit}/> </Container>
                </Container>

                
            </Container>
        </Container>
        </Container>
    );
};

export default OtpPage;
