import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AccountFooter = () => {
  const [isSmallScreen]=useState(window.innerWidth<=427);
  const navigate = useNavigate();
  return (
    <div className='container-fluid c-green-bottom mt-5'>
        <div className='max-container'>
            <div className='row justify-content-between heading-400-14-12 pt-3 pb-3 color-white'>
                <div className='col col-md-6 col-6'>Copyright © 2024 Origa, All Right Reserved</div>
                <div className='col col-md-6  col-6 text-end curser-pointer'onClick={() => navigate('/legal')} >Our Policies |{isSmallScreen ? <br/>:null} Legal Disclaimers</div>
            </div>
        </div>
    </div>
  )
}

export default AccountFooter