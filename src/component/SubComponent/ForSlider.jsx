import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import { TextField } from '@mui/material'
import ViewAllButton from '../Button/ViewAllButton'
import ImageSlider from '../Buying/Modals/ImageSlider'
import { useNavigate,useLocation  } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const ForSlider = ({ imageurl, bannerImage, headingLeft, paraLeft, headingRight, paraRight, buttonLeft, inputLeft, btnfunction, viewall, microtrue, onMicro, dropdown }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 992);
  const navigate=useNavigate();
  const location = useLocation();
  const [BtnName, setBtnName] = useState("")
  //console.log('Current URL:', location.pathname);
  useEffect(() => {
    // This useEffect will run whenever the location changes
    if (location.pathname === '/service') {
      setBtnName('Book Now');
    } else {
      setBtnName('Buy Now');
    }
  }, [location.pathname]); 
  const [searchText, setSearchText] = useState(""); // State to hold the TextField value
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropdownValue, setDropDownValue] = useState("")
 
  // const {transcript}=useSpeechRecognition();
  const sliderImage = [{ product: bannerImage, name: "prduct1" }, { product: bannerImage, name: "prduct2" }, { product: bannerImage, name: "prduct3" }]
  const onMouseEnterhandler = () => {
    setIsHovered(true);
  };
  const onMouseLeavehandler = () => {
    setIsHovered(false);
  };

  const handleModal = (status) => {
    if (status) {
      setShowModal(status);
    } else {
      setShowModal(false);
    }
  }

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleButtonClick = () => {
    // Call btnfunction with the entered value when the button is clicked
    btnfunction(searchText);
  };
  const handleNavigation = () => {
    if (location.pathname === '/service') {
      const productId = "serviceRequest";
      const serviceName = "On Call Service"
      navigate('/service/Addonservice', { state: { productId, serviceName } });
    }
    else{
      navigate(`/buy/product-listing?searchInput=${''}`);
    }
  };
  // microphone
  // const startListening = () => {
  //   SpeechRecognition.startListening();

  // };

  // const stopListening = () => {
  //   SpeechRecognition.stopListening();
  // };
  const onDropDownValue = (e) => {
    setDropDownValue(e)
    dropdown(e)
  }
  return (
    <div className={`pb-5 p-r ${isSmallScreen ? "" : "pt-3"}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
      <div className="p-1">
        {showModal && (
          <ImageSlider modalAction={handleModal} sliderImage={sliderImage} />
        )}
      </div>
      <div className="p-s-center">
        {(viewall && isHovered) && <div className="viewAllCenter">
          <ViewAllButton message={BtnName} callFunction={handleNavigation} />
        </div>}
      </div>
      <div className={`row pb-5 ${isSmallScreen ? "" : "pt-5"}`}>
        <div className={`col col-lg-7 col-12  ${isSmallScreen ? "" : "pt-5"}`}>
          <div className="row d-flex flex-column">

            <div className="col col-lg-7 col-12 pt-4 pr-2">
              <h1 className="heading-600-44-24">{headingLeft}</h1>
            </div>
            <div className="col col-lg-7 col-10 pt-4 ">
              <p className='heading-400-20-14 op-80'>{paraLeft}</p>
            </div>
            {inputLeft && <>
              <div className='col col-lg-7'>


                <div className={`bi-form-group `}>
                  <input type="text" name="machine-add2" id="machine-add2" className={`bi-form-field bg-white`} value={searchText} onChange={handleInputChange} placeholder="Address Line 2" />
                  <label htmlFor="machine-add2" className="heading-400-14-12 bi-form-label">{inputLeft}</label>

                </div>
                {/*microtrue && <div className="p-r w-100" >
<div className='p-a right-0 pr-1' style={{top:"-34px"}}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 16.25C9.38 16.25 7.25 14.12 7.25 11.5V6C7.25 3.38 9.38 1.25 12 1.25C14.62 1.25 16.75 3.38 16.75 6V11.5C16.75 14.12 14.62 16.25 12 16.25ZM12 2.75C10.21 2.75 8.75 4.21 8.75 6V11.5C8.75 13.29 10.21 14.75 12 14.75C13.79 14.75 15.25 13.29 15.25 11.5V6C15.25 4.21 13.79 2.75 12 2.75Z" fill="#211E24" />
  <path d="M12.0001 19.75C7.3701 19.75 3.6001 15.98 3.6001 11.35V9.64999C3.6001 9.23999 3.9401 8.89999 4.3501 8.89999C4.7601 8.89999 5.1001 9.23999 5.1001 9.64999V11.35C5.1001 15.15 8.2001 18.25 12.0001 18.25C15.8001 18.25 18.9001 15.15 18.9001 11.35V9.64999C18.9001 9.23999 19.2401 8.89999 19.6501 8.89999C20.0601 8.89999 20.4001 9.23999 20.4001 9.64999V11.35C20.4001 15.98 16.6301 19.75 12.0001 19.75Z" fill="#211E24" />
  <path d="M13.3901 7.18001C13.3101 7.18001 13.2201 7.17001 13.1301 7.14001C12.4001 6.87001 11.6001 6.87001 10.8701 7.14001C10.4801 7.28001 10.0501 7.08001 9.91012 6.69001C9.77012 6.30001 9.97012 5.87001 10.3601 5.73001C11.4201 5.35001 12.5901 5.35001 13.6501 5.73001C14.0401 5.87001 14.2401 6.30001 14.1001 6.69001C13.9801 6.99001 13.6901 7.18001 13.3901 7.18001Z" fill="#211E24" />
  <path d="M12.8001 9.30001C12.7301 9.30001 12.6701 9.29001 12.6001 9.27001C12.2001 9.16001 11.7901 9.16001 11.3901 9.27001C10.9901 9.38001 10.5801 9.14001 10.4701 8.74001C10.3601 8.35001 10.6001 7.94001 11.0001 7.83001C11.6501 7.65001 12.3501 7.65001 13.0001 7.83001C13.4001 7.94001 13.6401 8.35001 13.5301 8.75001C13.4401 9.08001 13.1301 9.30001 12.8001 9.30001Z" fill="#211E24" />
  <path d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V19C11.25 18.59 11.59 18.25 12 18.25C12.41 18.25 12.75 18.59 12.75 19V22C12.75 22.41 12.41 22.75 12 22.75Z" fill="#211E24" />
</svg>
</div>
</div>*/}
              </div>

            </>
            }
            {dropdown &&
              <div className='col col-lg-7'>
                <div className='dropdown-width'>
                  {/* <div className={`bi-form-group `}>

                    <select className={`bi-form-field bi-select-dropdown ${dropdownValue ? "" : "empty"}`} placeholder="machine-name" onChange={(e) => onDropDownValue(e.target.value)} autoCapitalize='off' >

                      <option value=""></option>
                      <option value="VMC">VMC</option>
                      <option value="CNC">CNC</option>
                      <option value="AMC">AMC</option>

                    </select>
                    <label className="heading-400-14-12 bi-form-label">Which machine are you looking for?</label>

                  </div> */}
                </div>
              </div>
            }
            {buttonLeft && <div className={`col col-lg-7  ${isSmallScreen ? "d-flex justify-content-end pt-3" : "pt-5"}`}><Button message={buttonLeft} callFunction={handleButtonClick} /></div>}
          </div>
        </div>
        <div className="col col-lg-5 col-12 d-flex align-items-center">
          <div className="row text-end justify-content-end">
            <div className='col col-12 '>
              <div className='banner-image-div'>
                <img className='banner-image' src={bannerImage} alt={bannerImage} />

              </div>
            </div>
            <div className='col col-12'>
              <p className='heading-600-20-16'>{headingRight}</p>
            </div>
            <div className='col col-md-12 col-12 '>
              <p className='heading-400-16-12 op-80 text-end'>{paraRight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForSlider