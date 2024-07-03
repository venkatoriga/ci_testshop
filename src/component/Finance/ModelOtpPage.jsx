import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { Container, Image } from 'react-bootstrap';
import { secondClient, CreateOtpVerification, UpdateOTPVerify } from '../OrigaExtentionAPI/mutations';
import './ModelOtpPage.css';


const ModelOtpPage = ({ phoneNumber,setloading,setotpvalidation,setotpVerified}) => {

    //console.log('phoneNumber=======>', phoneNumber);
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [errorMessage, setErrorMessage] = useState('');
    
    const [timer, setTimer] = useState(90); // 01:30 in seconds
    const [isRunning, setIsRunning] = useState(true);
    const location = useLocation(); // Use useLocation to access URL parameters
    const [OTPID, setOTPID] = useState(null);
    useEffect(() => {
        const createOTP = async () => {
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
                setOTPID(OTP_ID);
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        };

        createOTP();
    }, []);

    const handleOtpInputChange = (e, index) => {
        const value = e.target.value;
        otpValues[index] = value;
        setOtpValues([...otpValues]);
        if (index < otpInputRefs.length - 1 && value !== '') {
            otpInputRefs[index + 1].current.focus();
        }
    };

    const handleSubmit = async () => {
        const enteredOTP = otpValues.join('');
        if (enteredOTP.length === 4) {
            try {
                setloading(true);
                let OTP_message;
                try {
                    const { data: UpdateOTPData } = await secondClient.mutate({
                        mutation: UpdateOTPVerify,
                        variables: {
                            updateOTP: {
                                otpid: parseInt(OTPID),
                                otpval: parseInt(enteredOTP),
                                verificationstatus: 'Verified',
                                otpstatus: 'Verified',
                            },
                        },
                    });
                    setloading(false);
                    OTP_message = UpdateOTPData?.updateOtpverification?.message;
                } catch (error) {
                    console.error('Error verifying OTP:', error);
                }

                if (OTP_message === 'OTP verification was successful!') {
                    setotpVerified(true)
                    setotpvalidation(false)
                } else {
                    setErrorMessage('Please enter the valid OTP sent to your phone number');
                }
            } catch (error) {
                console.error('Error handling submit:', error);
            }
        } else {
            setErrorMessage('Please enter a valid OTP.');
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
    const handleResendOTP = async () => {
        //setOtpValues(['', '', '', ''])
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
            setOTPID(OTP_ID);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
        setTimer(90);
    };
    return (
        <Container className="text-center">
            <Container className='pl-0'>
                <h2 className='heading-600-20 mt-5'>Verify with OTP</h2>
            </Container>
            <Container className='pl-0 ml-0 '>
                <div className='otp-boxes ml-0 pl-0'>
                    {otpValues.map((value, index) => (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleOtpInputChange(e, index)}
                            ref={otpInputRefs[index]}
                            key={index}
                            maxLength="1"
                            onKeyDown={(e) => {
                                if (!/\d/.test(e.key) && e.keyCode !== 8) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    ))}
                </div>
                {/* <Container >{isRunning ? <></> : <p className='resend-otp '>OTP is resend successfully</p>}</Container> */}
                <p className="error-message">{errorMessage}</p>
            </Container>
            <Container >
                <span className='resend'>
                    <span className='time1'>{formatTime(timer)}&nbsp;&nbsp;&nbsp;</span>
                </span>
                <span className='curser-pointer'onClick={handleResendOTP} >
                    Resend OTP
                </span>
            </Container>
            <Container className='mt-4 mb-5'> <Button message={"Submit"} callFunction={handleSubmit} /> </Container>

        </Container>
    );
};

export default ModelOtpPage;
