import React from 'react'
import classes from './ThirdPage.module.css'
import TopSection from './TopSection/TopSection'
import BottomSection from './BottomSection/BottomSection'
import { Container } from 'react-bootstrap'
const ThirdPage = () => {
  const topsectionData={
    heading:"Maintenance Services",
    buttonName:"Learn More",
    message:"From Machines to tools to finance everything you need in one place"
  }
  return (
    <Container fluid className={classes.maindiv}>
        <Container><TopSection heading={topsectionData.heading} buttonName={topsectionData.buttonName} message={topsectionData.message}/></Container>
        <Container fluid className={classes.thirdsectionbottom}><BottomSection/></Container>
    </Container>
  )
}

export default ThirdPage