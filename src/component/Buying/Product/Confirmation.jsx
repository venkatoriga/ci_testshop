import React from "react";
import "./Confirmation.css";
import { Button, Container, Image } from 'react-bootstrap'

const Confirmation = ({setSuccessPopUp,PaymentLink}) => {
    return (
        <Container fluid className="p-fixed bg-blur hw-100 d-j-a">
            <div className='App'>
                <div className='success-login'>
                    <div className='contents'>
                        <h3 className='heading-600-28'>Confirm Payment</h3>
                        <p className='heading-400-16 op-60'>Proceed to the payment</p>
                        <div className="d-flex justify-content-between mt-3">
                            <a href={PaymentLink} rel="noreferrer" >
                                <Button variant="success" className="me-2">
                                    Pay Now
                                </Button>
                            </a>
                            <Button variant="danger" style={{ marginLeft: '8px' }} onClick={() => setSuccessPopUp(false)}>
                                Cancel
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </Container>

    );
}
export default Confirmation;