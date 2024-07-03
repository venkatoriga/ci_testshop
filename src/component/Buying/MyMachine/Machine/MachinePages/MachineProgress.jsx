import React, { useState } from "react";
import "./MachineProgress.css"
import {machineProgressIcon} from "../../../../../helpers/Icons";
import { useEffect } from "react";
const MachineProgress = ({process}) => {
    console.log("bar process1==><>",process);
    const [activeStep,setActiveStep]=useState(1);
    
    
    const [outputDateStr, setOutputDateStr] = useState({Blocked_Time:"",Paid_Advance_Time:"",Arranging_Finance_Time:"",Paid_Full_Amount:"",Delivered_Time:""});
  

        const convertDateFormat = (inputDate,dateKey) => {
          const date = new Date(inputDate);
          const day = date.getDate();
          const monthIndex = date.getMonth();
          const year = date.getFullYear();
    
          // Array of month names
          const monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
          ];
    
          // Format the date manually
          const outputDate = `${day} ${monthNames[monthIndex]} ${year}`;
    
          setOutputDateStr((prev)=>({...prev,[dateKey]:outputDate}));
        };
    
        // Call the conversion function when the component mounts
        
   
    

   useEffect(()=>{
    if(process){
        for (let index = 0; index < process.length; index++) {
            if (process[index].task_name==="Blocked With Token"){

                setActiveStep(1)
                convertDateFormat(process[index]?.task_date,"Blocked_Time") 
            }
             if (process[index].task_name==="Paid Advance"){
                setActiveStep(2)
                convertDateFormat(process[index]?.task_date,"Paid_Advance_Time")
             }
             if (process[index].task_name==="Arranging Finance"){
                setActiveStep(3)
                convertDateFormat(process[index]?.task_date,"Arranging_Finance_Time")
             }
             if (process[index].task_name==="Paid Full Amount"){
                setActiveStep(4)
                convertDateFormat(process[index]?.task_date,"Paid_Full_Amount")
             }
             if (process[index].task_name==="Delivered"){
                setActiveStep(5)
                convertDateFormat(process[index]?.task_date,"Delivered_Time")
             }
            
        }
    }
    
   },[process])
    console.log("barupdate===>>>",activeStep);

console.log("machine_progress==>>>",outputDateStr);

    return (
        <>
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-progress">
                        {machineProgressIcon({width:700,height:46,step:activeStep})}
                        <div className="machine-content">
                            <div className="content-item">
                                <div className="t-a-c">Blocked with Token</div>
                                <div className="t-a-c light-txt">{outputDateStr.Blocked_Time}</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Paid Advance</div>
                                <div className="t-a-c light-txt">{outputDateStr.Paid_Advance_Time}</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Arranging Finance</div>
                                <div className="t-a-c light-txt">{outputDateStr.Arranging_Finance_Time}</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Paid Full Amount</div>
                                <div className="t-a-c light-txt">{outputDateStr.Paid_Full_Amount}</div>
                            </div>
                            <div className="content-item">
                                <div className="t-a-c light-txt">Delivered</div>
                                <div className="t-a-c light-txt">{outputDateStr.Delivered_Time}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MachineProgress;