import React from 'react'
import LeftArrow from '../SubComponent/LeftArrow'
import Slash from '../SubComponent/Slash'
const UpForSale = () => {
  return (
    <div className='container-fluid'>
    <div className='container'>
    <div className='row'>
        <div className="col col-auto mg-0 pr-0"><LeftArrow /></div>
        <div className="col col-auto mg-0 pr-0 op-60">Account</div>
        <div className="col col-auto p-0"><Slash /></div>
        <div className="col col-auto pr-0 heading-600-14">Your Cart</div>
        My Machines
    </div>
</div>
    </div>
  )
}

export default UpForSale