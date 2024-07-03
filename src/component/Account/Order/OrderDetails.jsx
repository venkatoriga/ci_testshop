import React from 'react'
import BtnShipped from '../../Button/BtnShipped'
import Button from '../../Button/Button'
import { useNavigate } from 'react-router-dom'

const OrderDetails = ({order}) => {
  console.log('order---->',order);
  const navigate = useNavigate();
  return (
    <div className='container-fluid p-0 m-0 row mt-5 border border-black'>
        <div className='col col-md-4 align-self-center'>
            <img src="asset/yourorder.png" alt="yourorder.png"/>
        </div>
        <div className='col col-md-8'>
            <div className='row pt-3'>
            <div className='col d-flex align-item-center'>
                <BtnShipped message={"Ordered"}/><p className='pl-2'></p>
                </div>
            </div>
            <div className='row'>
               <div className='col heading-600-20'>
                {order?.name}
                </div>
               </div>
               <div className='row pt-2'> 
           {/* <div className='col col-md-5 heading-500-14'>
           iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire MAG Welding Machine with 1 Year Warranty
           </div> */}
        </div>
        <div className='row justify-content-between pb-3'>
          <div className='col col-lg-2 col-md-12 heading-600-18 align-self-center'>₹{order?.price}</div>
          <div className='col col-lg-4 col-md-12 text-end'><Button callFunction={() => navigate(`/amc-plans?plan_id=${order?.amc_order_id}`)}message={"View Plan details"}/></div>
        </div>
        </div>
        
    </div>
  )
}

export default OrderDetails