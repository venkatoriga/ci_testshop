import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import LeftArrow from '../../SubComponent/LeftArrow'
const StepperForm = ({topHeading,topPara,hide,extraField,step1FormField,step2FormField}) => {
    const [activeStep,setActiveStep]=useState(1)
   const onStepOneBtn=()=>{
setActiveStep(1);
   }
   const onStepTwoBtn=()=>{
    setActiveStep(2);
       }
       const onStepThreeBtn=()=>{
        setActiveStep(3);
           }
  return (
    <div className='pt-5'>
    {/* Stepper Top Section*/}
   <div className='container pb-5'>
   <div className='row'>
      <div className='col col-lg-2 col-12'>
         <LeftArrow/>
      </div>
      {/* for desktop */}
   <div className='col col-lg-10 hide-992'>
      <div className='d-flex'>

      {/* step 1 btn */}
      <div className='d-flex'>
      <button className={`${activeStep<2 ? "stepperBtn":"stepperBtnactive"}  text-white`} onClick={onStepOneBtn}>1</button>
      <p className='heading-400-16-12 op-60 v-center pl-2 pr-2'>Machine Details</p>
      </div>
      
      {/* line */}
      {!hide && <div className=' mr-2 stepper-line v-center'></div> }
      {/* step 2 btn */}
      {!hide && <div className='d-flex'>
      <button className={`${activeStep<3 ? "stepperBtn":"stepperBtnactive"}  text-white`} onClick={onStepTwoBtn}>2</button>
      <p className='heading-400-16-12 op-60 v-center pl-2 pr-2'>Problems</p>
      </div>}

{/* line */}
<div className='mr-2 stepper-line v-center'></div>
      {/* step 3 btn*/}
      <div className='d-flex'>
      <button className={`${activeStep<4 ? "stepperBtn":"stepperBtnactive"}  text-white`} onClick={onStepThreeBtn}>{hide ? 2:3}</button>
      <p className='heading-400-16-12 op-60 v-center pl-2'>Point of Contact</p>
      </div>
      </div>
    </div>

      {/* for tablet start*/}
      <div className='col col-lg-10 show-992 pt-3'>
         
         <div className=' d-flex flex-column'>
   
         <div className='row d-flex justify-content-center '>
          {/* step 1 btn */} 
        <div className='col col-2 d-flex justify-content-end'>
        <button className={`${activeStep<2 ? "stepperBtn":"stepperBtnactive"} text-white`} onClick={onStepOneBtn}>1</button>
        </div>
          {/* step 2 btn */}
         <div className='col col-4'>
        
          
         {!hide && <div className='d-flex'>
         <div className='col col-sm-7 col-5 mr-2 mobile-stepper-line v-center'></div> 
         <div className='col col-2'><button className={`${activeStep<3 ? "stepperBtn":"stepperBtnactive"} h-center text-white`} onClick={onStepTwoBtn}>2</button></div>
        
         </div>}
         </div>
         
         {/* step 3 btn */}
         <div className='col col-4'>
         <div className='d-flex'>
         <div className='col col-sm-7 col-5 mr-2 mobile-stepper-line v-center'></div>
         <div className='col col-2'> <button className={`${activeStep<4 ? "stepperBtn":"stepperBtnactive"} h-center text-white`} onClick={onStepThreeBtn}>{hide ? 2:3}</button></div>
         
         </div>
         </div>
         
         </div>
         
        <div className='d-flex justify-content-center'>
        <div className='col col-md-4 col-sm-5 col-4 p-0 d-flex justify-content-center'><p className='heading-400-16-12 op-60 v-center pl-2 pr-2'>Machine Details</p></div>
        {!hide && <div className='col col-md-3 col-sm-2 col-4 d-flex justify-content-center'> <p className='heading-400-16-12 op-60 v-center pl-2 pr-2'>Problems</p></div>}
           <div className='col col-md-4 col-sm-5 col-4 p-0 d-flex justify-content-end'> <p className='heading-400-16-12 v-center op-60'>Point of Contact</p></div>
        </div>
         
        
         </div>
      </div>

      {/* for tablet start*/}
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

 {activeStep===1 ? <Step1 step1FormField={step1FormField}/>:null}

 {activeStep===2 ? (extraField ?  <Step1 extraField={extraField} step1FormField={step2FormField}/>:<Step2/>):null}
 {activeStep===3 ? <Step3/>:null}
 </div>
    </div>
  )
}

export default StepperForm