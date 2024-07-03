import React, { useState, useEffect } from 'react'
import './NewMenu.css'
import { searchIcon, closeIcon } from '../../../helpers/Icons';
import HeaderT from '../../SubComponent/AllSvgs/HeaderT';
import NewSearch from '../../SubComponent/Search/NewSearch';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Phone from '../../SubComponent/phone/Phone';
import LoginModel from '../../Authentication/LoginModel/LoginModel';
import CustomerInfo from '../../Authentication/CustomerInformation/CustomerInfoModel';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from '../../SubComponent/avatar/Avatar';
import ViewAllButton from '../../Button/ViewAllButton';
import { SaleorAPI, GetALLCategories } from '../../SaleorAPI/SaleorAPIRequest'
import { Helmet } from 'react-helmet';

const openArrow = <svg className='close-svg-rotated' xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
  <path d="M13.5 1.875L8.20711 7.56039C7.81658 7.97987 7.18342 7.97987 6.79289 7.56039L1.5 1.875" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
</svg>;

const closeArrow = <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
  <path d="M13.5 1.875L8.20711 7.56039C7.81658 7.97987 7.18342 7.97987 6.79289 7.56039L1.5 1.875" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
</svg>;

const NewMenu = () => {
  const { pathname, search, } = useLocation();
  const location = useLocation();
  const serviceName = location.state?.serviceName;

  const [HealthCare_Categories, setHealthCareCategories] = useState([]);
  const [MSME_Categories, setMSMECategories] = useState([]);
  const [loginPortal, setLoginPortal] = useState(false);
  const [CustomerInfoForm, setCustomerInfoForm] = useState(false);
  const [isChangeClass, setIsChangeClass] = useState(true);
  const [isOpenArrow, setIsOpenArrow] = useState("")
  const [isActiveTab, setIsActiveTab] = useState("Home")
  const [isGrowSearch, setIsGrowSearch] = useState(false);
  const [isMenu, setIsMenu] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isShowShop, setIsShowShop] = useState(false);
  const [isService, setService] = useState(false);
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [logactive, setlogactive] = useState(false);
  const [keywords, setkeywords] = useState('Buy Used MSME and Healtcare Equipments, B2B Marketplace');
  const [title, settitle] = useState('origa.market');
  const [isFunctionCalled, setisFunctionCalled] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const formSubmitted = localStorage.getItem('formSubmitted');
  // const [isSearchWidthHeight,setSearchWidthHeight]=useState({width:24,height:24})
  const navigate = useNavigate();
  // const width=window.innerWidth;

  const [searchInput, setSearchInput] = useState('');
  // console.log("inner width->>>",width);

  const categories = [
    "Ophthalmology",
    "CNC VMC",
    "CNC Turning Centre",
    "CNC Lathe",
    "Pathology",
    "Radiology",
    "Laundry Equipment",
    "Surface Grinder",
    "Nephrology",
    "EDM Wirecut Machine",
    "CNC WEDM",
    "Digital Printer",
    "Sanding Machine"
  ];
  const categoryObjects = categories.map(name => ({ name }));

  const fetchData = async () => {
    const healthCareCategories = categoryObjects.filter(category =>
      category.name.includes('Ophthalmology') ||
      category.name.includes('Pathology') ||
      category.name.includes('Radiology') ||
      category.name.includes('Nephrology')
    );
    const msmeCategories = categoryObjects.filter(category =>
      !healthCareCategories.some(healthcare => healthcare.name === category.name)
    );
    setHealthCareCategories(healthCareCategories);
    setMSMECategories(msmeCategories);
    setlogactive(false);
  };

  // Call the setTimeout function
  useEffect(() => {
    const formSubmitted = localStorage.getItem('formSubmitted');
    const timeoutDuration = formSubmitted === 'true' ? 90000  : 30000; // 2 mins if formSubmitted is true, else 30 sec
    const newTimerId = setTimeout(() => {
      if (!isFunctionCalled && formSubmitted !== 'true') {
        setCustomerInfoForm(true);
      } else if (formSubmitted === 'true') {
        localStorage.removeItem('formSubmitted');
      }
    }, timeoutDuration);
  
    return () => clearTimeout(newTimerId);
  }, [isFunctionCalled]);
  


  // Add event listener to the document body for mouse clicks
  document.body.addEventListener('click', (event) => {
    const element = document.getElementById('DesktopMenu');
    const target = event.target;
    if (!element.contains(target)) {
      setIsOpenArrow("");
    }
  });



  useEffect(() => {
    // console.log('pathname_____+++++++""""""', pathname);
    const pathParts = pathname.split('/');
    const numberOfSlashes = pathParts.length - 1;
    // console.log('Number of slashes:', typnumberOfSlashes);
    if (numberOfSlashes > 1) {
      setisFunctionCalled(true)
    }
    if (pathname === '/') {
      setIsActiveTab("Home")
      setIsOpenArrow("")
    }
    else if (pathname === '/buy') {
      // console.log('pathname_____+++++++""""""', pathname);
      // setIsOpenArrow("")
      setIsActiveTab("Buy Machines")
    }
    else if (pathname === '/sell') {
      setIsActiveTab("Sell Machine")
      setIsOpenArrow("")
    }
    else if (pathname === '/finance') {
      setIsActiveTab("Finance")
      setIsOpenArrow("")
    }
    else if (pathname === '/service') {
      // setIsOpenArrow("")
      setIsActiveTab("Service")
    }
    else if (pathname === '/faqs') {
      setIsActiveTab("FAQs")
      setIsOpenArrow("")
    }
    if (pathname !== '/buy' && isOpenArrow === "Buy Machines") {
      setIsOpenArrow("");
    }
    if (pathname !== '/service' && isOpenArrow === "Service") {
      setIsOpenArrow("");
    }



  }, [pathname, isActiveTab, openArrow,isFunctionCalled])


  useEffect(() => {
    const params = new URLSearchParams(search);
    const searchInput = params.get('searchInput');
    const Type = params.get('Type');
    // console.log('serviceName-------->',serviceName);
    if (pathname === '/contactus') {
      setkeywords('contactus')
      settitle("contactus")

    }
    else if (pathname === '/sell') {
      setkeywords('Sell Machine')
      settitle("Sell Machine")

    }
    else if (pathname === '/finance') {
      setkeywords('Apply Finance')
      settitle("Apply Finance")

    }
    else if (pathname === '/service') {
      setkeywords('Service Request')
      settitle("Service Request")

    }
    else if (serviceName === 'On Call Service') {
      setkeywords('Service Request for On Call Service')
      settitle("Service Request for On Call Service")

    }
    else if (serviceName === 'Preventive Maintenance') {
      setkeywords('Service Request for Preventive Maintenance')
      settitle("Service Request for Preventive Maintenance")

    }
    else if (serviceName === 'AMC') {
      setkeywords('Service Request for Annual Maintenance Contract')
      settitle("Service Request for Annual Maintenance Contract")

    }
    else if (pathname === '/faqs') {
      setkeywords('FAQS')
      settitle("FAQS")

    }
    else if (pathname === '/aboutus') {
      setkeywords('aboutus')
      settitle("aboutus")

    }
    else if (pathname === '/buy') {
      setkeywords('Buy Used MSME Equipment,Buy Used Healthcare Equipment')
      settitle("Buy Used MSME Equipment,Buy Used Healthcare Equipment")

    }
    else if (searchInput === 'MSME') {
      setkeywords('Buy Used MSME Equipment')
      settitle("Buy Used MSME Equipment")

    }
    else if (searchInput === 'HealthCare') {
      setkeywords('Buy Used Healthcare Equipment')
      settitle("Buy Used Healthcare Equipment")

    }
    else if (Type === 'Lease') {
      setkeywords('Lease Equipment')
      settitle("Lease Equipment ")

    }
    else if (Type === 'Loan') {
      setkeywords('Equipment Loan')
      settitle("Equipment Loan")

    }
    else if (pathname === '/') {
      setkeywords('Used Equipments, Shop B2B, Marketplace, Buy Used MSME Equipment, Sell Used MSME Equipment, Buy Used Healthcare Equipment, Sell Used Healthcare Equipment, Equipment Loan')
      settitle("Origa B2B Marketplace: Apply Today for an Equipment Loan and Book Service and A Trusted Platform for Buying and Selling Used MSME and Healthcare Equipment, Tools, and Spares.")

    }
    else {
      setkeywords('Buy Used MSME and Healtcare Equipments, B2B Marketplace')
      settitle("Origa B2B Marketplace: Apply Today for an Equipment Loan and Book Service and A Trusted Platform for Buying and Selling Used MSME and Healthcare Equipment, Tools, and Spares.")

    }

  }, [pathname])

  useEffect(() => {
    fetchData()
  }, []);
  const onCustomToggle1 = () => {
    setIsChangeClass(false)
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  }
  const serviceRequest_1 = () => {
    const productId = "serviceRequest";
    const serviceName = "On Call Service"
    navigate('/service/Addonservice', { state: { productId, serviceName } });
    onCustomToggle1()
    setIsOpenArrow('')
  }
  const serviceRequest_2 = () => {
    const productId = "serviceRequest";
    const serviceName = "Preventive Maintenance"
    navigate('/service/Addonservice', { state: { productId, serviceName } });
    onCustomToggle1()
    setIsOpenArrow('')
  }
  const serviceRequest_3 = () => {
    const productId = "serviceRequest";
    const serviceName = "AMC"
    navigate('/service/Addonservice', { state: { productId, serviceName } });
    // navigate('#');
    onCustomToggle1()
    setIsOpenArrow('')
  }
  const serviceData = [
    {
      imageUrl: "/asset/AMC.webp",
      title: "Annual Maintenance Contract",
      message: " An AMC offers periodical check-ups and extra care for your machine, ensuring proper functioning, and preventing expensive shutdowns with complete overhauls & maintenance.",
      navi: serviceRequest_3
    },
    {
      imageUrl: "/asset/OnCallServiceEnv.webp",
      title: "On Call breakdown Service",
      message: "Origa's on-call breakdown service ensures immediate assistance after a call, minimizing production downtime and conducting necessary repairs promptly",
      navi: serviceRequest_1
    }, {
      imageUrl: "/asset/PreventiveMaintenanceEnv.webp",
      title: "Preventive Maintenance",
      message: " Opt for preventive maintenance to sidestep major shutdowns, cut costs, and ensure sustained machine eﬃciency and reliability.",
      navi: serviceRequest_2
    }
  ]

  const onMicroPhoneText = (value) => { setSearchInput(value) }


  const onNavigate = () => { navigate(`/buy/product-listing?searchInput=${searchInput}`); }
  const handleInputChange = (event) => { setSearchInput(event.target.value); };
  const onEnterHandler = (e) => { if (e.key === 'Enter') { onNavigate(); } }


  const handleInputChange_1 = () => {
    console.log('firstname', firstName);
    if (firstName) {
      navigate('/myaccount')

    }
    else {
      setLoginPortal(true)
    }


  }
  const onOpenArrowHandler = (activeTab) => {

    setIsOpenArrow(activeTab)

  }
  const onHidePortal = () => {
    setLoginPortal(false);
  }
  const onCustomToggle = () => {
    setIsOpen(!isOpen)
    setIsChangeClass(true)
  }

  // useEffect(() => {


  // setSearchWidthHeight()
  // }, [third])

  // console.log("search is glow-->",isSea);
  // console.log('title----->', title);
  return (<>
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
    </Helmet>
    
    {loginPortal && <LoginModel onHide={onHidePortal} />}
    {CustomerInfoForm && <CustomerInfo setCustomerInfoForm={setCustomerInfoForm} />}
  
    <div className='newMenu' id="DesktopMenu">
      <div className={`menus ${isMenu ? "menu-animation" : ""}`}>
    
        <ul className='menus-ui'>
          <li className={`menus-li heading-400-16 ${isActiveTab === "Home" ? "menus-li-active" : ""}`} onClick={() => { setIsActiveTab("Home"); navigate('/') }}><span>Home</span></li>
          <li className={`menus-li heading-400-16 ${isActiveTab === "Buy Machines" ? "menus-li-active" : ""}`} onClick={() => { setIsActiveTab("Buy Machines"); navigate('/buy'); }}><span>Buy Machines</span><span onClick={() => { isOpenArrow === "Buy Machines" ? onOpenArrowHandler("") : onOpenArrowHandler('Buy Machines') }}>{isOpenArrow === "Buy Machines" ? openArrow : closeArrow}</span></li>
          <li className={`menus-li heading-400-16 ${isActiveTab === "Sell Machine" ? "menus-li-active" : ""}`} onClick={() => { setIsActiveTab("Sell Machine"); navigate('/sell') }}><span>Sell Machine</span></li>
          <li className={`menus-li heading-400-16 ${isActiveTab === "Finance" ? "menus-li-active" : ""}`} onClick={() => { setIsActiveTab("Finance"); navigate('/finance') }}><span>Finance</span></li>
          <li className={`menus-li heading-400-16 ${isActiveTab === "Service" ? "menus-li-active" : ""}`} onClick={() => { setIsActiveTab("Service"); navigate('/service') }}><span>Service</span><span onClick={() => { isOpenArrow === "Service" ? onOpenArrowHandler("") : onOpenArrowHandler('Service') }}>{isOpenArrow === "Service" ? openArrow : closeArrow}</span></li>
          {/* <li className={`menus-li heading-400-16 ${isActiveTab==="Tools" ? "menus-li-active":""}`} onClick={()=>{setIsActiveTab("Tools")}}><span>Tools Spares and Consumables</span><span onClick={()=>{isOpenArrow==="Tools" ? onOpenArrowHandler(""):onOpenArrowHandler('Tools')}}>{isOpenArrow==="Tools" ?  openArrow:closeArrow}</span></li> */}
          <li className={`menus-li heading-400-16 ${isActiveTab === "FAQs" ? "menus-li-active" : ""}`} onClick={() => { setIsActiveTab("FAQs"); navigate('/faqs') }}>FAQs</li>
        </ul>
        <div className='cust-toggel-f' onClick={onCustomToggle}><HeaderT /> </div>


      </div>
      <div className='f-logo'>
        <img className='curser-pointer w-100' src="/asset/image 6.png" alt="image6.png" ></img>
      </div>

      <div className={`closeSearch curser-pointer `}>
        <div className={` ${isGrowSearch ? "expended-search" : `${count === 1 ? "close-search" : "display-none"}`} `}>
          <NewSearch message={"Search"} microphone={true} onInputChange={handleInputChange} onEnterHandler={onEnterHandler} onNaviHandler={onNavigate} onMicro={onMicroPhoneText} onInputValue={searchInput} onCloseHandler={() => { setIsGrowSearch(!isGrowSearch); setIsMenu(true) }} />
        </div>

        <div className='phone-avatar'>
          <Phone onClick={() => navigate('/contactus')} width="21" height="21" viewBox="0 0 24 24" />
          <div onClick={handleInputChange_1}><Avatar /></div>

        </div>
        {searchIcon({ width: window.innerWidth < 992 ? 21 : 24, height: window.innerWidth < 992 ? 21 : 24, onClick: () => { setIsGrowSearch(!isGrowSearch); setIsMenu(false); setCount(1); } })}


      </div>
    </div>
    {isOpenArrow === "Finance" && <div className='shop-desktop' style={{ top: "122px" }}>


    </div>}
    {isOpenArrow === "Service" && <div className='shop-desktop' style={{ top: "122px" }}>
      <div className='shop-desktop-container'>
        <div className="max-container">
          <div className='w-100 d-flex p-r'>

            {/* {<div className="view-all-service">
              <ViewAllButton message={"View All"} callFunction={() => setIsShowImageSlider(true)} />
            </div>} */}

            {serviceData.map((item, index) => (
              <div className='service-desk-div'>
                <div className='service-menu-div curser-pointer' onClick={item.navi}>
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
    {isOpenArrow === "Buy Machines" && <div className='shop-desktop' style={{ top: "122px" }}>
      <div className='shop-desktop-container'>
        <div className="max-container">
          <div className='w-100 d-flex'>
            <div className='shop-desk-left'>
              <div className='shop-desk'>
                <NavDropdown.Item href={`/buy/product-listing?searchInput=${'HealthCare'}`}>
                  <h1 className='shop_img_text_1'>Health Care</h1>
                </NavDropdown.Item>
                {HealthCare_Categories?.map((category, index) => (
                  <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </div>
              <div className='shop-desk'>
                <NavDropdown.Item href={`/buy/product-listing?searchInput=${'MSME'}`}>
                  <h1 className='shop_img_text_1'>MSME</h1>

                </NavDropdown.Item>
                {MSME_Categories?.slice(0, 5).map((category, index) => (
                  <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </div>
              <div className='shop-desk'>
                <NavDropdown.Item>

                </NavDropdown.Item>
                <NavDropdown.Item>

                </NavDropdown.Item>
                {MSME_Categories?.slice(5).map((category, index) => (
                  <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </div>
            </div>
            <div className='shop-desk-right'>
              <div className='shop-desk-right-imgdiv curser-pointer' onClick={() => { setIsOpenArrow(''); navigate(`/buy/product-listing?searchInput=${'MSME'}`); }}>
                <img src="/asset/Header_MSME.jpg" alt="amc" className='img-fluid' />
                <p className='shop_img_text'>MSME</p>
              </div>
              <div className='shop-desk-right-imgdiv curser-pointer' onClick={() => { setIsOpenArrow(''); navigate(`/buy/product-listing?searchInput=${'HealthCare'}`); }}>
                <img src="/asset/Healthcare_BlackLayout.jpg" alt="amc" className='img-fluid' />
                <p className='shop_img_text'>Health Care</p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>}
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
          <div className='user-menu-item d-flex justify-content-between'>
            <NavLink className="navlink" to="/buy" onClick={() => { setlogactive(false); onCustomToggle1() }}>Buy Machines</NavLink>
            <svg onClick={() => setIsShowShop(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 14L10.6854 8.70711C11.1049 8.31658 11.1049 7.68342 10.6854 7.29289L5 2" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
            </svg>
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
          {/* <div className='user-menu-item d-flex justify-content-between' onClick={() => { setIsShowShop(true); fetchData(); }}>
            <div>shop</div><div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 14L10.6854 8.70711C11.1049 8.31658 11.1049 7.68342 10.6854 7.29289L5 2" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>

          </div> */}
          <div className='user-menu-item d-flex justify-content-between'>
            <NavLink className="navlink" to="/finance" onClick={() => { setlogactive(false); onCustomToggle1() }}>Finance</NavLink>
            {/* <svg onClick={() => { navigate('/finance'); onCustomToggle1() }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 14L10.6854 8.70711C11.1049 8.31658 11.1049 7.68342 10.6854 7.29289L5 2" stroke="#211E24" stroke-width="2" stroke-linecap="round" />
            </svg> */}
          </div>
          <div className='user-menu-item'>
            <NavLink className="navlink" to="/faqs" onClick={() => { setlogactive(false); onCustomToggle1() }}>FAQs</NavLink>
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
            <NavDropdown.Item href={`/buy/product-listing?searchInput=${'HealthCare'}`}>
              <h1 className='shop_img_text_1'>Health Care</h1>
            </NavDropdown.Item>
            {HealthCare_Categories?.map((category, index) => (
              <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                {category.name}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Item href={`/buy/product-listing?searchInput=${'MSME'}`}>
              <h1 className='shop_img_text_1'>MSME</h1>
            </NavDropdown.Item>
            {MSME_Categories?.map((category, index) => (
              <NavDropdown.Item key={index} href={`/buy/product-listing?searchInput=${category.name}`}>
                {category.name}
              </NavDropdown.Item>
            ))}
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

export default NewMenu