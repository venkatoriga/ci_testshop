import React from 'react'
import Button from '../../../../../Button/Button'
import { useNavigate } from 'react-router-dom'
const LookingToSell = () => {
  const navigate =useNavigate()

  return (
    <div className='container-fluid lookingtobuy p-0'>
    <p className="heading-600-24-20">Find the right buyer of your 
    <br/>machine in just 2 minutes!</p>
    <Button message={'Continue'} callFunction={()=>navigate('/sell/machine-detail')}/>
    
    </div>
  )
}

export default LookingToSell