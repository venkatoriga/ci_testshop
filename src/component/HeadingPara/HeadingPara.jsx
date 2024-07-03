import React from 'react'
import './HeadingPara.css'
import { Container } from 'react-bootstrap'
const HeadingPara = ({ heading, para }) => {
  return (
    <Container className='headingpara'>
      <h1 className='h1'>{heading}</h1>
      <p className='para'>{para}</p>
    </Container>
  )
}

export default HeadingPara