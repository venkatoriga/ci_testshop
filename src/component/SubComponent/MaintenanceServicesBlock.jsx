import React, { useState } from 'react';
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom';
const MaintenanceServicesBlock = ({data}) => {
//  const posi=pos%2===0;  
 const [isHovered, setIsHovered] = useState(false);
 const [isHovered2, setIsHovered2] = useState(false);
 const navigate=useNavigate();

 const onMouseEnterhandler2 = () => {
  setIsHovered2(true);
};
const onMouseLeavehandler2 = () => {
  setIsHovered2(false);
};

// const onClickHandler2=()=>{
//  console.log("navigate done",data.navi2);
// navigate(data.navi2)
// }
 const onMouseEnterhandler = () => {
   setIsHovered(true);
 };
 const onMouseLeavehandler = () => {
   setIsHovered(false);
 };

//  const onClickHandler=()=>{
//   console.log("navigate done",data.navi1);
// navigate(data.navi1)
//  }

 const onClickHandler1=()=>{
  const productId = "serviceRequest"
  let serviceName
  if (data.title1 === "On Call Breakdown Service") {
    serviceName = "On Call Service"
    navigate('/service/Addonservice', { state: { productId, serviceName } });
  }
  else if (data.title1 === "Annual Maintenance Contract") {
    serviceName = "AMC"
    navigate('/service/Addonservice', { state: { productId, serviceName } });
  }

 }

 const onClickHandler2=()=>{
  const productId = "serviceRequest"
  let serviceName
    if(data.title2 === "Preventive Maintenance"){
      serviceName = data.title2
      navigate('/service/Addonservice', { state: { productId, serviceName } });
    }
    else{
      serviceName = data.title2
     
    }


  
  
}
  return (<>
    {/*<div className={`col col-lg-6 col-12 p-0  border  d-flex align-items-end serviceblockmaindiv ${isHovered ? "hovered":""}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}> 
    {posi &&  <div className="row d-flex m-0 w-100">
    <div className="col col-md-7 col-12 p-0 h-390 d-flex align-items-center">
    <img className=' w-100' src={imageurl} alt={imageurl}/>
    </div>
    
      <div className={`col col-md-5 col-12  details ${isHovered ? "hovered":""} align-self-center h-auto`}>
      <h1 className='bar2Fourth'>{title}</h1>
      <p className='heading-400-16'>{message}</p>
      <div className='btn-left-to-right'><Button message={"Avail Service"} callFunction={onClickHandler}/></div>
      </div>
     <div className={`col-md-5 col-12 text-end bottomdiv pr-4 ${isHovered ? "hovered":""}`}>
       <h3 className="heading-600-24 pb-5">{bottomTitle}</h3>
      </div>
      </div>
      }
       {!posi && <div className="row d-flex col-reverse w-100 m-0"> 
       <div className={`col col-md-5 col-12 bottomdivRight pl-4 ${isHovered ? "hovered":""}`}>
        <h1 className="heading-600-24 pb-5">{bottomTitle}</h1>
        </div>
      <div className={`col col-md-5 col-12 align-self-center details  ${isHovered ? "hovered":""} `} >
      <h1 className='bar2Fourth'>{title}</h1>
      <p className='heading-400-16'>{message}</p>
      <div className='btn-left-to-right'><Button message={"Avail Service"} callFunction={onClickHandler}/></div>
      </div>
    
      <div className="col col-md-7 col-12  p-0 d-flex align-items-center h-390">
       <img className=' w-100 ' src={imageurl} alt={imageurl}/>
      </div>
    </div>}
      </div>*/}
     
          
          <div className={` p-0  border  d-flex align-items-end serviceblockmaindiv ${isHovered ? "hovered grow-div-extra":"grow-div"}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}> 
    <div className="row d-flex m-0 w-100">
    <div className="col col-md-7 col-12 p-0 h-390 d-flex align-items-center">
    <img className=' w-100' src={data.imageurl1} alt={data.imageurl1}/>
    </div>
    
      <div className={`col col-md-5 col-12 p-20-768 details ${isHovered ? "hovered":""} align-self-center h-auto`}>
      <h1 className='bar2Fourth'>{data.title1}</h1>
      <p className='heading-400-16'>{data.message1}</p>
      <div className='btn-left-to-right'><Button message={"Book Service"} callFunction={onClickHandler1}/></div>
      </div>
     <div className={`col-md-5 col-12 text-end bottomdiv pr-4 ${isHovered ? "hovered":""}`}>
       <h3 className="heading-600-24 pb-5">{data.bottomTitle1}</h3>
      </div>
      </div>
      </div>
       {/* second */}
      

       <div className={` p-0  border  d-flex align-items-end serviceblockmaindiv ${isHovered2 ? "hovered grow-div-extra":"grow-div"}`} onMouseEnter={onMouseEnterhandler2} onMouseLeave={onMouseLeavehandler2}> 
       <div className="row d-flex col-reverse w-100 m-0"> 
       <div className={`col col-md-5 col-12 bottomdivRight pl-4 ${isHovered2 ? "hovered":""}`}>
        <h1 className="heading-600-24 pb-5">{data.bottomTitle2}</h1>
        </div>
      <div className={`col col-md-5 col-12 p-20-768 align-self-center details  ${isHovered2 ? "hovered":""} `} >
      <h1 className='bar2Fourth'>{data.title2}</h1>
      <p className='heading-400-16'>{data.message2}</p>
      <div className='btn-left-to-right'><Button message={"Book Service"} callFunction={onClickHandler2}/></div>
      </div>
    
      <div className="col col-md-7 col-12  p-0 d-flex align-items-center h-390">
       <img className=' w-100 ' src={data.imageurl2} alt={data.imageurl2}/>
      </div>
    </div>
    
    
    
    
    
      </div>
       
        </>
  )
}

export default MaintenanceServicesBlock
