import React from 'react'
import ListofService from '../HomePage/SecondPage/ListofService';
import BuyMachine from '../HomePage/SecondPage/SVGs/BuyMachine';
import SellMachine from '../HomePage/SecondPage/SVGs/SellMachine';
import Servicing from '../HomePage/SecondPage/SVGs/Servicing';
import LeaseEquipment from '../HomePage/SecondPage/SVGs/LeaseEquipment';
import EquipmentLoan from '../HomePage/SecondPage/SVGs/EquipmentLoan';
const BuySectionTwo = () => {
    const productData = [{ title: " 1000 + Industrial Equipment", imageSource: <BuyMachine />, message: '' },
    { title: "1200 + Medical Equipments", imageSource:<SellMachine/> , message: '' },
    { title: "50 + Brands", imageSource:<Servicing/> , message: '' },
    { title: "800 + Models", imageSource: <LeaseEquipment/>, message: '' },
    { title: "200 Points Inspection", imageSource:<EquipmentLoan/>, message: '' },
   
  ];
  return (
    <>
    <div className='container-fluid p-0'>
    <div className='max-container'>
      <div className="secondsection pt-4">
        
        <h1 className='heading-600-44-20 text-center'>Buy With Confidence, Buy With ORIGA</h1>
        <p className="heading-400-16 text-center op-80">Your Satisfaction, Our Mission</p>
        <div className='w-100 p-0 m-0 pt-5'>
        <div className="container-fluid p-0 m-0 row d-flex justify-content-between ">
        <ListofService services={productData}/>
        </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default BuySectionTwo