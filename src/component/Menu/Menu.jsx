import React from 'react'
import './Menu.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from '../SubComponent/Search/Search';
import { NavLink } from 'react-router-dom';
const Menu = () => {
  return (
    <Container className="menubar-container">
    <Navbar expand="lg" className="bg-body-tertiary custom-nav" >
    <div>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0  custom-nav"
          navbarScroll
        >
         <NavLink className="navlink" to="/">
          {/* <Nav.Link href="#buymachines"> */}
          Buy Machines
          {/* </Nav.Link> */}
        </NavLink>
          <NavLink className="navlink" to="sell-machines">
          {/* <Nav.Link href="#sell-machines"> */}
          Sell Machines
          {/* </Nav.Link> */}
          </NavLink>
          
          <NavDropdown title="Service" id="navbarServiceDropdown">
            <NavDropdown.Item href="#item1">item1</NavDropdown.Item>
            <NavDropdown.Item href="#item2">item2</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="item3">item3</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Shop" id="navbarShopDropdown">
            <NavDropdown.Item href="#item4">item4</NavDropdown.Item>
            <NavDropdown.Item href="#item5">item5</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#item6">item6</NavDropdown.Item>
          </NavDropdown>
          <NavLink className="navlink" to="faqs"> 
          {/* <Nav.Link href="#faqs"> */}
          FAQs
          {/* </Nav.Link> */}
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
  <Search message={"Search"} microphone={true}/>
  </Container>
  )
}

export default Menu