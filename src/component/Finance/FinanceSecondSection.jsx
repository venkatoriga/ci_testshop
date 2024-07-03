import React, { useState, useEffect } from 'react'
import './Finance.css'
import StepperTick from '../SubComponent/AllSvgs/StepperTick'
import Button from '../Button/Button'
import FinanceModel from './FinanceModel'
import InterestRateDiv from './InterestRateDiv'
import Loader from "../SubComponent/Loader";

const priceConvert = (price) => {
   price = typeof price === 'string' ? price : String(price);


   let count = 1;
   let comma = 3;
   let formatedPrice = ""
   for (let i = price.length - 1; i >= 0; i--) {
      formatedPrice = price[i] + formatedPrice
      if (count === comma) {
         formatedPrice = "," + formatedPrice
         comma = 2;
         count = 0;
      } count++;

   }
   console.log("==>>", formatedPrice)
   if (formatedPrice[0] === ",") {
      formatedPrice = formatedPrice.slice(1, formatedPrice.length)
   }
   return formatedPrice;



};

const FinanceSecondSection = () => {
   const [loading, setloading] = useState(false);
   const [showModel, setShowModel] = useState(false);
   const [showIntrestRate, SetshowIntrestRate] = useState(false);
   const [EMICalculation, setEMICalculation] = useState('');
   const [IntrestRangeFrom, setIntrestRangeFrom] = useState('');
   const [IntrestRangeTo, setIntrestRangeTo] = useState('');
   const [LowerSlabAmount, setLowerSlabAmount] = useState('');
   const [HigherSlabAmount, setHigherSlabAmount] = useState('');
   const [machineprice, setmachineprice] = useState('');
   const [RatingInputMode, setRatingInputMode] = useState('select');
   const [RatingText, setRatingText] = useState('');
   const [finaceRate, setFinanceRate] = useState({
      machineprice: "",
      revenue: "",
      Creditagency: '',
      selectedOption: "",
      profit: "We are Profitable"
   })
   const [CreditAgency, setCreditAgency] = useState('');
   const [validation, setValidation] = useState({ MPinValidation: "", Creditagency: '', Mrevenue: "", selectedOption: "" })

   const onOptionChange = (event) => {
      setFinanceRate((prev) => ({ ...prev, selectedOption: event.target.value }));
   };
   const onMachineHandler = (e) => {
      const newInputString = e.target.value;
      const sanitizedInput = newInputString.replace(/[^0-9]/g, '');
      setmachineprice(priceConvert(sanitizedInput))
      console.log('sanitizedInput----->', sanitizedInput);

      // Update the state only if the input is empty or contains valid characters
      if (sanitizedInput) {
         setFinanceRate((prev) => ({ ...prev, machineprice: (sanitizedInput) }))
      }

   }
   const onRevanueHandler = (e) => {
      const newInputString = e.target.value;
      const sanitizedInput = newInputString.replace(/[^0-9]/g, '');


      // Update the state only if the input is empty or contains valid characters
      if (newInputString) {
         setFinanceRate((prev) => ({ ...prev, revenue: newInputString }))
      }

   }

   useEffect(() => {

      const EMIData = EMICalculation?.data?.body?.data;
      if (EMIData) {
         console.log('EMIData---', EMIData);
         console.log('finaceRate---', finaceRate.revenue);
         console.log('finaceRate---', finaceRate.selectedOption);
         let filteredData = EMIData;
         if (finaceRate.revenue) {
            filteredData = filteredData.filter(item => item.revenueValue === finaceRate.revenue);
         }

         // if (finaceRate.revenue && finaceRate.selectedOption) {
         //    console.log('workinnin', filteredData);
         //    filteredData = filteredData.filter(item =>
         //       item.revenueValue === finaceRate.revenue &&
         //       ((parseInt(finaceRate.selectedOption) <= 6 && item.creditRatingLesserOrEquals === 6.0) ||
         //          (parseInt(finaceRate.selectedOption) > 6 && parseInt(finaceRate.selectedOption) <= 15 && item.creditRatingLesserOrEquals === 8.0) ||
         //          (parseInt(finaceRate.selectedOption) > 15 && item.creditRatingGreaterOrEquals === 25.0))
         //    );
         // }
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

            if (finaceRate.revenue === 'Below 10Cr') {
               setIntrestRangeFrom('11');
               setIntrestRangeTo('15');
               setLowerSlabAmount(minLowerSlabAmount);
               setHigherSlabAmount(maxHigherSlabAmount);
            }
            else {
               // Set the state with the min and max values
               setIntrestRangeFrom(minIntrestRangeFrom);
               setIntrestRangeTo(maxIntrestRangeTo);
               setLowerSlabAmount(minLowerSlabAmount);
               setHigherSlabAmount(maxHigherSlabAmount);

            }

         }



      }

   }, [EMICalculation, finaceRate.revenue, finaceRate.selectedOption]);

   const onFinanceHandler = async () => {

      try {
         setloading(true)
         const response = await fetch(`https://devextension.origa.market/api/getleaserentallist`, {
            method: "POST",
            body: JSON.stringify({ "principalAmount": finaceRate.machineprice })
         });
         const responseData = await response.json();
         setEMICalculation(responseData)
         setloading(false)
         //console.log('Model----->', responseData);
      } catch (error) {
         setloading(false)
         console.error('Error fetching data:', error);
      }

      console.log("--check>>>", finaceRate.revenue, "--->>>", finaceRate.selectedOption, "--->>>", finaceRate.profit);
      if (finaceRate.MPinValidation === "" || finaceRate.revenue === "" || finaceRate.selectedOption === "" || finaceRate.profit === "" || finaceRate.Creditagency === "") {
         if (finaceRate.machineprice === "") { setValidation((prev) => ({ ...prev, MPinValidation: true })) }
         if (finaceRate.revenue === "") { setValidation((prev) => ({ ...prev, Mrevenue: true })) }
         if (finaceRate.Creditagency === "") { setValidation((prev) => ({ ...prev, Creditagency: true })) }
         if (finaceRate.selectedOption === "") { setValidation((prev) => ({ ...prev, selectedOption: true })) }
         return
      }
      setShowModel(true)
   }
   const handleCreditagencyChange = (event) => {
      setFinanceRate((prev) => ({ ...prev, Creditagency: event.target.value }));
      setCreditAgency(event.target.value)
      if ((event.target.value >= '4' && event.target.value <= '8')) {
         setRatingInputMode('text')
         setFinanceRate((prev) => ({ ...prev, selectedOption: "0" }));
      }
      else {
         setRatingInputMode('select');
      }
   }
   const onRatingTextChange = (e) => {
      setRatingText(e.target.value)
   };
   return (
      <>
         {loading && <Loader />}
         {showModel && <FinanceModel modalAction={() => setShowModel(false)} interestRate={() => SetshowIntrestRate(true)} />}
         <div className='container-fluid f-secons-section-div'>
            <div className='max-container'>
               <div className='row'>
                  <div className='col col-md-6 col-12 d-flex align-items-center'>
                     <div className='profit-text'>
                        <img src="/OrigaFinance.svg" alt="OrigaFinance" />
                        <div className='heading-600-24-20 c-green'>
                           Finance Calculator
                        </div>
                        <p className='heading-400-16-14 op-80'>Enter the details given below to calculate your loan/ lease interest rate</p>

                     </div>
                  </div>
                  <div className='col col-lg-6 '>
                     <div className='f-check-select'>

                        <div className={`bi-form-group  ${validation.MPinValidation ? "error-red" : ""}`}>
                           <input type="text" name="machine-add1" id="machine-add1" className={`bi-form-field bg-white ${validation.MPinValidation ? "error-red" : ""}`} value={machineprice} onChange={onMachineHandler} onClick={() => setValidation(prev => ({ ...prev, MPinValidation: false }))} placeholder="Pine Code" />
                           <label htmlFor="machine-add1" className="heading-400-14-12 bi-form-label">Enter Machine Value (Excl GST){<span style={{ color: '#CB1923' }}>*</span>}</label>
                        </div>

                        <div className={`bi-form-group ${validation.Mrevenue ? "error-red" : ""}`}>
                           <select className={`bi-form-field  ${finaceRate.revenue ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={finaceRate.revenue} onChange={onRevanueHandler} onClick={() => setValidation(prev => ({ ...prev, Mrevenue: false }))} placeholder="Machine Make" >
                              <option value="" disabled></option>
                              <option value='Below 10Cr'>Below 10 Cr</option>
                              <option value='10-20'>10 Cr - 20 Cr</option>
                              <option value='20-50'>20 Cr - 50 Cr</option>
                              <option value='50-100'>50 Cr - 100 Cr</option>
                              <option value='100-500'>100 Cr - 500 Cr</option>
                              <option value='500+'>500 Cr +</option>
                           </select>
                           <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select Your Revenue Range*</label>
                        </div>
                        <p className='heading-400-14-12 op-80 f-mt-36'>Select a relevant option</p>
                        <div className=''>

                           <div className={`d-flex justify-content-between f-border ${finaceRate.profit === "We are Profitable" ? 'bg-purple' : null}`} onClick={() => setFinanceRate((prev) => ({ ...prev, profit: "We are Profitable" }))}>
                              <p className={`heading-400-14 v-center pl-3  ${finaceRate.profit === "We are Profitable" ? 'text-white' : null} `}>We are Profitable</p>
                              <StepperTick fill={` ${finaceRate.profit === "We are Profitable" ? '#73509E' : "#FFFFFF"}`} />
                           </div>
                        </div>

                        <div className=' mt-3'>

                           <div className={`d-flex justify-content-between f-border ${finaceRate.profit === "We are not Profitable" ? 'bg-purple' : null}`} onClick={() => setFinanceRate((prev) => ({ ...prev, profit: "We are not Profitable" }))}>
                              <p className={`heading-400-14 v-center pl-3  ${finaceRate.profit === "We are not Profitable" ? 'text-white' : null} `}>We are not Profitable</p>
                              <StepperTick fill={` ${finaceRate.profit === "We are not Profitable" ? '#73509E' : "#FFFFFF"}`} />
                           </div>
                        </div>
                        <div className={`bi-form-group ${validation.Creditagency ? "error-red" : ""}`}>
                           <select className={`bi-form-field  ${CreditAgency ? "" : "empty"}`} style={{ borderRadius: "4px " }} placeholder="Are you Rated?" value={finaceRate.Creditagency} onChange={handleCreditagencyChange} onClick={() => setValidation(prev => ({ ...prev, Creditagency: false }))} autoCapitalize='off'>
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
                           </select>
                           <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select credit Agency{<span style={{ color: '#CB1923' }}>*</span>}</label>
                        </div>

                        {RatingInputMode === 'select' ? (
                           <div className={`bi-form-group ${validation.selectedOption ? "error-red" : ""}`}>
                              {/* <select className={`bi-form-field  ${Rating ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={Rating} placeholder="Select Rating" onChange={(e) => handleRatingChange(e)} autoCapitalize='off' disabled={Rated === 'no'}> */}
                              <select className={`bi-form-field  ${finaceRate.selectedOption ? "" : "empty"}`} style={{ borderRadius: "4px " }} value={finaceRate.selectedOption} placeholder="Select Rating" onChange={onOptionChange} onClick={() => setValidation((prev) => ({ ...prev, selectedOption: false }))}>

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

                              </select>
                              <label htmlFor="name" className="heading-400-14-12 bi-form-label">Select Credit Rating{<span style={{ color: '#CB1923' }}>*</span>}</label>
                           </div>

                        ) : (
                           <div className={`bi-form-group ${validation.RatingText ? "error-red" : ""}`}>
                              <input type="text" name="machine-name" id="RatingText" className={`bi-form-field bg-white ${validation.RatingText ? "error-red" : ""}`} value={RatingText} onChange={onRatingTextChange} onClick={() => setValidation(prev => ({ ...prev, RatingText: false }))} placeholder="RatingText" />
                              <label htmlFor="Email" className="heading-400-14-12 bi-form-label">Enter Your Credit Rating</label>

                           </div>
                        )}


                        <div className='pt-3 d-flex justify-content-end'>
                           {showIntrestRate ? <InterestRateDiv IntrestRangeFrom={IntrestRangeFrom} IntrestRangeTo={IntrestRangeTo} LowerSlabAmount={LowerSlabAmount} HigherSlabAmount={HigherSlabAmount} /> : <Button message={"Calculate Now"} callFunction={onFinanceHandler} />}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default FinanceSecondSection