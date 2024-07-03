import React from 'react'
import "../Footer/footer.css";
import { NavLink } from 'react-router-dom'
import FooterBottom from './FooterBottom'
const OrigaFooter = () => {
    // let message = 'Origa.market is operated by Origa Technologies Private Limited (CIN: U74999MH2021PTC366771 ). Origa Technologies Private Limited provides end to end equipment solutions, for MSME’s and Healthcare, from procurement and maintenance to disposal.'

    return (<>
        <section className='bs-footer'>
            <div className='container position-relative'>
            <div className='sticky-logo'>
                <img src="/footerStickyLogo.svg" alt="" />
            </div>
                <div className="row">
                    <div className='col-lg-5 col-12'>
                        <div className='foolter-logo'>
                            <img src='asset/image 6.png' alt="origamarket.png" className='img-fluid'/>
                        </div>
                        {/* <p className='footer-desc'>{message}</p> */}
                    </div>
                    <div className="col-lg-2 col-6">
                        <div className='footer-links'  >
                            <h3>Origa</h3>
                            <NavLink to="/aboutus" >
                                <p>About us</p>
                            </NavLink>
                            <NavLink to="" >
                                <p>FAQs</p>
                            </NavLink>
                            <NavLink to="" >
                            <p>Origa Network</p>
                            </NavLink>
                            <NavLink to="" >
                            <p>Partner with Us</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-lg-2 col-6">
                        <div className='footer-links'>
                            <h3>Used Machinery</h3>
                            <NavLink to="" >
                                <p>Buy</p>
                            </NavLink>
                            <NavLink to="" >
                                <p>Sell</p>
                            </NavLink>
                            <NavLink to="" >
                                <p>Service</p>
                            </NavLink>
                            <NavLink to="" >
                                <p>Store</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className='footer-links socialmedia'>
                            <h3>Contact Us:</h3>
                            <div className='mod-social-media'>
                                <img className='footer-icons' src="asset/info.svg" alt="ion_call-outline.svg" />
                                <p >info@origa.com</p>
                            </div>

                            <div className='mod-social-media'>
                            <img className='footer-icons' src="asset/ion_call-outline.svg" alt="ion_call-outline.svg" />
                                <p>+91-94305 45234</p>
                            </div>

                            <div className='mod-social-media'>
                            <img className='footer-icons' src="asset/location.svg" alt="location.svg" />
                                <p>Andheri East, Mumbai</p>
                            </div>
                            <div className="social-media-group">
                                <img className='footer-icons' src="asset/facebook.svg" alt="facebook.svg" />
                                <img className='footer-icons' src="asset/twitter.svg" alt="twitter.svg" />
                                <img className='footer-icons' src="asset/instagram.svg" alt="instagram.svg" />
                                <img className='footer-icons' src="asset/youtube.svg" alt="youtube.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterBottom/>
    </>
    )
}

export default OrigaFooter