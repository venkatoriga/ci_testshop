import React,{useState} from "react";
import LinkedIn from "../../SubComponent/AllSvgs/LinkedIn";
import Twitter from "../../SubComponent/AllSvgs/Twitter";
import Mail from "../../SubComponent/AllSvgs/Mail";
const Founders = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const onMouseEnterhandler = () => {
    setIsHovered(true);
  };
  const onMouseLeavehandler = () => {
    setIsHovered(false);
  };
 

  const onMouseEnterhandler2 = () => {
    setIsHovered2(true);
  };
  const onMouseLeavehandler2 = () => {
    setIsHovered2(false);
  };
  return (
   <>
    {/* top section */}

<div className="max-container pt-5 pl-0">
  <div className="container-fluid row pt-5 tablet-d-padding">
  <div className="col-12"> <h1 className="heading-600-44-20 pt-3">Management Team</h1></div>
  {/* <div className="col col-lg-7 col-12"><p className="heading-400-16-14 op-60">Meet the visionaries who ignited the spark that ignited our journey towards innovation and excellence.</p></div> */}
  </div>
</div>
    {/* bottom section */}
    <div className="xmax-container">
      <div className="container-fluid p-0 m-0 row" >
      {/* first founder */}
      <div className="col col-lg-6 col-12">
        <div className={`row  ishoverd ${isHovered ? "hovered":""}`} style={{boxShadow:"none"}} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
          <div className="col col-md-5 col-12"><img className="w-100 h-390" src="/asset/shrirang-tambe.png" alt="shrirang-tambe.png"/></div>
          <div className={`col col-md-7 col-12 d-flex  ${isHovered ? "align-items-center":"align-items-end"}`}>
            <div className={`w-100 `}>
            <p className={`heading-600-28-20 ${isHovered ? "bottom-halfline1":"bottom-halfline"}`}>Mr. Shrirang Tambe</p>
            <p className={`heading-500-16-14`}>Founder & CEO</p>
           {/* <p className={`heading-400-16-14 ishoverd-hide ${isHovered ? "":"hovered"}`}>“I believe the users will see Origa as a one stop solution with affordable & custom financing options ”</p> */}
           <p className={`heading-400-12-10 op-80 ishoverd-hide ${isHovered ? "":"hovered"}`}></p>
           <div className={`row pb-3 ishoverd-hide ${isHovered ? "":"hovered"}`}>
           <div className="col col-md-4 col-12 p-0 d-flex justify-content-center">
           <div className="row p-0 m-0">
           <div className="col col-3"><LinkedIn/></div>
           <div className="col col-3"><Twitter/></div>
           <div className="col col-3"><Mail/></div>
           </div>
           </div> 
            </div>
          
           </div>
          </div>
        </div>

      </div>
      {/* Second founder */}
      <div className="col col-lg-6 col-12" >
      <div className={`row col-reverse ishoverd ${isHovered2 ? "hovered":""}`} style={{boxShadow:"none"}} onMouseEnter={onMouseEnterhandler2} onMouseLeave={onMouseLeavehandler2}>
          
          <div  className={`col col-md-7 col-12 d-flex  ${isHovered2 ? "align-items-center":"align-items-end"}`}>
           <div className={`w-100 `}>
            <p className={`heading-600-28-20 ${isHovered2 ? "bottom-halfline1":"bottom-halfline"}`}>Mr. Ram Subramaniam</p>
            <p className={`heading-500-16-14`}>COO</p>
            <p className={`heading-400-16-14 ishoverd-hide ${isHovered2 ? "":"hovered"}`}>“From starting off in the operating lease space to becoming an important player in the equipment ecosystem, Origa has grown by leaps and bounds. Think equipment, think Origa.”</p>
           <p className={`heading-400-12-10 op-80 ishoverd-hide ${isHovered2 ? "":"hovered"}`}> </p>
           <div className={`row pb-3 ishoverd-hide ${isHovered2 ? "":"hovered"}`}>
           <div className="col col-md-4 col-12 p-0 d-flex justify-content-center">
           <div className="row p-0 m-0">
           <div className="col col-3"><LinkedIn/></div>
           <div className="col col-3"><Twitter/></div>
           <div className="col col-3"><Mail/></div>
           </div>
           </div> 
            </div>
            </div>
            
          </div>
          <div className="col col-md-5 col-12">
          <img className="w-100 h-390" src="/asset/ram-subramanium.webp" alt="ram-subramanium"/>
          </div>
        </div>
      </div>
      </div>
    </div>
   </>
  );
};

export default Founders;
