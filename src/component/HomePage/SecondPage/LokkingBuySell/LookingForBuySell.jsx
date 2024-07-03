import React from 'react'
import './LookingForBuySell.css'
import LookingForBuySellLeft from './LookingForBuySellLeft/LookingForBuySellLeft'
import LookingForBuySellRight from './LookingForBuySellRight/LookingForBuySellRight'
const LookingForBuySell = () => {
  const product = [
    {
        heading: "A decade of industry expertise",
        message: "Mastering industry intricacies, specialising in pre owned industrial & medical equipment",
        imageUrl: "/checks.svg"
    },
    {
        heading: "Operations across 9 states",
        message: "Operational across Maharashtra, Delhi, Haryana, Uttar Pradesh Kerala, Karnataka, Tamil Nadu, Telangana, Andhra Pradesh",
        imageUrl: "/deliver.svg"
    },
    {
        heading: "Sustainability Legacy",
        message: "Promoting economic sustainability by prioritising durability over disposability, encouraging longer product life cycles."
        ,
        imageUrl: "/service.svg"
    },
    {
        heading: "Thriving customer base",
        message: "Nurturing client base with exceptional service, cultivating business growth through referrals",
        imageUrl: "/finance.svg"
    },
];
  return (
 
      <div className={`container-fluid p-0 m-0 row d-flex justify-content-between `}>
        <div className="col-lg-5 col-md-12 col-12 tablet-d-padding bg-white">
        <LookingForBuySellLeft/>
        </div>
        <div className="col-lg-6 col-md-12 col-12 p-0 pt-2">
          <LookingForBuySellRight product={product}/>
        </div>
      </div>
  
  )
}

export default LookingForBuySell