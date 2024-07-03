import React from "react";
import vision from "../assets/visions.webp";
import './visions.css'
const Visions = () => {
  return (
  
      <div className="max-container pt-5 my-5">
  <div className="container-fluid m-0 p-0 row align-items-center justify-content-between ourvisionrow">
  <div className="col col-lg-4 col-12 tablet-d-padding">
  <h2 className="mb-20 mt-4 heading-600-44-20" >Our Vision</h2>
  <p className="heading-400-16-14 op-60">
 {/*  "Facilate capacity building that builds enterprises,create jobs
  and income at all levels create jobs and income at all levels" */}
  "Facilitate capacity building across all the segments of the industry"
</p>
  </div>
  
  <div className="col col-lg-7 col-12 tablet-d-padding">
  <img className="img-fluid" src={vision} alt='vision' />
  </div>
  </div>
      </div>
  
  );
};

export default Visions;
