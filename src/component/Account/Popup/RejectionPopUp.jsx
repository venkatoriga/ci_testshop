import React from 'react'
import Button from '../../Button/Button'
import { useNavigate } from 'react-router-dom'
const RejectionPopUp = () => {
  const navigate=useNavigate();
  const onlogout=()=>{
    return
  }
  return (
    <div className='container-fluid p-fixed bg-blur hw-100 d-j-a'>
    <div className='container bg-white d-f-cc w-fit pl-5 pr-5  border-8p'>
        <div className='row justify-content-end pt-3'>
         <div className='col col-auto '>
           <img src="asset/close-fill.png" alt="close-tag" onClick={()=>navigate('#')}/>
          
          </div>
          <div className='col col-12 heading-600-20 t-a-c'>Reason for Visit Rejection</div>
         </div>
         <div className='row pt-3'>
          <img src="asset/logout.png" alt="logout.png" />
         </div>
         <div className='row pt-4'>
          <div className='col heading-400-14'>
          Unavailable on the selected dates, please schedule for a later date
          </div>
         </div>
         <div className='row pt-4 pb-5'>
          <div className='col'>
            <Button message={"Back"} callFunction={onlogout}/>
          </div>
         </div>
    </div>
</div>
  )
}

export default RejectionPopUp