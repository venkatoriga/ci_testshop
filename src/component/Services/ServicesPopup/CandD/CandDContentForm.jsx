//  LogisticsContentForm
import React,{useState} from 'react'
import { Container,Row,Col } from 'react-bootstrap';

import { TextField } from '@mui/material';
import Button from '../../../Button/Button';
const CandDContentForm = () => {
    const [email, setEmail] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [alterPhoneNumber, setAlterPhoneNumber]=useState('');
  
  
    const onEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const onFirstnameChange = (e) => {
      setfirstname(e.target.value);
    };
    const onLastname = (e) => {
      setlastname(e.target.value);
    };
    const onPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
      };
      const onAlterPhoneNumberChange = (e) => {
        setAlterPhoneNumber(e.target.value);
      };
  return (
    <Container className='pl-5'>
    <Row>
    <Col className="col-md-6"> <TextField fullWidth label="First Name *" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange} /></Col>
    <Col className="col-md-6"><TextField fullWidth label="Last Name *" id="Last-Name" size='small' value={lastname} onChange={onLastname} /></Col>
    </Row>
    <Row className='mt-4'>
    <Col> <TextField type='email' fullWidth label="Email Id *" size='small' id="email" value={email} onChange={onEmailChange} /></Col>
    </Row>
    <Row className='mt-4'>
    <Col className="col-md-6"> <TextField fullWidth label="Phone No *" id="PhoneNo" size='small' value={phoneNumber} onChange={onPhoneNumberChange} /></Col>
    <Col className="col-md-6"><TextField fullWidth label="Alternative Phone No" id="Alternative-Phone-No" size='small' value={alterPhoneNumber} onChange={onAlterPhoneNumberChange} /></Col>
    </Row>
    <Container className='d-f-l mt-5 pt-5 mb-5'>
        <Button message={"Submit"}/>
    </Container>
    </Container>
  )
}

export default CandDContentForm