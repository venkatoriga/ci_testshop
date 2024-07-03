import React from 'react'
import Button from '../../Button/Button'
const DeliverdToSection = ({listdata}) => {
  return (
    <div className='row border rounded'>
    <div className='col col-md-12 col-12'>
        <div className='row pt-2'>
            <div className='col col-md-5 col-5'>
                <p className='heading-400-14'>Deliver to</p>
                <h3 className='heading-600-16'>{listdata.name}</h3>
            </div>
            <div className='col-md-7 col-7 text-end'>
                <Button message={listdata.btnName} />
            </div>
        </div>
        <div className='border'></div>
    </div>
    
    <div className='col col-md-11 col-12  pt-2'>
        <p className='heading-400-14 op-60'>Location</p>
        <p className='heading-400-16'>{listdata.address}</p>
    </div>

</div>
  )
}

export default DeliverdToSection