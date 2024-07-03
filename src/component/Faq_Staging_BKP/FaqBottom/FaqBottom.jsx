import React from "react";
import { useNavigate } from "react-router-dom";
const FaqBottom = () => {
  const navigate=useNavigate();
  return (
    <div className="audience mt-40 pb-3" >
     
        <div className="row g-5 justify-content-between align-items-center">
          <div className="col-lg-6 col-12">
            <img className="img-child" src="asset/image567.png" />
          </div>
          <div className="col-lg-5 col-12 ">
            <div>
              <h2 className="heading-600-40-20 c-green my-3">
              Still have a query?
              </h2>
              <p className="heading-400-16-14 op-80">
              Feel free to talk to us about any queries or feedback. Customer satisfaction is our highest priority.
              </p>
              <div className="btn-left-to-right">
              <button className="btn-primary1" style={{borderRadius:"12px"}} onClick={()=>navigate('/contactus')}>Get a Callback</button>
              </div>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default FaqBottom;
