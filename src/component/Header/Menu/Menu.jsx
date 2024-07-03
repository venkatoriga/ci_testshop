import React, { useState, useEffect } from 'react'
import './Menu.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from '../../SubComponent/Search/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginModel from '../../Authentication/LoginModel/LoginModel';
import Avatar from '../../SubComponent/avatar/Avatar';
import Phone from '../../SubComponent/phone/Phone';
import { SaleorAPI, GetALLCategories } from '../../SaleorAPI/SaleorAPIRequest'
import HeaderT from '../../SubComponent/AllSvgs/HeaderT';
import { closeIcon } from '../../../helpers/Icons';
import ViewAllButton from '../../Button/ViewAllButton';
import ImageSlider from '../../Buying/Modals/ImageSlider';
const Menu = () => {
    const [loginPortal, setLoginPortal] = useState(false);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [logactive, setlogactive] = useState(false);
    const [InventoryCategory, SetInventoryCategory] = useState('');
    const [Sub_Categories, setSubCategories] = useState([]);
    const [HealthCare_Categories, setHealthCareCategories] = useState([]);
    const [MSME_Categories, setMSMECategories] = useState([]);
    const [isSmallScreen] = useState(window.innerWidth < 992)
    const [isOpen, setIsOpen] = useState(false);
    const [isChangeClass, setIsChangeClass] = useState(true);
    const [isShowShop, setIsShowShop] = useState(false);
    const [isService, setService] = useState(false);
    const [isShopArrowDown, setIsShopArrowDown] = useState(true);
    const [isServiceArrowDown, setIsServiceArrowDown] = useState(true);
    const [isShowImageSlider, setIsShowImageSlider] = useState(false);
    //console.log('Sub_Categories',Sub_Categories);
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
    const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
    console.log('HealthCare_Categories', HealthCare_Categories);
    console.log('MSME_Categories', MSME_Categories);



    const fetchData = async () => {
        try {
            const { data } = await SaleorAPI.query({
                query: GetALLCategories,
            });

            // Handle the data here, for example:
            //console.log('Categories:', data);
            SetInventoryCategory(data)
            setlogactive(false)
        } catch (error) {
            setlogactive(false)
            console.error('Error fetching categories:', error.message);
        }
    };

    const serviceRequest_1 = () => {
        const productId = "serviceRequest";
        const serviceName = "On Call Service"
        navigate('/service/Addonservice', { state: { productId, serviceName } });
        onCustomToggle1()
    }
    const serviceRequest_2 = () => {
        const productId = "serviceRequest";
        const serviceName = "Preventive Maintenance"
        navigate('/service/Addonservice', { state: { productId, serviceName } });
        onCustomToggle1()
    }
    const serviceRequest_3 = () => {
        const productId = "serviceRequest";
        const serviceName = "Retrofitting"
        //navigate('/service/Addonservice', { state: { productId,serviceName } });
        navigate('#');
        onCustomToggle1()
    }
    const serviceData = [{
        imageUrl: "/asset/OnCallServiceEnv.webp",
        title: "On Call breakdown Service",
        message: "Avail transportation services from to get your machine moved tansportation services from to get your machine moved across",
        navi: serviceRequest_1
    }, {
        imageUrl: "/asset/PreventiveMaintenanceEnv.webp",
        title: "Preventive Maintenance",
        message: " Opt for preventive maintenance to sidestep major shutdowns, cut costs, and ensure sustained machine eﬃciency and reliability.",
        navi: serviceRequest_2
    }, {
        imageUrl: "/asset/RetrofittingEnv.webp",
        title: "Retrofitting + com/ dec",
        message: " Machine retroﬁtting delivers safety, eﬃciency, longevity, cost savings, and improved precision in manufacturing",
        navi: serviceRequest_3
    }]

    useEffect(() => {
        if (InventoryCategory) {
            const categories = InventoryCategory.level1Categories?.edges || [];

            const healthCareCategories = categories.filter(category => {
                const metadata = category.node.metadata.find(meta => meta.key === "productType" && meta.value === "Health Care");
                return !!metadata;
            });

            const msmeCategories = categories.filter(category => {
                const metadata = category.node.metadata.find(meta => meta.key === "productType" && meta.value !== "Health Care");
                return !!metadata;
            });

            setSubCategories(categories);
            setHealthCareCategories(healthCareCategories);
            setMSMECategories(msmeCategories);
        }
    }, [InventoryCategory]);


    const onLogoHandler = () => navigate('/')
    const handleInputChange = (event) => { setSearchInput(event.target.value); };
    const onMicroPhoneText = (value) => { setSearchInput(value) }
    const onNavigate = () => { navigate(`/buy/product-listing?searchInput=${searchInput}`); }
    const onShowPortal = () => {
        setlogactive(true);
        const loggedin = !!localStorage.getItem('userToken');
        if (loggedin) {
            navigate('/myaccount')
            return
        } else {
            setLoginPortal(true);
        }
    }
    const onHidePortal = () => {
        setLoginPortal(false);
    }
    const onEnterHandler = (e) => {
        if (e.key === 'Enter') {
            onNavigate();
        }
    }
    const onAddMyClass = () => {

    }
    const onCustomToggle = () => {
        setIsChangeClass(true)
        setIsOpen(!isOpen)
    }
    const onCustomToggle1 = () => {
        setIsChangeClass(false)
        setTimeout(() => {
            setIsOpen(false);
        }, 1000);
    }
    const sliderImage = [{ product: "/asset/OnCallServiceEnv.webp", name: "prduct1" }, { product: "/asset/PreventiveMaintenanceEnv.webp", name: "prduct2" }, { product: "/asset/RetrofittingEnv.webp", name: "prduct3" }]

    return (
        <>
            {isShowImageSlider && <ImageSlider modalAction={() => setIsShowImageSlider(false)} sliderImage={sliderImage} />}
            <div className="menubar-container">
                {!isSmallScreen && <Navbar expand="lg" className="bg-body-tertiary custom-nav"  >
                    <div>
                        <Navbar.Toggle aria-controls="navbarScroll" id="toggelbtn" navbarScroll />
                        <Navbar.Collapse id="navbarScroll" Collapse>
                            <Nav className="me-auto my-2 my-lg-0  custom-nav "  >
                                <NavLink className="navlink " to="/" onClick={() => { setlogactive(false); setIsShopArrowDown(true); setIsServiceArrowDown(true) }}>Home</NavLink>
                                <NavLink className="navlink" to="/buy" onClick={() => { setlogactive(false); setIsShopArrowDown(true); setIsServiceArrowDown(true) }}>Buy Machines</NavLink>
                                <NavLink className="navlink" to="/sell" onClick={() => { setlogactive(false); setIsShopArrowDown(true); setIsServiceArrowDown(true) }}>Sell Machines</NavLink>
                                <NavLink className="navlink svg-space" to="/service" onClick={() => { setlogactive(false); setIsShopArrowDown(true); }}>Service{isServiceArrowDown ? <div className='p-r'><div className='div-for-svg' onClick={() => { setIsServiceArrowDown(false); fetchData() }}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                    <path d="M13.5 1.875L8.20711 7.56039C7.81658 7.97987 7.18342 7.97987 6.79289 7.56039L1.5 1.875" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                                </svg></div></div> : <div className='p-r'><div className='div-for-svg'><svg onClick={() => setIsServiceArrowDown(true)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 15 25" fill="none">
                                    <path d="M6.5 15.875L11.7929 10.1896C12.1834 9.77013 12.8166 9.77013 13.2071 10.1896L18.5 15.875" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                                </svg></div></div>}</NavLink>
                                {/* <NavDropdown className='shop-p' title="Shop" onClick={() => fetchData()}>
                                    {HealthCare_Categories?.map(category => (
                                        <NavDropdown.Item key={category.node.id} href={`/buy/product-listing?searchInput=${category.node.name}`}>
                                            {category.node.name}
                                        </NavDropdown.Item>
                                    ))}
                                    {MSME_Categories?.map(category => (
                                        <NavDropdown.Item key={category.node.id} href={`/buy/product-listing?searchInput=${category.node.name}`}>
                                            {category.node.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>*/}
                                <><NavLink className="navlink svg-space" to="/shop" onClick={() => { setlogactive(false); setIsServiceArrowDown(true) }}>Shop {isShopArrowDown ? <div className='p-r'><div className='div-for-svg' onClick={() => { setIsShopArrowDown(false); fetchData() }}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                    <path d="M13.5 1.875L8.20711 7.56039C7.81658 7.97987 7.18342 7.97987 6.79289 7.56039L1.5 1.875" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                                </svg></div></div> : <div className='p-r'><div className='div-for-svg'><svg onClick={() => setIsShopArrowDown(true)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 15 25" fill="none">
                                    <path d="M6.5 15.875L11.7929 10.1896C12.1834 9.77013 12.8166 9.77013 13.2071 10.1896L18.5 15.875" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                                </svg></div></div>}</NavLink></>
                                {/* <NavLink className="navlink" to="shop">Shop</NavLink> */}
                                <NavLink className="navlink" to="faqs" onClick={() => { setlogactive(false); setIsShopArrowDown(true); setIsServiceArrowDown(true) }}>FAQs</NavLink>
                                {/* {<div className={`show-992 ${logactive ? "login-active" : ""}`} onClick={onShowPortal}>Login</div>} */}
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>}


                {isSmallScreen && <div className='cust-toggel' onClick={onCustomToggle}><HeaderT /> </div>}


                {/* <Cart className='mid-logo'/> */}
                <div className='mid-logo'>
                    <img className='curser-pointer' src="/asset/image 6.png" alt="image6.png" onClick={onLogoHandler}></img>
                </div>
                <div className='cart-mob'>
                    <div className='d-flex'>
                        {/*  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.1071 20.0014C9.52868 20.0014 9.87045 19.6758 9.87045 19.2741C9.87045 18.8725 9.52868 18.5469 9.1071 18.5469C8.68551 18.5469 8.34375 18.8725 8.34375 19.2741C8.34375 19.6758 8.68551 20.0014 9.1071 20.0014Z" stroke="#211E24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.7946 20.0014C20.2162 20.0014 20.5579 19.6758 20.5579 19.2741C20.5579 18.8725 20.2162 18.5469 19.7946 18.5469C19.373 18.5469 19.0312 18.8725 19.0312 19.2741C19.0312 19.6758 19.373 20.0014 19.7946 20.0014Z" stroke="#211E24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 4H6.05339L8.34344 16.3636H20.557" stroke="#211E24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.3431 13.4544H20.2437C20.332 13.4544 20.4175 13.4253 20.4858 13.372C20.5541 13.3188 20.6009 13.2446 20.6182 13.1621L21.9922 6.61664C22.0033 6.56386 22.002 6.50939 21.9883 6.45717C21.9746 6.40495 21.9489 6.35627 21.9131 6.31466C21.8773 6.27304 21.8322 6.23952 21.7811 6.21652C21.73 6.19352 21.6742 6.1816 21.6177 6.18164H6.81641" stroke="#211E24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>*/}
                        <Phone onClick={() => navigate('/contactus')} width="21" height="21" viewBox="0 0 24 24" />
                        <div className='p-0' onClick={onShowPortal}><Avatar /></div>
                    </div>
                </div>
                <Search message={"Search"} microphone={true} onInputChange={handleInputChange} onEnterHandler={onEnterHandler} onNaviHandler={onNavigate} onMicro={onMicroPhoneText} onInputValue={searchInput} />


                {/* <Search1 message={"Search"} onInputChange={handleInputChange}  onEnterHandler={onEnterHandler}/>*/}
            </div>
            {!isShopArrowDown && <div className='shop-desktop'>
                <div className='shop-desktop-container'>
                    <div className="max-container">
                        <div className='w-100 d-flex'>
                            <div className='shop-desk-left'>
                                <div className='shop-desk'>
                                    {HealthCare_Categories?.map((category, index) => (
                                        <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                                            {category.name}
                                        </NavDropdown.Item>
                                    ))}
                                </div>
                                <div className='shop-desk'>
                                    {MSME_Categories?.slice(0, 4).map((category, index) => (
                                        <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                                            {category.name}
                                        </NavDropdown.Item>
                                    ))}
                                </div>
                                <div className='shop-desk'>
                                    {MSME_Categories?.slice(4).map((category, index) => (
                                        <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                                            {category.name}
                                        </NavDropdown.Item>
                                    ))}
                                </div>
                            </div>
                            <div className='shop-desk-right'>
                                <div className='shop-desk-right-imgdiv curser-pointer' onClick={() => { setIsShopArrowDown(true); navigate(`/buy/product-listing?searchInput=${'MSME'}`); }}>
                                    <img src="/asset/Header_MSME.jpg" alt="amc" className='img-fluid' />
                                    <p className='shop_img_text'>MSME</p>
                                </div>
                                <div className='shop-desk-right-imgdiv curser-pointer' onClick={() => { setIsShopArrowDown(true); navigate(`/buy/product-listing?searchInput=${'HealthCare'}`); }}>
                                    <img src="/asset/Healthcare_BlackLayout.jpg" alt="amc" className='img-fluid' />
                                    <p className='shop_img_text'>Health Care</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>}
            {!isServiceArrowDown && <div className='shop-desktop'>

                <div className='shop-desktop-container'>
                    <div className="max-container">
                        <div className='w-100 d-flex p-r'>

                            {<div className="view-all-service">
                                <ViewAllButton message={"View All"} callFunction={() => setIsShowImageSlider(true)} />
                            </div>}

                            {serviceData.map((item, index) => (
                                <div className='service-desk-div'>
                                    <div className='service-menu-div' key={index}>
                                        <div className='service-menu-img-div d-flex justify-content-center'><img className='img-fluid' style={{ height: "170px" }} src={item.imageUrl} alt="visions.png" /></div>
                                        <div className='heading-600-16 pt-3 text-center'>{item.title}</div>
                                        <div className='heading-400-14 pt-3 text-center hide-service'>{item.message}</div><div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>}
            {loginPortal && <LoginModel onHide={onHidePortal} />}

            {isOpen && <div className='mobile-login-screen'>
                <div className={`${isChangeClass ? 'toggel-container' : 'toggel-container2'}`}>
                    <div className='user-header'>
                        <div className='user-name-div'>
                            <div><div className='heading-600-16'>Hello!</div><div>{firstName ? `${firstName} ${lastName}` : "Please Login/signup"}</div></div>
                            <div className='curser-pointer' onClick={onCustomToggle1}>{closeIcon({ width: 16, height: 16 })}</div>
                        </div>
                    </div>

                    {!isShowShop && !isService && <div className='user-menu'>
                        <div className='user-menu-item'>
                            <NavLink className="navlink " to="/" onClick={() => { setlogactive(false); onCustomToggle1() }}>Home</NavLink>
                        </div>
                        <div className='user-menu-item'>
                            <NavLink className="navlink" to="/buy" onClick={() => { setlogactive(false); onCustomToggle1() }}>Buy Machines</NavLink>
                        </div>
                        <div className='user-menu-item'>
                            <NavLink className="navlink" to="/sell" onClick={() => { setlogactive(false); onCustomToggle1() }}>Sell Machines</NavLink>
                        </div>
                        <div className='user-menu-item d-flex justify-content-between'>
                            <NavLink className="navlink" to="/service" onClick={() => { setlogactive(false); onCustomToggle1() }}>Service</NavLink>
                            <svg onClick={() => setService(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5 14L10.6854 8.70711C11.1049 8.31658 11.1049 7.68342 10.6854 7.29289L5 2" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </div>
                        <div className='user-menu-item d-flex justify-content-between' onClick={() => { setIsShowShop(true); fetchData(); }}>
                            <div>shop</div><div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5 14L10.6854 8.70711C11.1049 8.31658 11.1049 7.68342 10.6854 7.29289L5 2" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </div>
                    
                        </div>

                        <div className='user-menu-item'>
                            <NavLink className="navlink" to="faqs" onClick={() => { setlogactive(false); onCustomToggle1() }}>FAQs</NavLink>
                        </div>



                        {firstName && <div className='user-menu-item d-flex justify-content-between'>
                            <NavLink className="navlink" to="/myaccount" onClick={() => { setlogactive(false); onCustomToggle1() }}>My Account</NavLink>
                            <svg onClick={() => { navigate('/myaccount'); onCustomToggle1() }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5 14L10.6854 8.70711C11.1049 8.31658 11.1049 7.68342 10.6854 7.29289L5 2" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </div>}


                        {/*Mobile  bottom section*/}
                        <div className='mob-user-bottom'>
                            {!firstName ? <div className='login-btn-div' onClick={() => { setLoginPortal(true); }}>Login / SignUp</div> : <div className='login-btn-div' onClick={() => { localStorage.clear(); setFirstName(""); setLastName("") }}>Log out</div>}
                        </div>

                    </div>}
                    {isShowShop && <div className='user-menu'>
                        <div className='mob-breadcrumbs'>
                            <svg onClick={() => setIsShowShop(false)} xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                <path d="M10.1673 5.99935H2.26065L4.68065 8.90602C4.73668 8.97343 4.77889 9.05122 4.80485 9.13494C4.83082 9.21866 4.84005 9.30668 4.832 9.39397C4.81574 9.57025 4.73013 9.73286 4.59398 9.84602C4.45784 9.95918 4.28232 10.0136 4.10604 9.99736C3.92975 9.98111 3.76714 9.89549 3.65398 9.75935L0.32065 5.75935C0.298224 5.72753 0.27817 5.69411 0.260651 5.65935C0.260651 5.62602 0.227317 5.60602 0.213984 5.57268C0.183766 5.49624 0.167945 5.41488 0.167317 5.33268C0.167945 5.25049 0.183766 5.16912 0.213984 5.09268C0.213984 5.05935 0.247317 5.03935 0.260651 5.00602C0.27817 4.97126 0.298224 4.93783 0.32065 4.90602L3.65398 0.906017C3.71667 0.830762 3.79516 0.770242 3.88388 0.728761C3.9726 0.68728 4.06938 0.665858 4.16732 0.666017C4.32309 0.665713 4.47404 0.719963 4.59398 0.81935C4.66149 0.875316 4.71729 0.94405 4.75819 1.02161C4.79909 1.09918 4.82429 1.18405 4.83234 1.27137C4.84039 1.35869 4.83114 1.44674 4.80511 1.53047C4.77908 1.61421 4.73679 1.69198 4.68065 1.75935L2.26065 4.66602H10.1673C10.3441 4.66602 10.5137 4.73626 10.6387 4.86128C10.7637 4.9863 10.834 5.15587 10.834 5.33268C10.834 5.50949 10.7637 5.67906 10.6387 5.80409C10.5137 5.92911 10.3441 5.99935 10.1673 5.99935Z" fill="#211E24" />
                            </svg><span className='all op-60'>All</span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                                <path d="M5 1L0.5 11" stroke="#211E24" stroke-linecap="round" />
                            </svg><span className='shop'>Shop</span>
                        </div>
                        <div className='heading-600-24-20'>Shop</div>
                        <div className='shop-menu'>
                            {HealthCare_Categories?.map(category => (
                                <NavDropdown.Item key={category.node.id} href={`/buy/product-listing?searchInput=${category.node.name}`}>
                                    {category.node.name}
                                </NavDropdown.Item>
                            ))}
                            {MSME_Categories?.map(category => (
                                <NavDropdown.Item key={category.node.id} href={`/buy/product-listing?searchInput=${category.node.name}`}>
                                    {category.node.name}
                                </NavDropdown.Item>
                            ))}
                        </div>
                        <div className='shop-mob-imgdiv'>
                            <div className="mob-bottom-img">
                                <img className="w-100" src="/asset/mob-bottom-img.png" alt="amc" />
                                <p className='shop_img_mob'>Lubricants and Oil</p>
                            </div>
                        </div>
                    </div>}
                    {isService && <div className='user-menu'>
                        <div className='mob-breadcrumbs'>
                            <svg onClick={() => setService(false)} xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                <path d="M10.1673 5.99935H2.26065L4.68065 8.90602C4.73668 8.97343 4.77889 9.05122 4.80485 9.13494C4.83082 9.21866 4.84005 9.30668 4.832 9.39397C4.81574 9.57025 4.73013 9.73286 4.59398 9.84602C4.45784 9.95918 4.28232 10.0136 4.10604 9.99736C3.92975 9.98111 3.76714 9.89549 3.65398 9.75935L0.32065 5.75935C0.298224 5.72753 0.27817 5.69411 0.260651 5.65935C0.260651 5.62602 0.227317 5.60602 0.213984 5.57268C0.183766 5.49624 0.167945 5.41488 0.167317 5.33268C0.167945 5.25049 0.183766 5.16912 0.213984 5.09268C0.213984 5.05935 0.247317 5.03935 0.260651 5.00602C0.27817 4.97126 0.298224 4.93783 0.32065 4.90602L3.65398 0.906017C3.71667 0.830762 3.79516 0.770242 3.88388 0.728761C3.9726 0.68728 4.06938 0.665858 4.16732 0.666017C4.32309 0.665713 4.47404 0.719963 4.59398 0.81935C4.66149 0.875316 4.71729 0.94405 4.75819 1.02161C4.79909 1.09918 4.82429 1.18405 4.83234 1.27137C4.84039 1.35869 4.83114 1.44674 4.80511 1.53047C4.77908 1.61421 4.73679 1.69198 4.68065 1.75935L2.26065 4.66602H10.1673C10.3441 4.66602 10.5137 4.73626 10.6387 4.86128C10.7637 4.9863 10.834 5.15587 10.834 5.33268C10.834 5.50949 10.7637 5.67906 10.6387 5.80409C10.5137 5.92911 10.3441 5.99935 10.1673 5.99935Z" fill="#211E24" />
                            </svg><span className='all op-60'>All</span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                                <path d="M5 1L0.5 11" stroke="#211E24" stroke-linecap="round" />
                            </svg><span className='shop'>Service</span>
                        </div>
                        <div className='heading-600-24-20'>Service</div>

                        {serviceData.map((item, index) => (
                            <div className='service-menu-div' key={index}>
                                <div className='service-menu-img-div'><img className='img-fluid' src={item.imageUrl} alt="visions.png" /></div>
                                <div className='heading-600-16 pt-3 text-center'>{item.title}</div>
                                <div className='heading-400-14 pt-3 text-center hide-service'>{item.message}</div>
                                <div className='pt-3 hide-service'><button className='button' onClick={item.navi}>Book Service</button></div>
                                <div></div>
                            </div>
                        ))}

                    </div>}
                </div>
            </div>}
        </>
    )
}
export default Menu