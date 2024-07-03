import React, { useState ,useEffect } from 'react'
import './Nav.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '../../SubComponent/avatar/Avatar';
import Phone from '../../SubComponent/phone/Phone';
import Cart from '../../../component/SubComponent/Cart/Cart'
import Language from '../../SubComponent/language/Language';
import { useNavigate } from 'react-router-dom';

import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginModel from '../../Authentication/LoginModel/LoginModel';
// <Language />

function Nav() {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 992);

    const [loginPortal, setLoginPortal] = useState(false);
    const navigate = useNavigate();
    const onLogoHandler=()=>navigate('/')
    const onShowPortal = () => {
        const loggedin = !!localStorage.getItem('userToken');
        if (loggedin) {
            navigate('/myaccount')
            return
        }
        else {
            setLoginPortal(true);
        }
    }
    const onHidePortal = () => {
        setLoginPortal(false);
    }
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 992);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <>
            {
                isSmallScreen === false ? <>
                    <div className="navcontainer">
                        <Container fluid className="logo">
                            <img className='curser-pointer' src="/asset/image 6.png" alt="image6.png" onClick={onLogoHandler}/>
                        </Container>
                        <div className="user">
                            <Row>
                                <Col className='nav-col typ-hidden-icon curser-pointer'>
                                <NavDropdown className='lang-a' title="En" >
                                <NavDropdown.Item >English</NavDropdown.Item>
                                <NavDropdown.Item >Hindi</NavDropdown.Item>
                            </NavDropdown>
                                </Col>

                                <Col className='nav-col typ-hidden-icon curser-pointer' onClick={() => navigate('/contactus')}><Phone  width="24" height="24" viewBox="0 0 24 24"/></Col>
                                <Col className='nav-col typ-cart-btn curser-pointer'> {/*<Cart />*/}</Col>
                                {/*<Col className='nav-col'> <NavLink to="/login"><Avatar/></NavLink></Col>*/}
                                <Col className='nav-col typ-hidden-icon curser-pointer' onClick={onShowPortal}><Avatar /></Col>
                            </Row>
                        </div>
                    </div>
                    {loginPortal && <LoginModel onHide={onHidePortal} />}
                </>
                    : null
            }

        </>

    );
}

export default Nav;