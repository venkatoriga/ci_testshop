import React, { useState } from 'react'
import classes from './Footer.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import FooterBottom from './FooterBottom'
import Www from '../SubComponent/AllSvgs/Www'
import CallTo from '../SubComponent/AllSvgs/CallTo'
import LocationF from '../SubComponent/AllSvgs/LocationF'
const Footer = () => {
  // let message = 'Origa.market is operated by Origa Technologies Private Limited (CIN: U74999MH2021PTC366771 ). Origa Technologies Private Limited provides end to end equipment solutions, for MSME’s and Healthcare, from procurement and maintenance to disposal.'
  const [isHoverwww, setIshoverwww] = useState(false);
  const [isHoverphone, setIshoverphone] = useState(false);
  const [isLocation, setLocation] = useState(false);
  const [isfb, setfb] = useState(false)
  const [istw, settw] = useState(false)
  const [isInsta, setInsta] = useState(false)
  const [isyou, setYou] = useState(false)
  const navigate = useNavigate();
  const ADDRESS = "https://www.google.com/maps/place/Andheri+East,+Mumbai"
  const FACEBOOK = "https://www.facebook.com/origaleasefinance/"
  const INSTA = "https://www.instagram.com/"
  const LINKDLN = "https://www.linkedin.com/company/origaleasefinance/"
  const TWITTER = "https://twitter.com/origaleasing"
  const YOUTUBE = "https://www.youtube.com/channel/UCsLI09_2iPEdjWGjy9RTZ8Q"
  const MAIL = "info@origa.market"
  const PHONENO = "+91-8828099099"
  const onMailTo = () => { window.location.href = `mailto:${MAIL}` }
  const onCallTo = () => { window.location.href = `tel:${PHONENO}` }
  const onLocation = () => { window.location.href = ADDRESS }
  const onfb = () => window.open(FACEBOOK, '_blank');
  const onInsta = () => window.open(INSTA, '_blank');
  const onTwitter = () => window.open(TWITTER, '_blank');
  const onYou = () => window.open(YOUTUBE, '_blank');

  return (<>
    <div className={classes.maindiv}>
      <div className="max-container">
        <div className='container-fluid p-0 m-0 row d-flex justify-content-between'>
          <div className='col-lg-5 col-md-12 pl-0'>
            <div style={{ height: '3rem' }}><img className="h-100" src='/asset/image 6.png' alt="origamarket.png" /></div>
            <br></br>
            <div style={{ height: '3rem' }}>
              <a href="https://play.google.com/store/apps/details?id=com.origa.FieldXL" target="_blank" rel="noopener noreferrer">
                <img className="h-100" src='/asset/google-play-badge.png' alt="Get it on Google Play" />
              </a>
              <a href="https://apps.apple.com/in/app/origa-market/id6476490074" target="_blank" rel="noopener noreferrer">
                <img className="h-100" src='/asset/applestore.svg' alt="Download on the App Store" />
              </a>

            </div>
            <p className='footer-para pt-3'></p>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-6  col-6 pl-0'>
            <div className={classes.info}  >
              <h3>Origa</h3>
              <NavLink to="/aboutus" >
                <p className='p-hover heading-400-16-12 op-80'>About us</p>
              </NavLink>
              <NavLink to="/faqs" > <p className='p-hover heading-400-16-12 op-80'>FAQs</p></NavLink>
              {/*<NavLink to='/origanetwork'><p className='p-hover heading-400-16-12 op-80'>Origa Network</p></NavLink>*/}
              <p className='p-hover heading-400-16-12 op-80'>Origa Network</p>
              <NavLink to="/contactus" > <p className='p-hover heading-400-16-12 op-80'>Partner with Us</p></NavLink>
            </div>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-6 col-6'>
            <div className={classes.info}>
            <h3>Services</h3>
              <NavLink to="/buy"><p className='p-hover heading-400-16-12 op-80'>Buy Machine</p></NavLink>
              <NavLink to="/service"><p className='p-hover heading-400-16-12 op-80'>Service & Maintenance</p></NavLink>
              <NavLink to="/finance"><p className='p-hover heading-400-16-12 op-80'>Lease or Loan</p></NavLink>
              <NavLink to='/sell'><p className='p-hover heading-400-16-12 op-80'>Sell Machine</p></NavLink>
              {/* <p className='p-hover heading-400-16-12 op-80'>Store</p> */}
              {/* <p className='p-hover heading-400-16-12 op-80' onClick={() => navigate('/buy/product-listing', { state: { redirectPage: "store" } })}>Store</p> */}
            </div>
          </div>
          <div className='col-lg-auto col-md-6 col-6 pr-0 pl-0'>
            <div className={classes.info1}>
              <h3>Contact Us</h3>
              <div className='row w-100 curser-pointer' onClick={onMailTo} onMouseEnter={() => { setIshoverwww(true) }} onMouseLeave={() => { setIshoverwww(false) }}>
                <div className='col col-1 hide-576'>
                  <Www strok={isHoverwww ? "#999e51" : "none"} />
                </div>
                <div className='col pt-0' ><p className='heading-400-16-12 op-80 p-hover'>info@origa.market</p></div>
              </div>
              <div className='row w-100' onClick={onCallTo} onMouseEnter={() => { setIshoverphone(true) }} onMouseLeave={() => { setIshoverphone(false) }}>
                <div className='col col-1 hide-576' >

                  <CallTo fill={isHoverphone ? "#999e51" : "#211E24"} />
                </div>
                <div className='col '>
                  <p className='heading-400-16-12 op-80 p-hover'>+91-8828099099</p>
                </div>
              </div>

              <div className='row w-100 d-flex' onClick={onLocation} onMouseEnter={() => { setLocation(true) }} onMouseLeave={() => { setLocation(false) }}>
                <div className='col col-1 hide-576'><LocationF fill={isLocation ? "#999e51" : "#211E24"} /></div>
                <div className='col col-lg-10'><p className='heading-400-16-12 op-80 p-hover' style={{ minWidth: "176px" }}>Andheri East, Mumbai</p></div>
              </div>
              <div className={classes.socialmedialogo}>
                <div className='curser-pointer' onMouseEnter={() => setfb(true)} onMouseLeave={() => setfb(false)} onClick={onfb}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                    <path d="M5 6.02865H8.75L8.33333 7.69531H5V15.1953H3.33333V7.69531H0V6.02865H3.33333V4.46865C3.33333 2.98281 3.48833 2.44365 3.77833 1.90031C4.06251 1.36348 4.50151 0.924487 5.03833 0.640312C5.58167 0.350312 6.12083 0.195312 7.60667 0.195312C8.04167 0.195312 8.42333 0.236979 8.75 0.320312V1.86198H7.60667C6.50333 1.86198 6.1675 1.92698 5.825 2.11031C5.57167 2.24531 5.38333 2.43365 5.24833 2.68698C5.065 3.02948 5 3.36531 5 4.46865V6.02865Z" fill={isfb ? "#999e51" : "black"} />
                  </svg>
                </div>
                <div className='curser-pointer' onMouseEnter={() => settw(true)} onMouseLeave={() => settw(false)} onClick={onTwitter} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3981 0.772803C8.87299 1.38301 7.86203 2.84765 7.83229 4.49L7.83313 4.49083C7.77928 4.48343 7.72849 4.47705 7.67906 4.47084C7.32225 4.42604 7.03654 4.39017 6.18896 4.0425C4.73896 3.4475 3.30813 2.32583 1.89729 0.67833C-1.01735 7.69545 3.19506 10.4392 4.50105 11.2898C4.54191 11.3164 4.57993 11.3412 4.61479 11.3642C3.25646 12.3583 0.906458 12.6108 0.328125 12.6558C1.46312 13.8408 5.42313 14.7333 8.14646 14.19C12.1181 13.3975 16.0323 10.3008 16.0323 3.9325C16.6273 3.11666 16.7648 2.52333 17.044 1.15666C16.0916 1.73384 15.584 1.71649 15.0922 1.69968C15.0017 1.69659 14.9118 1.69352 14.8198 1.69416C13.6654 0.525626 11.9231 0.162594 10.3981 0.772803ZM9.49953 4.52094C9.52361 3.20353 10.5986 2.14822 11.9162 2.14844C13.5229 2.14844 14.3662 3.53427 14.3662 3.9326C14.3662 8.8126 11.752 11.7709 7.82036 12.5559C7.19869 12.6793 6.44953 12.7143 5.66036 12.6651L6.98703 11.6959C7.12111 11.5983 7.19803 11.4405 7.19236 11.2747C7.18668 11.1089 7.09915 10.9567 6.95869 10.8684L5.50286 9.95344C3.15869 8.47927 2.18536 6.56844 2.68369 3.8101C4.25703 5.12094 5.89703 5.90927 7.60869 6.1426L8.90953 6.31927C9.05081 6.33831 9.1935 6.29613 9.30173 6.20334C9.40996 6.11055 9.47343 5.97597 9.47619 5.83344L9.49953 4.52094Z" fill={istw ? "#999e51" : "black"} />
                  </svg>
                </div>
                <div className='curser-pointer' onMouseEnter={() => setInsta(true)} onMouseLeave={() => setInsta(false)} onClick={onInsta} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6023 0.241406C11.714 0.19974 11.4315 0.191406 9.16732 0.191406C6.90315 0.191406 6.62065 0.20224 5.73232 0.241406C4.84398 0.283073 4.24065 0.42224 3.70898 0.628906C3.15267 0.837847 2.64871 1.16577 2.23232 1.58974C1.80799 2.00584 1.48001 2.50989 1.27148 3.06641C1.06482 3.59807 0.925651 4.20141 0.883984 5.08974C0.842318 5.97807 0.833984 6.26057 0.833984 8.52474C0.833984 10.7889 0.844818 11.0714 0.883984 11.9597C0.925651 12.8472 1.06482 13.4522 1.27148 13.9831C1.48059 14.5393 1.80849 15.0432 2.23232 15.4597C2.64859 15.8839 3.15259 16.2118 3.70898 16.4206C4.24065 16.6264 4.84482 16.7664 5.73232 16.8081C6.62065 16.8497 6.90315 16.8581 9.16732 16.8581C11.4315 16.8581 11.714 16.8472 12.6023 16.8081C13.4898 16.7664 14.0948 16.6264 14.6257 16.4206C15.1817 16.2112 15.6856 15.8833 16.1023 15.4597C16.5266 15.0436 16.8545 14.5396 17.0632 13.9831C17.269 13.4514 17.409 12.8472 17.4507 11.9597C17.4923 11.0714 17.5007 10.7889 17.5007 8.52474C17.5007 6.26057 17.4898 5.97807 17.4507 5.08974C17.409 4.20224 17.269 3.59724 17.0632 3.06641C16.8539 2.51023 16.5261 2.00632 16.1023 1.58974C15.639 1.12724 15.1756 0.840573 14.6257 0.628906C14.094 0.42224 13.4898 0.283073 12.6023 0.241406ZM9.16667 1.85938C7.105 1.85938 6.76833 1.86521 5.80917 1.90771C5.15583 1.93854 4.7175 2.02604 4.31083 2.18437C3.94917 2.32437 3.68833 2.49187 3.41083 2.77021C3.15001 3.02221 2.94946 3.32986 2.82417 3.67021C2.66583 4.07854 2.57833 4.51604 2.54833 5.16854C2.505 6.08854 2.5 6.41021 2.5 8.52604C2.5 10.5877 2.50583 10.9244 2.54833 11.8835C2.57917 12.536 2.66667 12.9752 2.82417 13.381C2.96583 13.7435 3.1325 14.0044 3.40917 14.281C3.69 14.561 3.95083 14.7285 4.30917 14.8669C4.72083 15.026 5.15917 15.1144 5.80917 15.1444C6.72917 15.1877 7.05083 15.1927 9.16667 15.1927C11.2283 15.1927 11.565 15.1869 12.5242 15.1444C13.1758 15.1135 13.615 15.026 14.0217 14.8685C14.3825 14.7277 14.645 14.5602 14.9217 14.2835C15.2025 14.0027 15.37 13.7419 15.5083 13.3835C15.6667 12.9727 15.755 12.5335 15.785 11.8835C15.8283 10.9635 15.8333 10.6419 15.8333 8.52604C15.8333 6.46438 15.8275 6.12771 15.785 5.16854C15.7542 4.51687 15.6667 4.07687 15.5083 3.67021C15.3827 3.33021 15.1826 3.02268 14.9225 2.77021C14.6706 2.50925 14.3629 2.30868 14.0225 2.18354C13.6142 2.02521 13.1758 1.93771 12.5242 1.90771C11.6042 1.86437 11.2825 1.85938 9.16667 1.85938ZM13.5417 5.19271C14.117 5.19271 14.5833 4.72634 14.5833 4.15104C14.5833 3.57575 14.117 3.10938 13.5417 3.10938C12.9664 3.10938 12.5 3.57575 12.5 4.15104C12.5 4.72634 12.9664 5.19271 13.5417 5.19271ZM9.16667 4.35938C11.4679 4.35938 13.3333 6.22485 13.3333 8.52604C13.3333 10.8272 11.4679 12.6927 9.16667 12.6927C6.86548 12.6927 5 10.8272 5 8.52604C5 6.22485 6.86548 4.35938 9.16667 4.35938ZM9.16797 6.02344C7.78726 6.02344 6.66797 7.14273 6.66797 8.52344C6.66797 9.90415 7.78726 11.0234 9.16797 11.0234C10.5487 11.0234 11.668 9.90415 11.668 8.52344C11.668 7.14273 10.5487 6.02344 9.16797 6.02344Z" fill={isInsta ? "#999e51" : "black"} />
                  </svg>
                </div>
                <div className='curser-pointer' onMouseEnter={() => setYou(true)} onMouseLeave={() => setYou(false)} onClick={onYou}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1179 2.94495C17.4987 4.42995 17.4987 7.52995 17.4987 7.52995C17.4987 7.52995 17.4987 10.6299 17.1179 12.1149C16.9062 12.9358 16.287 13.5816 15.5029 13.7999C14.0787 14.1966 9.16536 14.1966 9.16536 14.1966C9.16536 14.1966 4.25453 14.1966 2.82786 13.7999C2.04036 13.5783 1.42203 12.9333 1.21286 12.1149C0.832031 10.6299 0.832031 7.52995 0.832031 7.52995C0.832031 7.52995 0.832031 4.42995 1.21286 2.94495C1.42453 2.12411 2.0437 1.47828 2.82786 1.25995C4.25453 0.863281 9.16536 0.863281 9.16536 0.863281C9.16536 0.863281 14.0787 0.863281 15.5029 1.25995C16.2904 1.48161 16.9087 2.12661 17.1179 2.94495ZM15.503 3.36042C15.4397 3.11208 15.2597 2.92458 15.0539 2.86708C14.6897 2.76458 12.9147 2.53125 9.16471 2.53125C5.41471 2.53125 3.64138 2.76458 3.27388 2.86708C3.07055 2.92375 2.89055 3.11125 2.82638 3.36042C2.73555 3.71375 2.49805 5.19458 2.49805 7.53125C2.49805 9.86792 2.73555 11.3479 2.82638 11.7029C2.88971 11.9504 3.06971 12.1379 3.27471 12.1946C3.64138 12.2979 5.41471 12.5312 9.16471 12.5312C12.9147 12.5312 14.6889 12.2979 15.0555 12.1954C15.2589 12.1388 15.4389 11.9513 15.503 11.7021C15.5939 11.3488 15.8314 9.86458 15.8314 7.53125C15.8314 5.19792 15.5939 3.71458 15.503 3.36042ZM7.49805 4.61328V10.4466L12.498 7.52995L7.49805 4.61328Z" fill={isyou ? "#999e51" : "black"} />
                  </svg>
                </div>
              </div>


            </div>
          </div>
          <div className='col col-6 for-mobile'>

            <div className='row'>
              <div className='col '>
                <div className={classes.info1}>
                  <h3>Legal</h3>
                  <p className='heading-400-16-12 op-80'>Our Policies</p>
                  <p className='heading-400-16-12 op-80' onClick={() => navigate('/legal')}>Legal Disclaimers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterBottom />
  </>
  )
}

export default Footer