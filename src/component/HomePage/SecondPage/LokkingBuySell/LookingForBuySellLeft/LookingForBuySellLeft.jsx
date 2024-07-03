import React,{useState} from 'react'
import './LookingForBuySellLeft.css'
import LookingToBuy from './LookingToBuy/LookingToBuy';
import LookingToSell from './LookingToSell/LookingToSell';
const LookingForBuySellLeft = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="container-fluid p-0 m-0 row pt-5">
       <div  className="LookingForBuySellLeft-headingdiv p-0">
       <div className='d-flex'>
         <div onClick={() => handleTabClick(1)} className={`curser-pointer ${activeTab === 1 ? 'active-tab mr-4' : 'heading-400-16-14 op-60 mr-4'}`}>Looking to Buy</div>
         <div onClick={() => handleTabClick(2)} className={`curser-pointer ${activeTab === 2 ? 'active-tab' : 'heading-400-16-14 op-60'}`}>Looking to Sell </div>
       </div>
       
       </div>
       {activeTab===1 && <LookingToBuy/>}
       {activeTab===2 && <LookingToSell/>}
       
    </div>
  )
}

export default LookingForBuySellLeft