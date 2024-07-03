import React,{useState} from 'react'
import LeftArrow from '../../../SubComponent/LeftArrow'
// import { TextField } from '@mui/material'
import Button from '../../../Button/Button'
import { gql } from '@apollo/client';
import client from '../apolloclient';
import FooterBottom2 from '../../../Footer/FooterBottom2';
import { useNavigate } from 'react-router';
import SuccessPopup from '../../../SubComponent/AllBlock/SuccessPopup';
const CREATE_LOGISTICS = gql`
  mutation CreateLogistics($requestinput: LogisticsInput!) {
    createLogistics(requestinput: $requestinput) {
      logistics {
        id
        machineName
        machineMake
      }
      message
      success
    }
  }
`;
const Logistics = () => {
  const [activeStep,setActiveStep]=useState(1)
  const navigate=useNavigate();
  const [validation,setvalidaion]=useState({MNamevalidation:false,MMakevalidation:false,Mdropoffaddress1:false,Mdropoffpincode:false,Mpickupaddress1:false,Mpickuppincode:false,fvalidation :false,lvalidation:false,evalidation:false,pvalidation :false });
   const [logisticsformData, setLogistics] = useState({
    machinename: "",
    machinemake: "",
    mlength: "",
    mwidth: "",
    mheight:"",
    mweight:"" ,
    pickupaddress1: "",
    pickupaddress2: "",
    pickuppincode: "",
    dropoffaddress1: "",
    dropoffaddress2: "",
    dropoffpincode: "",
    firstname: "",
    lastname: "",
    emailid: "",
    phonenumber: "",
    alternativenumber: "",
    createdby: "SYSTEM",
    customerid: "DSgr@3512="
  });
  
  
const [showModel,setShowModel]=useState(false);
const onMachineNameChange=(e)=>setLogistics({ ...logisticsformData, machinename: e.target.value })
const onMachineMakeChange=(e)=>setLogistics({ ...logisticsformData, machinemake: e.target.value})

const onLengthChange=(e)=>setLogistics({ ...logisticsformData, mlength: e.target.value})
const onMwidthChange=(e)=>setLogistics({ ...logisticsformData, mwidth: e.target.value})
const onMheightChange=(e)=>setLogistics({ ...logisticsformData, mheight: e.target.value})    
const onMweightChange=(e)=>setLogistics({ ...logisticsformData, mweight: e.target.value})

const onPickupaddress1Change=(e)=>setLogistics({ ...logisticsformData, pickupaddress1: e.target.value})
const onPickupaddress2Change=(e)=>setLogistics({ ...logisticsformData, pickupaddress2: e.target.value})
const onPickuppincodeChange=(e)=>{
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=6) {
    setLogistics({ ...logisticsformData, pickuppincode: sanitizedInput})
  }
 }

const onDropoffaddress1Change=(e)=>setLogistics({ ...logisticsformData, dropoffaddress1: e.target.value})
const onDropoffaddress2Change=(e)=>setLogistics({ ...logisticsformData, dropoffaddress2: e.target.value})
const onDropoffpincodeChange=(e)=>{
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=6) {
    setLogistics({ ...logisticsformData, dropoffpincode: sanitizedInput})
  }
 }
  
  
  const onEmailChange = (e) =>setLogistics({...logisticsformData,emailid:e.target.value});
  const onFirstnameChange = (e) =>{
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z\s]/g, '');
  
    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      
      setLogistics({...logisticsformData,firstname:sanitizedInput});
    }
   };
  const onLastname = (e) =>{
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');
  
    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setLogistics({...logisticsformData,lastname:sanitizedInput});
    }
  };
  const onPhoneNoChange = (e) =>{
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
  
    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=10) {
      setLogistics({...logisticsformData, phonenumber:sanitizedInput})
    }
  };
  const onAlterPhoneNoChange = (e) =>{
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
  
    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=10) {
      setLogistics({...logisticsformData, alternativenumber:sanitizedInput})
    }
  };
 
  const onStepOneBtn=()=>setActiveStep(1);
  const onStepTwoBtn=()=>{
    if(logisticsformData.machinename==="" || logisticsformData.machinemake==="")
     {
       if(logisticsformData.machinename==="" ){setvalidaion(prev=>({...prev,MNamevalidation:true}))}
       if(logisticsformData.machinemake==="" ){setvalidaion(prev=>({...prev,MMakevalidation:true}))}
       return
     }
    setActiveStep(2)
  };
   const onStepThreeBtn=()=>{
    if(activeStep<2)return;
    if(logisticsformData.dropoffaddress1==="" || logisticsformData.pickupaddress1==="" ||
    logisticsformData.dropoffpincode==="" || logisticsformData.pickuppincode==="" 
    )
     {
       if(logisticsformData.dropoffaddress1===""){setvalidaion(prev=>({...prev,Mdropoffaddress1:true}))}
       if(logisticsformData.dropoffpincode==="" || logisticsformData.dropoffpincode.length!==6){setvalidaion(prev=>({...prev,Mdropoffpincode:true}))}
       if(logisticsformData.pickupaddress1===""){setvalidaion(prev=>({...prev,Mpickupaddress1:true}))}
       if(logisticsformData.pickuppincode==="" || logisticsformData.pickuppincode.length!==6){setvalidaion(prev=>({...prev,Mpickuppincode:true}))}
       return
     }
    setActiveStep(3)
  };

  const topHeading="Logistics"
  const topPara="Unlock unbeatable value and unleash your potential with high-quality used machines - your smart solution for affordable and reliable equipment!"

  const step1FormField={
    centerHeading:"Machine Details",
    centerPara:"Set your requirements for this project, the estimated price will be based on the project requirements",
   bottomHeading:"Machine Location",
   bottomPara:"Set your requirements for this project, the estimated price will be based on the project requirements",
    field1:"",
    field2:"{<>}",
    field3:"Length (in meters)",
    field4:"Width (in meters)",
    field5:"Height (in meters)",
    field6:"Weight (in kgs)"
  }
  
const onHandleSubmit=async ()=>{
  if(logisticsformData.machinename==="" || logisticsformData.machinemake==="" || logisticsformData.dropoffaddress1==="" || logisticsformData.pickupaddress1==="" ||
  logisticsformData.dropoffpincode==="" || logisticsformData.pickuppincode==="" || logisticsformData.firstname==="" ||logisticsformData.lastname==="" || logisticsformData.phonenumber==="" 
  )
   {
    if(logisticsformData.machinename==="" ){setvalidaion(prev=>({...prev,MNamevalidation:true}))}
    if(logisticsformData.machinemake==="" ){setvalidaion(prev=>({...prev,MMakevalidation:true}))}
     if(logisticsformData.dropoffaddress1===""){setvalidaion(prev=>({...prev,Mdropoffaddress1:true}))}
     if(logisticsformData.dropoffpincode==="" || logisticsformData.dropoffpincode.length!==6){setvalidaion(prev=>({...prev,Mdropoffpincode:true}))}
     if(logisticsformData.pickupaddress1===""){setvalidaion(prev=>({...prev,Mpickupaddress1:true}))}
     if(logisticsformData.pickuppincode==="" || logisticsformData.pickuppincode.length!==6){setvalidaion(prev=>({...prev,Mpickuppincode:true}))}
    if(logisticsformData.firstname==="")setvalidaion(prev=>({...prev,fvalidation:true}))
    if(logisticsformData.lastname==="")setvalidaion(prev=>({...prev,lvalidation:true}))
    if(logisticsformData.phonenumber==="" || logisticsformData.phonenumber.length!==10)setvalidaion(prev=>({...prev,pvalidation:true}))
     return
   }

   if(logisticsformData.emailid){
    if( logisticsformData.emailid.length<8 ){
      setvalidaion(prev=>({...prev,
        evalidation:true}));
return;     
    }else{
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailPattern.test(logisticsformData.emailid);
  
    setvalidaion(prev=>({...prev,
      evalidation:!isValid}));
      if(isValid===false)return
  }
  
      }
   
  try {
    const { data } = await client.mutate({
      mutation:CREATE_LOGISTICS ,
      variables: {requestinput:logisticsformData}
    });;
    console.log("API Response==>",data);
    if(data.createLogistics.success){
      setShowModel(true);
       }
  } catch (error) {
    console.error('API Error:', error.message);
   
  }

}

const onHide=()=>{
  setShowModel(false)
  window.scrollTo(0, 0);
  navigate('/service')
}
const getButtonColor1 = () => {
  if (activeStep === 1) {
    return '#73509E';
  }  else {
    return '#9B9E51';
  }
};
const getButtonColor2 = () => {
  if (activeStep === 2) {
    return '#73509E';
  } else if (activeStep < 2) {
    return '#DDDDDD';
  } else {
    return '#9B9E51';
  }
};
const getButtonColor3 = () => {
  if (activeStep === 3) {
    return '#73509E';
  } else if (activeStep < 3) {
    return '#DDDDDD';
  } else {
    return '#9B9E51';
  }
};
return (
  <>
  {showModel && <SuccessPopup message={"Request Created successfully"} onHide={onHide}/>}
  <div className='max-container'>
  <div className='pt-5'>
  {/* Stepper Top Section*/}
  <div className='max-container pb-5'>
   <div className='container row p-0 m-0'>
      <div className='col col-lg-2 col-12 pl-0'>
         <LeftArrow callFun={()=>navigate('/service')}/>
      </div>
      {/* for desktop */}
   <div className='col col-lg-10 hide-992'>
      <div className='d-flex'>

      {/* step 1 btn */}
      <div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor1()}} onClick={onStepOneBtn}>1</button>
      <p className={`${activeStep===1 ? "heading-600-16-12":"heading-400-16-12 op-60 "} v-center pl-2 pr-2`}>Machine Details</p>
      </div>
      
      {/* line */}
      { <div className=' mr-2 stepper-line v-center'></div> }
      {/* step 2 btn */}
      {<div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor2()}} onClick={onStepTwoBtn}>2</button>
      <p className={`${activeStep===2 ? "heading-600-16-12":"heading-400-16-12 op-60 "} v-center pl-2 pr-2`}>Address</p>
      </div>}

{/* line */}
<div className='mr-2 stepper-line v-center'></div>
      {/* step 3 btn*/}
      <div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor3()}} onClick={onStepThreeBtn}>3</button>
      <p className={`${activeStep===3 ? "heading-600-16-12":"heading-400-16-12 op-60 "} v-center pl-2`}>Point of Contact</p>
      </div>
      </div>
    </div>

      {/* for tablet start*/}
      <div className='Container show-992'>

<div className='row'>
{/* stepper button start*/}
  <div className='col col-12'>
    <div className="row ">
      <div className="col col-4 p-0 d-flex justify-content-end">
     
      <button className="stepperBtn" style={{backgroundColor:getButtonColor1()}} onClick={onStepOneBtn}>1</button>
       <p style={{backgroundColor:" #00000066",width:"40%",height:'2px',margin:"auto 0px" }}></p>
       </div>
      <div className="col col-4 p-0 d-flex justify-content-center"> 
      <p style={{backgroundColor:" #00000066",width:"45%",height:'2px',margin:"auto 0px" }}></p>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor2()}} onClick={onStepTwoBtn}>2</button>
      <p style={{backgroundColor:" #00000066",width:"45%",height:'2px',margin:"auto 0px" }}></p>
      </div>
      <div className="col col-4 p-0 d-flex justify-content-start">
      <p style={{backgroundColor:" #00000066",width:"40%",height:'2px',margin:"auto 0px" }}></p>
       <button className="stepperBtn" style={{backgroundColor:getButtonColor3()}} onClick={onStepThreeBtn}>3</button>
      
       </div>
    </div>
  </div>
  {/* stepper button end*/}

  {/* stepper button description start*/}
  <div className='col col-12'>
    <div className="row">
      <div className={`col-4 pt-2 p-0 ${activeStep===1 ? "heading-600-16-12 pl-2":"heading-400-16-12 op-60 pl-2"} v-center`}>Machine Details</div>
      <div className={`col-4 pt-2 text-center ${activeStep===2 ? " heading-600-16-12":" heading-400-16-12 op-60"}`}>Problems</div>
      <div className={`col-4 pt-2 p-0 text-center ${activeStep===3 ? " heading-600-16-12":" heading-400-16-12 op-60"}`}>Point of Contact </div>
    </div>
  </div>
   {/* stepper button description start*/}
</div>
</div>

      {/* for tablet end*/}
   </div>
   </div>
{/* Stepper Bottom Section*/}

<div className='stpper-container bg-gray p-5'>

{/*Form top section start*/}
<div className='row'>
<div className='col col-12'>
<h1 className='heading-600-24'>{topHeading}</h1>
</div>
<div className='col col-lg-11 col-12 pt-4'>
<p className='heading-400-14 op-60'>{topPara}</p>
</div>
</div>
{/*Form top section end*/}


{/* ---------------------------------------------Step-1 ----------------------------------*/}
{activeStep===1 ?   <div className='container p-0'>
   
{/*Form middle section start*/}
    <div className='row pt-5'>
    <div className='col col-lg-4 hide-992'>
    
        <h1 className='heading-600-16'>{step1FormField.centerHeading}</h1>
        <p className='heading-400-14 op-60'>{step1FormField.centerPara}</p>
        
    </div>

    <div className='col col-lg-8 col-12'>
    {/* <TextField type='text' fullWidth label={<>Machine Name<span style={{ color: '#CB1923' }}>*</span></>} size='small'  value={logisticsformData.machinename} onChange={onMachineNameChange}/> */}
    
    <div className={`bi-form-group ${validation.MNamevalidation ? "error-red":""}`}>
     <input type="text" name="machine-name" id="machine-name" className={`bi-form-field bg-white ${validation.MNamevalidation ? "error-red":""}`}  value={logisticsformData.machinename} onChange={onMachineNameChange} onClick={()=>setvalidaion(prev=>({...prev,MNamevalidation:false}))} placeholder="Machine Name"/>
     <label htmlFor="machine-name" className="heading-400-14-12 bi-form-label">Machine Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div>
    
    
    {/* <TextField type='text' fullWidth label={<>Machine Make<span style={{ color: '#CB1923' }}>*</span></>} size='small'  value={logisticsformData.machinemake} onChange={onMachineMakeChange}/> */}
    
        
  <div className={`bi-form-group ${validation.MMakevalidation ? "error-red":""}`}>
  <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.MMakevalidation ? "error-red":""}`}  value={logisticsformData.machinemake} onChange={onMachineMakeChange} onClick={()=>setvalidaion(prev=>({...prev,MMakevalidation:false}))} placeholder="Machine Make"/>
  <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">Machine Make{<span style={{ color: '#CB1923' }}>*</span>}</label>

</div>

    </div>
    </div>
{/*Form middle section end*/}

{/*Form bottom section start*/}
<div className='row pt-5'>
<div className="row border-top hide-992 p-0 m-0"></div>
<div className='col col-lg-4 pt-30px hide-992'>

 <h1 className='heading-600-16'>{step1FormField.bottomHeading}</h1>
 <p className='heading-400-14 op-60'>{step1FormField.bottomPara}</p>
 
</div>

<div className='col col-lg-8'>
{/* <TextField type='text' fullWidth label={step1FormField.field3} size='small' value={logisticsformData.mlength}  onChange={onLengthChange} /> */}
<div className={`bi-form-group`}>
  <input type="text" name={step1FormField.field3} id={step1FormField.field3} className={`bi-form-field bg-white`} value={logisticsformData.mlength}  onChange={onLengthChange}  placeholder={step1FormField.field3}/>
  <label htmlFor={step1FormField.field3} className="heading-400-14-12 bi-form-label">{step1FormField.field3}</label>

</div>
        
        {/* <TextField type='text' fullWidth label={step1FormField.field4} size='small' value={logisticsformData.mwidth}  onChange={onMwidthChange} /> */}
        <div className={`bi-form-group`}>
  <input type="text" name={step1FormField.field4} id={step1FormField.field4} className={`bi-form-field bg-white`}  value={logisticsformData.mwidth}  onChange={onMwidthChange}  placeholder={step1FormField.field4}/>
  <label htmlFor={step1FormField.field4} className="heading-400-14-12 bi-form-label">{step1FormField.field4}</label>

</div>

    
    {/* <TextField type='text' fullWidth label={step1FormField.field5} size='small' value={logisticsformData.mheight} onChange={onMheightChange} /> */}
    <div className={`bi-form-group`}>
  <input type="text" name={step1FormField.field5} id={step1FormField.field5} className={`bi-form-field bg-white`}  value={logisticsformData.mheight} onChange={onMheightChange}  placeholder={step1FormField.field5}/>
  <label htmlFor={step1FormField.field5} className="heading-400-14-12 bi-form-label">{step1FormField.field5}</label>

</div>

  
    {/* <TextField type='text' fullWidth label={step1FormField.field6} size='small' value={logisticsformData.mweight} onChange={onMweightChange} /> */}
    <div className={`bi-form-group`}>
  <input type="text" name={step1FormField.field6} id={step1FormField.field6} className={`bi-form-field bg-white`}  value={logisticsformData.mweight} onChange={onMweightChange}  placeholder={step1FormField.field6}/>
  <label htmlFor={step1FormField.field6} className="heading-400-14-12 bi-form-label">{step1FormField.field6}</label>

</div>
    <div className='pt-5 d-flex justify-content-end'>
    <Button message={"Submit"} callFunction={onStepTwoBtn}/> 
    </div>
</div>
</div>

{/*Form bottom section start*/}
</div>:null}

{/* --------------------------------------------step 2--------------------------------*/}
{activeStep===2 ?  <div className='container p-0'>
   
{/*Form middle section start*/}
    <div className='row pt-4'>
    <div className='col col-lg-4 pt-30px hide-992'>
    
        <h1 className='heading-600-16'>Pick up Address</h1>
        <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
        
    </div>
    <div className='col col-lg-8'>
    {/* <TextField type='text' fullWidth label={<>Address Line 1<span style={{ color: '#CB1923' }}>*</span></> } size='small' value={logisticsformData.pickupaddress1} onChange={onPickupaddress1Change} /> */}
    <div className={`bi-form-group ${validation.Mpickupaddress1 ? "error-red":""}`}>
     <input type="text" name="Mpickupaddress1" id="Mpickupaddress1" className={`bi-form-field bg-white ${validation.Mpickupaddress1 ? "error-red":""}`}   value={logisticsformData.pickupaddress1} onChange={onPickupaddress1Change} onClick={()=>setvalidaion(prev=>({...prev,Mpickupaddress1:false}))} placeholder="Address Line 1"/>
     <label htmlFor="Mpickupaddress1" className="heading-400-14-12 bi-form-label">Address Line 1{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div> 
         
            {/* <TextField type='text' fullWidth label="Address Line 2" size='small' value={logisticsformData.pickupaddress2} onChange={onPickupaddress2Change} /> */}
            <div className={`bi-form-group`}>
     <input type="text" name="Mpickupaddress2" id="Mpickupaddress2" className={`bi-form-field bg-white`}   value={logisticsformData.pickupaddress2} onChange={onPickupaddress2Change}  placeholder="Address Line 2"/>
     <label htmlFor="Mpickupaddress2" className="heading-400-14-12 bi-form-label">Address Line 2</label>
 
    </div>
    
        
        {/* <TextField type='text' fullWidth label={<>Pin Code<span style={{ color: '#CB1923' }}>*</span></> } size='small'  value={logisticsformData.pickuppincode} onChange={onPickuppincodeChange} /> */}
        <div className={`bi-form-group ${validation.Mpickuppincode ? "error-red":""}`}>
     <input type="text" name="Mpickuppincode" id="Mpickuppincode" className={`bi-form-field bg-white ${validation.Mpickuppincode ? "error-red":""}`}   value={logisticsformData.pickuppincode} onChange={onPickuppincodeChange} onClick={()=>setvalidaion(prev=>({...prev,Mpickuppincode:false}))} placeholder="Mpickuppincode"/>
     <label htmlFor="Mpickuppincode" className="heading-400-14-12 bi-form-label">Pin Code{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div>
        
    </div>
    
    </div>
{/*Form middle section end*/}

{/*Form bottom section start*/}
<div className='row pt-5'>
<div className="row border-top hide-992 p-0 m-0"></div>
<div className='col col-lg-4 pt-30px hide-992'>

 <h1 className='heading-600-16'>Drop off Address</h1>
 <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
 
</div>



<div className='col col-lg-8 col-12'>
    {/* <TextField type='text' fullWidth label={<>Address Line 1<span style={{ color: '#CB1923' }}>*</span></> } size='small' value={logisticsformData.dropoffaddress1} onChange={onDropoffaddress1Change} /> */}
    <div className={`bi-form-group ${validation.Mdropoffaddress1 ? "error-red":""}`}>
     <input type="text" name="Mdropoffaddress1" id="Mdropoffaddress1" className={`bi-form-field bg-white ${validation.Mpickupaddress1 ? "error-red":""}`}   value={logisticsformData.dropoffaddress1} onChange={onDropoffaddress1Change} onClick={()=>setvalidaion(prev=>({...prev,Mdropoffaddress1:false}))} placeholder="Address Line 1"/>
     <label htmlFor="Mdropoffaddress1" className="heading-400-14-12 bi-form-label">Address Line 1{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div> 
    
    
    {/* <TextField type='text' fullWidth label="Address Line 2" size='small' value={logisticsformData.dropoffaddress2} onChange={onDropoffaddress2Change} /> */}
    <div className={`bi-form-group`}>
     <input type="text" name="Mdropoffaddress2" id="Mdropoffaddress2" className={`bi-form-field bg-white`}   value={logisticsformData.dropoffaddress2} onChange={onDropoffaddress2Change}  placeholder="Address Line 2"/>
     <label htmlFor="Mdropoffaddress2" className="heading-400-14-12 bi-form-label">Address Line 2</label>
 
    </div>


{/* <TextField type='text' fullWidth label={<>Pin Code<span style={{ color: '#CB1923' }}>*</span></> } size='small'  value={logisticsformData.dropoffpincode} onChange={onDropoffpincodeChange} /> */}
<div className={`bi-form-group ${validation.Mdropoffpincode ? "error-red":""}`}>
     <input type="text" name="dropoffpincode" id="dropoffpincode" className={`bi-form-field bg-white ${validation.Mdropoffpincode ? "error-red":""}`}   value={logisticsformData.dropoffpincode} onChange={onDropoffpincodeChange} onClick={()=>setvalidaion(prev=>({...prev,Mdropoffpincode:false}))} placeholder="dropoffpincode"/>
     <label htmlFor="dropoffpincode" className="heading-400-14-12 bi-form-label">Pin Code{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div>
<div className='pt-5 d-flex justify-content-end'>
<Button message={"Submit"} callFunction={onStepThreeBtn}/> 
</div>
    </div>
</div>

{/*Form bottom section start*/}
</div>:null}


{/*-----------------------------------------step3 -----------------------------------------*/}
{activeStep===3 ? <div className='container p-0'>
<div className='row pt-5'>
<div className='col col-lg-4 pt-30px hide-992'>

    <h1 className='heading-600-16'>Point of Contact Details</h1>
    <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
    
</div>

<div className='col col-lg-8'>
<div className='row'>

    <div className='col col-md-6 col-12'>
    {/* <TextField fullWidth label={<>First Name<span style={{ color: '#CB1923' }}>*</span></> } id="First-Name" size='small' value={logisticsformData.firstname} onChange={onFirstnameChange}/> */}
    <div className={`bi-form-group ${validation.fvalidation ? "error-red":""}`}>
     <input type="text" name="fname" id="fname" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red":""}`} placeholder="Name"
     value={logisticsformData.firstname} onChange={onFirstnameChange} onClick={()=>setvalidaion(prev=>({...prev,fvalidation:false}))}/>
     <label htmlFor="fname" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
    </div>
    <div className='col col-md-6 col-12'>
    {/* <TextField fullWidth label={<>Last Name<span style={{ color: '#CB1923' }}>*</span></>} size='small' id="last-name" value={logisticsformData.lastname} onChange={onLastname}/> */}
    <div className={`bi-form-group ${validation.lvalidation ? "error-red":""}`}>
     <input type="text" name="lname" id="lname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red":""}`} placeholder="Name"
    value={logisticsformData.lastname} onChange={onLastname} onClick={()=>setvalidaion(prev=>({...prev,lvalidation:false}))}/>
     <label htmlFor="lname" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
    </div>
</div>
  
<div className='row '>
<div className='col'> 
  {/* <TextField type='email' fullWidth label="Email Id " size='small' value={logisticsformData.emailid} onChange={onEmailChange} /> */}

 <div className={`bi-form-group ${validation.evalidation ? "error-red":""}`}>
             <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.evalidation ? "error-red":""}`} placeholder="Email" 
                 value={logisticsformData.emailid} onChange={onEmailChange} onClick={()=>setvalidaion(prev=>({...prev,evalidation:false}))}/>
                <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>
    </div>
 </div>
 
</div>

<div className='row '> 
<div className='col col-md-6 col-12'>
{/* <TextField fullWidth label={<>Phone No<span style={{ color: '#CB1923' }}>*</span></> }  size='small' value={logisticsformData.phonenumber} onChange={onPhoneNoChange}/> */}
<div className={`bi-form-group ${validation.pvalidation ? "error-red":""}`}>
     <input type="text" name="phone" id="phone" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red":""}`} placeholder="Phone Number"
    value={logisticsformData.phonenumber} onChange={onPhoneNoChange} onClick={()=>setvalidaion(prev=>({...prev,pvalidation:false}))}/>
     <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Phone Number{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
</div>
<div className='col col-md-6 col-12 '>
{/* <TextField fullWidth label="Alternative Phone No" size='small' value={logisticsformData.alternativenumber} onChange={onAlterPhoneNoChange}/> */}
<div className={`bi-form-group `}>
     <input type="text" name="altphone" id="altphone" className={`bi-form-field bg-white`} placeholder="Alt Phone Number"
   value={logisticsformData.alternativenumber} onChange={onAlterPhoneNoChange}/>
     <label htmlFor="altphone" className="heading-400-14-12 bi-form-label">Alternative Phone Number</label>
 </div>
</div>
</div>
       <div className='pt-5 d-flex justify-content-end'>
       <Button message={"Submit"} callFunction={onHandleSubmit}/> 
       </div>
</div>
</div>
  </div>:null}
</div>
  </div>
  <div className='text-end'>
  <img src='/asset/Frame1000004018.png' alt='Frame1000004018.png'/>
  </div>
  </div>
  <FooterBottom2/>
  </>
)
}

export default Logistics