import React, { useState,useEffect} from 'react'
import { Row } from 'react-bootstrap'
// import { TextField } from '@mui/material';
import Button from '../Button/Button';
// import axios from 'axios';
import SuccessPopup from '../SubComponent/AllBlock/SuccessPopup';
import { gql } from 'graphql-tag';
import client from '../Services/ServicesPopup/apolloclient';
const CREATE_CONTACT_US = gql`
  mutation CreateConatctUs($contactusinput: ContactUsInput!) {
    createContactUs(contactusinput: $contactusinput) {
      contactus {
        id
        firstname
        lastname
        emailid
        reasonId {
          id
          reasonTitle
          reasonDescription
        }
        queryDescription
      }
      message
      success
    }
  }
`;

const SevenSection = () => {
    const [email, setEmail] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [description,setDescription]=useState('');
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 992);
 const [validation,setvalidaion]=useState({fvalidation:false,lvalidation:false,evalidation:false});
 const [showModel,setShowModel]=useState(false);
 const onHide=()=>{
  setShowModel(false)
 }  
 const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onFirstnameChange = (e) => {

      const newInputString = e.target.value;
      const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');
  
      // Update the state only if the input is empty or contains valid characters
      if (newInputString === '' || sanitizedInput === newInputString) {
        setfirstname(sanitizedInput);
      }
       
    };
    const onLastname = (e) => {

      const newInputString = e.target.value;
      const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');
  
      // Update the state only if the input is empty or contains valid characters
      if (newInputString === '' || sanitizedInput === newInputString) {
        setlastname(sanitizedInput);
      }

    };
    const onDescriptionChange=(e)=>{
        setDescription(e.target.value);
    }
    

const onSubmitHandler=async()=>{
  if( firstname==="" || lastname==="" ){
   if(firstname===""){
    setvalidaion(prev=>({...prev,
      fvalidation:true}));
   }

      if( lastname===""){
        setvalidaion(prev=>({...prev,
          lvalidation:true}));
       
      }
    return;
  }

  if(email){
    if( email.length<8 ){
      setvalidaion(prev=>({...prev,
        evalidation:true}));
return;     
    }else{
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailPattern.test(email);
  
    setvalidaion(prev=>({...prev,
      evalidation:!isValid}));
      if(isValid===false)return
  }
  
      }
    try {
      const { data } = await client.mutate({
        mutation:CREATE_CONTACT_US ,
        variables: { contactusinput: {
                  firstname: firstname,
                  lastname: lastname,
                  emailid: email,
                  reasonid: 1,
                  queryDescription: description
                }
        }
      });
   console.log("API Response==>",data);
   if(data){    //you can modife validation condition according to you
    setShowModel(true)
    setfirstname("")
    setlastname("")
    setEmail("")
    setDescription("")
   }
  
    } catch (error) {
      console.error('API Error==>', error.message);
  
    }
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
}, [])

    
    return (
    <>
    {showModel ? <SuccessPopup onHide={onHide} message={"Thanks for Contact Us"}/>:null }
               <section className="container-fluid my-5 liner-background-contactUs ">
                <div className='max-container'>
                    <Row className='align-items-center justify-content-between'>
                        <div className='col col-lg-5 d-flex align-items-center'>
                           <div className='p-0 m-0'>
                            <h1 className='heading-600-44-24 pt-3'>Contact us </h1>
                            <p className='heading-400-16-14 op-80'>Still have some questions? Leave your contact details and our experts will get in touch with you.</p>
                           </div>
                        </div>
                        <div className={`col col-lg-5 col-12 pt-5`}>

                                    <div className=" row d-flex container-fluid p-0 m-0 justify-content-between">
                                        <div className={`col col-md-6 col-12 ${isSmallScreen ? "":"pl-0"}`}>
                                           
                                        {/* <TextField fullWidth label={<>First Name <span style={{ color: '#CB1923' }}>*</span></>} size='small' id="first-name"
                                        value={firstname}
                                        onChange={onFirstnameChange}/> */}
                                            <div className={`bi-form-group ${validation.fvalidation ? "error-red":""}`}>
                                                <input type="text" name="name" id="name" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red":""}`} placeholder="Name"  value={firstname}
                                        onChange={onFirstnameChange} onClick={()=>setvalidaion(prev=>({...prev,fvalidation:false}))}/>
                                                <label htmlFor="name" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                                            </div>
                                        </div>
                                        <div className={`col col-md-6 col-12 ${isSmallScreen ? "":"pr-0"}`}>
                                            
                                        <div className={`bi-form-group ${validation.lvalidation ? "error-red":""}`}>
                                                <input type="text" name="name" id="lastname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red":""}`} placeholder="Last"    value={lastname}
                                        onChange={onLastname} onClick={()=>setvalidaion(prev=>({...prev,lvalidation:false}))}/>
                                                <label htmlFor="name" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                                            
                                        </div>
                                        {/* <TextField fullWidth label={<>Last Name <span style={{ color: '#CB1923' }}>*</span></>}  size='small' id="last-name"
                                        value={lastname}
                                        onChange={onLastname} /> */}
                                           
                                        </div>
                                        <div className={`col col-12  ${isSmallScreen ? "":"p-0"} `}>
                                        {/* <TextField fullWidth label={<>Enter Email  <span style={{ color: '#CB1923' }}>*</span></>} size='small' id="email"
                                        value={email}
                                        onChange={onEmailChange} /> */}
                                        <div className={`bi-form-group ${validation.evalidation ? "error-red":""}`}>
                                                <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.evalidation ? "error-red":""}`} placeholder="Email" value={email}
                                        onChange={onEmailChange} onClick={()=>setvalidaion(prev=>({...prev,evalidation:false}))}/>
                                                <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>
                                            </div>
                                        </div>

                                        <div className={`col col-12  ${isSmallScreen ? "":"p-0"}  mb-4`}>
                                        <div className="bi-form-group">
                                            <textarea class="bi-form-field bg-white" rows={3} placeholder="Enter your request or concerns" id="floatingTextarea" value={description} onChange={onDescriptionChange}></textarea>
                                            <label htmlFor="email" className="heading-400-14-12 bi-form-label">Enter your request or concerns</label>
                                            </div>
                                        </div>
                                        <div className={`d-f-l mb-4  ${isSmallScreen ? "":"p-0"} `}>
                                        <Button message="Submit" callFunction={onSubmitHandler}/>
                                        </div>
                                    </div>
                          
                        </div>
                    </Row>
                    <div className='p-r p-0 d-flex justify-content-end'>
                    <img className='p-a pt-2 right-0' src='/asset/Frame1000004018.png' alt='Frame1000004018.png'/>
                </div>
                </div>
                
            </section>
            
           </>
    )
}

export default SevenSection