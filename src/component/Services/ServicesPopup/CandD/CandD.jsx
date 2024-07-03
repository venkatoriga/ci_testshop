import React,{useState} from 'react'
// import { TextField } from '@mui/material'

import SuccessPopup from '../../../SubComponent/AllBlock/SuccessPopup';
import Button from '../../../Button/Button'
import LeftArrow from '../../../SubComponent/LeftArrow'
import { gql } from '@apollo/client';
import client from '../apolloclient';
import FooterBottom2 from '../../../Footer/FooterBottom2';
import { useNavigate } from 'react-router';
const CREATE_COMMDECOMMISSIONING = gql`
  mutation CreateCommDecommissioning($input: CommDecommInput!) {
    createCommdecommissioning(requestinput: $input) {
      commdecommission {
        id
        machineName
        machineMake
        machineAddress1
        machineAddress2
        pincode
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


const CandD = () => {

  const [activeStep,setActiveStep]=useState(1)
  const navigate=useNavigate();
  const [validation,setvalidaion]=useState({MNamevalidation:false,MMakevalidation:false,Maddress1:false,Mpincode:false,fvalidation :false,lvalidation:false,evalidation:false,pvalidation :false });
   
  
  

const [cAndDformData, setcAndDformData] = useState({
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
const onStepOneBtn=()=>setActiveStep(1);
const onStepTwoBtn=()=>{
  if(cAndDformData.machinename==="" || cAndDformData.machinemake==="" || cAndDformData.machineaddress1===""|| cAndDformData.pincode==="" || cAndDformData.pincode.length!==6)
     {
       if(cAndDformData.machinename==="" ){setvalidaion(prev=>({...prev,MNamevalidation:true}))}
       if(cAndDformData.machinemake==="" ){setvalidaion(prev=>({...prev,MMakevalidation:true}))}
       if(cAndDformData.machineaddress1==="")setvalidaion(prev=>({...prev,Maddress1:true}))
       if(cAndDformData.pincode==="" || cAndDformData.pincode.length!==6)setvalidaion(prev=>({...prev,Mpincode:true}));
       return
     }
  setActiveStep(2)
};
const onMachineNameChange=(e)=>setcAndDformData({ ...cAndDformData, machinename: e.target.value })
const onMachineMakeChange=(e)=>setcAndDformData({ ...cAndDformData, machinemake: e.target.value})

const onMachineaddress1Change=(e)=>setcAndDformData({ ...cAndDformData, machineaddress1: e.target.value })
const onMachineaddress2Change=(e)=>setcAndDformData({ ...cAndDformData, machineaddress2: e.target.value })
const onPincodeChange=(e)=>{
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=6) {
    setcAndDformData({ ...cAndDformData, pincode: sanitizedInput})
  }
}

const onEmailChange = (e) =>setcAndDformData({...cAndDformData,emailid:e.target.value});
const onFirstnameChange = (e) =>{
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^a-zA-Z\s]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if (newInputString === '' || sanitizedInput === newInputString) {
    
    setcAndDformData({...cAndDformData,firstname:sanitizedInput});
  }
 }
const onLastname = (e) =>{
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if (newInputString === '' || sanitizedInput === newInputString) {
    setcAndDformData({...cAndDformData,lastname:sanitizedInput});
  }
}
const onPhoneNoChange = (e) =>{
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=10) {
    setcAndDformData({...cAndDformData,phonenumber:sanitizedInput})
  }
}
const onAlterPhoneNoChange = (e) => {
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=10) {
    setcAndDformData({...cAndDformData,alternativenumber:sanitizedInput})
  }
}

const topHeading="Commissioning, Decommissioning"
const topPara="Unlock unbeatable value and unleash your potential with high-quality used machines - your smart solution for affordable and reliable equipment!"
 
const step1FormField={
  centerHeading:"Machine Details",
  centerPara:"Set your requirements for this project, the estimated price will be based on the project requirements",
 bottomHeading:"Machine Location",
 bottomPara:"Set your requirements for this project, the estimated price will be based on the project requirements",
}


const onHandleSubmit = async () => {

  if(cAndDformData.machinename==="" || cAndDformData.machinemake==="" || 
   cAndDformData.firstname==="" ||cAndDformData.lastname==="" || cAndDformData.phonenumber==="" 
  )
   {
    if(cAndDformData.machinename==="" ){setvalidaion(prev=>({...prev,MNamevalidation:true}))}
    if(cAndDformData.machinemake==="" ){setvalidaion(prev=>({...prev,MMakevalidation:true}))}
     if(cAndDformData.machineaddress1===""){setvalidaion(prev=>({...prev,Maddress1:true}))}
     if(cAndDformData.pincode==="" || cAndDformData.pincode.length!==6){setvalidaion(prev=>({...prev,Mpincode:true}))}
     if(cAndDformData.firstname==="")setvalidaion(prev=>({...prev,fvalidation:true}))
    if(cAndDformData.lastname==="")setvalidaion(prev=>({...prev,lvalidation:true}))
    if(cAndDformData.phonenumber==="" || cAndDformData.phonenumber.length!==10)setvalidaion(prev=>({...prev,pvalidation:true}))
     return
   }
  // console.log("==>>>",cAndDformData);

  if(cAndDformData.emailid){
    if( cAndDformData.emailid.length<8 ){
      setvalidaion(prev=>({...prev,
        evalidation:true}));
return;     
    }else{
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailPattern.test(cAndDformData.emailid);
  
    setvalidaion(prev=>({...prev,
      evalidation:!isValid}));
      if(isValid===false)return
  }
  
      }

  try {
    const { data } = await client.mutate({
      mutation: CREATE_COMMDECOMMISSIONING,
     variables: {
        input: {
          machinename: cAndDformData.machinename,
          machinemake: cAndDformData.machinemake,
          machineaddress1: cAndDformData.machineaddress1,
          machineaddress2: cAndDformData.machineaddress2,
          pincode: cAndDformData.pincode,
          firstname: cAndDformData.firstname,
          lastname: cAndDformData.lastname,
          emailid: cAndDformData.emailid,
          phonenumber: cAndDformData.phonenumber,
          alternativenumber: cAndDformData.alternativenumber,
        },
      },
    });
    if(data.createCommdecommissioning.success){
      setShowModel(true);
       }
   

  } catch (error) {
    console.error('Error:', error.message);
  }
};

const onHide=()=>{
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
return (
  <>{showModel && <SuccessPopup message={"Request Created successfully"} onHide={onHide}/>}
  <div className='max-container'>
<div className='pt-5'>
    {/* Stepper Top Section*/}
   <div className='container-fluid row p-0 pb-5'>
      <div className='col col-lg-2 col-12'>
         <LeftArrow callFun={()=>navigate('/service')}/>
      </div>
      {/* for desktop */}
   <div className='col col-lg-6 hide-992 '>
      <div className='d-flex  justify-content-center'>

      {/* step 1 btn */}
      <div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor1()}} onClick={onStepOneBtn}>1</button>
      <p className='heading-400-16-12 op-60 v-center pl-2 pr-2'>Machine Details</p>
      </div>
      
      

{/* line */}
<div className='mr-2 stepper-line v-center'></div>
      {/* step 3 btn*/}
      <div className='d-flex'>
      <button className="stepperBtn" style={{backgroundColor:getButtonColor2()}} onClick={onStepTwoBtn}>2</button>
      <p className='heading-400-16-12 op-60 v-center pl-2'>Point of Contact</p>
      </div>
      </div>
    </div>

      {/* for tablet start*/}
      <div className='Container show-992'>

<div className='row'>
{/* stepper button start*/}
  <div className='col col-12'>
    <div className="row ">
      <div className="col col-6 p-0 d-flex justify-content-end">
     
      <button className="stepperBtn" style={{backgroundColor:getButtonColor1()}} onClick={onStepOneBtn}>1</button>
       <p style={{backgroundColor:" #00000066",width:"40%",height:'2px',margin:"auto 0px" }}></p>
       </div>
     
      <div className="col col-6 p-0 d-flex justify-content-start">
      <p style={{backgroundColor:" #00000066",width:"40%",height:'2px',margin:"auto 0px" }}></p>
       <button className="stepperBtn" style={{backgroundColor:getButtonColor2()}} onClick={onStepTwoBtn}>2</button>
      
       </div>
    </div>
  </div>
  {/* stepper button end*/}

  {/* stepper button description start*/}
  <div className='col col-10 h-center'>
    <div className="row">
      <div className={`col-6 p-0 text-center pt-2 ${activeStep===1 ? "heading-600-16-12":"heading-400-16-12 op-60"} `}>Machine Details</div>
      <div className={`col-6 p-0 text-center pt-2 ${activeStep===2 ? "heading-600-16-12":"heading-400-16-12 op-60"} `}>Point of Contact </div>
    </div>
  </div>
   {/* stepper button description start*/}
</div>
</div>

      {/* for tablet end*/}
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
     {/* <TextField type='text' fullWidth label={<>Machine Name<span style={{ color: '#CB1923' }}>*</span></>} size='small'  value={cAndDformData.machinename} onChange={onMachineNameChange}/> */}
     <div className={`bi-form-group ${validation.MNamevalidation ? "error-red":""}`}>
     <input type="text" name="machine-name" id="machine-name" className={`bi-form-field bg-white ${validation.MNamevalidation ? "error-red":""}`}  value={cAndDformData.machinename} onChange={onMachineNameChange} onClick={()=>setvalidaion(prev=>({...prev,MNamevalidation:false}))} placeholder="Machine Name"/>
     <label htmlFor="machine-name" className="heading-400-14-12 bi-form-label">Machine Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div>
    
     {/* <div className='pt-5'>
     <TextField type='text' fullWidth label={<>Machine Make<span style={{ color: '#CB1923' }}>*</span></>} size='small' value={cAndDformData.machinemake} onChange={onMachineMakeChange}/>
     </div>
      */}

      <div className={`bi-form-group ${validation.MMakevalidation ? "error-red":""}`}>
  <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.MMakevalidation ? "error-red":""}`}  value={cAndDformData.machinemake} onChange={onMachineMakeChange} onClick={()=>setvalidaion(prev=>({...prev,MMakevalidation:false}))} placeholder="Machine Make"/>
  <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">Machine Make{<span style={{ color: '#CB1923' }}>*</span>}</label>

</div>
     </div>
     </div>
 {/*Form middle section end*/}

{/*Form bottom section start*/}
<div className='row  mt-5'>
<div className="row pt-5 border-top hide-992 p-0 m-0"></div>
<div className='col col-lg-4 hide-992'>

  <h1 className='heading-600-16'>{step1FormField.bottomHeading}</h1>
  <p className='heading-400-14 op-60'>{step1FormField.bottomPara}</p>
  
</div>

<div className='col col-lg-8'>
{/* <TextField type='text' fullWidth label={<>Address Line 1<span style={{ color: '#CB1923' }}>*</span></> } size='small' value={cAndDformData.machineaddress1} onChange={onMachineaddress1Change} /> */}
<div className={`bi-form-group ${validation.Maddress1 ? "error-red":""}`}>
     <input type="text" name="Maddress1" id="Maddress1" className={`bi-form-field bg-white ${validation.Maddress1 ? "error-red":""}`}    value={cAndDformData.machineaddress1} onChange={onMachineaddress1Change} onClick={()=>setvalidaion(prev=>({...prev,Maddress1:false}))} placeholder="Address Line 1"/>
     <label htmlFor="Maddress1" className="heading-400-14-12 bi-form-label">Address Line 1{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div> 
         {/* <div className='pt-5'>
         <TextField type='text' fullWidth label="Address Line 2" size='small' value={cAndDformData.machineaddress2} onChange={onMachineaddress2Change} />
         </div> */}
         <div className={`bi-form-group `}>
     <input type="text" name="Maddress2" id="Maddress2" className={`bi-form-field bg-white`}    value={cAndDformData.machineaddress2} onChange={onMachineaddress2Change} placeholder="Address Line 2"/>
     <label htmlFor="Maddress2" className="heading-400-14-12 bi-form-label">Address Line 2</label>
 
</div>

     {/* <div className='pt-5'>
     <TextField type='text' fullWidth label={<>Pin Code<span style={{ color: '#CB1923' }}>*</span></> } size='small' value={cAndDformData.pincode} onChange={onPincodeChange} />
     </div> */}
     <div className={`bi-form-group ${validation.Mpincode ? "error-red":""}`}>
     <input type="text" name="pincode" id="pincode" className={`bi-form-field bg-white ${validation.Mpincode ? "error-red":""}`}   value={cAndDformData.pincode} onChange={onPincodeChange} onClick={()=>setvalidaion(prev=>({...prev,Mpincode:false}))} placeholder="Mpincode"/>
     <label htmlFor="pincode" className="heading-400-14-12 bi-form-label">Pin Code{<span style={{ color: '#CB1923' }}>*</span>}</label>
 
</div>
     <div className='pt-5 d-flex justify-content-end'>
     <Button message={"Submit"} callFunction={onStepTwoBtn}/> 
     </div>
</div>
</div>

{/*Form bottom section end*/}
 </div>:null}

 {/* --------------------- Step2----------------------------------------*/}
 {activeStep===2 ? <div className='container p-0'>
 <div className='row pt-5'>
 <div className='col col-lg-4 hide-992'>
 
     <h1 className='heading-600-16'>Point of Contact Details</h1>
     <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
     
 </div>

 <div className='col col-lg-8'>
 <div className='row'>
 
     <div className='col col-md-6'>
     {/* <TextField fullWidth label={<>First Name<span style={{ color: '#CB1923' }}>*</span></> }  size='small' value={cAndDformData.firstname} onChange={onFirstnameChange}/> */}
     <div className={`bi-form-group ${validation.fvalidation ? "error-red":""}`}>
     <input type="text" name="fname" id="fname" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red":""}`} placeholder="Name"
     value={cAndDformData.firstname} onChange={onFirstnameChange} onClick={()=>setvalidaion(prev=>({...prev,fvalidation:false}))}/>
     <label htmlFor="fname" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
     </div>

     <div className='col col-md-6 col-12 pt-5-mobile'>
     {/* <TextField fullWidth label={<>Last Name<span style={{ color: '#CB1923' }}>*</span></>} size='small' value={cAndDformData.lastname} onChange={onLastname}/> */}
     <div className={`bi-form-group ${validation.lvalidation ? "error-red":""}`}>
     <input type="text" name="lname" id="lname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red":""}`} placeholder="Name"
    value={cAndDformData.lastname} onChange={onLastname} onClick={()=>setvalidaion(prev=>({...prev,lvalidation:false}))}/>
     <label htmlFor="lname" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
     </div>
 </div>
   
<div className='row'>
<div className='col'> 
 {/* <TextField type='email' fullWidth label="Email Id" size='small' value={cAndDformData.emailid} onChange={onEmailChange} /> */}


 <div className={`bi-form-group ${validation.evalidation ? "error-red":""}`}>
             <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.evalidation ? "error-red":""}`} placeholder="Email" 
             value={cAndDformData.emailid} onChange={onEmailChange} onClick={()=>setvalidaion(prev=>({...prev,evalidation:false}))}/>
                <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>
    </div>
 </div>
</div>

 <div className='row'> 
 <div className='col col-md-6'>
 {/* <TextField fullWidth label={<>Phone No<span style={{ color: '#CB1923' }}>*</span></> } size='small' value={cAndDformData.phonenumber} onChange={onPhoneNoChange}/> */}
 <div className={`bi-form-group ${validation.pvalidation ? "error-red":""}`}>
     <input type="text" name="phone" id="phone" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red":""}`} placeholder="Phone Number"
    value={cAndDformData.phonenumber} onChange={onPhoneNoChange}onClick={()=>setvalidaion(prev=>({...prev,pvalidation:false}))}/>
     <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Phone Number{<span style={{ color: '#CB1923' }}>*</span>}</label>
 </div>
 
 </div>
 <div className='col col-md-6 col-12'>
 {/* <TextField fullWidth label="Alternative Phone No" size='small'  value={cAndDformData.alternativenumber} onChange={onAlterPhoneNoChange}/> */}
 <div className={`bi-form-group `}>
     <input type="text" name="altphone" id="altphone" className={`bi-form-field bg-white`} placeholder="Alt Phone Number"
   value={cAndDformData.alternativenumber} onChange={onAlterPhoneNoChange}/>
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
<FooterBottom2/> </>
  )
}

export default CandD