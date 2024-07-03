import React from 'react'
import Button from '../Button/Button'
import AccountFooter from './AccountFooter'
import { useNavigate } from 'react-router-dom'
import Slash from '../SubComponent/Slash'
import LeftArrow from '../SubComponent/LeftArrow'
const NoAddressFound = () => {
        const navigate=useNavigate();
    const add1="Home Page"
   const add2="My Account"
const add3="Manage Address"
  return (<>
    <div className='container-fluid'>
<div className='container'>
                    <div className='row'>
                        <div className="col col-auto mg-0 pr-0"><LeftArrow/></div>
                        <div className="col col-auto mg-0 pr-0 address-color heading-400-14">{add1}</div>
                        <div className="col col-auto p-0"><Slash/></div>
<div className="col col-auto pr-0 heading-400-14 address-color">{add2}</div><div className="col col-auto p-0"><Slash/></div>
<div className="col col-auto pr-0 heading-600-14">{add3}</div>
                    </div>
            </div>
            <div className='container w-50 bg-F9F9F9 pt-5 pb-5 mt-5'>
                <div className='container w-fit pt-5 pb-5'>
                    <div className='container text-center'>
                        <img src="asset/noaddressfound.png" alt="noaddressfound.png" />
                        <h1 className='heading-600-20 mt-4'>No Address Found!</h1>
                        <p className='heading-400-14 op-80 mt-3 mb-5'>Add an Address in your Account</p>
                        <Button  message={"Add New Address"} callFunction={()=>navigate('/manageaddress')}/>
                    </div>
                </div>
            </div>
    </div>
    <AccountFooter/>
    </>
  )
}

export default NoAddressFound