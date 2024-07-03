import React from 'react'
import {Col, Container, Row } from 'react-bootstrap'

const MachineList = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg={3}>
                        <div className='icon_lyt'>
                            <img src="asset/extended_warrenty.svg" alt="icon" />
                            <h3 className='icon-heading'>Extended Warranty</h3>
                            <p className='icon-para'>Our Machines come with one year of free Services</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='icon_lyt'>
                            <img src="asset/zero_charges.svg" alt="icon" />
                            <h3 className='icon-heading'>Zero Charges</h3>
                            <p className='icon-para'>Our Machines come with one year of free Services</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='icon_lyt'>
                            <img src="asset/professional_img.svg" alt="icon" />
                            <h3 className='icon-heading'>Professionals</h3>
                            <p className='icon-para'>Our Machines come with one year of free Services</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='icon_lyt'>
                            <img src="asset/ensure_img.svg" alt="icon" />
                            <h3 className='icon-heading'>Ensures Originality</h3>
                            <p className='icon-para'>Our Machines come with one year of free Services</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MachineList