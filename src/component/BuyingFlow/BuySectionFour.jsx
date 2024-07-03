import React,{useState} from "react";
import ImageWithHP from "../SubComponent/ImageWithHP";
const BuySectionFour = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="container-fluid pb-5">    
    <div className="max-container pt-5">
      <div className="container-fluid p-0 row pt-5">
      <div className="col col-lg-9 p-0">
      <ImageWithHP heading={"A Quick Guide to Your Next Equipment Upgrade"} para=""/>
      </div>
      </div>
    </div>

  <div className='max-container pt-4'>
  <div className='hide-992 p-0 m-0'>
  <div className='container-fluid p-0 m-0 d-flex '>
  <div onClick={() => handleTabClick(1)} className={`curser-pointer ${activeTab === 1 ? 'active-tab mr-4 w-fit ' : 'heading-400-16-14 op-60 mr-4'}`}>Machine Search and Inspection Report</div>
      <div onClick={() => handleTabClick(2)} className={`curser-pointer ${activeTab === 2 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}`}>Token Payment and Schedule Visit</div>
      <div onClick={() => handleTabClick(3)} className={`curser-pointer ${activeTab === 3 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}`}>Negotiation and Payment</div>
      <div onClick={() => handleTabClick(4)} className={`curser-pointer ${activeTab === 4 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60'}`}>Delivery</div>
     
  </div>
  </div>
  
  <div className='show-992 '>
  <div className="container-fluid p-0">
  <div className="scroller-tabs-container" >
  <div className="scroller-tabs" >
  
     <div onClick={() => handleTabClick(1)} className={`curser-pointer ${activeTab === 1 ? 'active-tab mr-4 w-fit ' : 'heading-400-16-14 op-60 '}`}>Machine Search and Inspection Report</div>
      <div onClick={() => handleTabClick(2)} className={`curser-pointer ${activeTab === 2 ? 'active-tab mr-4 w-fit ' : 'heading-400-16-14 op-60'}`} >Token Payment and Schedule Visit</div>
      <div onClick={() => handleTabClick(3)} className={`curser-pointer ${activeTab === 3 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60'}`}>Negotiation and Payment</div>
      <div onClick={() => handleTabClick(4)} className={`curser-pointer ${activeTab === 4 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60'}`}>Delivery</div>
      </div>
     </div>
     </div>
   </div>
  
  {activeTab===1 && <div className='max-container'>
  <div className='row pt-4'>
      <div className='col col-lg-8 col-md-12 col-12'>
          <img className='w-100 h-100' src='asset/image565.png' alt='image565.png'/>
      </div>
      <div className='col col-lg-4 col-md-12 col-12 d-flex align-items-center'>
      <div className='row'>
          <div className='col'>
          <p className='heading-400-16-12 op-80'>Discover the perfect machine match for your needs and access the inspection report. Obtain detailed
          machine description & expert inspection remarks for a comprehensive understanding of equipment with
          minimal convenience fees.</p>
          </div>
      </div>
      </div>
  </div>
  </div>}
  {activeTab===2 &&  <div className='max-container'>
  <div className='row pt-4'>
      <div className='col col-lg-8 col-md-12 col-12'>
          <img className='w-100 h-100' src='asset/image565.png' alt='image565.png'/>
      </div>
      <div className='col col-lg-4 col-md-12 col-12 d-flex align-items-center'>
      <div className='row'>
          <div className='col'>
         
          <p className='heading-400-16-12 op-80'>Secure your chosen machine by making a small reservation payment. Easily schedule a site visit for a
          hands-on inspection of the equipment.
          </p>
          </div>
      </div>
      </div>
  </div>
  </div>}
  {activeTab===3 &&  <div className='max-container'>
  <div className='row pt-4'>
      <div className='col col-lg-8 col-md-12 col-12'>
          <img className='w-100 h-100' src='asset/image565.png' alt='image565.png'/>
      </div>
      <div className='col col-lg-4 col-md-12 col-12 d-flex align-items-center'>
      <div className='row'>
          <div className='col'>
          <p className='heading-400-16-12 op-80'>Count on Origa for the best equipment prices for you and financial support with our available lease and
          loan options. Easily make your final payment on our secure website.          
          </p>
          </div>
      </div>
      </div>
  </div>
  </div>}
  {activeTab===4 && <div className='max-container'>
  <div className='row pt-4'>
      <div className='col col-lg-8 col-md-12 col-12'>
          <img className='w-100 h-100' src='asset/image565.png' alt='image565.png'/>
      </div>
      <div className='col col-lg-4 col-md-12 col-12 d-flex align-items-center'>
      <div className='row'>
          <div className='col'>
          <p className='heading-400-16-12 op-80'>Get the equipment delivered from any location in India with the added convenience of our transportation
          support. We will also manage the commissioning process for you.          
          </p>
          </div>
      </div>
      </div>
  </div>
  </div>}
  </div>

    </div>
  );
};

export default BuySectionFour;