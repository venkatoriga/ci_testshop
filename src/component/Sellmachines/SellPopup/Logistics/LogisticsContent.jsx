import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import LogisticsContentForm from './LogisticsContentForm';
const LogisticsContent = () => {
    const heading="Logistics";
    const para="Unlock unbeatable value and unleash your potential with high-quality used machines - your smart solution for affordable and reliable equipment!"
    const heading1="Point of Contact Details";
    const para1="Set your requirements for this project, the estimated price will be based on the project requirements"
    return (
   <Container>
    <Container className='ml-5 mr-5 bg-gray pt-4 mb-5'>
        <Container className='mt-5'>
            <h1 className='heading-600-24'>{heading}</h1>
           <Row className='mt-4'>
           <Col className="col-md-9">
           <p className='heading-400-14 op-60'>{para} </p>
           </Col>
           </Row>
        </Container>
        <Container className='mt-5'>
           <Row>
            <Col className='col-md-4'>
            <h1 className='heading-600-16'>{heading1}</h1>
            <p className='heading-400-14 op-60'>{para1} </p>
            </Col>
            <Col className='col-md-8'>
            <LogisticsContentForm/>
            </Col>
           </Row>
        </Container>
    </Container>
   </Container>
  )
}

export default LogisticsContent 