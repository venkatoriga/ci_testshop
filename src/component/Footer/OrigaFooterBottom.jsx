import React from 'react'
import classes from './Footer.module.css'

import "../Footer/footer.css";
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import FooterBottom from './FooterBottom'
const OrigaFooterBottom = () => {
    // let message = 'Origa.market is operated by Origa Technologies Private Limited (CIN: U74999MH2021PTC366771 ). Origa Technologies Private Limited provides end to end equipment solutions, for MSME’s and Healthcare, from procurement and maintenance to disposal.'

    return (<>
        <section className='bs-footer-bottom'>
            <div className="container">
                <div className="row in-row">
                    <p className='copy-right'>Copyright © 2024 Origa, All Right Reserved</p>
                    <p className='privacy-policy'>Our Policies | Legal Disclaimers</p>
                    <div className='logo-box'>
                        <p>Designed by</p>
                        <img src="/yellowSlice.svg" alt="yellowSlice" className='img-fluid'/>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default OrigaFooterBottom;