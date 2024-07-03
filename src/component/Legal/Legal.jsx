import React,{useEffect, useState} from 'react'
import './Legal.css'
import TermsConditions from './TermsConditions/TermsConditions'
import ReturnPolicy from './ReturnPolicy/ReturnPolicy'
import Footer from '../Footer/Footer'
import TabSlider from '../SubComponent/AllSlider/TabSlider'
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'
import Breadcrumbs from '../SubComponent/Breadcrumbs'
import {useNavigate } from 'react-router-dom'
const Legal = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const navigate=useNavigate();
  const breakpoints={
    def:2,
    a:3,
    b:3,
    c:2.5,
    d:2.2,
    e:1.8
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  const breadcrumbsItems = [ { name: "Home", link: "/" }];
    
  const boldtitle="Our Policies";
  return (<>
    <div className='max-container tablet-d-padding pt-4'>
    <div className='container-fluid p-0 m-0 row'>
    <Breadcrumbs backnavi={()=>navigate('/')} boldtitle={boldtitle} items={breadcrumbsItems}/>

</div>
<div className='hide-992 p-0 m-0'>
    <div className='container-fluid p-0 m-0 pt-5 row'>
      <div onClick={() => handleTabClick(1)} className={`col col-auto p-0 `}><p className={activeTab === 1 ? 'active-tab mr-4' : 'heading-400-16-14 op-60 mr-4'}>Privacy Policy</p></div>
      <div onClick={() => handleTabClick(2)} className={`col col-auto p-0 `}><p className={activeTab === 2 ? 'active-tab' : 'heading-400-16-14 op-60'}>  Terms and Conditions</p></div>
      <div onClick={() => handleTabClick(3)} className={`col col-auto`}><p className={activeTab === 3 ? 'active-tab' : 'heading-400-16-14 op-60'}>Return Policy</p></div>
      </div>
</div>
<div className='show-992 p-0 m-0 pt-5'>
<TabSlider breakpoints={breakpoints}>
<div onClick={() => handleTabClick(1)} className={`w-fit p-0 `}><p className={activeTab === 1 ? 'active-tab' : 'heading-400-16-14 op-60'}>Privacy Policy</p> </div>
<div onClick={() => handleTabClick(2)} className={`w-fit p-0 ${activeTab === 2 ? 'active-tab' : 'heading-400-16-14 op-60'}`}>Terms and Conditions</div>
<div onClick={() => handleTabClick(3)} className={`w-fit ${activeTab === 3 ? 'active-tab' : 'heading-400-16-14 op-60'}`}>Return Policy</div>
</TabSlider>
</div>
      <div className='container-fluid p-0 m-0 pt-2'>
      {activeTab===1 ? <PrivacyPolicy/>:null}
      {activeTab===2 ? <TermsConditions/>:null}
      {activeTab===3 ? <ReturnPolicy/>:null}
      </div>
    </div>
    <Footer/> 
    </>
  )
}

export default Legal