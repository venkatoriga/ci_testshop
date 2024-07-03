import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductIdSixSection = () => {
  const navigate=useNavigate();
  return (
    <div className="max-container pt-5 tablet-d-padding">
   
      <div className="container-fluid p-0 m-0 row justify-content-between align-items-center">
        <div className="col-lg-6 col-12 p-0">
          <div><img className='w-100' src="/asset/image567.png" alt='image567.png'/></div>
        </div>
        <div className="col-lg-5  col-12 p-0 pt-3">
          <div>
     
            <h2 className="heading-600-40-20 c-green pt-3">
            Speak to our Expert
            </h2>
            <p className="heading-400-16-14 op-80">
            Still have a few doubts regarding the machine? Have a word with our expert. Get a one time repair  Get a one time repairservice if your machin has broken down Still have a few doubts regarding the machine? Have a word with our expert. 
            </p>
            <button className="btn-primary1" style={{borderRadius:"12px"}} onClick={()=>navigate('/contactus')}>Get a Callback</button>
          </div>
        </div>
      </div>

  </div>
  )
}

export default ProductIdSixSection