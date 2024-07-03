

//use in "/annual" fourth section 
import React from 'react'
import './Finance.css'
import { useNavigate } from 'react-router-dom';
const FinanceBlock = ({ product, index }) => {
  const navigate = useNavigate();
  const handleButtonClick = (navigateTo) => {
    navigate(navigateTo);
  };
  return (
    <div className={`mb-3 finance-block`} key={index} >
      <div className='fh-160'><img className='w-100 h-100' src={product.imageurl} alt={product.imageurl} /></div>
      <div className='p-3 f-minheight'>
        <p className={`heading-600-16-14 f-title-white-line`}>{product.title}</p>

        <p className={`heading-400-14-12  f-block-message`}>{product.message}</p>
        <button className='f-btn mt-12' onClick={() => handleButtonClick(product.navigate)} >{product.btnname}</button>
      </div>
    </div>
  )
}

export default FinanceBlock