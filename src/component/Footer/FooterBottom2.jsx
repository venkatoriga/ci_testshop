import React from 'react'
import { NavLink } from 'react-router-dom'
const FooterBottom2 = () => {
  return (
    <div  className='container-fluid' style={{ backgroundColor: "#999E51" }}>
  <div className='max-container'>
        <div className="row text-white justify-content-between align-content-center" style={{minHeight:"48px"}}>
          <div className='col col-md-4 col-7  d-flex align-items-center'><p className='heading-400-12-10 m-0'>Copyright © 2024 Origa, All Right Reserved</p></div>
          <div className='col col-md-4 col-5 d-flex justify-content-end align-items-center'>
          <p className='heading-400-14-10 hide-992 m-0'>Our Policies |<NavLink to="/legal" className='text-white'>Legal Disclaimers</NavLink> </p>
          <p className='heading-400-14-10 show-992 m-0 text-end'>Our Policies |
          <br /> 
            <NavLink to="/legal" className='text-white'>Legal Disclaimers</NavLink> </p>
          </div>
         
        </div>
        </div>
      </div>
  )
}

export default FooterBottom2