import React ,{useState} from 'react'
import Button from '../../Button/Button';
import StepperTick from '../../SubComponent/AllSvgs/StepperTick';
const Step2 = () => {
    const [otherReason, setOtherReason] = useState('');
    const [activeState,setActiveState]=useState('');
    const onOtherReasonChange= (e) => {
        setOtherReason(e.target.value);
    };
    const onSelectOption=(value)=>{
        setActiveState(value);
    }
  return (
    <div className='container'>
    <div className='row pt-5 mt-5 d-flex justify-content-between'>
    <div className='col col-lg-4 col-12'>
    
        <h1 className='heading-600-16'>Machine Location</h1>
        <p className='heading-400-14 op-60'>Set your requirements for this project, the estimated price will be based on the project requirements</p>
        
    </div>
   
    <div className='col col-lg-6'>
    <div className='row border p-0'>
        
        <div className={`d-flex justify-content-between p-0 ${activeState===1 ? 'bg-green':null}`} onClick={()=>onSelectOption(1)}>
        <p className='heading-400-14 v-center pl-3'>Mechanical breakdowns</p>
        <StepperTick fill={` ${activeState===1 ? '#9B9E51':"#FFFFFF"}`}/>
     </div>
    </div>
   
    <div className='row border p-0 mt-3'>
  
    <div className={`d-flex justify-content-between p-0 ${activeState===2 ? 'bg-green':null}`} onClick={()=>onSelectOption(2)}>
           <p className='heading-400-14 v-center pl-3'>Electrical Systems failure</p>
           <StepperTick fill={` ${activeState===2 ? '#9B9E51':"#FFFFFF"}`}/>
        </div>
   </div>

   <div className='row border p-0 mt-3'>

        <div className={`d-flex justify-content-between p-0 ${activeState===3 ? 'bg-green':null}`} onClick={()=>onSelectOption(3)}>
           <p className='heading-400-14 v-center pl-3'>Don't wish to sell my MAchine anymore</p>
           <StepperTick fill={` ${activeState===3 ? '#9B9E51':"#FFFFFF"}`}/>
        </div>
    </div>

    <div className='row border p-0 mt-3 '>
        
        <div className={`d-flex justify-content-between p-0 ${activeState===4 ? 'bg-green':null}`} onClick={()=>onSelectOption(4)}>
           <p className='heading-400-14 v-center pl-3'>Structural Integrity Concerns</p>
           <StepperTick fill={` ${activeState===4 ? '#9B9E51':"#FFFFFF"}`}/>
        </div>
    </div>

    <div className='row border p-0 mt-3'>
        <div className={`d-flex justify-content-between p-0 ${activeState===5 ? 'bg-green':null}`} onClick={()=>onSelectOption(5)}>
           <p className='heading-400-14 v-center pl-3'>Lack of Preventive maintenace</p>
           <StepperTick fill={` ${activeState===5 ? '#9B9E51':"#FFFFFF"}`}/>
        </div>
    </div>
   
    <div className='row p-1 mt-3' onClick={()=>onSelectOption(6)}>
   
    <textarea className='form-control' rows="3" placeholder='Type other reason' id="otherReason" value={otherReason} onChange={onOtherReasonChange}></textarea>
    </div>

           <div className='pt-5 d-flex justify-content-end'>
           <Button message={"Submit"}/> 
           </div>
    </div>
    </div>
    </div>
  )
}

export default Step2