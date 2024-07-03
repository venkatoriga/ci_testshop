import React, { useState } from 'react'
import './HomePageBanner.css'
import { useNavigate } from 'react-router-dom'
// import '../../../public/asset/'
const HomePageBanner = ({ items, bannerTopSection }) => {
  const navigate = useNavigate();
  const [isMediaQR, setIsMediaQR] = useState('');
  const onShowQRCode = (value) => {
    console.log("on check->>>", value);
    setIsMediaQR(value)
  }
  console.log("check-->>media-->>", isMediaQR);
  return (
    <div className='newHomebanner'>
      <div className='max-container newbanner-main'>
        <div className={`newbanner-text `}>
          <h2 className='heading-600-28 text-white'>{bannerTopSection.title}</h2>
          <p className='heading-400-16-14 op-80' style={{ color: "#F5F5F5" }}>{bannerTopSection.para}</p>
        </div>

        <div className='banner-items'>
          <div className='banner-items-wrap'>
            {
              items.map((item) => (
                <div className='banner-item'>
                  <div className='banner-item-wrap'>
                    <div>{item.imagesrc}</div>
                    <div className='heading-500-16-14 banner-item-title'>{item.title}</div>
                    <div className='heading-400-14-12 banner-item-para op-80' style={{ paddingTop: "8px" }}>{item.para}</div>
                    <button className='f-btn mt-12' onClick={() => navigate(item.navi)}>{item.btnname}</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='social-media'>
        <div className='application-div' >
          <div className='application' onClick={() => onShowQRCode("application")}>Application</div>

          {isMediaQR === "application" && <div className='application-qr'>
            <img src='/resized_applicationQR.png' alt='/applicationQR' onClick={() => onShowQRCode("Nomedia")} />
            <div className='text-center heading-60-16-14 text-white'>Application</div>
          </div>}
        </div>
        <div className='whatsapp-div' >
          <div className='whatsapp' onClick={() => onShowQRCode("whatsapp")}>Whatsapp</div>
          {isMediaQR === "whatsapp" && <div className='whatsapp-qr'>
            <img src='/resized_whatsappQR.png' alt='/whatsappQR' onClick={() => onShowQRCode("Nomedia")} />
            <div className='text-center heading-60-16-14 text-white'>Whatsapp</div>
          </div>}
        </div>

      </div>
    </div>
  )
}

export default HomePageBanner