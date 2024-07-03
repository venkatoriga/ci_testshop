import React, { useState,useEffect } from 'react';
import './Form.css'
import { Container } from 'react-bootstrap'
import Button from '../Button/Button';
import Textarea from '@mui/joy/Textarea';
import { gql } from 'graphql-tag';
import client from '../Services/ServicesPopup/apolloclient';
import SuccessPopup from '../SubComponent/AllBlock/SuccessPopup';
const CREATE_CONTACT_US = gql`
mutation createServiceRequest($requestinput:ServiceRequestInput!) {
  createServiceRequest(requestinput:$requestinput) {
    servicerequest {
      id
      firstName
      lastName
    }
    message
    success
  }
}
`;

function ContactForm({ selectedCategoryType, enteredPincode, OthersValue, serviceName }) {
  // console.log('selectedCategoryType====>', selectedCategoryType);
  // console.log('enteredPincode=====>', enteredPincode);
  // console.log('OthersValue=====>', OthersValue);
  const [phone, setphone] = useState('');
  const [email, setEmail] = useState('');
  const [Factory, setFactory] = useState('');
  const [MachineName, setMachineName] = useState('');
  const [MachineProblem, setMachineProblem] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [ModelName, setModelName] = useState('');
  const [mfgYear, setmfgYear] = useState('');
  const [WorkingCondition, setWorkingCondition] = useState('');
  const [warrenty, setwarrenty] = useState('');
  const [amcplan, setamcplan] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [validation, setvalidaion] = useState({ factvalidation: false,Machinenamevalidation:false, fvalidation: false, lvalidation: false, evalidation: false, pvalidation: false, mvalidation: false,mfgYearvalidation:false, dvalidation: false,workingvalidation:false,warrentyvalidation:false,amcplanvalidation:false,machinevalidation:false});
  const [showModel, setShowModel] = useState(false);
  // const id=localStorage.getItem('id')
  // console.log("id===>>>",id);
  const onMachineChange = (e) => {
    const newInputString = e.target.value;
    setMachineName(newInputString);
  };
  const onmachineProblemChange = (e) => {
    const newInputString = e.target.value;
    setMachineProblem(newInputString);
  };
  const onphoneChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
    setphone(sanitizedInput);
  };
  const onAMCchange = (e) => {
    setamcplan(e.target.value);
  };
  const onwarrentychange = (e) => {
    setwarrenty(e.target.value);
  };
  const onworkingconditionchange = (e) => {
    setWorkingCondition(e.target.value);
  };
  const onmfgyearchange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
    setmfgYear(sanitizedInput);
    // setmfgYear(e.target.value);
  };
  const onmodelChange = (e) => {
    setModelName(e.target.value);
  };
  const onFactoryChange = (e) => {
    setFactory(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onHide = () => {
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
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  useEffect(() => {
    if (serviceName === "AMC") {
        setamcplan('Yes');
    }
}, [serviceName]);


  const onSubmitHandler = async () => {
   
    if (Factory === '' || MachineName === '' || firstname === "" || lastname === "" || phone === "" || MachineProblem === "" || email === "" || mfgYear === "" || WorkingCondition === "" || warrenty === "" || amcplan === "") {
      if (Factory === "") {
        setvalidaion(prev => ({
          ...prev,
          factvalidation: true
        }));
      }
      if (MachineName === "") {
        setvalidaion(prev => ({
          ...prev,
          Machinenamevalidation: true
        }));
      }
      if (firstname === "") {
        setvalidaion(prev => ({
          ...prev,
          fvalidation: true
        }));
      }

      if (lastname === "") {
        setvalidaion(prev => ({
          ...prev,
          lvalidation: true
        }));

      }
      if (email === "") {
        setvalidaion(prev => ({
          ...prev,
          evalidation: true
        }));

      }
      if (phone === "") {
        setvalidaion(prev => ({
          ...prev,
          pvalidation: true
        }));

      }
      if (ModelName === "") {
        setvalidaion(prev => ({
          ...prev,
          mvalidation: true
        }));

      }
      if (mfgYear === "") {
        setvalidaion(prev => ({
          ...prev,
          mfgYearvalidation: true
        }));

      }
      if (WorkingCondition === "") {
        setvalidaion(prev => ({
          ...prev,
          workingvalidation: true
        }));

      }
      if (warrenty === "") {
        setvalidaion(prev => ({
          ...prev,
          warrentyvalidation: true
        }));

      }
      if (amcplan === "") {
        setvalidaion(prev => ({
          ...prev,
          amcplanvalidation: true
        }));

      }
      if (MachineProblem === "") {
        setvalidaion(prev => ({
          ...prev,
          machinevalidation: true
        }));

      }

      // console.log('description',description);
      // console.log('amcplan',amcplan);
      // console.log('warrenty',warrenty);
      // console.log('WorkingCondition',WorkingCondition);
      window.scrollTo(0,0)
      return;
    }
    if (email) {
      if (email.length < 8) {
        setvalidaion(prev => ({
          ...prev,
          evalidation: true
        }));
        return;
      }
      else {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const isValid = emailPattern.test(email);

        setvalidaion(prev => ({
          ...prev,
          evalidation: !isValid
        }));
        if (isValid === false) return
      }

    }
    try {
      const { data } = await client.mutate({
        mutation: CREATE_CONTACT_US,
        variables: {
          requestinput: {
            customerid: null,
            firstname: firstname,
            lastname: lastname,
            emailid: email,
            phonenumber: phone,
            machinename: MachineName,
            machineproblem: MachineProblem,
            servicelocation: enteredPincode,
            description: description,
            servicetype: serviceName,
            factoryname:Factory,
            machinecategory:selectedCategoryType === 'Others' ? OthersValue : selectedCategoryType,
            modelname:ModelName,
            mfgyear:mfgYear,
            machineworkingcondition:WorkingCondition,
            machineinwarranty:warrenty,
            needamc:amcplan


          }
        }
      });
      console.log("API Response==>", data);
      if (data) {    //you can modife validation condition according to you
        setShowModel(true)
        setFactory("")
        setMachineName("")
        setphone("")
        setModelName("")
        setmfgYear("")
        setMachineProblem("")
        setWorkingCondition("")
        setwarrenty("")
        setfirstname("")
        setlastname("")
        setEmail("")
        setReason("")
        setDescription("")
      }




    } catch (error) {
      console.error('API Error==>', error.message);

    }

  };
  return (

    <>
      {showModel ? <SuccessPopup onHide={onHide} message={"Thankyou. Our team will reach out to you soon"} /> : null}
      <div className="container contactContainer bg-white border border-grey border-1 ms-5" style={{ boxShadow: " 0px 2px 6px 0px rgba(0, 0, 0, 0.12)" }}>
        <div>
          <h1 className='heading-600-24-16'> Please Provide Machine Specifications For Service Booking</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className={`bi-form-group ${validation.factvalidation ? "error-red" : ""}`}>
              <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.factvalidation ? "error-red" : ""}`} placeholder="Factory Name" value={Factory}
                onChange={onFactoryChange} onClick={() => setvalidaion(prev => ({ ...prev, factvalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Factory Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className={`bi-form-group ${validation.Machinenamevalidation ? "error-red" : ""}`}>
              <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.Machinenamevalidation ? "error-red" : ""}`} placeholder="Machine Name" value={MachineName}
                onChange={onMachineChange} onClick={() => setvalidaion(prev => ({ ...prev, Machinenamevalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Machine Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="">
              {/* <TextField fullWidth label="First Name *" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange} /> */}
              <div className={`bi-form-group ${validation.fvalidation ? "error-red" : ""}`}>
                <input type="text" name="name" id="name" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red" : ""}`} placeholder="Name" value={firstname}
                  onChange={onFirstnameChange} onClick={() => setvalidaion(prev => ({ ...prev, fvalidation: false }))} />
                <label htmlFor="name" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="">
              <div className={`bi-form-group ${validation.lvalidation ? "error-red" : ""}`}>
                <input type="text" name="name" id="lastname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red" : ""}`} placeholder="Last" value={lastname}
                  onChange={onLastname} onClick={() => setvalidaion(prev => ({ ...prev, lvalidation: false }))} />
                <label htmlFor="name" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>

              </div>

            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className={`bi-form-group ${validation.evalidation ? "error-red" : ""}`}>
              <input type="email" name="email" id="email" className={`bi-form-field bg-white ${validation.evalidation ? "error-red" : ""}`} placeholder="Email" value={email}
                onChange={onEmailChange} onClick={() => setvalidaion(prev => ({ ...prev, evalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className={`bi-form-group ${validation.pvalidation ? "error-red" : ""}`}>
              <input type="email" name="email" id="email" maxLength="10" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red" : ""}`} placeholder="Email" value={phone}
                onChange={onphoneChange} onClick={() => setvalidaion(prev => ({ ...prev, pvalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Phone No{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
            <div className={`bi-form-group ${validation.mvalidation ? "error-red" : ""}`}>
              <input type="text" name="MachineProblem" id="MachineProblem" className={`bi-form-field bg-white ${validation.mvalidation ? "error-red" : ""}`} placeholder="Model Name" value={ModelName}
                onChange={onmodelChange} onClick={() => setvalidaion(prev => ({ ...prev, mvalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Model Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
            <div className={`bi-form-group ${validation.mfgYearvalidation ? "error-red" : ""}`}>
              <input type="text" name="MachineProblem" id="MachineProblem" className={`bi-form-field bg-white ${validation.mfgYearvalidation ? "error-red" : ""}`} placeholder="Mfg Year" value={mfgYear}
                onChange={onmfgyearchange} onClick={() => setvalidaion(prev => ({ ...prev, mfgYearvalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Mfg Year{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          <div className={`bi-form-group ${validation.workingvalidation ? "error-red" : ""}`}>
              <select className={`bi-form-field  ${WorkingCondition ? "" : "empty"}`} onChange={onworkingconditionchange}  onClick={() => setvalidaion(prev => ({ ...prev, workingvalidation: false }))} style={{ borderRadius: "4px " }} value={WorkingCondition} placeholder="Select Machine Working Condition" autoCapitalize='off' >
                <option value="" disabled></option>
                <option value="Yes">In working condition </option>
                <option value="No">Not in working condition </option>

              </select>
              <label className="heading-400-14-12 bi-form-label" >Select Machine Working Condition{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          <div className={`bi-form-group ${validation.warrentyvalidation ? "error-red" : ""}`}>
              <select className={`bi-form-field  ${warrenty ? "" : "empty"}`} onChange={onwarrentychange}  onClick={() => setvalidaion(prev => ({ ...prev, warrentyvalidation: false }))}style={{ borderRadius: "4px " }} value={warrenty} placeholder="Select Machine Working Condition" autoCapitalize='off' >
                <option value="" disabled></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>

              </select>
              <label className="heading-400-14-12 bi-form-label" >Is Machine in Warranty ?{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
          {serviceName !== "AMC" && (
            <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
              <div className={`bi-form-group ${validation.amcplanvalidation ? "error-red" : ""}`}>
                <select className={`bi-form-field  ${amcplan ? "" : "empty"}`} onChange={onAMCchange}  style={{ borderRadius: "4px " }} onClick={() => setvalidaion(prev => ({ ...prev, amcplanvalidation: false }))} value={amcplan} placeholder="Select Machine Working Condition" autoCapitalize='off' >
                  <option value="" disabled></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>

                </select>
                <label className="heading-400-14-12 bi-form-label" >Do you already have an AMC ?{<span style={{ color: '#CB1923' }}>*</span>}</label>
              </div>
            </div>
          )}

          <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
            <div className={`bi-form-group ${validation.mvalidation ? "error-red" : ""}`}>
              <Textarea minRows={5}  placeholder="" name="MachineProblem" id="MachineProblem"  value={MachineProblem}
                onChange={onmachineProblemChange} onClick={() => setvalidaion(prev => ({ ...prev, mvalidation: false }))} />
              <label htmlFor="email" className="heading-400-14-12 bi-form-label">Describe your machine problem{<span style={{ color: '#CB1923' }}>*</span>}</label>
            </div>
          </div>
   
          <Container className='d-f-l mb-4'>
            <Button message="Submit" callFunction={onSubmitHandler} />
          </Container>
        </div>

      </div>
    </>

  );
}

export default ContactForm;
