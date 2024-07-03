import React, { useState } from 'react'
import gql from 'graphql-tag';
import LeftArrow from '../../SubComponent/LeftArrow'
import StepperTick from '../../SubComponent/AllSvgs/StepperTick';
import Button from '../../Button/Button'
// import { TextField } from '@mui/material'
import client from './apolloclient';
import FooterBottom2 from '../../Footer/FooterBottom2';
import { useNavigate } from 'react-router';
import SuccessPopup from '../../SubComponent/AllBlock/SuccessPopup';

const CREATE_ONE_TIME_REPAIR = gql`
  mutation createOnetimerepair($input: OneTimeRepairInput!) {
    createOnetimerepair(requestinput: $input) {
      onetimerepair {
        id
        machineName
        machineMake
        machineAddress1
        machineAddress2
        pincode
        problemWithEquipment
        otherReason
        firstName
        lastName
        emailId
        phoneNumber
        alternativeNumber
      }
      message
      success
    }
  }
`;




const OnetTimeRepairStepper = () => {
 
  const [activeStep,setActiveStep]=useState(1)
  
 const [validation,setvalidaion]=useState({MNamevalidation:false,MMakevalidation:false,MAdd1validation:false,MPinValidation:false,fvalidation :false,lvalidation:false,evalidation:false,pvalidation :false });

  const navigate=useNavigate();

const [onetTimeRepairformData, setOnetTimeRepairFormData] = useState({
  machinename: '',
  machinemake: '',
  machineaddress1: '',
  machineaddress2: '',
  pincode: '',
  problemwithequipment: '',
  otherreason: '',
  firstname: '',
  lastname: '',
  emailid: '',
  phonenumber: '',
  alternativenumber: '',
});
const [showModel,setShowModel]=useState(false);

const onStepOneBtn=()=>{
  setActiveStep(1);
   }
const onStepTwoBtn=()=>{
  if(onetTimeRepairformData.machinename==="" || onetTimeRepairformData.machinemake==="" || 
  onetTimeRepairformData.machineaddress1==="" || onetTimeRepairformData.pincode===""
  )
   {
     if(onetTimeRepairformData.machinename==="" ){setvalidaion(prev=>({...prev,MNamevalidation:true}))}
     if(onetTimeRepairformData.machinemake==="" ){setvalidaion(prev=>({...prev,MMakevalidation:true}))}
     if(onetTimeRepairformData.machineaddress1===""){setvalidaion(prev=>({...prev,MAdd1validation:true}))}
     if(onetTimeRepairformData.pincode==="" || onetTimeRepairformData.pincode.length!==6){setvalidaion(prev=>({...prev,MPinValidation:true}))}
     return
   }
          setActiveStep(2);
       }
const onStepThreeBtn=()=>{
  if(onetTimeRepairformData.machinename==="" || onetTimeRepairformData.machinemake==="" || 
  onetTimeRepairformData.machineaddress1==="" || onetTimeRepairformData.pincode===""
  )return;
          setActiveStep(3);
          console.log("onetTimeRepairformData=====",onetTimeRepairformData);
       }

const onMachineNameChange=(e)=>setOnetTimeRepairFormData({ ...onetTimeRepairformData, machinename:e.target.value})

const onMachineMakeChange=(e)=>setOnetTimeRepairFormData({ ...onetTimeRepairformData, machinemake: e.target.value})
  
const onMachineaddress1Change=(e)=>setOnetTimeRepairFormData({ ...onetTimeRepairformData,   machineaddress1: e.target.value })
    

  const onMachineaddress2Change=(e)=>setOnetTimeRepairFormData({ ...onetTimeRepairformData,   machineaddress2: e.target.value })
      
  const onPincodeChange=(e)=>{
    // console.log("OneTimeRepair  pincode==>>",e.target.value);
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
  
    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=6) {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, pincode:sanitizedInput})
    }
  }


const onSelectOption=(value)=>{
  console.log(",onSelectOption<<<===",value);
  setOnetTimeRepairFormData({...onetTimeRepairformData,problemwithequipment:value})
}
const onOtherReasonChange= (e) => {
  setOnetTimeRepairFormData({...onetTimeRepairformData,otherreason:e.target.value});
};
const onEmailChange = (e) => {
  setOnetTimeRepairFormData({...onetTimeRepairformData,emailid:e.target.value});
}
const onFirstnameChange = (e) => {
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if (newInputString === '' || sanitizedInput === newInputString) {
    
    setOnetTimeRepairFormData({...onetTimeRepairformData,firstname:sanitizedInput});
  }
 
};
const onLastname = (e) => {

  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if (newInputString === '' || sanitizedInput === newInputString) {
    
    setOnetTimeRepairFormData({...onetTimeRepairformData,lastname:sanitizedInput});
  }
  
};
const onPhoneNoChange = (e) => {
  const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
  
    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=10) {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, phonenumber:sanitizedInput})
    }
};
const onAlterPhoneNoChange = (e) => {

  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=10) {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, alternativenumber:sanitizedInput})
  }

}
  const topHeading="One Time Repair "
  const topPara="Unlock unbeatable value and unleash your potential with high-quality used machines - your smart solution for affordable and reliable equipment!"

 
const step1FormField={
  centerHeading:"Machine Details",
  centerPara:"Set your requirements for this project, the estimated price will be based on the project requirements",
 bottomHeading:"Machine Location",
 bottomPara:"Set your requirements for this project, the estimated price will be based on the project requirements",
}

const onHandleSubmit = async () => {
if(onetTimeRepairformData.machinename==="" || onetTimeRepairformData.machinemake==="" || 
 onetTimeRepairformData.machineaddress1==="" || onetTimeRepairformData.pincode==="" ||
 onetTimeRepairformData.firstname==="" ||onetTimeRepairformData.lastname==="" ||
 onetTimeRepairformData.phonenumber==="" ||  onetTimeRepairformData.phonenumber.length!==10
 )
  {
    if(onetTimeRepairformData.machinename==="" ){setvalidaion(prev=>({...prev,MNamevalidation:true}))}
    if(onetTimeRepairformData.machinemake==="" ){setvalidaion(prev=>({...prev,MMakevalidation:true}))}
    if(onetTimeRepairformData.machineaddress1===""){setvalidaion(prev=>({...prev,MAdd1validation:true}))}
    if(onetTimeRepairformData.pincode==="" || onetTimeRepairformData.pincode.length!==6){setvalidaion(prev=>({...prev,MPinValidation:true}))}
    if(onetTimeRepairformData.firstname==="" ){setvalidaion(prev=>({...prev,fvalidation:true}))}
    if(onetTimeRepairformData.lastname==="" ){setvalidaion(prev=>({...prev,lvalidation:true}))}
    if(onetTimeRepairformData.phonenumber===""){setvalidaion(prev=>({...prev,pvalidation:true}))}
    return
  }

  if(onetTimeRepairformData.emailid){
    if( onetTimeRepairformData.emailid.length<8 ){
      setvalidaion(prev=>({...prev,
        evalidation:true}));
return;     
    }else{
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailPattern.test(onetTimeRepairformData.emailid);
  
    setvalidaion(prev=>({...prev,
      evalidation:!isValid}));
      if(isValid===false)return
  }
  
      }

  const input = {
    machinename: onetTimeRepairformData.machinename,
    machinemake: onetTimeRepairformData.machinemake,
    machineaddress1: onetTimeRepairformData.machineaddress1,
    machineaddress2: onetTimeRepairformData.machineaddress2,
    pincode: onetTimeRepairformData.pincode,
    problemwithequipment: onetTimeRepairformData.problemwithequipment,
    otherreason: onetTimeRepairformData.otherreason,
    firstname: onetTimeRepairformData.firstname,
    lastname: onetTimeRepairformData.lastname,
    emailid:onetTimeRepairformData.emailid,
    phonenumber: onetTimeRepairformData.phonenumber,
    alternativenumber: onetTimeRepairformData.alternativenumber,
  };
  console.log('GraphQL Request Payload:', { input });
  try {
    const { data } = await client.mutate({
      mutation:CREATE_ONE_TIME_REPAIR ,
      variables: {input
      }
    });
 console.log("API Response==>",data);
 if(data.createOnetimerepair.success){
setShowModel(true);
 }

  } catch (error) {
    console.error('API Error==>', error.message);

  }
};
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
   <div className='container-fluid row p-0 m-0'>
      <div className='col col-lg-2 col-12 pl-0'>
         <LeftArrow callFun={()=>navigate('/service')}/>
      </div>
      {/* for desktop */}
   <div className='col col-lg-10 hide-992'>
      <div className='d-flex'>

      {/* step 1 btn */}
      <div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor1()}} onClick={onStepOneBtn}>1</button>
      <p className={`${activeStep===1 ? "heading-600-16-12":"heading-400-16-12 op-60 "}  v-center pl-2 pr-2`}>Machine Details</p>
      </div>
      
      {/* line */}
      { <div className=' mr-2 stepper-line v-center'></div> }
      {/* step 2 btn */}
      {<div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor2()}} onClick={onStepTwoBtn}>2</button>
      <p className={`${activeStep===2 ? "heading-600-16-12":"heading-400-16-12 op-60 "} v-center pl-2 pr-2`}>Problems</p>
      </div>}

{/* line */}
<div className='mr-2 stepper-line v-center'></div>
      {/* step 3 btn*/}
      <div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor3()}} onClick={onStepThreeBtn}>3</button>
      <p className={`${activeStep===3 ? "heading-600-16-12":"heading-400-16-12 op-60 "}  v-center pl-2`}>Point of Contact</p>
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
              <div className={`col-4 p-0 pt-2 ${activeStep===1 ? "heading-600-16-12 pl-2":"heading-400-16-12 op-60 pl-2"} v-center`}>Machine Details</div>
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

{/* -----------------------Steper 1---------------------------------------- */}

 {activeStep===1 ?  <div className='container p-0'>
   
 {/*Form middle section start*/}
     <div className='row pt-5'>
     <div className='col col-lg-4 hide-992'>
     
         <h1 className='heading-600-16'>{step1FormField.centerHeading}</h1>
         <p className='heading-400-14 op-60'>{step1FormField.centerPara}</p>
         
     </div>

     <div className='col col-lg-8 col-12'>
  
  {/*<TextField type='text' fullWidth label={<>Machine Name<span style={{ color: '#CB1923' }}>*</span></>} size='small'  value={onetTimeRepairformData.machinename} onChange={onMachineNameChange}/>*/}
  
     <div className={`bi-form-group ${validation.MNamevalidation ? "error-red":""}`}>
     <input type="text" name="machine-name" id="machine-name" className={`bi-form-field bg-white ${validation.MNamevalidation ? "error-red":""}`}  value={onetTimeRepairformData.machinename} onChange={onMachineNameChange} onClick={()=>setvalidaion(prev=>({...prev,MNamevalidation:false}))} placeholder="Machine Name"/>
     <label htmlFor="machine-name" className="heading-400-14-12 bi-form-label">Machine Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div>

    {/*<div className='pt-5'>
     <TextField type='text' fullWidth label={<>Machine Make<span style={{ color: '#CB1923' }}>*</span></>} size='small'  value={onetTimeRepairformData.machinemake} onChange={onMachineMakeChange}/>                                         
  </div>*/}
     
  <div className={`bi-form-group ${validation.MMakevalidation ? "error-red":""}`}>
  <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.MMakevalidation ? "error-red":""}`}  value={onetTimeRepairformData.machinemake} onChange={onMachineMakeChange} onClick={()=>setvalidaion(prev=>({...prev,MMakevalidation:false}))} placeholder="Machine Make"/>
  <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">Machine Make{<span style={{ color: '#CB1923' }}>*</span>}</label>

</div>
     </div>
     </div>
 {/*Form middle section end*/}

{/*Form bottom section start*/}
<div className='row pt-5'>
<div className="row pt-5 border-top hide-992 p-0 m-0"></div>
<div className='col col-lg-4 hide-992'>

  <h1 className='heading-600-16'>{step1FormField.bottomHeading}</h1>
  <p className='heading-400-14 op-60'>{step1FormField.bottomPara}</p>
  
</div>

<div className='col col-lg-8'>
{/*<TextField type='text' fullWidth label={<>Address Line 1<span style={{ color: '#CB1923' }}>*</span></> } size='small' id="machine_name" value={onetTimeRepairformData.machineaddress1} onChange={onMachineaddress1Change} />
*/}
<div className={`bi-form-group ${validation.MAdd1validation ? "error-red":""}`}>
<input type="text" name="machine-add1" id="machine-add1" className={`bi-form-field bg-white ${validation.MAdd1validation ? "error-red":""}`}  value={onetTimeRepairformData.machineaddress1} onChange={onMachineaddress1Change} onClick={()=>setvalidaion(prev=>({...prev,MAdd1validation:false}))} placeholder="Machine Make"/>
<label htmlFor="machine-add1" className="heading-400-14-12 bi-form-label">Address Line 1{<span style={{ color: '#CB1923' }}>*</span>}</label>

</div>
         {/*<div className='pt-5'>
         <TextField type='text' fullWidth label="Address Line 2" size='small' id="machine_make" value={onetTimeRepairformData.machineaddress2} onChange={onMachineaddress2Change} />
</div>*/}
<div className={`bi-form-group `}>
<input type="text" name="machine-add2" id="machine-add2" className={`bi-form-field bg-white`}  value={onetTimeRepairformData.machineaddress2} onChange={onMachineaddress2Change} placeholder="Address Line 2"/>
<label htmlFor="machine-add2" className="heading-400-14-12 bi-form-label">Address Line 2</label>

</div>

     {/*<div className='pt-5'>
     <TextField type='text' fullWidth label={<>Pin Code<span style={{ color: '#CB1923' }}>*</span></> } size='small' id="machine_make" value={onetTimeRepairformData.pincode} onChange={onPincodeChange} />
</div>*/}
<div className={`bi-form-group  ${validation.MPinValidation ? "error-red":""}`}>
<input type="text" name="machine-add1" id="machine-add1" className={`bi-form-field bg-white ${validation.MPinValidation ? "error-red":""}`}  value={onetTimeRepairformData.pincode} onChange={onPincodeChange} onClick={()=>setvalidaion(prev=>({...prev,MPinValidation:false}))} placeholder="Pine Code"/>
<label htmlFor="machine-add1" className="heading-400-14-12 bi-form-label">Pin Code{<span style={{ color: '#CB1923' }}>*</span>}</label>

</div>
     <div className='pt-5 d-flex justify-content-end'>
     <Button message={"Submit"} callFunction={onStepTwoBtn}/> 
     </div>
</div>
</div>

{/*Form bottom section start*/}
 </div>:null}

 {/*-------------------------Step 2nd------------------------------------- */}

 {activeStep===2 ? <div className='container p-0'>
 <div className='row pt-5 d-flex justify-content-between'>
 <div className='col col-lg-4 hide-992'>
 
     <h1 className='heading-600-16'>Machine Location</h1>
     <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
     
 </div>

 <div className='col col-lg-6'>
 <div className='row border p-0'>
     
     <div className={`d-flex justify-content-between p-0 ${onetTimeRepairformData.problemwithequipment==="Mechanical breakdowns" ? 'bg-green':null}`} onClick={()=>onSelectOption("Mechanical breakdowns")}>
     <p className='heading-400-14 v-center pl-3'>Mechanical breakdowns</p>
     <StepperTick fill={` ${onetTimeRepairformData.problemwithequipment==="Mechanical breakdowns"  ? '#9B9E51':"#FFFFFF"}`}/>
  </div>
 </div>

 <div className='row border p-0 mt-3'>

 <div className={`d-flex justify-content-between p-0 ${onetTimeRepairformData.problemwithequipment==="Electrical Systems failure" ? 'bg-green':null}`} onClick={()=>onSelectOption("Electrical Systems failure")}>
        <p className='heading-400-14 v-center pl-3'>Electrical Systems failure</p>
        <StepperTick fill={` ${onetTimeRepairformData.problemwithequipment==="Electrical Systems failure" ? '#9B9E51':"#FFFFFF"}`}/>
     </div>
</div>

<div className='row border p-0 mt-3'>

     <div className={`d-flex justify-content-between p-0 ${onetTimeRepairformData.problemwithequipment==="Don't wish to sell my MAchine anymore" ? 'bg-green':null}`} onClick={()=>onSelectOption("Don't wish to sell my MAchine anymore")}>
        <p className='heading-400-14 v-center pl-3'>Don't wish to sell my MAchine anymore</p>
        <StepperTick fill={` ${onetTimeRepairformData.problemwithequipment==="Don't wish to sell my MAchine anymore" ? '#9B9E51':"#FFFFFF"}`}/>
     </div>
 </div>

 <div className='row border p-0 mt-3 '>
     
     <div className={`d-flex justify-content-between p-0 ${onetTimeRepairformData.problemwithequipment==="Structural Integrity Concerns" ? 'bg-green':null}`} onClick={()=>onSelectOption("Structural Integrity Concerns")}>
        <p className='heading-400-14 v-center pl-3'>Structural Integrity Concerns</p>
        <StepperTick fill={` ${onetTimeRepairformData.problemwithequipment==="Structural Integrity Concerns" ? '#9B9E51':"#FFFFFF"}`}/>
     </div>
 </div>

 <div className='row border p-0 mt-3'>
     <div className={`d-flex justify-content-between p-0 ${onetTimeRepairformData.problemwithequipment==="Lack of Preventive maintenace" ? 'bg-green':null}`} onClick={()=>onSelectOption("Lack of Preventive maintenace")}>
        <p className='heading-400-14 v-center pl-3'>Lack of Preventive maintenace</p>
        <StepperTick fill={` ${onetTimeRepairformData.problemwithequipment==="Lack of Preventive maintenace" ? '#9B9E51':"#FFFFFF"}`}/>
     </div>
 </div>

 <div className='row p-1 mt-3' onClick={()=>onSelectOption(6)}>

 <textarea className='form-control' rows="3" placeholder='Type other reason' id="otherReason" value={onetTimeRepairformData.otherreason} onChange={onOtherReasonChange}></textarea>
 </div>

        <div className='pt-5 d-flex justify-content-end'>
        <Button message={"Submit"} callFunction={onStepThreeBtn}/> 
        </div>
 </div>
 </div>
 </div>:null}

 {/* --------------------- Step3----------------------------------------*/}
 {activeStep===3 ? <div className='container p-0'>
 <div className='row pt-5'>
 <div className='col col-lg-4 hide-992'>
 
     <h1 className='heading-600-16'>Point of Contact Details</h1>
     <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
     
 </div>

 <div className='col col-lg-8'>
 <div className='row'>
 
     <div className='col col-md-6 col-12'>
     {/*<TextField fullWidth label={<>First Name<span style={{ color: '#CB1923' }}>*</span></> } id="First-Name" size='small' value={onetTimeRepairformData.firstname} onChange={onFirstnameChange}/>
*/}
<div className={`bi-form-group ${validation.fvalidation ? "error-red":""}`}>
     <input type="text" name="fname" id="fname" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red":""}`} placeholder="Name"
     value={onetTimeRepairformData.firstname} onChange={onFirstnameChange} onClick={()=>setvalidaion(prev=>({...prev,fvalidation:false}))}/>
     <label htmlFor="fname" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>

     </div>
     <div className='col col-md-6 col-12 pt-5-mobile'>
     {/*<TextField fullWidth label={<>Last Name<span style={{ color: '#CB1923' }}>*</span></>} size='small' id="last-name" value={onetTimeRepairformData.lastname} onChange={onLastname}/>
*/}
<div className={`bi-form-group ${validation.lvalidation ? "error-red":""}`}>
     <input type="text" name="lname" id="lname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red":""}`} placeholder="Name"
     value={onetTimeRepairformData.lastname} onChange={onLastname} onClick={()=>setvalidaion(prev=>({...prev,lvalidation:false}))}/>
     <label htmlFor="lname" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
     </div>
 </div>
   
<div className='row'>
<div className='col'> 
 {/* <TextField type='email' fullWidth label="Email Id "  size='small' id="email" value={onetTimeRepairformData.emailid} onChange={onEmailChange} /> */}

 <div className={`bi-form-group ${validation.evalidation ? "error-red":""}`}>
                                                <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.evalidation ? "error-red":""}`} placeholder="Email"
                                                value={onetTimeRepairformData.emailid} onChange={onEmailChange} onClick={()=>setvalidaion(prev=>({...prev,evalidation:false}))}/>
                                                <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>
                                            </div>
 </div>
</div>

 <div className='row'> 
 <div className='col col-md-6 col-12'>
 {/* <TextField fullWidth label={<>Phone No<span style={{ color: '#CB1923' }}>*</span></> }  size='small' value={onetTimeRepairformData.phonenumber} onChange={onPhoneNoChange}/> */}

 <div className={`bi-form-group ${validation.pvalidation ? "error-red":""}`}>
     <input type="text" name="phone" id="phone" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red":""}`} placeholder="Phone Number"
    value={onetTimeRepairformData.phonenumber} onChange={onPhoneNoChange} onClick={()=>setvalidaion(prev=>({...prev,pvalidation:false}))}/>
     <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Phone Number{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
 </div>
 <div className='col col-md-6 col-12 pt-5-mobile'>
 {/* <TextField fullWidth label="Alternative Phone No" size='small'  value={onetTimeRepairformData.alternativenumber} onChange={onAlterPhoneNoChange}/> */}
 
 <div className={`bi-form-group `}>
     <input type="text" name="altphone" id="altphone" className={`bi-form-field bg-white`} placeholder="Alt Phone Number"
    value={onetTimeRepairformData.alternativenumber} onChange={onAlterPhoneNoChange}/>
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

export default OnetTimeRepairStepper