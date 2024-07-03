import React from 'react'
import missionImg from '../assets/mission.webp'
const Mission = () => {
  return (
    
      <div className="max-container pt-5">
        <div className="container-fluid m-0 p-0 row align-items-center justify-content-between">
        <div className="col col-lg-7 col-12 tablet-d-padding">
        <img className="img-fluid" src={missionImg} alt='Mission' />
        </div>
        <div className="col col-lg-4 col-12 tablet-d-padding">
        <h2 className="mb-20 mt-4 heading-600-44-20" >Our Mission</h2>
        <p className="heading-400-16-14 op-60">
        {/* "Facilate capacity building that builds enterprises,create jobs
        and income at all levels create jobs and income at all levels" */}
        "Build enterprises by providing high-quality equipment, which in turn creates employment and leads to nation-building."
      </p>
        </div>
        
        
        </div>
      </div>
 
  )
}

export default Mission
