import React ,{useState} from 'react'
import { TextField } from '@mui/material'
import Button from '../../Button/Button';
const Step3 = () => {

    const [email, setEmail] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [alterPhoneNo, setAlterPhoneNo] = useState('');

  
    const onEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const onFirstnameChange = (e) => {
        setfirstname(e.target.value);
      };
      const onLastname = (e) => {
        setlastname(e.target.value);
      };
      const onPhoneNoChange = (e) => {
        setPhoneNo(e.target.value);
      };
      const onAlterPhoneNoChange = (e) => {
        setAlterPhoneNo(e.target.value);
      };

  return (
    <div className='container'>
    <div className='row pt-5  mt-5'>
    <div className='col col-lg-4 col-12'>
    
        <h1 className='heading-600-16'>Point of Contact Details</h1>
        <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
        
    </div>
   
    <div className='col col-lg-8'>
    <div className='row'>
    
        <div className='col col-lg-6'>
        <TextField fullWidth label="First Name *" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange}/>
        </div>
        <div className='col col-lg-6'>
        <TextField fullWidth label="Last Name *" size='small' id="last-name" value={lastname} onChange={onLastname}/>
        </div>
    </div>
      
<div className='row pt-5'>
<div className='col'>  <TextField type='email' fullWidth label="Email Id *" size='small' id="email" value={email} onChange={onEmailChange} /></div>
</div>

    <div className='row pt-5'> 
    <div className='col col-lg-6'>
    <TextField fullWidth label="Phone No *" id="phoneNo" size='small' value={phoneNo} onChange={onPhoneNoChange}/>
    </div>
    <div className='col col-lg-6'>
    <TextField fullWidth label="Alternative Phone No" size='small' id="alterPhoneNo" value={alterPhoneNo} onChange={onAlterPhoneNoChange}/>
    </div>
    </div>
           <div className='pt-5 d-flex justify-content-end'>
           <Button message={"Submit"}/> 
           </div>
    </div>
    </div>
    </div>
  )
}

export default Step3