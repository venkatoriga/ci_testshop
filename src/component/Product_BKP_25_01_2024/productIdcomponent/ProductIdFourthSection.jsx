import React,{useState} from 'react'
import TabSlider from '../../SubComponent/AllSlider/TabSlider';
import {Shield,Piechart,Setting,SlideShow,Refresh} from '../../SubComponent/AllSvgs/Icons2416'
const ProductIdFourthSection = () => {
    const [activeTab, setActiveTab] = useState(1);

    const breakpoints={
      def:1,
      a:4,
      b:3.2,
      c:2.3,
      d:1.5,
      e:1
    }
    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
  return (
    <div className='container-fluid tablet-d-padding pt-4'>
    <div className='max-container wrap-24-16'>
    <div className='hide-992 p-0 m-0'>
    <div className='container-fluid p-0 m-0 d-flex divider-bottom'>
    <div onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}>Evolve program</div>
        <div onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}>Remote assistance</div>
        <div onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}>Regular updates</div>
        <div onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60'}>Other Details</div>
       
    </div>
    </div>
    
    <div className='show-992 divider-bottom'>
    <TabSlider breakpoints={breakpoints}>
       <div onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}>Evolve program</div>
        <div onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}>Remote assistance</div>
        <div onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60 mr-4'}>Regular updates</div>
        <div onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active-tab mr-4 w-fit' : 'heading-400-16-14 op-60'}>Other Details</div>
        
       </TabSlider>
     </div>
   
   {activeTab===1 && <div className="container-fluid p-0 m-0 row pt-2 justify-content-between">
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
        <p className='heading-400-14 op-70'>About</p>
        <p className='heading-500-14'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
    </div>
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>Benefits</p>
    <div className='d-flex p-0 m-0'><div><Shield/></div> &nbsp;<p className='heading-400-14'>Protect your investment and optimize operating costs</p></div>
    <div className='d-flex p-0 m-0'><div> <Piechart/></div> &nbsp;<p className='heading-400-14'>Simplify technology management Improve outcomes and productivity</p></div>
    </div>
    <div className="col col-lg-4 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>What it includes?</p>
    <div className='d-flex p-0 m-0'><div><SlideShow/></div>&nbsp;<p className='heading-400-14'>The program includes related training and updates for your existing equipment</p></div>
    <div className='d-flex p-0 m-0'><div><Refresh/></div>&nbsp;<p className='heading-400-14'>For many machines, additional software versions will be provided as they become available</p></div>
    <div className='d-flex p-0 m-0'><div><Setting/></div>&nbsp;<p className='heading-400-14'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p></div>
    </div>
    </div>}
    {activeTab===2 && <div className="container-fluid p-0 m-0 row pt-2 justify-content-between">
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
        <p className='heading-400-14 op-70'>About</p>
        <p className='heading-500-14'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
    </div>
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>Benefits</p>
    <p className='heading-400-14'>Protect your investment and optimize operating costs</p>
    <p className='heading-400-14'>Simplify technology management Improve outcomes and productivity</p>
    </div>
    <div className="col col-lg-4 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>What it includes?</p>
    <p className='heading-400-14'>The program includes related training and updates for your existing equipment</p>
    <p className='heading-400-14'>For many machines, additional software versions will be provided as they become available</p>
    <p className='heading-400-14'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
    </div>
    </div>}
    {activeTab===3 && <div className="container-fluid p-0 m-0 row pt-2 justify-content-between">
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
        <p className='heading-400-14 op-70'>About</p>
        <p className='heading-500-14'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
    </div>
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>Benefits</p>
    <p className='heading-400-14'>Protect your investment and optimize operating costs</p>
    <p className='heading-400-14'>Simplify technology management Improve outcomes and productivity</p>
    </div>
    <div className="col col-lg-4 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>What it includes?</p>
    <p className='heading-400-14'>The program includes related training and updates for your existing equipment</p>
    <p className='heading-400-14'>For many machines, additional software versions will be provided as they become available</p>
    <p className='heading-400-14'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
    </div>
    </div>}
    {activeTab===4 && <div className="container-fluid p-0 m-0 row pt-2 justify-content-between">
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
        <p className='heading-400-14 op-70'>About</p>
        <p className='heading-500-14'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
    </div>
    <div className="col col-lg-3 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>Benefits</p>
    <p className='heading-400-14'>Protect your investment and optimize operating costs</p>
    <p className='heading-400-14'>Simplify technology management Improve outcomes and productivity</p>
    </div>
    <div className="col col-lg-4 col-md-6 col-12 p-0 ">
    <p className='heading-400-14 op-70'>What it includes?</p>
    <p className='heading-400-14'>The program includes related training and updates for your existing equipment</p>
    <p className='heading-400-14'>For many machines, additional software versions will be provided as they become available</p>
    <p className='heading-400-14'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
    </div>
    </div>}

    </div>
    </div>
  )
}

export default ProductIdFourthSection