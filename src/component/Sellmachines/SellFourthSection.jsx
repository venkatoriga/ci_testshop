import React from 'react'
import OrigaService from '../OrigaService/OrigaService'
import { Container } from 'react-bootstrap'
import SellTemp from './SellTemp'
const SellFourthSection = () => {
  return (
    <Container fluid className='d-f-cc mt-5'>
        <container ><OrigaService/></container>
        <Container >
        <h1 className='heading-600-32  mb-2'>Have any Questions?</h1>
        <p className='p-400-20 op-80 t-a-c'>Here are some of most Frequently asked questions </p>
         <Container className='pl-5 pr-5 w-75'>
         <SellTemp/>
          </Container>
      </Container>
       
    </Container>
  )
}

export default SellFourthSection