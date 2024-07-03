import React from 'react'
import './LookingForBuySellLeft.css'
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
const LookingForBuySellLeft = () => {
    return (
        <Container fluid className="LookingForBuySellLeft-maindiv">
            <Container fluid >
                {/* <Container className="LookingForBuySellLeft-headingdiv">
                    <NavLink to="/" className="LookingForBuySellLeft-navbar">Looking to Buy</NavLink>
                    <NavLink to="lookingtosell" className="LookingForBuySellLeft-navbar">Looking to Sell</NavLink>
                </Container> */}
                {/* <Outlet /> */}
            </Container>
        </Container>
    )
}

export default LookingForBuySellLeft