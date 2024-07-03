import React, { useState } from 'react';
import './Form.css'
import { Container } from 'react-bootstrap'
import Button from '../Button/Button';
import Textarea from '@mui/joy/Textarea';
import { gql } from 'graphql-tag';
import client from '../Services/ServicesPopup/apolloclient';
import SuccessPopup from '../SubComponent/AllBlock/SuccessPopup';
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

function ContactForm() {
  const [email, setEmail] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [description,setDescription]=useState('');
  const [phonenumber,setPhonenumber]=useState('');
const [reason,setReason]=useState(null);
const [validation,setvalidaion]=useState({fvalidation:false,lvalidation:false,evalidation:false,pvalidation:false,rvalidation:false});
const [showModel,setShowModel]=useState(false);
// const id=localStorage.getItem('id')
// console.log("id===>>>",id);
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onHide=()=>{
    setShowModel(false)
   } 
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
const onReasoneChange=(e)=>{
  setReason(e)
}
const onPhonenumber = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setPhonenumber(sanitizedInput);
    }
  };
 


const onSubmitHandler = async () => {

  if( firstname==="" || lastname===""|| reason === null){
    if(firstname===""){
     setvalidaion(prev=>({...prev,
       fvalidation:true}));
    }
 
       if( lastname===""){
         setvalidaion(prev=>({...prev,
           lvalidation:true}));
        
       }
       if( reason === null){
        setvalidaion(prev=>({...prev,
          rvalidation:true}));
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

  if( phonenumber){
    if( phonenumber.length!=10 ){
      setvalidaion(prev=>({...prev,
        pvalidation:true}));
      return;     
    }
   }else{
    if(phonenumber==""){
     setvalidaion(prev=>({...prev,
       pvalidation:true}));
     return;
    }
   }
  try {
    const { data } = await client.mutate({
      mutation:CREATE_CONTACT_US ,
      variables: { contactusinput: {
                firstname: firstname,
                lastname: lastname,
                emailid: email,
                reasonid: parseInt(reason),
                queryDescription: description,
                phonenumber: phonenumber
              }
      }
    });
 console.log("API Response==>",data);
 if(data){    //you can modife validation condition according to you
  setShowModel(true)
  setfirstname("")
  setlastname("")
  setEmail("")
  // setReason('')
  setDescription("")
  setPhonenumber("")
 }




  } catch (error) {
    console.error('API Error==>', error.message);

  }
 
};
  return (

    <>
        {showModel ? <SuccessPopup onHide={onHide} message={"Thanks for Contact Us"}/>:null }
      <div className="container contactContainer bg-white border border-grey border-1 ms-5" style={{ boxShadow: " 0px 2px 6px 0px rgba(0, 0, 0, 0.12)" }}>
        <div>
          <h1 className='heading-600-24-16'>Reach Out to Us</h1>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="">
              {/* <TextField fullWidth label="First Name *" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange} /> */}
              <div className={`bi-form-group ${validation.fvalidation ? "error-red":""}`}>
                                                <input type="text" name="name" id="name" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red":""}`} placeholder="Name"  value={firstname}
                                        onChange={onFirstnameChange} onClick={()=>setvalidaion(prev=>({...prev,fvalidation:false}))}/>
                                                <label htmlFor="name" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                                            </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="">
            <div className={`bi-form-group ${validation.lvalidation ? "error-red":""}`}>
                                                <input type="text" name="name" id="lastname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red":""}`} placeholder="Last"    value={lastname}
                                        onChange={onLastname} onClick={()=>setvalidaion(prev=>({...prev,lvalidation:false}))}/>
                                                <label htmlFor="name" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                                            
                                        </div>
    
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
          <div className={`bi-form-group ${validation.evalidation ? "error-red":""}`}>
                                                <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.evalidation ? "error-red":""}`} placeholder="Email" value={email}
                                        onChange={onEmailChange} onClick={()=>setvalidaion(prev=>({...prev,evalidation:false}))}/>
                                                <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>                                           
                                        </div>
          <div className={`bi-form-group ${validation.pvalidation ? "error-red":""}`}>
                                                <input type="phonenumber" name="phonenumber" id="phonenumber" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red":""}`} placeholder="PhoneNumber" value={phonenumber}
                                        onChange={onPhonenumber} onClick={()=>setvalidaion(prev=>({...prev,pvalidation:false}))} maxLength={10}/>
                                                <label htmlFor="phonenumber" className="heading-400-14-12 bi-form-label">Phone  Number{<span style={{ color: '#CB1923' }}>*</span>}</label>                                           
                                        </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
            {/* <TextField  type='text' fullWidth label="select your reason to contact" size='small' id="contact-reason" value={reason} onChange={onReasoneChange}/> */}
            {/*<div className={`bi-form-group`}>
                <input type="text" name="description" id="description" className={`bi-form-field bg-white `} placeholder="select your reason to contact"
                      value={reason} onChange={onReasoneChange}/>
                                                <label htmlFor="description" className="heading-400-14-12 bi-form-label">select your reason to contact</label>                                           
  </div>*/}


      <div className={`bi-form-group ${validation.rvalidation ? "error-red":""}`}>
      <select className={`bi-form-field bi-select-dropdown ${reason ? "" : "empty"} ${reason ==="" ? "heading-400-14-12 c-gray":"heading-400-14-12" } ${validation.rvalidation ? "error-red" : ""}`}  placeholder="state" onChange={(e) => onReasoneChange(e.target.value)} autoCapitalize='off'  onClick={()=>setvalidaion((prev)=>({...prev,rvalidation:false}))}>     
          {/* <select className={`bi-form-field  ${reason !== null ? "":"empty"}`} style={{borderRadius:"4px "}} value={reason}  placeholder=""  onChange={(e) => onReasoneChange(e.target.value)} onClick={()=>setvalidaion(prev=>({...prev,rvalidation:false}))}autoCapitalize='off' > */}
          <option style={{display:"none"}} selected></option>
            <option value="1">Buy/Sell Used Healthcare Equipment</option>
            <option value="2">Buy/Sell Used Manufacturing Equipment</option>
            <option value="3">Lease or Loan </option>
            <option value="4">Service & Maintenance </option>
            <option value="5">Tools, Spares & Consumable </option>
            <option value="6">Partnership</option>
          </select>
        <label className="heading-400-14-12 bi-form-label" >Select your reason to contact{<span style={{ color: '#CB1923' }}>*</span>}</label>
         </div>
   



          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          <Textarea minRows={5}  placeholder="Leave a comment here" value={description} onChange={onDescriptionChange}/>
          
           </div>
          <Container className='d-f-l mb-4'>
            <Button message="Submit" callFunction={onSubmitHandler}/>
          </Container>
        </div>

      </div>
    </>

  );
}

export default ContactForm;
// const apiUrl = 'http://3.109.71.129:8001/graphql/';

   
// const contactUsData = {
//     query: `
//       mutation CreateConatctUs($contactusinput: ContactUsInput!) {
//         createContactUs(contactusinput: $contactusinput) {
//           contactus {
//             id
//             firstname
//             lastname
//             emailid
//             reasonId {
//               id
//               reasonTitle
//               reasonDescription
//             }
//             queryDescription
//           }
//           message
//           success
//         }
//       }
//     `,
//     variables: {
//       contactusinput: {
//         firstname: firstname,
//         lastname: lastname,
//         emailid: email,
//         reasonid: 1,
//         queryDescription: description
//       }
//     }
//   };
  