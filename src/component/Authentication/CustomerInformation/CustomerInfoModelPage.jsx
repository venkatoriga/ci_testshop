import React, { useState } from 'react'
import DelayedForm from '../CustomerModel/InfoPage'
import { Container } from 'react-bootstrap'; 
const CustomerInfoModelPage = ({setCustomerInfoForm}) => {

  return (
    <Container fluid className="p-fixed bg-blur hw-100 p-0 m-0 d-j-a">
    <DelayedForm setCustomerInfoForm={setCustomerInfoForm}/>
    </Container>
         
  )
}

export default CustomerInfoModelPage