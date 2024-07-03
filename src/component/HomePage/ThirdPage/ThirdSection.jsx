import React, { useState } from 'react'
import ImageWithHP from '../../SubComponent/ImageWithHP';
import MaintenanceServicesBlock from '../../SubComponent/MaintenanceServicesBlock';
import RightArrow from '../../SubComponent/RightArrow';
import {useNavigate } from 'react-router-dom';
const ThirdSection = () => {
  const navigate=useNavigate();
  const [isSmallScreen]=useState(window.innerWidth<=768)
  // const data = [
    // { title: "On Call breakdown Service", message: "Origa's on-call breakdown service ensures immediate assistance after a call, minimizing production downtime and conducting necessary repairs promptly", imageurl: "asset/OnCallService.webp", bottomTitle: "On Call breakdown Service", url: "/onetimerepair" },
    // { title: "Preventive Maintenance", message: "Opt for preventive maintenance to sidestep major shutdowns, cut costs, and ensure sustained machine efficiency and reliability.", imageurl: "asset/PreventiveMaintenance.webp", bottomTitle: "Preventive Maintenance", url: "/CandD" },
  // ];
  const data1={ title1: "On Call Breakdown Service", message1: "Origa's on-call breakdown service ensures immediate assistance after a call, minimizing production downtime and conducting necessary repairs promptly", imageurl1: "asset/OnCallService.webp", bottomTitle1: "On Call breakdown Service", url1: "/onetimerepair",serviceName: "On Call Service" 
  ,title2: "Preventive Maintenance", message2: "Opt for preventive maintenance to sidestep major shutdowns, cut costs, and ensure sustained machine efficiency and reliability.", imageurl2: "asset/PreventiveMaintenance.webp", bottomTitle2: "Preventive Maintenance", url2: "/CandD" 
}
const data2=   { title1: "Annual Maintenance Contract", message1: "An AMC offers periodical check-ups and extra care for your machine, ensuring proper functioning, and preventing expensive shutdowns with complete overhauls & maintenance.", imageurl1: "asset/AMC.webp", bottomTitle1: "Annual Maintenance Contract", url1: "/service/amc" , serviceName: "AMC",
 title2: "Retrofitting + com/ dec", message2: "Machine retrofitting delivers safety, efficiency, longevity, cost savings, and improved precision in manufacturing", imageurl2: "asset/retrofitting.webp", bottomTitle2: "Retrofitting + com/ dec", url2: "/logistics" }


 
  return (
    <div className={`container-fluid p-0 pt-5`}>
      <div className={`max-container ${isSmallScreen ? "":" pt-5"}`}>
        <div className={`container-fluid p-0 m-0 d-flex  ${isSmallScreen ? "":" pb-5"}`}>
          <div className='col col-lg-8 col-md-12 col-12 p-0'>
            <ImageWithHP  heading={"Maintenance Services"} para={""} />
          </div>
          <div className=" col col-md-4 col-5  h-center d-flex align-self-center justify-content-end">
            <p className='heading-600-14-12 hide-992 v-center'>Learn More </p>
            <div className='arrow-div hide-992 ml-2' onClick={()=>navigate('/service')}>
              <RightArrow />
            </div>
          </div>
        </div>
      </div>

      <div className="xmax-container">
        <div className="w-100 d-flex-block">

            <MaintenanceServicesBlock data={data1}/>
            
   
        </div>
        <div className='w-100 d-flex-block'> 
        <MaintenanceServicesBlock data={data2}/>
        </div>
      </div>


      <div className='show-992 py-5 '>
      <div className=" h-center d-flex align-self-center justify-content-center">
            <p className='heading-600-14-12  v-center'>Learn More </p>
            <div className='arrow-div ml-2' onClick={()=>navigate('/service')}>
              <RightArrow />
            </div>
          </div>
      </div>
    </div>
  )
}

export default ThirdSection