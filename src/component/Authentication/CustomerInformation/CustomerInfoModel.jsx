import React from 'react'
import ReactDOM from 'react-dom'
import CustomerInfoModelPage from './CustomerInfoModelPage';
const CustomerInfo = ({setCustomerInfoForm}) => {
    const portalAddress=document.getElementById('Overlay');
  return (
    ReactDOM.createPortal(<CustomerInfoModelPage setCustomerInfoForm={setCustomerInfoForm}/>,portalAddress)
  )
}

export default CustomerInfo