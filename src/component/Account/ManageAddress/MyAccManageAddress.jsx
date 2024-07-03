// MyAccManageAddress
import React, {useState} from 'react'
import MALeftsection from './MALeftsection';
import { TextField } from '@mui/material';
import Button from '../../Button/Button';
import ButtonOutline from '../../Button/ButtonOutline';
import { useNavigate } from 'react-router-dom';
import AccountFooter from '../AccountFooter';
const MyAccManageAddress = () => {
    const [email, setEmail] = useState('');
    const [firstname, setfirstname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [alterPhoneNumber, setAlterPhoneNumber] = useState('');
    const [lastname, setlastname] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state,setState]=useState('');
    const [address1,setAddress1]=useState('');
    const [address2,setAddress2]=useState('');
    const [city,setCity]=useState('');
     const navigate=useNavigate();

    const onAddressOneChange = (e) => {
        setAddress1(e.target.value);
      };
      const onAddressTwoChange = (e) => {
        setAddress2(e.target.value);
      };
      const onCityChange = (e) => {
        setCity(e.target.value);
      };


    const onStateChange = (e) => {
        setState(e.target.value);
      };
    const onPinCodeChange = (e) => {
        setPinCode(e.target.value);
      };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const onFirstnameChange = (e) => {
        setfirstname(e.target.value);
      };
     const onPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
      };
      const onAlterPhoneNumberChange = (e) => {
        setAlterPhoneNumber(e.target.value);
      };

      const onLastnameChange = (e) => {
        setlastname(e.target.value);
      };
   const heading="Edit Address"
   const add1="Home Page"
   const add2="My Account"
const add3="Manage Address"
   const title1="Point of Contact Details"
   const title2="Address Details"
   const para1="Set your requirements for this project, the estimated price will be based on the project requirements"
    const para2="Grow your Business by giving it the right fuel it need . Dont worry about financing, Team Origa has you covered for that."
 return (<>
    <div className='container-fluid'>
            <div className='container'>
                    <div className='row'>
                        <div className="col col-auto mg-0 pr-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19 12H7.14L10.77 16.36C10.854 16.4611 10.9174 16.5778 10.9563 16.7034C10.9953 16.829 11.0091 16.961 10.997 17.0919C10.9726 17.3564 10.8442 17.6003 10.64 17.77C10.4358 17.9397 10.1725 18.0214 9.90808 17.997C9.64365 17.9726 9.39974 17.8442 9.23 17.64L4.23 11.64C4.19636 11.5923 4.16628 11.5421 4.14 11.49C4.14 11.44 4.09 11.41 4.07 11.36C4.02467 11.2453 4.00094 11.1233 4 11C4.00094 10.8767 4.02467 10.7547 4.07 10.64C4.07 10.59 4.12 10.56 4.14 10.51C4.16628 10.4579 4.19636 10.4077 4.23 10.36L9.23 4.36C9.32402 4.24712 9.44176 4.15634 9.57485 4.09412C9.70793 4.0319 9.85309 3.99976 10 4C10.2337 3.99955 10.4601 4.08092 10.64 4.23C10.7413 4.31395 10.825 4.41705 10.8863 4.5334C10.9477 4.64975 10.9855 4.77705 10.9975 4.90803C11.0096 5.03901 10.9957 5.17108 10.9567 5.29668C10.9176 5.42229 10.8542 5.53895 10.77 5.64L7.14 10H19C19.2652 10 19.5196 10.1054 19.7071 10.2929C19.8946 10.4804 20 10.7348 20 11C20 11.2652 19.8946 11.5196 19.7071 11.7071C19.5196 11.8946 19.2652 12 19 12Z" fill="#211E24"/>
</svg></div>
                        <div className="col col-auto mg-0 pr-0 address-color heading-400-14">{add1}</div>
                        <div className="col col-auto p-0"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
  <path d="M5.5 0.5L1 10.5" stroke="#211E24" stroke-linecap="round"/>
</svg></div>
<div className="col col-auto pr-0 heading-400-14 address-color">{add2}</div><div className="col col-auto p-0"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
  <path d="M5.5 0.5L1 10.5" stroke="#211E24" stroke-linecap="round"/>
</svg></div>
<div className="col col-auto pr-0 heading-400-14 address-color">{add3}</div><div className="col col-auto p-0"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
  <path d="M5.5 0.5L1 10.5" stroke="#211E24" stroke-linecap="round"/>
</svg></div>
<div className="col col-auto pr-0 heading-600-14">{heading}</div>
                    </div>
            </div>
            <div className='container p-5'>
                <div className='container'>
                    <div className='row bg-F9F9F9'>
                        <div className='col col-md-1 bg-white'> </div>
                        <div className='col col-md-1'> </div>
                        <div className='col'> 
                            <div className='container pt-5'>
                            <div className='row'>
                                <div className='col heading-600-24'>{heading}</div>
                            </div>
                                <div className='row pt-4'>
                                        <div className='col col-md-5'>
                                            <MALeftsection heading={title1} para={para1}/>
                                        </div>
                                        <div className='col col-md-7'>
                                        <div className='row '>
                                                <div className='col col-md-6 col-sm-12 mt-4'>
                                                <TextField fullWidth label="First Name *" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange} />
                                                </div>
                                                <div className='col col-md-6 col-sm-12 mt-4'>
                                                <TextField fullWidth label="Last Name *" id="Last-Name" size='small' value={lastname} onChange={onLastnameChange} />
                                                </div>
                                            </div>
                                            <div className='col col-12 mt-4 p-0'>
                                            <TextField type='email' fullWidth label="Email Id *" size='small' id="email" value={email} onChange={onEmailChange} />
                                            </div>

                                            <div className='row '>
                                                <div className='col col-md-6 col-sm-12 mt-4'>
                                                <TextField fullWidth label="Phone No *" id="Phone-No" size='small' value={phoneNumber} onChange={onPhoneNumberChange} />
                                                </div>
                                                <div className='col col-md-6 col-sm-12 mt-4'>
                                                <TextField fullWidth label="Alternative Phone No" id="Alternative-PhoneNo" size='small' value={alterPhoneNumber} onChange={onAlterPhoneNumberChange} />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                {/* second section */}
                                <div className='row pt-4'>
                                        <div className='col col-md-5'>
                                            <MALeftsection heading={title2} para={para2}/>
                                        </div>
                                        <div className='col col-md-7'>
                                            <div className='row'>
                                    
                                            <div className='col col-12 mt-4 p-0'>
                                            <TextField type='text' fullWidth label="Pin code *" size='small' id="pincode" value={pinCode} onChange={onPinCodeChange} />
                                            </div>
                                            <div className='col col-12 mt-4 p-0'>
                                            <TextField fullWidth label="State *" size='small' id="state" value={state} onChange={onStateChange} />
                                            </div>
                                            <div className='col col-12 mt-4 p-0'>
                                            <TextField fullWidth label="Address Line 1 *" size='small' id="email" value={address1} onChange={onAddressOneChange} />
                                            </div>
                                            <div className='col col-12 mt-4 p-0'>
                                            <TextField fullWidth label="Address Line 2" size='small' id="email" value={address2} onChange={onAddressTwoChange} />
                                            </div>
                                            <div className='col col-12 mt-4 p-0'>
                                            <TextField fullWidth label="City *" size='small' id="email" value={city} onChange={onCityChange} />
                                            </div>
                                            </div>
                                            <div className='row justify-content-end pt-4 pr-4'>
                                                <div className='col col-md-auto'><ButtonOutline message={"Cancel"}/></div>
                                                <div className='col col-md-5'><Button message={"Save Address"} callFunction={()=>navigate('/yourorder')}/></div>
                                            </div>

                                        </div>
                                </div>
                                </div>
                        </div>
                        <div className='col col-md-1 bg-white'> </div>
                    </div>
                   

                </div>
            </div>
            
        </div>
        <AccountFooter/>
        </>
  )
}

export default MyAccManageAddress
