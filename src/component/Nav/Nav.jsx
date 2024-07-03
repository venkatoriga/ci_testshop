import React from 'react'
import './Nav.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '../SubComponent/avatar/Avatar';
import Phone from '../SubComponent/phone/Phone';
import Cart from '../../component/SubComponent/Cart/Cart'
import Language from '../SubComponent/language/Language';
function Nav() {
  return (
  <Container>  
    <Container fluid className="navcontainer">
      <Container fluid className="logo"> 
        <img src="/asset/image 6.png" alt="image 6.png" />
        </Container>
      <Container fluid className="user">
        <Row>
        <Col className='nav-col'><Language/></Col>
        <Col className='nav-col'><Phone/></Col> 
        <Col className='nav-col'> <Cart/></Col>
        <Col className='nav-col'><Avatar/></Col>
        </Row>
      </Container>
    </Container>
    </Container>
  );
}

export default Nav;