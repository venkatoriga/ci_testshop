import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Image } from 'react-bootstrap'
// import Button from '../Button/Button'
import './product.css'
import './success.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VectorBlock from '../Annual/Vector/VectorBlock';
import ProductBlock from '../Annual/Block/ProductBlock';
import Footer from '../Footer/Footer';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import ButtonOutline from '../Button/ButtonOutline';
import LoginModel from '../Authentication/LoginModel/LoginModel';
import { secondClient, CreateAmc, ServiceArea } from './mutations';
import Form from 'react-bootstrap/Form';
import PaymentModal from "./PaymentModal";
import Loader from "../SubComponent/Loader";
import VideoModal from "../Buying/Modals/VideoModal";

const Index = () => {
    const [SuccessPopUp, setSuccessPopUp] = useState(false);
    const [PaymentLink, setPaymentLink] = useState([]);
    const [isSmallScreen] = useState(window.innerWidth <= 427);
    const location = useLocation();
    const Navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('message')
    const serviceRequest = location.state?.productId;
    const serviceName = location.state?.serviceName;
    const [loginPortal, setLoginPortal] = useState(false);
    const [machineData, setMachineData] = useState();
    const [serviceType, setserviceType] = useState();
    const token = localStorage.getItem('userToken');
    const machineType = localStorage.getItem('MachineType');
    const Model = localStorage.getItem('Model');
    const machinenumber = localStorage.getItem('machinenumber');
    const mobileNo = localStorage.getItem('phoneNumber');
    const [box, setBox] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const sliderRef = useRef(null);
    const [selectedCategoryType, setSelectedCategoryType] = useState('');
    const [enteredPincode, setEnteredPincode] = useState('');
    const [OthersField, setOthersField] = useState(false);
    const [OthersValue, setOthersValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validation, setvalidaion] = useState({ categoryvalidation: false, othersvalidation: false, locationvalidation: false });
    const [showVideoModal, setshowVideoModal] = useState(false);

    // Function to handle opening/closing the modal
    const handleVideoModal = () => {
        setshowVideoModal(true);
    };
    //const [BuyingProcess, setBuyingProcess] = useState(false);
    const containerData = []
    const [loading, setloading] = useState(false);
    //-------------------------------------------------Pin Code Availability For Payment Process----------------------------------------------------------
    const onCategoryTypeChange = (event) => {
        setErrorMessage("")
        setSelectedCategoryType(event.target.value);
        if (event.target.value === 'Others') {
            setOthersField(true)
        } else {
            setOthersField(false)
        }
    };

    const OthersChange = (event) => {
        setErrorMessage("")
        setOthersValue(event.target.value);
    }
    const onPincodeChange = (event) => {
        setErrorMessage("")
        setEnteredPincode(event.target.value);
    };



    // ----------------------------------------------------Fetching Product Details--------------------------------------------------------------------------
    const fetchProductDetails = async () => {
        console.log('serviceRequest--->', serviceRequest);
        if (serviceRequest !== undefined) {
            setloading(true)
            if (serviceRequest === 'serviceRequest') {
                setloading(true)
                let machineTypePayload
                if (selectedCategoryType === 'HMC' || selectedCategoryType === 'CNC LATHE') {
                    machineTypePayload = JSON.stringify({ type: selectedCategoryType });
                }
                else {
                    machineTypePayload = JSON.stringify({ type: 'VMC' });
                }
                // const machineTypePayload = JSON.stringify({});
                const response = await fetch('https://contacts.origaleasing.com/basedonTypefetchOncallServiceDetails', {
                    // const response = await fetch('https://contacts.origaleasing.com/fetchOncallServiceDetails', {
                    method: 'POST',
                    body: machineTypePayload,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseData = await response.json();
                setMachineData(responseData);
                setserviceType(serviceName)
                setloading(false)
            }
            else {
                setloading(true)
                const machineTypePayload = JSON.stringify({ plan_id: serviceRequest });
                const response = await fetch('https://contacts.origaleasing.com/fetchAMCPlan', {
                    method: 'POST',
                    body: machineTypePayload,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseData = await response.json();
                console.log('fetchAMCPlan');
                setMachineData(responseData);
                setserviceType("AMC")
                setloading(false)

            }

        }



    };

    useEffect(() => {
        //Scroll To Top of the page
        window.scrollTo(0, 0);
        fetchProductDetails();
    }, [selectedCategoryType]);

    console.log('machineData', machineData);
    const Single_Product = machineData?.jsondata[0]
    const AmcPlanId = machineData?.jsondata[0]?.id
    const Description = machineData?.jsondata[0]?.description;
    const formattedDescription = Description && Description.includes('["') && Description.includes('"]')
        ? Description.slice(2, -2)
        : Description || '';

    // ----------------------------------------------------Payment Process----------------------------------------------------------------------------------
    const ContactUs = async () => {
        console.log('selectedCategoryType----->', selectedCategoryType);
        if (selectedCategoryType === "") {
            setvalidaion(prev => ({
                ...prev,
                categoryvalidation: true
            }));
            // setErrorMessage("Please Select Category Type")
        }
        else if (selectedCategoryType === 'Others' && OthersValue === '') {
            if (OthersValue === '') {
                setvalidaion(prev => ({
                    ...prev,
                    othersvalidation: true
                }));
            }

        }
        else if (enteredPincode === '') {
            setvalidaion(prev => ({
                ...prev,
                locationvalidation: true
            }));
            setErrorMessage("Please Select Location ")
        }

        else {
            // Navigate('/ServiceRequest')
            Navigate('/ServiceRequest', { state: { selectedCategoryType, enteredPincode, OthersValue, serviceName } });
        }


    }


    // Login Process
    const onHidePortal = () => {
        setLoginPortal(false);
    }

    useEffect(() => {

        setBox(sliderRef.current);
    }, [])
    const renderScopes = () => {
        const scopeData = machineData?.jsondata[0]?.scope_of_work;

        if (scopeData) {
            const scopeDataStr = machineData?.jsondata[0].scope_of_work;
            const scopeDataNewStr = scopeDataStr.replace(/&amp;/gi, '&');
            const scopeDataNew = JSON.parse(scopeDataNewStr);
            const midpoint = Math.ceil(scopeDataNew.length / 2);
            const firstHalfScopes = scopeDataNew.slice(0, midpoint);
            const secondHalfScopes = scopeDataNew.slice(midpoint);
            const toggleShowMore = () => setShowMore(!showMore);


            return (
                <>
                    <div className='first__row__box'>
                        {/* Existing content here */}
                        <div>
                            {serviceRequest === "serviceRequest" ? (
                                <div>
                                    <div className={`first-half ${isSmallScreen ? '' : 'hide'}`}>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 text-end">
                                                <img src='/buy_new2.png' alt='/buy_new2.png' style={{ margin: '0px 10px 20px 0px' }} className="img-fluid" />

                                            </div>
                                        </div>
                                    </div>
                                    <Form.Select className={`bi-form-field bg-white ${validation.categoryvalidation ? "error-red" : ""}`} aria-label="Default select" onChange={onCategoryTypeChange} onClick={() => setvalidaion(prev => ({ ...prev, categoryvalidation: false }))} style={{ lineHeight: '2' }} >
                                        <option value="">Select Categories Types *</option>
                                        <option value="TURNING CENTRE">Turning Centre</option>
                                        <option value="CNC LATHE">CNC Lathe</option>
                                        <option value="VMC">VMC</option>
                                        <option value="HMC">HMC</option>
                                        <option value="CMH">CMH</option>
                                        <option value="Grinding Machine">Grinding Machine</option>
                                        <option value="SPM (Special Purpose machine)">SPM (Special Purpose machine)</option>
                                        <option value="VTL">VTL</option>
                                        <option value="Twines Spindle">Twins Spindle</option>
                                        <option value="Others">Others</option>
                                    </Form.Select>

                                    {OthersField && (
                                        <div className={`bi-form-group ${validation.othersvalidation ? "error-red" : ""}`}>
                                            <input
                                                className={`bi-form-field bg-white ${validation.othersvalidation ? "error-red" : ""}`}
                                                type="text"
                                                id="inputText"
                                                aria-describedby="passwordHelpBlock"
                                                onChange={OthersChange}
                                                placeholder=''
                                                required
                                                onClick={() => setvalidaion(prev => ({ ...prev, othersvalidation: false }))}
                                            />
                                            <label htmlFor="name" className="heading-400-14-12 bi-form-label">Enter Others{<span style={{ color: '#CB1923' }}>*</span>}</label>
                                        </div>
                                    )}
                                    <div className={'location_icon mt-4'}>
                                        <Form.Select className={`bi-form-field bg-white ${validation.locationvalidation ? "error-red" : ""}`} aria-label="Default select" onChange={onPincodeChange} onClick={() => setvalidaion(prev => ({ ...prev, locationvalidation: false }))} style={{ lineHeight: '2' }}>
                                            <option value="">Select Location *</option>
                                            <option value="Bengaluru">Bengaluru</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Ichalkaranji">Ichalkaranji</option>
                                            <option value="Kolhapur">Kolhapur</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Navi Mumbai">Navi Mumbai</option>
                                            <option value="Palghar">Palghar</option>
                                            <option value="Palghar">Palghar</option>
                                            <option value="PUNE">Pune</option>
                                            <option value="Thane">Thane</option>
                                            <option value="Vasai">Vasai</option>
                                        </Form.Select>

                                    </div>
                                    {/* Further components */}
                                    <Button className="typ-transparent-button buynowbtn1" onClick={() => ContactUs()} >Book Inspection</Button>
                                    {/* <Container>
                                        <p className="error-message errormsg">{errorMessage}</p>
                                    </Container> */}
                                </div>
                            ) : (null)}
                            <div className={`first-half ${isSmallScreen ? 'mt-5' : 'mt-5'}`}>
                                <h3 className='typ-features'>Service Scope</h3>
                                {firstHalfScopes.map((paragraph, index) => (
                                    <div key={index} className='scopes_list' style={{ 'display': 'flex' }}>
                                        <div><img src="/asset/icons8-service-50.png" className='icon__img' alt="icon" style={{ width: '24px', height: '24px' }} /></div>
                                        <div><span>{paragraph}</span></div>
                                    </div>
                                ))}
                                {secondHalfScopes.map((paragraph, index) => (
                                    <div key={index} className='scopes_list' style={{ 'display': 'flex' }}>
                                        <div><img src="/asset/icons8-service-50.png" className='icon__img' alt="icon" style={{ width: '24px', height: '24px' }} /></div>
                                        <div><span>{paragraph}</span></div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* First half scopes display here */}
                    <div className={`first-half ${isSmallScreen ? 'hide' : ''}`}>
                        <div className="row">
                            <img src="/step1.svg" alt="/step1.svg" style={{ margin: '0px 0px 0px 140px', height: '10%', width: '10%' }} />
                            <h1 class="heading-600-16-14" style={{ padding: '0px 0px 0px 160px' }}>Raise a Service Request</h1>
                            <div className="col-lg-12 col-md-12 text-end">
                                <img src='/buy_new2.png' alt='/buy_new2.png' style={{ margin: '0px 10px 10px 20px', height: '90%', width: '80%' }} className="img-fluid" />

                            </div>
                        </div>
                        <div className={`first-half mt-4 ${isSmallScreen ? 'hide' : ''}`}>
                            <div className="row">

                                <img src="/step2.svg" alt="/step2.svg" style={{ margin: '0px 0px 0px 140px', height: '10%', width: '10%' }} />
                                <h1 className="heading-600-16-14"style={{ padding: '0px 0px 0px 160px' }} >Receive a call from our machine expert</h1>
                                
                                <div className="col-lg-12 col-md-12 text-end">
                                    <img src='/buy_new1.png' alt='/buy_new1.png' style={{ margin: '0px 10px 10px 20px', height: '90%', width: '80%' }} className="img-fluid" />

                                </div>
                            </div>

                        </div>
                        <div className={`first-half mt-4 ${isSmallScreen ? 'hide' : ''}`}>
                            <div className="row">
                                <img src="/step3.svg" alt="/step3.svg" style={{ margin: '0px 0px 0px 140px', height: '10%', width: '10%' }} />
                                <h1 class="heading-600-16-14"style={{ padding: '0px 0px 0px 160px' }} >Book an appointment for inspection</h1>
                                <div className="col-lg-12 col-md-12 text-end">
                                    <img src='/buy_new3.png' alt='/buy_new3.png' style={{ margin: '0px 0px 0px 120px', height: '90%', width: '80%' }} className="img-fluid" />

                                </div>
                            </div>

                        </div>
                        {/* <div className={`first-half mt-4 ${isSmallScreen ? 'hide' : ''}`}>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 text-end">
                                    <img src='/asset/news1.webp' alt='/asset/news1.webp' style={{ margin: '0px 10px 10px 20px' }} className="img-fluid curser-pointer" onClick={handleVideoModal} />
                                </div>
                            </div>
                        </div> */}

                    </div>

                    {/* {showVideoModal && (
                        <VideoModal setshowVideoModal={setshowVideoModal} videoUrl="https://www.youtube.com/embed/yu7WbK0BUO0" />
                    )} */}



                </>
            );
        }
    };





    const renderHeader = () => {

        const keyPlan = machineData?.jsondata[0]?.plan;
        const dataFromLocalStorageMachineType = localStorage.getItem('MachineType');
        const dataFromLocalStorageModel = localStorage.getItem('Model');
        if (serviceName !== undefined) {
            return (
                <div>
                    <h1 className='cart-heading'>{serviceName}      {serviceName === 'AMC' ? "(Annual Maintenance Contract)" : ""}</h1>
                </div>
            );
        }

        if (keyPlan) {
            return (
                <div>
                    <h1 className='cart-heading'>{keyPlan} Annual maintenance contract (AMC) plan for  {dataFromLocalStorageModel}  {dataFromLocalStorageMachineType} Machine</h1>
                </div>
            );
        }
    };

    let showModal = false

    const handleModal = (status) => {
        if (status) {
            showModal = true
            // setShowModal(status);
            document.body.classList.add('no-overflow');
        } else {
            showModal = false
            // setShowModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    if (message === 'Paid' || message === 'NOTPAID') {
        handleModal(true)
    }
    var payment_name;
    if (serviceRequest === 'serviceRequest') {
        payment_name = serviceName
    }
    else {
        payment_name = "Annual Maintenance Contract"
    }

    return (
        <>
            {loading && <Loader />}
            {showModal && (
                <PaymentModal message={message} modalAction={handleModal} payment_name={payment_name} />
            )}
            <section className='lyt-section lyt-section-for-alert'>
                {SuccessPopUp ? (
                    <Container fluid className="p-fixed bg-blur hw-100 d-j-a">
                        <div className='App'>
                            <div className='success-login'>
                                <div className='contents'>
                                    <h3 className='heading-600-28'>Confirm Payment</h3>
                                    <p className='heading-400-16 op-60'>Proceed to the payment</p>
                                    <div className="d-flex justify-content-between mt-3">
                                        <a href={PaymentLink} rel="noreferrer" >
                                            <Button variant="success" className="me-2">
                                                Pay Now
                                            </Button>
                                        </a>
                                        <Button variant="danger" style={{ marginLeft: '8px' }} onClick={() => setSuccessPopUp(false)}>
                                            Cancel
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Container>
                ) : null}
                <Container>
                    <div className='heading-box'>
                        {renderHeader()}
                    </div>
                    <div className='product-swiper'>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                            }}
                            className="productSwiper">

                        </Swiper>
                    </div>
                    <div className='cart-lyt-box'>
                        <div className='top-cart-box'>
                            {renderScopes()}

                        </div>
                        <div className='second-cart-box'>
                        </div>
                    </div>
                </Container>
                <Container fluid className="tenthSectionMaindiv">
                </Container>
                <Container fluid className="sixthsection-maindiv">
                    <Container className="sixthSectionSlider" ref={sliderRef}>
                        {containerData.map((product, index) => (
                            <ProductBlock
                                key={index}
                                title={product.title}
                                message={product.message}
                                imageUrl={product.imageUrl}
                                discount={product.discount}
                                productQuentity={product.productQuentity}
                            />
                        ))}
                    </Container>
                    {loginPortal && <LoginModel onHide={onHidePortal} />}
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Index