

import React, { useState } from 'react'
import { closeIcon } from '../../../helpers/Icons';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { gql } from '@apollo/client';
import client from '../../Services/ServicesPopup/apolloclient';
const REVIEW_DROPDOWN=gql`
mutation createProductreview($requestinput: ProductReviewInput!){
  createProductreview(requestinput: $requestinput) {
    productReview {
      id
      customerId
      productId
      marketMates
      reason
      otherReason
      createdAt
      status
    }
    message
    success
  }
}
`
const  WriteReviewDropdownPopup = ({modalAction,productDetails}) => {
    const [reason, setreason] =useState('');
    const [otherReason,setOtherReason]=useState('');

const onOtherHandler=(e)=>{
  setOtherReason(e.target.value)
}
console.log(otherReason);
console.log("-==>>",productDetails);
  const onReasonHandler = (value) => {
    setreason(value);
  };

  const onSubmitHandler=async()=>{

    try {
      const { data } = await client.mutate({
        mutation:REVIEW_DROPDOWN ,
        variables:{"requestinput":{
          "customerid" :localStorage.getItem('id'),
          "productid" :productDetails?.amc_plan_id,
          "marketmates" :"Seller",
          "reason"  :reason,
          "otherreason" :otherReason
      }}
      });
   console.log("API Response==>",data);
   if(data){   
    modalAction()
   }
  
    } catch (error) {
      console.error('API Error==>', error);
  
    }
  }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction()}></div>
            <div className="inner align-items-start">
                <button onClick={() => modalAction()} className="close">{closeIcon({width:16,height:16})}</button>
                <div className='w-80 h-center'>
                <div className="heading-600-20-16">Write Review</div>
                <p className='heading-400-14-12 text-start pt-2'>let us know about the product.</p>
                <div className='p-1' style={{backgroundColor:"#F5F5F5"}}>
             <div className='row'>
             
             <div className='col col-md-4'>
             <div style={{height:"108px",width:"108px"}}>
                 <img className='w-100 h-100' src={productDetails.plan_image} alt="productImage" />
             </div>
             </div>
             <div className='col col-md-6 d-flex justify-content-start align-items-center'>
            <div className='container-fluid p-0 m-0'>
            <div className='heading-600-16-14'>{productDetails?.name}</div>
            <div className='heading-400-14 pt-2 op-50'>{productDetails?.type}</div>
            <div className='heading-400-14 pt-2 op-80'>{productDetails?.messreason}</div>
            </div>
             </div>
             </div>

                </div>

                <div className='w-100 pt-3'>
                <div className={`bi-form-group`}>
             
                 <select className={`bi-form-field  ${reason ? "":"empty"}`} value={reason}  placeholder="reason"  onChange={(e) => onReasonHandler(e.target.value)} autoCapitalize='off' >
                 <option  value=""></option> 
                 <option value="reason 1">reason 1</option>
                 <option value="reason 2">reason 2</option>
                 <option value="reason 3">reason 3</option>
                
             </select>
                 <label className="heading-400-14-12 bi-form-label op-100">Select Reason</label>
               
                 </div>

                </div>              

                <div className='pt-3 w-100'>
                <textarea type='text' placeholder='Type other reason' rows={4} className='w-100 p-3' onChange={onOtherHandler}/>
                </div>
               <div className='w-100 pt-4 d-flex justify-content-between gap-1'>
               <button type='button' className='button-outline' onClick={()=>  modalAction()}>Cancle</button>
               <button type="button" className="button" onClick={onSubmitHandler}>Continue</button>
               </div>
                </div>
            </div>
        </div>
    );
}

export default  WriteReviewDropdownPopup