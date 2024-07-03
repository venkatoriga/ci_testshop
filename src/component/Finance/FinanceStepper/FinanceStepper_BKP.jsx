

import React, { useState, useEffect } from 'react'
import LeftArrow from '../../SubComponent/LeftArrow';
import StepperTick from '../../SubComponent/AllSvgs/StepperTick';
import FooterBottom2 from '../../Footer/FooterBottom2';
import { useNavigate, useLocation } from 'react-router';
import SuccessPopup from '../../SubComponent/AllBlock/SuccessPopup';
import './FinanceStepper.css'
import InterestRateDiv from '../InterestRateDiv';
import FinanceDocumentUploder from './FinanceDocumentUploder';
import { tickIcon } from '../../../helpers/Icons';
import gql from 'graphql-tag';
import OtpPage from "./OtpPage";
import FinancePendingPopup from './FinancePendingPopup';
import Loader from "../../SubComponent/Loader";
import { secondClient } from '../../OrigaExtentionAPI/mutations';
import { uploadIcon, fileIcon } from '../../../helpers/Icons';
import axios from "axios";
import LoginModel from '../../Authentication/LoginModel/LoginModel';

const createFinancerequest = gql`
mutation createFinancerequest ($requestinput:FinanceRequestInput!) {
  createFinancerequest(requestinput: $requestinput) {
    financerequest {
      id
      status
    }
    financerequestid
    message
    success
  }
}
`;

const priceConvert = (price) => {
  price = typeof price === 'string' ? price : String(price);


      let count=1;
      let comma=3;
       let formatedPrice=""
       for(let i=price.length-1;i>=0;i--){
           formatedPrice=price[i]+formatedPrice
           if(count===comma){
                formatedPrice=","+formatedPrice
               comma=2;
               count=0;
           }count++;
        
       }
       console.log("==>>",formatedPrice)
          if(formatedPrice[0]===","){
              formatedPrice =formatedPrice.slice(1, formatedPrice.length)
           }
           return formatedPrice;
   

 
};

const FinanceStepper = () => {

  const [isProfit, setIsProfit] = useState("We are Profitable");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const FinanceType = queryParams.get('Type');
  console.log('FinanceType---->', FinanceType);
  const [loginPortal, setLoginPortal] = useState(false);
  const [State, setState] = useState('');
  const [Segment, setSegment] = useState('');
  const [Industry, setIndustry] = useState('');
  const [Equipment, setEquipment] = useState('');
  const [Industry_name, setIndustry_name] = useState('');
  const [OEM, setOEM] = useState('');
  const [OEM_name, setOEM_name] = useState('');
  const [Machine, setMachine] = useState('');
  const [Machine_name, setMachine_name] = useState('');
  const [Model, setModel] = useState('');
  const [Model_name, setModel_name] = useState('');
  const [MachineType, setMachineType] = useState('');
  const [financerequestid, setfinancerequestid] = useState(null);
  const [showIntrestRate, SetshowIntrestRate] = useState(false);
  const [loading, setloading] = useState(false);
  const [otpvalidation, setotpvalidation] = useState(false);
  const [pendingresponse, setpendingresponse] = useState('');
  const [ShowRemainingField, setShowRemainingField] = useState(false);
  const [ShowFinancePopup, setShowFinancePopup] = useState(false);
  const [errormsg, seterrormsg] = useState(false);
  const [isDocuments, setisDocuments] = useState('');
  const [PendingValue, setPendingValue] = useState('');
  const [EMICalculation, setEMICalculation] = useState('');
  const [IntrestRangeFrom, setIntrestRangeFrom] = useState('');
  const [IntrestRangeTo, setIntrestRangeTo] = useState('');
  const [LowerSlabAmount, setLowerSlabAmount] = useState('');
  const [HigherSlabAmount, setHigherSlabAmount] = useState('');
  const [UploadedDocument, setUploadedDocument] = useState([]);
  // console.log('UploadedDocument----->', UploadedDocument);
  const [SegmentOption, setSegmentOption] = useState([]);
  const [IndustryOption, setIndustryOption] = useState([]);
  const [OEMOption, setOEMOption] = useState([]);
  const [MachineOption, setMachineOption] = useState([]);
  const [Rating, setRating] = useState('');
  const [CreditAgency, setCreditAgency] = useState('');
  const [RatingInputMode, setRatingInputMode] = useState('select');
  const [Range, setRange] = useState('');
  const [Collateral, setCollateral] = useState('');
  const [Preference, setPreference] = useState('');
  const [Tenure, setTenure] = useState('');
  const [LegalType, setLegalType] = useState('');
  const [ModelOption, setModelOption] = useState([]);
  const [Rated, setRated] = useState('');
  const [Profitable, setProfitable] = useState(false);
  const [RatingText, setRatingText] = useState('');
  const [industrysegmentnegative, setindustrysegmentnegative] = useState(false);
  const [displayedMachinePrice, setDisplayedMachinePrice] = useState("");
  // console.log("select option-->>>", selectOption3);
  const [activeStep, setActiveStep] = useState(1)

  const [validation, setvalidaion] = useState({
    vselectedOption: false, vselectedOption1: false, vselectedOption2: false, vselectedOption3: false,
    MNamevalidation: false, MMakevalidation: false, MPinValidation: false,
    companyvalidation: false, Segmentvalidation: false, Equipmentvalidation: false, NoEqipvalidation: false, BusinessVintagevalidation: false, pvalidation: false, Industryvalidation: false, OEMvalidation: false, Machinevalidation: false, Emailvalidation: false,
    Modelvalidation: false, MachineTypevalidation: false, LocationValidation: false, Statevalidation: false, OtherEqipvalidation: false, OtherModelvalidation: false, OtherMachinevalidation: false, OtherIndustryvalidation: false, OtherOEMvalidation: false
  });
  const [validation1, setvalidaion1] = useState({ RatedValidation: false, Creditagency: false, RatingText: false, RatingValidation: false, RangeValidation: false, TenureValidation: false, PreferenceValidation: false, LegalTypeValidation: false, isDocumentsValidation: false })
  const [onetTimeRepairformData, setOnetTimeRepairFormData] = useState({
    id: null,
    customerid: null,
    firstname: '',
    lastname: '',
    emailid: '',
    companyname: '',
    phonenumber: '',
    machinename: '',
    machinedescription: '',
    machineprice: '',
    preference: '',
    tenure: '',
    legaltype: '',
    rated: false,
    // rating: "",
    creditagencyid: '0',
    creditagency: '',
    ratingid: '0',
    rating: '',
    profitable: false,
    revenue: '',
    collateral: '',
    requireddocuments: false,
    leasingtype: "loan",
    financelead: true,
    documentlist: UploadedDocument,
    segmentcode: '0',
    industrycode: '0',
    oemcode: '0',
    machinecode: '0',
    modelnocode: '0',
    machinetypecode: '0',
    otherindustry: '',
    otheroem: '',
    othermachine: '',
    othermodelno: '',
    equipmentid: '',
    equipment: '',
    noofequipment: '',
    equipmentdetails: '',
    businessvintage: '',
    industrysegmentnegative: industrysegmentnegative,
    location: '',
    state: '',
    basicinfo: true,
    financeinfo: false,
  });
  const navigate = useNavigate();
  const loggedin = !!localStorage.getItem('userToken');
  console.log('loggedin----->', loggedin);
  useEffect(() => {
    const fname = localStorage.getItem('firstName');
    const lname = localStorage.getItem('lastName');
    const emailid = localStorage.getItem('emailId');
    const number = localStorage.getItem('number')
    const fetchData = async () => {
      if (!loggedin) {
        setLoginPortal(true);
        return;
      }

      try {
        setloading(true);
        const response = await fetch(`https://devextension.origa.market/api/getfinancedata`, {
          method: "POST",
          body: JSON.stringify({ "phonenumber": number }),
        });
        const responseData = await response.json();

        if (responseData?.result.length > 0) {
          setloading(false);
          setpendingresponse(responseData);
          setotpvalidation(false);
          setShowFinancePopup(true);
        } else {
          setloading(false);
          setotpvalidation(false);
          setShowRemainingField(true);
        }
      } catch (error) {
        setloading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if (loggedin) {
      setOnetTimeRepairFormData({
        ...onetTimeRepairformData,
        firstname: fname + " " + lname,
        phonenumber: number
      });
      setShowRemainingField(true)
    }
  }, [loggedin]);




  console.log('onetTimeRepairformData===============>', onetTimeRepairformData);
  const [showModel, setShowModel] = useState(false);
  const onEmailidChange = (e) => setOnetTimeRepairFormData({ ...onetTimeRepairformData, emailid: e.target.value })
  const onCompanyNameChange = (e) => setOnetTimeRepairFormData({ ...onetTimeRepairformData, companyname: e.target.value })
  const onUserNameChange = (e) => setOnetTimeRepairFormData({ ...onetTimeRepairformData, firstname: e.target.value })
  useEffect(() => {
    if (PendingValue !== '') {
      // console.log('PendingValue---->', PendingValue);
      const modifiedValue = PendingValue?.result[0];
      modifiedValue.machineprice = parseInt(modifiedValue.machineprice); // Remove decimal part
   
      setOnetTimeRepairFormData(modifiedValue);
      setEquipment(modifiedValue.equipmentid.toString()); // Convert to string
      if (modifiedValue.industrycode === 0) {
        setIndustry('Others');
      }
      const formattedMachinePrice = priceConvert(modifiedValue.machineprice.toString());
    setDisplayedMachinePrice(formattedMachinePrice);
    }
  }, [PendingValue]);
  useEffect(() => {
    setPreference(FinanceType)

  }, [FinanceType]);



  const onStepTwoBtn = async () => {
    if (activeStep === 3) {
      if (Preference === "" || LegalType === "" || isDocuments === "") {
        if (Preference === "") { setvalidaion1(prev => ({ ...prev, PreferenceValidation: true })) }
        if (LegalType === "") { setvalidaion1(prev => ({ ...prev, LegalTypeValidation: true })) }
        if (isDocuments === "") { setvalidaion1(prev => ({ ...prev, isDocumentsValidation: true })) }
        window.scroll(0, 0)
        return
      }
      if (isDocuments === 'Yes') {
        if (onetTimeRepairformData.emailid === "") {
          setvalidaion(prev => ({ ...prev, Emailvalidation: true }));
          window.scroll(0, 0);
          return
        }


      }
      if (isDocuments === 'Yes' && UploadedDocument.length !== 3) {
        console.log('UploadedDocument----->', UploadedDocument);
        seterrormsg(true)
        return
      }
      // setOnetTimeRepairFormData((prevData) => ({
      //   ...prevData,
      //   id: financerequestid,
      //   financeinfo: true
      // }));
    }
    if (activeStep === 1) {
      setloading(true)
      try {
        const response = await fetch(`https://devextension.origa.market/api/getleaserentallist`, {
          method: "POST",
          body: JSON.stringify({ "principalAmount": onetTimeRepairformData.machineprice })
        });
        const responseData = await response.json();
        setEMICalculation(responseData)
        setloading(false)
        //console.log('Model----->', responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (onetTimeRepairformData.firstname === "" || onetTimeRepairformData.phonenumber === "" || onetTimeRepairformData.companyname === "" ||
      onetTimeRepairformData.segmentcode === "0" || onetTimeRepairformData.noofequipment === "" || onetTimeRepairformData.equipment === "" ||
      onetTimeRepairformData.businessvintage === "" || onetTimeRepairformData.machineprice === "" || onetTimeRepairformData.location === "" || onetTimeRepairformData.state === "") {
      console.log('working..');
      if (onetTimeRepairformData.firstname === "") { setvalidaion(prev => ({ ...prev, MNamevalidation: true })) }
      if (onetTimeRepairformData.phonenumber === "") { setvalidaion(prev => ({ ...prev, MMakevalidation: true })) }
      if (onetTimeRepairformData.companyname === "") { setvalidaion(prev => ({ ...prev, companyvalidation: true })) }
      if (onetTimeRepairformData.segmentcode === "0") { setvalidaion(prev => ({ ...prev, Segmentvalidation: true })) }
      if (onetTimeRepairformData.equipment === "") { setvalidaion(prev => ({ ...prev, Equipmentvalidation: true })) }
      if (onetTimeRepairformData.noofequipment === "") { setvalidaion(prev => ({ ...prev, NoEqipvalidation: true })) }
      if (onetTimeRepairformData.businessvintage === "") { setvalidaion(prev => ({ ...prev, BusinessVintagevalidation: true })) }
      // if (onetTimeRepairformData.industrycode === "0") { setvalidaion(prev => ({ ...prev, Industryvalidation: true })) }
      // if (onetTimeRepairformData.oemcode === "0") { setvalidaion(prev => ({ ...prev, OEMvalidation: true })) }
      // if (onetTimeRepairformData.machinecode === "0") { setvalidaion(prev => ({ ...prev, Machinevalidation: true })) }
      // if (onetTimeRepairformData.machinetypecode === "0") { setvalidaion(prev => ({ ...prev, MachineTypevalidation: true })) }
      if (onetTimeRepairformData.machineprice === "") { setvalidaion(prev => ({ ...prev, MPinValidation: true })) }
      if (onetTimeRepairformData.state === "") { setvalidaion(prev => ({ ...prev, Statevalidation: true })) }
      if (onetTimeRepairformData.location === "") { setvalidaion(prev => ({ ...prev, LocationValidation: true })) }
      window.scroll(0, 0)
      return
    }
    else if (Equipment === "1") {
      if (onetTimeRepairformData.equipmentdetails === "") {
        setvalidaion(prev => ({ ...prev, OtherEqipvalidation: true }));
        window.scroll(0, 0);
        return;
      }
    }
    // else if (Industry === "Others") {
    //   if (onetTimeRepairformData.otherindustry === "") {
    //     setvalidaion(prev => ({ ...prev, OtherIndustryvalidation: true }));
    //     window.scroll(0, 0);
    //     return;
    //   }
    //   if (onetTimeRepairformData.otheroem === "") {
    //     setvalidaion(prev => ({ ...prev, OtherOEMvalidation: true }));
    //     window.scroll(0, 0);
    //     return;
    //   }
    // }
    // else if (Industry !== "Others") {
    //   if (onetTimeRepairformData.industrycode === "0") {
    //     setvalidaion(prev => ({ ...prev, Industryvalidation: true }));
    //     window.scroll(0, 0);
    //     return;
    //   }
    //   if (onetTimeRepairformData.oemcode === "0") {
    //     setvalidaion(prev => ({ ...prev, OEMvalidation: true }));
    //     window.scroll(0, 0);
    //     return;
    //   }
    //   if (MachineOption.length > 0) {
    //     if (onetTimeRepairformData.machinecode === "0") {
    //       setvalidaion(prev => ({ ...prev, Machinevalidation: true }));
    //       window.scroll(0, 0);
    //       return;

    //     }
    //   }
    // }

    // else if (MachineOption.length === 0 || ModelOption.length === 0) {
    //   if (onetTimeRepairformData.othermachine === "") {
    //     // console.log('worijninn');
    //     setvalidaion(prev => ({ ...prev, OtherMachinevalidation: true }));
    //     window.scroll(0, 0);
    //     return;
    //   }
    //   if (onetTimeRepairformData.othermodelno === "") {
    //     setvalidaion(prev => ({ ...prev, OtherModelvalidation: true }));
    //     window.scroll(0, 0);
    //     return;
    //   }
    // }





    try {
      setloading(true)
      const { data } = await secondClient.mutate({
        mutation: createFinancerequest,
        variables: {
          requestinput: onetTimeRepairformData
        }
      });
      console.log("API Response==>", data);
      setfinancerequestid(data?.createFinancerequest?.financerequestid)
      setloading(false)
    } catch (error) {
      setloading(false)
      console.error('API Error==>', error.message);

    }
    if (activeStep === 3) {
      setShowModel(true);
    }
    else {
      setActiveStep(2);
      window.scrollTo(0, 0);
    }
  }



  const onPhoneChange = (e) => {

    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

    // Update the state only if the input is empty or contains valid characters
    if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length <= 10) {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, phonenumber: sanitizedInput })
    }
    if (sanitizedInput.length === 10 && !loggedin) {
      setotpvalidation(true)
    }
    else {
      setotpvalidation(false)
    }
  }


  const onPriceChange = (e) => {
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
    setDisplayedMachinePrice(priceConvert(sanitizedInput));
    setOnetTimeRepairFormData(prevFormData => ({
      ...prevFormData,
      machineprice: parseInt(sanitizedInput, 10) || 0, 
    }));
  };



  

  const topHeading = activeStep === 2 ? `${FinanceType} Calculator` : `${FinanceType} Application`
  const topPara = activeStep === 2 ? "" : "Fill out this form and apply for a lease, loan or both and finance your machine with ease."


  const step1FormField = {
    centerHeading: "Personal Details",
    centerPara: "Enter the details of the person applying for finance",
    bottomHeading: "Machine Details",
    bottomPara: "Enter the details of your machine to help us better understand your requirements",
  }

  const onHide = () => {
    setShowModel(false)
    window.scrollTo(0, 0);
    navigate('/')
  }
  const getButtonColor1 = () => {
    if (activeStep === 1) {
      return '#73509E';
    } else {
      return '#3C7D0E';
    }
  };
  const getButtonColor2 = () => {
    if (activeStep === 2) {
      return '#73509E';
    } else if (activeStep < 2) {
      return '#DDDDDD';
    } else {
      return '#3C7D0E';
    }
  };
  const getButtonColor3 = () => {
    if (activeStep === 3) {
      return '#73509E';
    } else if (activeStep < 3) {
      return '#DDDDDD';
    } else {
      return '#3C7D0E';
    }
  };



  const onBackNaviagte = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    } else {
      navigate('/finance')
    }

  }
  const onStateChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, state: e.target.value })
    setState(e.target.value);
  };
  const onMachineTypeChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, machinetypecode: e.target.value })
    setMachineType(e.target.value);
  };
  const onModelChange_name = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, othermodelno: e.target.value })
    setModel_name(e.target.value);
  };
  const onModelChange = (e) => {
    const selectedOption = ModelOption.find(option => option.modelCode === parseInt(e.target.value));
    setOnetTimeRepairFormData({
      ...onetTimeRepairformData,
      modelnocode: e.target.value,
      othermodelno: selectedOption ? selectedOption.model : ''
    });
    setModel(e.target.value);
  };

  const onMachine_nameChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, othermachine: e.target.value })
    setMachine_name(e.target.value);
  };
  const onMachineChange = (e) => {
    const selectedOption = MachineOption.find(option => option.machineCode === parseInt(e.target.value));
    setOnetTimeRepairFormData({
      ...onetTimeRepairformData,
      machinecode: e.target.value,
      othermachine: selectedOption ? selectedOption.machine : ''
    });
    setMachine(e.target.value);
  };
  const onOEMChange_name = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, otheroem: e.target.value })
    setOEM_name(e.target.value);
  };
  const onOEMChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, oemcode: e.target.value })
    setOEM(e.target.value);
  };
  const onIndustryChange_name = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, otherindustry: e.target.value })
    setIndustry_name(e.target.value);

  };
  const onIndustryChange = (e) => {
    if (e.target.value === 'Others') {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, industrycode: '0' })
      setIndustry(e.target.value);
    } else {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, industrycode: e.target.value })
      setIndustry(e.target.value);
    }
  };
  const onBusinessVintageChange = async (e) => {
    const businessvin = e.target.value;
    const businessvintage = businessvin.replace(/[^0-9]/g, '');
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, businessvintage: businessvintage })

  };
  const onotherequipmentChange = async (e) => {
    const otherequipment = e.target.value;
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, equipmentdetails: otherequipment })
  };
  const onEquipmentNoChange = async (e) => {
    const equipmentNo = e.target.value;
    const NoofEquipment = equipmentNo.replace(/[^0-9]/g, '');
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, noofequipment: NoofEquipment })
  };
  const onEquipmentChange = async (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].text;
    console.log('e-------->', e.target.value);
    //console.log('selectedOption----->',selectedOption);
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, equipmentid: e.target.value, equipment: selectedOption })
    // setOnetTimeRepairFormData({ ...onetTimeRepairformData, equipment: selectedOption })
    setEquipment(e.target.value);
  };
  const onSegmentChange = async (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, segmentcode: e.target.value })
    setSegment(e.target.value);
  };

  const onLegalTypeChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, legaltype: e.target.value })
    setLegalType(e.target.value);
  };
  const onTenureChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, tenure: e.target.value })
    setTenure(e.target.value);
  };
  const onPreferenceChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, preference: e.target.value })
    setPreference(e.target.value);
  };
  const onLocationChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, location: e.target.value })
    //setlocation(e.target.value);
  };
  useEffect(() => {
    const fetchData = async (segmentCode, industrycode, oemcode, machinecode, modelnocode, machinetypecode) => {
      try {
        setloading(true)
        let bodyData = {};
        if (segmentCode) {
          bodyData.segmentCode = segmentCode;
        }
        if (industrycode) {
          bodyData.industryCode = industrycode;
        }
        if (oemcode) {
          bodyData.oemCode = oemcode;
        }
        const response = await fetch(`https://devextension.origa.market/api/geteasmaster`, {
          method: "POST",
          body: JSON.stringify(bodyData)
        });
        const responseData = await response.json();
        console.log('responseData For Dropdown=====>', responseData?.data);
        setSegment(responseData?.data[0]?.segmentCode)
        setIndustry(responseData?.data[0]?.industryCode)
        setOEM(responseData?.data[0]?.oemCode)
        setMachine(machinecode)
        setModel(modelnocode)
        setMachineType(machinetypecode)
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching data:', error);
      }
    };
    if (PendingValue !== "") {
      const segmentCode = PendingValue?.result[0]?.segmentcode || null
      const industrycode = PendingValue?.result[0]?.industrycode || null
      const oemcode = PendingValue?.result[0]?.oemcode || null
      const machinecode = PendingValue?.result[0]?.machinecode || null
      const modelnocode = PendingValue?.result[0]?.modelnocode || null
      const machinetypecode = PendingValue?.result[0]?.machinetypecode || null
      //console.log('machinetypecode');
      //setMachineType(JSON.stringify(machinetypecode))
      fetchData(segmentCode, industrycode, oemcode, machinecode, modelnocode, machinetypecode);
    }
  }, [PendingValue]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await fetch(`https://devextension.origa.market/api/geteasmaster`, {
          method: "POST",
          body: JSON.stringify({ "level": "Segment" })
        });
        const responseData = await response.json();
        setSegmentOption(responseData?.data)
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching data:', error);
      }
    };
    if (ShowRemainingField) {
      fetchData();
    }
    if (PendingValue === "") {
      setIndustry("");
      setOEM("");
      setMachine("");
      setModel("")
      setMachineType("")
    }

  }, [PendingValue, ShowRemainingField]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await fetch(`https://devextension.origa.market/api/geteasmaster`, {
          method: "POST",
          body: JSON.stringify({ "segmentCode": Segment })
        });
        const responseData = await response.json();
        console.log('Industry----->', responseData?.data);
        // Filter out duplicate records based on industryType
        // const uniqueRecords = responseData?.data.filter((record, index, self) =>
        //   index === self.findIndex((r) => (
        //     r.industryType === record.industryType
        //   ))
        // );
        setIndustryOption(responseData?.data)
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching data:', error);
      }
    };
    if (Segment !== "") {
      fetchData();
    }
    // setIndustry("");
    // setOEM("");
    // setMachine("");
    // setModel("")
    // setMachineType("")

  }, [Segment]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        let bodyData = {
          "segmentCode": Segment,
        };

        // Conditionally include "industryCode" if Industry is not "Others"
        if (Industry && Industry !== "Others") {
          bodyData.industryCode = Industry;
        } else {
          bodyData.level = "oem";
        }

        const response = await fetch(`https://devextension.origa.market/api/geteasmaster`, {
          method: "POST",
          body: JSON.stringify(bodyData)
        });
        const responseData = await response.json();
        console.log('OEM----->', responseData);


        setOEMOption(responseData?.data);
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching data:', error);
      }
    };

    // Trigger the fetch only if both Segment and Industry are set
    if (Segment && Industry) {
      fetchData();
    }
  }, [Segment, Industry]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await fetch(`https://devextension.origa.market/api/geteasmaster`, {
          method: "POST",
          body: JSON.stringify({ "segmentCode": Segment, "industryCode": Industry, "oemCode": OEM })
        });
        const responseData = await response.json();
        // console.log('OEM----->', responseData);
        setMachineOption(responseData?.data)
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching data:', error);
      }
    };
    if (Segment !== "" && Industry !== "" && OEM !== "") {
      fetchData();
    }

  }, [Segment, Industry, OEM]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await fetch(`https://devextension.origa.market/api/geteasmaster`, {
          method: "POST",
          body: JSON.stringify({ "segmentCode": Segment, "industryCode": Industry, "oemCode": OEM, "machineCode": Machine })
        });
        const responseData = await response.json();
        setModelOption(responseData?.data)
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching data:', error);
      }
    };
    if (Segment !== "" && Industry !== "" && OEM !== "" && Machine !== "") {
      fetchData();
    }

  }, [Segment, Industry, OEM, Machine]);

  const handleRangeChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, revenue: e.target.value })
    setRange(e.target.value);
  };

  const handleCollateralChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, collateral: e.target.value })
    setCollateral(e.target.value);
  };

  const onRatingTextChange = (e) => {
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, ratingid: '0', rating: e.target.value });
    setRatingText(e.target.value)
  };

  const handleRatingChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const optionText = selectedOption.textContent;
    setOnetTimeRepairFormData({ ...onetTimeRepairformData, ratingid: e.target.value, rating: optionText });
    setRating(e.target.value);
  };

  const handleCreditagencyChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const optionText = selectedOption.textContent;
    // console.log('optionText------->',optionText);
    setOnetTimeRepairFormData({
      ...onetTimeRepairformData,
      creditagencyid: e.target.value,
      creditagency: optionText
    });
    setCreditAgency(e.target.value);
    if (e.target.value >= '4' && e.target.value <= '8') {
      setRatingInputMode('text');
      setRating('25')
    } else {
      // Otherwise, set the rating input mode to select
      setRatingInputMode('select');
    }
  };

  const handleRatedChange = (e) => {
    if (e.target.value === 'yes') {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, rated: true })
    }
    else {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, rated: false })
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, ratingid: '25' })
      setCreditAgency('25')
      setRating('25')
    }
    setRated(e.target.value);
  };

  const handleProfitableChange = (value) => {
    if (value === 'yes') {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, profitable: true });
      setindustrysegmentnegative(true);
      setIsProfit("We are Profitable");
    } else {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, profitable: false });
      setindustrysegmentnegative(false);
      setIsProfit("We are not Profitable");
    }
    setProfitable(value);
  };

  useEffect(() => {
    if (activeStep === 2) {
      const EMIData = EMICalculation?.data?.body?.data;
      if (EMIData) {
        let filteredData = EMIData;
        if (Rated === 'no') {
          filteredData = filteredData.filter(item => item.creditRatingLesserOrEquals === 0.0);
        }
        if (Profitable === 'no' && Collateral) {
          filteredData = filteredData.filter(item => item.profitability === false && item.collateralGreaterOrEquals === parseInt(Collateral));
        }
        if (Rating) {
          if (parseInt(Rating) <= 6) {
            filteredData = filteredData.filter(item => item.creditRatingLesserOrEquals === 6.0);
          }
          if (parseInt(Rating) > 6 && parseInt(Rating) <= 15) {
            filteredData = filteredData.filter(item => item.creditRatingLesserOrEquals === 8.0);
          }
          if (parseInt(Rating) > 15) {
            filteredData = filteredData.filter(item => item.creditRatingLesserOrEquals === 0.0);
          }
        }
        if (Tenure) {
          filteredData = filteredData.filter(item => item.tenure === parseInt(Tenure));
        }
        if (Range) {
          filteredData = filteredData.filter(item => item.revenueValue === Range);
        }
        if (Range && Rating) {
          filteredData = filteredData.filter(item =>
            item.revenueValue === Range &&
            ((parseInt(Rating) <= 6 && item.creditRatingLesserOrEquals === 6.0) ||
              (parseInt(Rating) > 6 && parseInt(Rating) <= 15 && item.creditRatingLesserOrEquals === 8.0) ||
              (parseInt(Rating) > 15 && item.creditRatingGreaterOrEquals === 25.0))
          );
        }
        console.log('filteredData:', filteredData);
        if (filteredData.length > 0) {
          // Find the min and max values for interest range and EMI
          const minIntrestRangeFrom = Math.min(...filteredData.map(item => item.rateRangeFrom));
          const maxIntrestRangeTo = Math.max(...filteredData.map(item => item.rateRangeTo));
          const minLowerSlabAmount = Math.min(...filteredData.map(item => item.lowerSlabAmount));
          const maxHigherSlabAmount = Math.max(...filteredData.map(item => item.higherSlabAmount));

          // Set the state with the min and max values
          setIntrestRangeFrom(minIntrestRangeFrom);
          setIntrestRangeTo(maxIntrestRangeTo);
          setLowerSlabAmount(minLowerSlabAmount);
          setHigherSlabAmount(maxHigherSlabAmount);
        }
        else {
          // Find the min and max values for interest range and EMI
          const minIntrestRangeFrom = Math.min(...EMIData.map(item => item.rateRangeFrom));
          const maxIntrestRangeTo = Math.max(...EMIData.map(item => item.rateRangeTo));
          const minLowerSlabAmount = Math.min(...EMIData.map(item => item.lowerSlabAmount));
          const maxHigherSlabAmount = Math.max(...EMIData.map(item => item.higherSlabAmount));

          // Set the state with the min and max values
          setIntrestRangeFrom(minIntrestRangeFrom);
          setIntrestRangeTo(maxIntrestRangeTo);
          setLowerSlabAmount(minLowerSlabAmount);
          setHigherSlabAmount(maxHigherSlabAmount);

        }
      }
    }
  }, [Rated === 'no', Collateral, Range, Rating, Tenure]);

  const onStepTwoBtn_2 = () => {
    if (Rated === "" || Rating === "" || CreditAgency === "" || Range ==='' || Tenure === '') {
      if (Rated === "") { setvalidaion1(prev => ({ ...prev, RatedValidation: true })) }
      if (CreditAgency === "") { setvalidaion1(prev => ({ ...prev, Creditagency: true })) }
      if (Rating === "") { setvalidaion1(prev => ({ ...prev, RatingValidation: true })) }
      if (Range === "") { setvalidaion1(prev => ({ ...prev, RangeValidation: true })) }
      if (Tenure === "") { setvalidaion1(prev => ({ ...prev, TenureValidation: true })) }
      window.scroll(0, 0)
      return
    }
    if (RatingInputMode === 'text') {
      if (RatingText === '') {
        console.log('RatingText----->*******', RatingText);
        setvalidaion1(prev => ({ ...prev, RatingText: true }))
        window.scroll(0, 0)
        return
      }
    }
    setActiveStep(3);
  }

  const isDocumentsChange = (e) => {
    if (e.target.value === 'Yes') {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, requireddocuments: true })
    } else {
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, requireddocuments: false })
    }
    setisDocuments(e.target.value)
  };
  useEffect(() => {
    if (activeStep === 3) {
      setOnetTimeRepairFormData((prevData) => ({
        ...prevData,
        id: financerequestid,
        financeinfo: true
      }));
    }
    if (activeStep !== 3) {
      setOnetTimeRepairFormData((prevData) => ({
        ...prevData,
        id: financerequestid,
        financeinfo: false
      }));

    }
  }, [activeStep]);
  const handleBrowse = (id) => {
    document.querySelector(`#${id}`).value = "";
    document.querySelector(`#${id}`).click();
  };

  const onGSTChange=(e)=>{
    const newInputString = e.target.value;
    const sanitizedInput = newInputString.replace(/[^0-9]/g, '')
      setOnetTimeRepairFormData({ ...onetTimeRepairformData, pincode:priceConvert(sanitizedInput)})
    
  }
  console.log('UploadedDocument----->***********', UploadedDocument);
  const handleFileChange = async (files, id) => {
    let Documenttype;
    if (id === 'UploadQuotation') {
      Documenttype = 'Upload Quotation / Proforma Invoice of equipment'
    }
    else if (id === 'ITRS') {
      Documenttype = 'Upload Latest audited financial statements / ITRS'
    }
    else {
      Documenttype = 'Upload Company / Individual PAN'
    }
    if (!files.length) {
      return;
    }

    try {
      // Use Promise.all to upload multiple files concurrently
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("financeid", financerequestid);

        const response = await axios.post(
          "https://devextension.origa.market/api/uploadfinancedoc",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return {
          name: file.name || "Unknown File",
          imageUrl: response.data.url,
          documentType: Documenttype
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);


      // Check if the uploaded file has the same documentType as any existing file
      const existingFileIndex = UploadedDocument.findIndex(file => file.documentType === uploadedFiles[0]?.documentType);

      // If a file with the same documentType exists, replace it with the new one
      if (existingFileIndex !== -1) {
        const newUploadedDocument = [...UploadedDocument];
        newUploadedDocument[existingFileIndex] = uploadedFiles[0];
        setUploadedDocument(newUploadedDocument);
      } else {
        // If no file with the same documentType exists, add the new file to the UploadedDocument
        setUploadedDocument(prevUploadedFiles => [...prevUploadedFiles, ...uploadedFiles]);
      }

      // Update the state with the uploaded files
    const updatedFormData = {
        ...onetTimeRepairformData,
        documentlist: [...onetTimeRepairformData.documentlist, ...uploadedFiles]
      };
     setOnetTimeRepairFormData(updatedFormData);


      // // Wait for all uploads to complete
      // const uploadedFiles = await Promise.all(uploadPromises);
      // console.log('UploadedDocument----->***********',UploadedDocument);
      // console.log('updatedFormData----->***********',uploadedFiles[0]?.documentType);
      // // Update the state with the uploaded files
      // const updatedFormData = {
      //   ...onetTimeRepairformData,
      //   documentlist: [...onetTimeRepairformData.documentlist, ...uploadedFiles]
      // };

      // setOnetTimeRepairFormData(updatedFormData);
      // setUploadedDocument(prevUploadedFiles => [...prevUploadedFiles, ...uploadedFiles]);

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
      {/* {loginPortal && <LoginModel onHide={onHidePortal} />} */}
      {loading && <Loader />}
      {ShowFinancePopup && <FinancePendingPopup pendingresponse={pendingresponse} setShowFinancePopup={setShowFinancePopup} setShowRemainingField={setShowRemainingField} setPendingValue={setPendingValue} />}
      {showModel && <SuccessPopup message={`Thank You for Your ${FinanceType} Application!`} onHide={onHide} />}
      <div className='max-container'>
        <div className='pt-5'>
          {/* Stepper Top Section*/}
          <div className='max-container pb-5'>
            <div className='container-fluid row p-0 m-0'>
              <div className='col col-lg-2 col-12 pl-0'>
                <LeftArrow callFun={onBackNaviagte} />
              </div>
              {/* for desktop */}
              <div className='col col-lg-10 hide-992'>
                <div className='d-flex'>

                  {/* step 1 btn */}
                  <div className='d-flex'>
                    <button className="stepperBtn" style={{ backgroundColor: getButtonColor1() }} >{activeStep > 1 ? tickIcon({ width: 20, height: 20 }) : 1}</button>
                    <p className={`${activeStep === 1 ? "heading-600-16-12" : "heading-400-16-12 op-60 "}  v-center pl-2 pr-2`}>General Details</p>
                  </div>

                  {/* line */}
                  {<div className=' mr-2 stepper-line v-center'></div>}
                  {/* step 2 btn */}
                  {<div className='d-flex'>
                    <button className="stepperBtn" style={{ backgroundColor: getButtonColor2() }} >{activeStep > 2 ? tickIcon({ width: 20, height: 20 }) : 2}</button>
                    <p className={`${activeStep === 2 ? "heading-600-16-12" : "heading-400-16-12 op-60 "} v-center pl-2 pr-2`}>Calculate interest rate</p>
                  </div>}

                  {/* line */}
                  <div className='mr-2 stepper-line v-center'></div>
                  {/* step 3 btn*/}
                  <div className='d-flex'>
                    <button className="stepperBtn" style={{ backgroundColor: getButtonColor3() }} >{activeStep > 3 ? tickIcon({ width: 20, height: 20 }) : 3}</button>
                    <p className={`${activeStep === 3 ? "heading-600-16-12" : "heading-400-16-12 op-60 "}  v-center pl-2`}>Lending Details</p>
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

                        <button className="stepperBtn" style={{ backgroundColor: getButtonColor1() }} >{activeStep > 1 ? tickIcon({ width: 15, height: 15 }) : 1}</button>
                        <p style={{ backgroundColor: " #00000066", width: "40%", height: '2px', margin: "auto 0px" }}></p>
                      </div>
                      <div className="col col-4 p-0 d-flex justify-content-center">
                        <p style={{ backgroundColor: " #00000066", width: "45%", height: '2px', margin: "auto 0px" }}></p>
                        <button className="stepperBtn" style={{ backgroundColor: getButtonColor2() }}>{activeStep > 2 ? tickIcon({ width: 15, height: 15 }) : 2}</button>
                        <p style={{ backgroundColor: " #00000066", width: "45%", height: '2px', margin: "auto 0px" }}></p>
                      </div>
                      <div className="col col-4 p-0 d-flex justify-content-start">
                        <p style={{ backgroundColor: " #00000066", width: "40%", height: '2px', margin: "auto 0px" }}></p>
                        <button className="stepperBtn" style={{ backgroundColor: getButtonColor3() }} >{activeStep > 3 ? tickIcon({ width: 20, height: 20 }) : 3}</button>

                      </div>
                    </div>
                  </div>
                  {/* stepper button end*/}

                  {/* stepper button description start*/}
                  <div className='col col-12'>
                    <div className="row">
                      <div className={`col-4 p-0 pt-2 text-center ${activeStep === 1 ? "heading-600-16-12 pl-2" : "heading-400-16-12 op-60 pl-2"} `}>General Details</div>
                      <div className={`col-4 pt-2 text-center ${activeStep === 2 ? " heading-600-16-12" : " heading-400-16-12 op-60"}`}>Calculate interest rate</div>
                      <div className={`col-4 pt-2 p-0 text-center ${activeStep === 3 ? " heading-600-16-12" : " heading-400-16-12 op-60"}`}>Lending Details</div>
                    </div>
                  </div>
                  {/* stepper button description start*/}
                </div>
              </div>
              {/* for tablet end*/}
            </div>
          </div>
          {/* Stepper Bottom Section*/}
          <div className='f-stpper-container bg-gray'>
            {/*Form top section start*/}
            <div className='row '>
              <div className='col col-12'>
                <h1 className='heading-600-24-20'>{topHeading}</h1>
              </div>
              <div className='col col-lg-11 col-12 '>
                <p className='heading-400-14 op-60 m-0 pt'>{topPara}</p>
              </div>
            </div>
            {/*Form top section end*/}
            {/* -----------------------Steper 1---------------------------------------- */}
            {activeStep === 1 ? <div className='container p-0'>
              {/*Form middle section start*/}
              <div className='row'>
                <div className='col col-lg-4 hide-992 pt-30'>
                  <h1 className='heading-600-16 m-0 pt-5'>{step1FormField.centerHeading}</h1>
                  <p className='heading-400-14 op-60 pt-12'>{step1FormField.centerPara}</p>
                </div>
                <div className='col col-lg-8 col-12'>
                  <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                    <div className={`bi-form-group ${validation.MNamevalidation ? "error-red" : ""}`}>
                      <input type="text" name="machine-name" id="machine-name" className={`bi-form-field bg-white ${validation.MNamevalidation ? "error-red" : ""}`} value={onetTimeRepairformData.firstname} onChange={onUserNameChange} onClick={() => setvalidaion(prev => ({ ...prev, MNamevalidation: false }))} placeholder="Machine Name" />
                      <label htmlFor="machine-name" className="heading-400-14-12 bi-form-label">Enter Name of the applicant{<span style={{ color: '#CB1923' }}>*</span>}</label>

                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                    <div className={`bi-form-group ${validation.MMakevalidation ? "error-red" : ""}`}>
                      <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.pvalidation ? "error-red" : ""}`} value={onetTimeRepairformData.phonenumber} maxLength="10" onChange={onPhoneChange} onClick={() => setvalidaion(prev => ({ ...prev, pvalidation: false }))} placeholder="Machine Make" />
                      <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">Enter Your Mobile Number{<span style={{ color: '#CB1923' }}>*</span>}</label>

                    </div>
                  </div>
                  {otpvalidation && (
                    <OtpPage phoneNumber={onetTimeRepairformData.phonenumber} setloading={setloading} setpendingresponse={setpendingresponse} setShowFinancePopup={setShowFinancePopup} setShowRemainingField={setShowRemainingField} setotpvalidation={setotpvalidation} />
                  )}
                </div>
              </div>
              {/*Form middle section end*/}

              {/*Form bottom section start*/}
              {ShowRemainingField && (
                <div className='row pt-5'>
                  <div className='col col-lg-4'>
                    <h1 className='heading-600-16'>{step1FormField.bottomHeading}</h1>
                    <p className='heading-400-14 op-60'>{step1FormField.bottomPara}</p>
                  </div>
                  <div className='col col-lg-8 col-12'>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group ${validation.companyvalidation ? "error-red" : ""}`}>
                        <input type="text" name="machine-name" id="machine-name" className={`bi-form-field bg-white ${validation.companyvalidation ? "error-red" : ""}`} value={onetTimeRepairformData.companyname} onChange={onCompanyNameChange} onClick={() => setvalidaion(prev => ({ ...prev, companyvalidation: false }))} placeholder="Machine Name" />
                        <label htmlFor="machine-name" className="heading-400-14-12 bi-form-label">Enter Company Name{<span style={{ color: '#CB1923' }}>*</span>}</label>

                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group ${validation.Segmentvalidation ? "error-red" : ""}`}>
                        <select className={`bi-form-field  ${Segment ? "" : "empty"}${validation.Segmentvalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px " }} value={Segment} placeholder="Segment" onChange={(e) => onSegmentChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, Segmentvalidation: false }))} autoCapitalize='off' >
                          <option value="" disabled></option>
                          {SegmentOption?.map((option, index) => (
                            <option key={index} value={option.segmentCode}>
                              {option.segment}
                            </option>
                          ))}

                        </select>
                        <label className="heading-400-14-12 bi-form-label" >Segment{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group ${validation.Equipmentvalidation ? "error-red" : ""}`}>
                        <select className={`bi-form-field  ${Equipment ? "" : "empty"}${validation.Equipmentvalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px " }} value={Equipment} placeholder="Segment" onChange={(e) => onEquipmentChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, Equipmentvalidation: false }))} autoCapitalize='off' >
                          <option value="" disabled ></option>
                          <option value="1">Others</option>
                          <option value="2">Furniture and Office Equipment</option>
                          <option value="3">Health Care</option>
                          <option value="4">Infrastructure and constructions</option>
                          <option value="5">IT Equipment</option>
                          <option value="6">Plantation & Machinery</option>
                          <option value="7">Vehicle</option>
                          <option value="8">Solar</option>
                        </select>
                        <label className="heading-400-14-12 bi-form-label" >Equipment{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    {Equipment === '1' && (
                      <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                        <div className={`bi-form-group ${validation.OtherEqipvalidation ? "error-red" : ""}`}>
                          <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.OtherEqipvalidation ? "error-red" : ""}`} value={onetTimeRepairformData.equipmentdetails} onChange={onotherequipmentChange} onClick={() => setvalidaion(prev => ({ ...prev, OtherEqipvalidation: false }))} placeholder="Other Eqipment" />
                          <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">Equipment Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                        </div>
                      </div>
                    )}
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group ${validation.NoEqipvalidation ? "error-red" : ""}`}>
                        <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.NoEqipvalidation ? "error-red" : ""}`} maxLength="10" value={onetTimeRepairformData.noofequipment} onChange={onEquipmentNoChange} onClick={() => setvalidaion(prev => ({ ...prev, NoEqipvalidation: false }))} placeholder="No of Equipment" />
                        <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">No of Equipment{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group ${validation.BusinessVintagevalidation ? "error-red" : ""}`}>
                        <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.BusinessVintagevalidation ? "error-red" : ""}`} maxLength="10" value={onetTimeRepairformData.businessvintage} onChange={onBusinessVintageChange} onClick={() => setvalidaion(prev => ({ ...prev, BusinessVintagevalidation: false }))} placeholder="Business Vintage" />
                        <label htmlFor="machine-make" className="heading-400-14-12 bi-form-label">Business Vintage in Years{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group`}>
                        <select className={`bi-form-field  ${Industry ? "" : "empty"}${validation.Industryvalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px " }} value={Industry} placeholder="Industry" onChange={(e) => onIndustryChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, Industryvalidation: false }))} autoCapitalize='off' >
                          <option value="" disabled></option>
                          <option value="Others" >Others</option>
                          {IndustryOption?.map((option, index) => (
                            <option key={index} value={option.industryCode}>
                              {option.industryType}
                            </option>
                          ))}

                        </select>
                        <label className="heading-400-14-12 bi-form-label" >Industry</label>
                      </div>
                    </div>
                    {Industry === "Others" && (
                      <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                        <div className={`bi-form-group`}>
                          <input type="text" name="OEM" id="OEM" className={`bi-form-field bg-white ${validation.OtherIndustryvalidation ? "error-red" : ""}`} value={Industry_name} onChange={(e) => onIndustryChange_name(e)} onClick={() => setvalidaion(prev => ({ ...prev, OtherIndustryvalidation: false }))} placeholder="Machine Name" />
                          <label className="heading-400-14-12 bi-form-label" >Industry</label>
                        </div>
                      </div>
                    )}
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group`}>
                        {Industry !== "Others" ? (
                          <select className={`bi-form-field  ${OEM ? "" : "empty"}${validation.OEMvalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px " }} value={OEM} placeholder="OEM" onChange={(e) => onOEMChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, OEMvalidation: false }))} autoCapitalize='off' >
                            <option value="" disabled></option>
                            {OEMOption?.map((option, index) => (
                              <option key={index} value={option.oemCode}>
                                {option.oem}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" name="OEM" id="OEM" className={`bi-form-field bg-white ${validation.OtherOEMvalidation ? "error-red" : ""}`} value={OEM_name} onChange={(e) => onOEMChange_name(e)} onClick={() => setvalidaion(prev => ({ ...prev, OtherOEMvalidation: false }))} placeholder="Machine Name" />
                        )}
                        <label className="heading-400-14-12 bi-form-label" >OEM</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group`}>
                        {Industry !== "Others" && MachineOption.length > 0 ? (
                          <select className={`bi-form-field ${Machine ? "" : "empty"}${validation.Machinevalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px" }} value={Machine} placeholder="Machine" onChange={(e) => onMachineChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, Machinevalidation: false }))} autoCapitalize='off'>
                            <option value="" disabled></option>
                            {MachineOption?.map((option, index) => (
                              <option key={index} value={option.machineCode}>
                                {option.machine}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" name="machine-name" id="machine-name" className={`bi-form-field bg-white ${validation.OtherMachinevalidation ? "error-red" :
                            ""}`} value={Machine_name} onChange={(e) => onMachine_nameChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, OtherMachinevalidation: false }))} placeholder="Machine Name" />
                        )}
                        <label className="heading-400-14-12 bi-form-label">Machine</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group`}>
                        {Industry !== "Others" && ModelOption.length > 0 ? (
                          <select className={`bi-form-field ${Model ? "" : "empty"}${validation.Modelvalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px" }} value={Model} placeholder="Model" onChange={(e) => onModelChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, Modelvalidation: false }))} autoCapitalize='off'>
                            <option value="" disabled></option>
                            {ModelOption?.map((option, index) => (
                              <option key={index} value={option.modelNoCode}>
                                {option.modelNo}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" name="model-name" id="model-name" className={`bi-form-field bg-white ${validation.OtherModelvalidation ? "error-red" :
                            ""}`} value={onetTimeRepairformData.othermodelno} onChange={(e) => onModelChange_name(e)} onClick={() => setvalidaion(prev => ({ ...prev, OtherModelvalidation: false }))} placeholder="Model Name" />
                        )}
                        <label className="heading-400-14-12 bi-form-label">Model</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group`}>
                        <select className={`bi-form-field  ${MachineType ? "" : "empty"}${validation.MachineTypevalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px " }} value={MachineType} placeholder="Machine Type" onChange={(e) => onMachineTypeChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, MachineTypevalidation: false }))} autoCapitalize='off' >
                          <option value="" disabled></option>
                          <option value="2">New</option>
                          <option value="1">Refurbished</option>
                        </select>
                        <label className="heading-400-14-12 bi-form-label" >Machine Type</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group ${validation.LocationValidation ? "error-red" : ""}`}>
                        <input type="text" name="machine-make" id="machine-make" className={`bi-form-field bg-white ${validation.LocationValidation ? "error-red" :
                          ""}`} value={onetTimeRepairformData.location} onChange={onLocationChange} onClick={() => setvalidaion(prev => ({ ...prev, LocationValidation: false }))} placeholder="Machine Make" />
                        <label htmlFor="Location" className="heading-400-14-12 bi-form-label">Enter City/Town Name{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group`}>
                        <select className={`bi-form-field  ${onetTimeRepairformData.state ? "" : "empty"}${validation.Statevalidation ? "bg-white error-red" : ""}`} style={{ borderRadius: "4px " }} value={onetTimeRepairformData.state} placeholder="State" onChange={(e) => onStateChange(e)} onClick={() => setvalidaion(prev => ({ ...prev, Statevalidation: false }))} autoCapitalize='off' >
                          <option value="" disabled></option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Seemandhra">Seemandhra</option>
                          <option value="Telangana">Telangana</option>
                        </select>
                        <label className="heading-400-14-12 bi-form-label" >State{<span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <div className={`bi-form-group  ${validation.MPinValidation ? "error-red" : ""}`}>
                        <input type="text" name="machine-add1" id="machine-add1" className={`bi-form-field bg-white ${validation.MPinValidation ? "error-red" : ""}`} value={displayedMachinePrice} onChange={onPriceChange} onClick={() => setvalidaion(prev => ({ ...prev, MPinValidation: false }))} placeholder="Pine Code" />
                        <label htmlFor="machine-add1" className="heading-400-14-12 bi-form-label">Enter Machine Value (Excl GST){<span style={{ color: '#CB1923' }}>*</span>}</label>
                        
                      </div>
                    </div>
                    <div className='pt-5 d-flex justify-content-end'>
                      <button className='step_button heading-600-16-14' onClick={onStepTwoBtn}>Calculate interest rate</button>
                    </div>
                  </div>
                </div>
              )}
              {/*Form bottom section start*/}
            </div> : null}

            {/*-------------------------Step 2nd------------------------------------- */}

            {activeStep === 2 ? <div className='container p-0'>
              <div className='row d-flex justify-content-between'>
                <div className='col col-lg-4 hide-992 pt-30'>
                  <h1 className='heading-500-20'>Enter your details</h1>
                  <p className='heading-400-14 op-60'>Enter the details given below to calculate your {FinanceType} interest rate</p>
                </div>
                <div className='col col-lg-8 col-12'>
                  <div className='f-check-select'>
                    <div className={`bi-form-group ${validation1.RatedValidation ? "error-red" : ""}`}>
                      <select className={`bi-form-field  ${Rated ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={Rated} placeholder="Are you Rated?" onChange={(e) => handleRatedChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, RatedValidation: false }))} autoCapitalize='off' >
                        <option value="" selected></option>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                      </select>
                      <label htmlFor="name" className="heading-400-14-12 bi-form-label">Are you Rated?{<span style={{ color: '#CB1923' }}>*</span>}</label>
                    </div>
                    <div className={`bi-form-group ${validation1.Creditagency ? "error-red" : ""}`}>
                      <select className={`bi-form-field  ${CreditAgency ? "" : "empty"}`} style={{ borderRadius: "4px " }} placeholder="Are you Rated?" value={CreditAgency} onChange={(e) => handleCreditagencyChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, Creditagency: false }))} autoCapitalize='off' disabled={Rated === 'no'} >
                        {Rated === 'no' ? (
                          <>
                            <option value=""></option>
                            <option value="25" selected>No Rating</option>
                          </>
                        ) : (
                          <>
                            <option value="" selected></option>
                            <option value='1'>CRISIL</option>
                            <option value='2'>ICRA</option>
                            <option value='3'>FITCH</option>
                            <option value='4'>CARE</option>
                            <option value='5'>Brickwork</option>
                            <option value='6'>India rating</option>
                            <option value='7'>Acuite</option>
                            <option value='8'>Infomerics</option>
                          </>
                        )}


                      </select>
                      <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select credit Agency{Rated !== 'no' && <span style={{ color: '#CB1923' }}>*</span>}</label>
                    </div>
                    {RatingInputMode === 'select' ? (
                      <div className={`bi-form-group ${validation1.RatingValidation ? "error-red" : ""}`}>
                        {/* <select className={`bi-form-field  ${Rating ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={Rating} placeholder="Select Rating" onChange={(e) => handleRatingChange(e)} autoCapitalize='off' disabled={Rated === 'no'}> */}
                        <select
                          className={`bi-form-field ${Rating ? "" : "empty"}`}
                          style={{ borderRadius: "4px " }}
                          value={Rated === 'no' ? "25" : Rating}
                          placeholder="Select Rating"
                          onChange={(e) => handleRatingChange(e)}
                          autoCapitalize='off'
                          disabled={Rated === 'no'}
                          onClick={() => setvalidaion1(prev => ({ ...prev, RatingValidation: false }))}
                        >
                          {Rated === 'no' ? (
                            <>
                              <option value=""></option>
                              <option value="25" selected>No Rating</option>
                            </>
                          ) : (
                            <>
                              <option value=""></option>
                              {CreditAgency === '1' && (
                                Object.entries({

                                  "1": "AAA",
                                  "2": "AA+",
                                  "3": "AA",
                                  "4": "AA−",
                                  "5": "A+",
                                  "6": "A",
                                  "7": "A−",
                                  "8": "BBB+",
                                  "9": "BBB",
                                  "10": "BBB−",
                                  "11": "BB+",
                                  "12": "BB",
                                  "13": "BB−",
                                  "14": "B+",
                                  "15": "B",
                                  "16": "B−",
                                  "17": "CCC",
                                  "18": "CC",
                                  "19": "C",
                                  "20": "D",
                                  "21": "pr",
                                  "23": "Unsolicited",
                                  "24": "SD",
                                  // "25": "No Rating"
                                }).map(([value, label]) => (
                                  <option key={value} value={value}>{label}</option>
                                ))
                              )}

                              {CreditAgency === '2' && (
                                Object.entries({

                                  "1": "Aaa",
                                  "2": "Aa1",
                                  "3": "Aa2",
                                  "4": "Aa3",
                                  "5": "A1",
                                  "6": "A2",
                                  "7": "A3",
                                  "8": "Baa1",
                                  "9": "Baa2",
                                  "10": "Baa3",
                                  "11": "Ba1",
                                  "12": "Ba2",
                                  "13": "Ba3",
                                  "14": "B1",
                                  "15": "B2",
                                  "16": "B3",
                                  "17": "Caa",
                                  "18": "Ca",
                                  "20": "C",
                                  "21": "e,p",
                                  "22": "WR",
                                  "23": "Unsolicited",
                                  // "25": "No Rating"
                                }).map(([value, label]) => (
                                  <option key={value} value={value}>{label}</option>
                                ))
                              )}

                              {CreditAgency === '3' && (
                                Object.entries({

                                  "1": "AAA",
                                  "2": "AA+",
                                  "3": "AA",
                                  "4": "AA−",
                                  "5": "A+",
                                  "6": "A",
                                  "7": "A−",
                                  "8": "BBB+",
                                  "9": "BBB",
                                  "10": "BBB−",
                                  "11": "BB+",
                                  "12": "BB",
                                  "13": "BB−",
                                  "14": "B+",
                                  "15": "B",
                                  "16": "B−",
                                  "17": "CCC",
                                  "18": "CC",
                                  "19": "C",
                                  "20": "D",
                                  "21": "pr",
                                  "23": "Unsolicited",
                                  "24": "SD",
                                  // "25": "No Rating"
                                }).map(([value, label]) => (
                                  <option key={value} value={value}>{label}</option>
                                ))
                              )}

                            </>
                          )}
                        </select>



                        <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select Credit Rating{Rated !== 'no' && <span style={{ color: '#CB1923' }}>*</span>}</label>
                      </div>

                    ) : (
                      <div className={`bi-form-group ${validation1.RatingText ? "error-red" : ""}`}>
                        <input type="text" name="machine-name" id="RatingText" className={`bi-form-field bg-white ${validation1.RatingText ? "error-red" : ""}`} value={RatingText} onChange={onRatingTextChange} onClick={() => setvalidaion1(prev => ({ ...prev, RatingText: false }))} placeholder="RatingText" />
                        <label htmlFor="Email" className="heading-400-14-12 bi-form-label">Enter Your Credit Rating{<span style={{ color: '#CB1923' }}>*</span>}</label>

                      </div>

                    )}


                    <p className='heading-400-14-12 op-80 pt-24'>Select a relevant option</p>
                    <div className=''>
                      <div className={`d-flex justify-content-between f-border curser-pointer ${isProfit === "We are Profitable" ? 'bg-purple' : 'bg-white'}`} onClick={() => handleProfitableChange("yes")} >
                        <p className={`heading-400-14 v-center pl-3  ${isProfit === "We are Profitable" ? 'text-white' : null} `}>We are Profitable</p>
                        <StepperTick fill={` ${isProfit === "We are Profitable" ? '#73509E' : "#FFFFFF"}`} />
                      </div>
                    </div>
                    <div className='pt-24'>
                      <div className={`d-flex justify-content-between f-border curser-pointer ${isProfit === "We are not Profitable" ? 'bg-purple' : 'bg-white'}`} onClick={() => handleProfitableChange("no")}  >
                        <p className={`heading-400-14 v-center pl-3  ${isProfit === "We are not Profitable" ? 'text-white' : null} `}>We are not Profitable</p>
                        <StepperTick fill={` ${isProfit === "We are not Profitable" ? '#73509E' : "#FFFFFF"}`} />
                      </div>
                    </div>
                    <div className={`bi-form-group ${validation1.RangeValidation ? "error-red" : ""}`}>
                      <select className={`bi-form-field  ${Range ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={Range} placeholder="Select Range" onChange={(e) => handleRangeChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, RangeValidation: false }))} autoCapitalize='off' >
                        <option value="" disabled></option>
                        <option value='10-20'>10 Cr - 20 Cr</option>
                        <option value='20-50'>20 Cr - 50 Cr</option>
                        <option value='50-100'>50 Cr - 100 Cr</option>
                        <option value='100-150'>100 Cr - 150 Cr</option>
                        <option value='150-500'>150 Cr - 500 Cr</option>
                        <option value='500+'>500Cr +</option>
                      </select>
                      <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select Revenue{Profitable !== 'no' && <span style={{ color: '#CB1923' }}>*</span>}</label>
                    </div>

                    {Profitable === 'no' ? (
                      <>
                        <div className={`bi-form-group`}>
                          {/* <div className={`bi-form-group ${validation.lvalidation ? "error-red" : ""}`}> */}
                          <select
                            className={`bi-form-field  ${Collateral ? "" : "empty"}`}
                            style={{ borderRadius: "4px " }}
                            value={Collateral}
                            placeholder="Select Range"
                            onChange={(e) => handleCollateralChange(e)}
                            autoCapitalize="off"
                          >
                            <option value="" disabled></option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            {/* <option value="100">100%</option> */}
                          </select>
                          <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select Collateral{<span style={{ color: '#CB1923' }}></span>}</label>
                        </div>

                      </>
                    ) : (
                      null
                    )}
                    <div className={`bi-form-group ${validation1.TenureValidation ? "error-red" : ""}`}>
                      <select className={`bi-form-field  ${Tenure ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={Tenure} placeholder="Tenure" onChange={(e) => onTenureChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, TenureValidation: false }))} autoCapitalize='off' >
                        <option value="" disabled></option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                        <option value="60">60</option>
                        {/* <option value="Others">Others</option> */}
                      </select>
                      <label className="heading-400-14-12 bi-form-label" >Select Tenure{<span style={{ color: '#CB1923' }}>*</span>}</label>
                    </div>
                    <br></br>
                    {IntrestRangeFrom !== '' && IntrestRangeTo !== '' && (
                      <InterestRateDiv IntrestRangeFrom={IntrestRangeFrom} IntrestRangeTo={IntrestRangeTo} LowerSlabAmount={LowerSlabAmount} HigherSlabAmount={HigherSlabAmount} />
                    )}
                    <div className='f-second-stepper-btn'>
                      <button className='f-button-outline heading-600-16-14' onClick={() => setActiveStep(1)}>Call back</button>
                      <button className='step_button heading-600-16-14' onClick={onStepTwoBtn_2}>Apply with Documentation</button>
                    </div>
                  </div>
                </div>
              </div>
            </div> : null}

            {/* --------------------- Step3----------------------------------------*/}
            {activeStep === 3 ? <div className='container p-0'>
              <div className='row pt-5'>
                <div className='col col-lg-4 hide-992'>

                  <h1 className='heading-500-20 m-0'>Lending Details</h1>
                  <p className='heading-400-14 op-60 pt-12'>Select the factors of your loan</p>

                </div>

                <div className="col col-lg-8">
                  <div className={`bi-form-group ${validation1.PreferenceValidation ? "error-red" : ""}`}>
                    <select className={`bi-form-field  ${Preference ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={Preference} placeholder="Select your Preference(select)" onChange={(e) => onPreferenceChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, PreferenceValidation: false }))} autoCapitalize='off' >
                      <option value="" disabled></option>
                      <option value="Lease">Lease</option>
                      <option value="Loan">Loan</option>
                      <option value="Both">Both</option>
                    </select>
                    <label className="heading-400-14-12 bi-form-label" >Select Your lending preference{<span style={{ color: '#CB1923' }}>*</span>}</label>
                  </div>
                  <div className={`bi-form-group ${validation1.LegalTypeValidation ? "error-red" : ""}`}>
                    <select className={`bi-form-field  ${LegalType ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={LegalType} placeholder="Legal Type " onChange={(e) => onLegalTypeChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, LegalTypeValidation: false }))} autoCapitalize='off' >
                      <option value="" disabled></option>
                      <option value="Private Limited Company"></option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership Firm">Partnership Firm</option>
                      <option value="LLP">LLP</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="Business Entities Created by Statute">usiness Entities Created by Statute</option>
                      <option value="Trust">Trust</option>
                      <option value="Hindu Undivided Family">Hindu Undivided Family</option>
                      <option value="Co-operative Society">Co-operative Society</option>
                      <option value="Association of Persons">Association of Persons</option>
                      <option value="Government">Government</option>
                      <option value="Not Classified">Not Classified</option>
                      <option value="Individual">Individual</option>
                      <option value="Other">Other</option>
                    </select>
                    <label className="heading-400-14-12 bi-form-label" >Legal Type (select){<span style={{ color: '#CB1923' }}>*</span>}</label>
                  </div>
                  <div className={`bi-form-group ${validation1.isDocumentsValidation ? "error-red" : ""}`}>
                    <select className={`bi-form-field  ${isDocuments ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={isDocuments} placeholder="Legal Type " onChange={(e) => isDocumentsChange(e)} onClick={() => setvalidaion1(prev => ({ ...prev, isDocumentsValidation: false }))} autoCapitalize='off' >
                      <option value="" disabled></option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <label className="heading-400-14-12 bi-form-label" >Do You have Documents{<span style={{ color: '#CB1923' }}>*</span>}</label>
                  </div>
                  {isDocuments === 'Yes' && (
                    <div className={`bi-form-group ${validation.Emailvalidation ? "error-red" : ""}`}>
                      <input type="text" name="machine-name" id="email" className={`bi-form-field bg-white ${validation.Emailvalidation ? "error-red" : ""}`} value={onetTimeRepairformData.emailid} onChange={onEmailidChange} onClick={() => setvalidaion(prev => ({ ...prev, Emailvalidation: false }))} placeholder="Email" />
                      <label htmlFor="Email" className="heading-400-14-12 bi-form-label">Enter Your Email Id{<span style={{ color: '#CB1923' }}>*</span>}</label>

                    </div>
                  )}
                </div>
              </div>
              <br></br>
              <div className='row pt-32-992'>
                {isDocuments === 'Yes' && (
                  <>
                    <div className=" border-top hide-992 m-0" style={{ paddingTop: "2px" }}></div>
                    <div className='col col-lg-4 hide-992 pt-30'>
                      <h1 className='heading-500-20 m-0 mt-5'>Upload Documents</h1>
                      <p className='heading-400-14 op-60 pt-12'>You can choose to upload these documents to speed up your application process. Although you can proceed with the same as well.</p>
                    </div>
                  </>
                )}

                <div className='col col-lg-8 pt-30 mt-5'>
                  {/* {isDocuments === 'Yes' && [0, 1, 2].map((item, index) => (
                    <FinanceDocumentUploder key={index} id={index} onetTimeRepairformData={onetTimeRepairformData} setOnetTimeRepairFormData={setOnetTimeRepairFormData} setUploadedDocument={setUploadedDocument} />
                  ))} */}
                  {isDocuments === 'Yes' && (
                    <>

                      <h1 className='heading-600-16 m-0'>Upload Quotation / Proforma Invoice of equipment</h1>
                      <div className="upload-wrap" onClick={() => handleBrowse("UploadQuotation")} >
                        {uploadIcon({ width: 40, height: 40 })}
                        <div className="desc heading-400-16"><span className="heading-600-18">Browse</span> Document to Upload{<span style={{ color: '#CB1923' }}>*</span>}</div>
                        <input type="file" name="file" id="UploadQuotation" className="bi-upload-file" onChange={(e) => handleFileChange(e.target.files, e.target.id)} />
                        {UploadedDocument.length > 0 && (
                          <div className="uploading-wrap">
                            <div className="uploading-item">
                              <div className="file-icon">{fileIcon({ width: 24, height: 30 })}</div>
                              <div className="file-data">
                                <div className="name heading-600-14">{UploadedDocument[0].name}</div>
                                <div className="process">
                                  <div className="process-inner"></div>
                                </div>
                                <div className="size-status-wrap">
                                  <div className="status heading-400-14">uploaded...100%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <h1 className='heading-600-16 mt-4'>Upload Latest audited financial statements / ITRS</h1>
                      <div className="upload-wrap" onClick={() => handleBrowse("ITRS")} >
                        {uploadIcon({ width: 40, height: 40 })}
                        <div className="desc heading-400-16"><span className="heading-600-18">Browse</span> Document to Upload{<span style={{ color: '#CB1923' }}>*</span>}</div>
                        <input type="file" name="file" id="ITRS" className="bi-upload-file" onChange={(e) => handleFileChange(e.target.files, e.target.id)} />
                        {UploadedDocument.length > 1 && (
                          <div className="uploading-wrap">
                            <div className="uploading-item">
                              <div className="file-icon">{fileIcon({ width: 24, height: 30 })}</div>
                              <div className="file-data">
                                <div className="name heading-600-14">{UploadedDocument[1].name}</div>
                                <div className="process">
                                  <div className="process-inner"></div>
                                </div>
                                <div className="size-status-wrap">
                                  <div className="status heading-400-14">uploaded...100%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <h1 className='heading-600-16 mt-4'>Upload Company / Individual PAN</h1>
                      <div className="upload-wrap" onClick={() => handleBrowse("IndividualPAN")} >
                        {uploadIcon({ width: 40, height: 40 })}
                        <div className="desc heading-400-16"><span className="heading-600-18">Browse</span> Document to Upload{<span style={{ color: '#CB1923' }}>*</span>}</div>
                        <input type="file" name="file" id="IndividualPAN" className="bi-upload-file" onChange={(e) => handleFileChange(e.target.files, e.target.id)} />
                        {UploadedDocument.length > 2 && (
                          <div className="uploading-wrap">
                            <div className="uploading-item">
                              <div className="file-icon">{fileIcon({ width: 24, height: 30 })}</div>
                              <div className="file-data">
                                <div className="name heading-600-14">{UploadedDocument[2].name}</div>
                                <div className="process">
                                  <div className="process-inner"></div>
                                </div>
                                <div className="size-status-wrap">
                                  <div className="status heading-400-14">uploaded...100%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {errormsg && (
                    <div className="container mt-4">
                      <div className="row">
                        <div className="col">
                          <p className="text-center text-danger p-2">Please upload all the documents before proceeding further</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='pt-2 d-flex justify-content-end'>
                    <button className='button heading-600-16-14' onClick={onStepTwoBtn}>Submit</button>
                  </div>
                </div>
              </div>
            </div> : null}
          </div>
        </div>
      </div>
      <br></br>
      <FooterBottom2 />
    </>
  )
}

export default FinanceStepper