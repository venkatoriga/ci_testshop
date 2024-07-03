import React, { useState } from 'react';
import {Container ,Image } from 'react-bootstrap';
import Button from '../../Button/Button';
import { TextField } from '@mui/material';
import { secondClient, updateUserdetails } from '../../OrigaExtentionAPI/mutations';

const LoginNameEmail = ({onHide,onLoginData}) => {  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const phoneNumber = localStorage.getItem('phoneNumber');
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFirstNameChange = (e) => {
 
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setFirstName(sanitizedInput);
    }
    
   
  };
  const onLastNameChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setlastName(e.target.value);
    }
    
    
  };

  const UpdateUser = async () => {
   
if(!email.includes("@") || !email.includes(".") || email.length<4 || firstName==="" || lastName===""){
  return;
}

    try {
      const id = localStorage.getItem('id');
      const { data: updateUser } = await secondClient.mutate({
        mutation: updateUserdetails,
        variables: {
            inputusers:{
              ompuserid:id,
              firstname:firstName,
              lastname:lastName,
              useremailid:email
          }
        }
        ,
      });
      console.log("login",updateUser);
      localStorage.setItem('id',updateUser?.updateUserdetails?.userdetails?.ompUserId);
      localStorage.setItem('firstName', updateUser?.updateUserdetails?.userdetails?.firstName);
      localStorage.setItem('lastName', updateUser?.updateUserdetails?.userdetails?.lastName);
      localStorage.setItem('user', updateUser?.updateUserdetails?.userdetails?.ompUserId);
      localStorage.setItem('emailId',updateUser?.updateUserdetails?.userdetails?.userEmailId)
      onLoginData(true)
    }
    catch(error){
      console.log('error while Updating User details------->',error);
    }
  };
    
    return (
      <>
      {/*for desktop*/}
      <div className='hide-992 p-0 m-0'>
        <Container fluid className='d-j-a'>
        <div className='d-flex bg-white login-hw p-0  border-8p' >
        <div className='container-fluid p-0 m-0 row'>
        <div className='col col-lg-5 col-12 pl-0'>
          <div className='container-fluid p-0 m-0'>
          <img className='hw-100' src="/asset/LoginPageImage.png" alt="LoginPageImage" />
          </div>
        </div>

            <div className='col col-lg-7 col-12'>
                <Container >
                <div className='text-end p-3'>
            {/* <img className='curser-pointer' src="/asset/close-fill.png" onClick={(e) => { onHide(); e.stopPropagation(); }} alt="close-tag" /> */}
            </div>
                <div className='h-center w-70'>
                <div className='mg-0'>
              <div className='login-logo p-0'>
              <Image fluid src="/asset/image 6.png" />
              </div>

            </div>
                
                <h2 className='heading-600-20 mt-5'>
                 Help us know you better
                 </h2>
                 <p className='heading-400-14'>Fill these details to help us get to know you better</p>
              
                 <div className='mt-3'>
             <div className="container-fluid p-0 m-0 row justify-content-between">
             <div className="col-lg-6 col-md-5 col-12 pl-0">
        
             <TextField fullWidth label={<>First Name <span style={{ color: '#CB1923' }}>*</span></>} size='small' id="first-name"
          value={firstName}
          onChange={onFirstNameChange} />
          </div>
          <div className="col-lg-6 col-md-5 col-12 pr-0">
          <TextField fullWidth label={<>Last Name <span style={{ color: '#CB1923' }}>*</span></>}  size='small' id="last-name"
            value={lastName}
            onChange={onLastNameChange} />
            </div>
      </div>
      <div className="col-lg-12 col-12 mt-3 p-0">
        
      <TextField fullWidth label={<>Enter Email  <span style={{ color: '#CB1923' }}>*</span></>} size='small' id="email"
   value={email}
   onChange={onEmailChange} />
   </div>
                </div>

                <div className='mt-4 mb-5 text-center'><Button message={'Continue'}  callFunction={UpdateUser}  /> </div>
                </div>
                
                </Container>

                
            </div>
            </div>
        </div>
        </Container>
      </div>
{/*for mobile*/}
       <div className='show-992 p-0 m-0 hw-100 bg-white '>
       <div className='container-fluid  p-0 m-0'>
      <div className='d-flex p-0 m-0' >
        <div className='container-fluid p-0 m-0 row'>
        
<div className='col col-12 p-0'>
  <div className="container-fluid p-0 m-0 row justify-content-between">
<div className="col col-6 "> 
<div className='p-0 hw-logo'>
              <Image fluid src="/asset/image 6.png" />
    </div>
    </div>
<div className="col col-6 text-end">
<img className='curser-pointer' src="/asset/close-fill.png" onClick={(e) => { onHide(); e.stopPropagation(); }} alt="close-tag" />
</div>
  </div>
</div>
        <div className='col col-12 pl-0 pr-0'>
          <div className='container-fluid p-0 m-0 text-center'>
          <img className='img-fluid' src="/asset/loginMobileScreen.png" alt="LoginPageImage" />
          </div>
        </div>

        <div className='col col-lg-7 col-12'>
         
          <div className='p-0 m-0'>
          <h2 className='heading-600-20-16 mt-5'>
          Help us know you better
          </h2>
          <p className='heading-400-14-12 op-80'>Fill these details to help us get to know you better</p>
          </div>


          
        
          <div className='pb-3'>
          <TextField fullWidth label="First Name " size='small' id="first-name" value={firstName} onChange={onFirstNameChange} />
          </div>
          <div className='pb-3'>
         <TextField fullWidth label="Last Name " size='small' id="last-name" value={lastName} onChange={onLastNameChange} />
         </div>
         <div className='pb-3'>
         <TextField fullWidth label="Enter Email " size='small' id="email" value={email} onChange={onEmailChange} />
         </div>

         <div className='mt-4 mb-5 text-center'><Button message={'Continue'}  callFunction={UpdateUser}  /> </div>
         </div>
           
            
        
    </div>
       </div>
       </div>
       </div>
       </>
    );
};

export default LoginNameEmail;