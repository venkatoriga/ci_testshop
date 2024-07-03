import React, { useState, useEffect } from 'react'
import FooterBottom2 from '../Footer/FooterBottom2';
import Button from '../Button/Button';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonOutline from '../Button/ButtonOutline';
import { secondClient, updateUserdetails } from '../OrigaExtentionAPI/mutations';
import Loader from "../SubComponent/Loader";
const MyProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [validation, setvalidaion] = useState({ fvalidation: false, lvalidation: false, apvalidation: false, evalidation: false });
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    phonenumber: "",
    aphonenumber: "",
  })
  const breadcrumbsItems = [{ name: "Home Page", link: "/" }, { name: "My Account", link: "/myaccount" }];
  const boldtitle = "My Profile"
  const isSmallScreen = window.innerWidth <= 576;
  const onEmailChange = (e) => setProfileData({ ...profileData, emailid: e.target.value });
  const onFirstnameChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {

      setProfileData({ ...profileData, firstname: sanitizedInput });
    }
  }
  const onLastname = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^a-zA-Z]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if (newInputString === '' || sanitizedInput === newInputString) {
      setProfileData({ ...profileData, lastname: sanitizedInput });
    }
  }

  const onAlterPhoneNoChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
      setProfileData({ ...profileData, aphonenumber: sanitizedInput })
    }
  }
  const onSubmitHandler = async () => {
    if (profileData.firstname === "" || profileData.lastname === "") {
      if (profileData.firstname === "") {
        setvalidaion(prev => ({
          ...prev,
          fvalidation: true
        }));
      }

      if (profileData.lastname === "") {
        setvalidaion(prev => ({
          ...prev,
          lvalidation: true
        }));

      }

      return;
    }
    if (profileData.emailid) {
      if (profileData.emailid.length < 8) {
        setvalidaion(prev => ({
          ...prev,
          evalidation: true
        }));
        return;
      } else {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const isValid = emailPattern.test(profileData.emailid);

        setvalidaion(prev => ({
          ...prev,
          evalidation: !isValid
        }));
        if (isValid === false) return
      }

    }
    try {
      setLoading(true)
      const id = localStorage.getItem('id');
      const { data: updateUser } = await secondClient.mutate({
        mutation: updateUserdetails,
        variables: {
            inputusers:{
              ompuserid:id,
              firstname:profileData.firstname,
              lastname:profileData.lastname,
              useremailid:profileData.emailid
          }
        }
        ,
      });
      localStorage.setItem('id',updateUser?.updateUserdetails?.userdetails?.ompUserId);
      localStorage.setItem('firstName', updateUser?.updateUserdetails?.userdetails?.firstName);
      localStorage.setItem('lastName', updateUser?.updateUserdetails?.userdetails?.lastName);
      localStorage.setItem('user', updateUser?.updateUserdetails?.userdetails?.ompUserId);
      localStorage.setItem('emailId',updateUser?.updateUserdetails?.userdetails?.userEmailId)
      setLoading(false)
      navigate('/myaccount')
      // console.log("login",updateUser);
      // onLoginData(true)
    }
    catch(error){
      setLoading(false)
      console.log('error while Updating User details------->',error);
    }
    // navigate('/myaccount')
  }
  useEffect(() => {
    if (profileData) {
      setProfileData({
        ...profileData,
        firstname: location.state?.fname,
        lastname: location.state?.lname,
        emailid: location.state?.emailid,
        phonenumber: location.state?.number,

      })
    }


  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className='max-container pt-4'>
        <Breadcrumbs backnavi={() => navigate('/myaccount')} boldtitle={boldtitle} items={breadcrumbsItems} />
      </div>
      <div className='max-container pt-5 pb-5'>

        <div className='container-fluid m-0 p-0 row d-flex align-items-center'>
          <div className='col col-lg-10 mx-auto bg-F9F9F9 pb-5'>
            <div className={`container ${isSmallScreen ? "pt-5" : "p-5"}`}>
              <div className=' row pt-5'>
                <div className='col col-12'>
                  <p className='heading-600-24-20 m-0'>Profile details</p>
                </div>
                <div className='col col-lg-4 pt-3'>

                  <h1 className='heading-600-16'>Point of Contact Details</h1>
                  <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>

                </div>

                <div className='col col-lg-8'>
                  <div className='row'>

                    <div className='col col-md-6'>
                      {/* <TextField fullWidth label={<>First Name<span style={{ color: '#CB1923' }}>*</span></> }  size='small' value={profileData.firstname} onChange={onFirstnameChange}/> */}
                      <div className={`bi-form-group ${validation.fvalidation ? "error-red" : ""}`}>
                        <input type="text" name="fname" id="fname" className={`bi-form-field bg-white ${validation.fvalidation ? "error-red" : ""}`} placeholder="Name"
                          value={profileData.firstname} onChange={onFirstnameChange} onClick={() => setvalidaion(prev => ({ ...prev, fvalidation: false }))} />
                        <label htmlFor="fname" className="heading-400-14-12 bi-form-label">First Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>

                    <div className='col col-md-6 col-12'>
                      {/* <TextField fullWidth label={<>Last Name<span style={{ color: '#CB1923' }}>*</span></>} size='small' value={profileData.lastname} onChange={onLastname}/> */}
                      <div className={`bi-form-group ${validation.lvalidation ? "error-red" : ""}`}>
                        <input type="text" name="lname" id="lname" className={`bi-form-field bg-white ${validation.lvalidation ? "error-red" : ""}`} placeholder="Name"
                          value={profileData.lastname} onChange={onLastname} onClick={() => setvalidaion(prev => ({ ...prev, lvalidation: false }))} />
                        <label htmlFor="lname" className="heading-400-14-12 bi-form-label">Last Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col'>
                      {/* <TextField type='email' fullWidth label="Email Id" size='small' value={profileData.emailid} onChange={onEmailChange} /> */}


                      <div className={`bi-form-group  ${validation.evalidation ? "error-red" : ""}`}>
                        <input type="email" name="email" id="email" className={`bi-form-field bg-white  ${validation.evalidation ? "error-red" : ""}`} placeholder="Email"
                          value={profileData.emailid} onChange={onEmailChange} onClick={() => setvalidaion(prev => ({ ...prev, evalidation: false }))} />
                        <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col col-md-6'>
                      {/* <TextField fullWidth label={<>Phone No<span style={{ color: '#CB1923' }}>*</span></> } size='small' value={profileData.phonenumber} onChange={onPhoneNoChange}/> */}
                      <div className={`bi-form-group `}>
                        <input type="text" name="phone" id="phone" className={`bi-form-field bg-white `} placeholder="Phone Number"
                          value={profileData.phonenumber} />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label" style={{ color: "#73509E99" }}>Phone Number{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>

                    </div>
                    <div className='col col-md-6 col-12'>
                      {/* <TextField fullWidth label="Alternative Phone No" size='small'  value={profileData.alternativenumber} onChange={onAlterPhoneNoChange}/> */}
                      <div className={`bi-form-group ${validation.apvalidation ? "error-red" : ""}`}>
                        <input type="text" name="phone" id="phone" className={`bi-form-field bg-white ${validation.apvalidation ? "error-red" : ""}`} placeholder="Alternative Phone Number"
                          value={profileData.aphonenumber} onChange={onAlterPhoneNoChange} onClick={() => setvalidaion(prev => ({ ...prev, apvalidation: false }))} />
                        <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Alternative Phone Number</label>
                      </div>
                    </div>
                  </div>
                  <div className='pt-5 d-flex justify-content-end gap-3'>
                    <ButtonOutline message={"Cancel"} callFunction={() => navigate('/myaccount')} /><Button message={"Submit"} callFunction={onSubmitHandler} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className='text-end'>
        <img src='/asset/Frame1000004018.png' alt='Frame1000004018.png' />
      </div>

      <FooterBottom2 />
    </>
  )
}

export default MyProfile