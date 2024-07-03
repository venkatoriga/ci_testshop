import React,{useState} from 'react'
import { TextField } from '@mui/material';
import Button from '../../Button/Button';
const Step1 = ({step1FormField,extraField}) => {
    const [machineName, setMachineName] = useState('');
    const [machineMake, setMachineMake] = useState('');


    const onMachineNameChange = (e) => {
        setMachineName(e.target.value);
    };
    const onMachineMakeChange = (e) => {
        setMachineMake(e.target.value);
    };
    const onField3=(e)=>{}
    const onField4=(e)=>{}
    const onField5=(e)=>{}
    const onField6=(e)=>{}
  return (
    <div className='container'>
   
    {/*Form middle section start*/}
        <div className='row pt-5'>
        <div className='col col-lg-4 col-12'>
        
            <h1 className='heading-600-16'>{step1FormField.centerHeading}</h1>
            <p className='heading-400-14 op-60'>{step1FormField.centerPara}</p>
            
        </div>

        <div className='col col-lg-8 col-12'>
        <TextField type='text' fullWidth label={step1FormField.field1} size='small' id="machine_name" value={machineName} onChange={onMachineNameChange}/>
        <div className='pt-5'>
        <TextField type='text' fullWidth label={step1FormField.field2} size='small' id="machine_make" value={machineMake} onChange={onMachineMakeChange}/>
        </div>
        {extraField && <div className='pt-5'>
        <TextField type='text' fullWidth label={extraField} size='small' id="machine_make" value={machineMake} onChange={onMachineMakeChange}/>
        </div>}
        </div>
        </div>
    {/*Form middle section end*/}

 {/*Form bottom section start*/}
 <div className='row pt-5 border-top mt-5'>
 <div className='col col-lg-4 col-12'>
 
     <h1 className='heading-600-16'>{step1FormField.bottomHeading}</h1>
     <p className='heading-400-14 op-60'>{step1FormField.bottomPara}</p>
     
 </div>

 <div className='col col-lg-8'>
 <TextField type='text' fullWidth label={step1FormField.field3} size='small' id="machine_name"  onChange={onField3} />

            <div className='pt-5'>
            <TextField type='text' fullWidth label={step1FormField.field4} size='small' id="machine_make"  onChange={onField4} />
            </div>

        <div className='pt-5'>
        <TextField type='text' fullWidth label={step1FormField.field5} size='small' id="machine_make" onChange={onField5} />
        </div>

        {step1FormField.field6 && 
            <div className='pt-5'>
        <TextField type='text' fullWidth label={step1FormField.field6} size='small' id="machine_make"  onChange={onField6} />
        </div>
        }
        <div className='pt-5 d-flex justify-content-end'>
        <Button message={"Submit"}/> 
        </div>
 </div>
 </div>

 {/*Form bottom section start*/}
    </div>
  )
}

export default Step1