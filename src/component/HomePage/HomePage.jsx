import React from 'react'
import SecondPage from './SecondPage/SecondPage'
import FourthPage from './FourthPage/FourthPage'
import classes from './Home.module.css'
import FirstSection from './FirstPage/FirstSection'
// import SixthSection from './SixthPage/SixthSection'
import FifthPage from './FifthPage/FifthPage'
import SeventhPage from './SeventhPage/SeventhPage'
import EighthPage from './Eighth/EighthPage'
// import Tenth from './Tenth/Tenth'
import Ninth from './ninth/Ninth'
import ThirdSection from './ThirdPage/ThirdSection'
import Footer from '../Footer/Footer'
import BuyMachine from "./SecondPage/SVGs/BuyMachine";
import SellMachine from "./SecondPage/SVGs/SellMachine";
import Servicing from "./SecondPage/SVGs/Servicing";
import LeaseEquipment from "./SecondPage/SVGs/LeaseEquipment";
import EquipmentLoan from "./SecondPage/SVGs/EquipmentLoan";
function HomePage() {

  const seventhPageData = { heading: 'Recently Viewed Machines', message: '', buttonName: "View Shop" ,navi:'/buy/product-listing'}
  const SecondPageData={heading:"ORIGA: Leading the Market in Equipment Lifecycle Management Since 2014",para:"Your Search For A Convenient And Affordable Equipment Solutions Ends Here!"}
  const services = [{ title: " Buy used machine", imageSource: <BuyMachine />, message: '20+ Brands', url:'/buy' },
  { title: "Sell used machine", imageSource:<SellMachine/> , message: '1500 + daily visitors', url:'/sell' },
  { title: "Equipment Finance", imageSource:<Servicing/> , message: '400 + equipment leased', url: 'https://www.origaleasing.com/en/'},
  { title: "Maintenance", imageSource: <LeaseEquipment/>, message: '500 + satisfied customers', url: '/service'},
  { title: "Tools & Spares", imageSource:<EquipmentLoan/>, message: '50+ products' },
 
];
// Ninth Section data
const product={heading: "Serving More Than 30 Industries with All Your Needs Under One Roof",
para: "From Machines to tools to finance everything you need in one place"}
const topSliderData = [{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },
{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },{ message: "Nephrology" },{ message: "Ophthalmology" },{ message: "Radiology" },{ message: "Oncology" },
];

const bottomSliderData = [{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },
{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },{ message: "Automotive" },{ message: "Aerospace" },{ message: "Packaging" },
];
const CustomerId = localStorage.getItem('id');
let RecentlyViewed;
if (CustomerId === null) {
  RecentlyViewed = JSON.parse(localStorage.getItem("SelectedProducts")) || [];
} else {
  RecentlyViewed = JSON.parse(localStorage.getItem("SelectedProductsWithUser")) || [];
  RecentlyViewed = RecentlyViewed.filter((product) => product.userId === CustomerId);
}
console.log("RecentlyViewed===>>>", RecentlyViewed);

  return (
    <div className={classes.maindiv}>

     <FirstSection />
      <SecondPage product={SecondPageData} productData={services}/>  
      <ThirdSection/>
      <FourthPage />
  <FifthPage />
  {/*<SixthSection />*/}
  {RecentlyViewed.length >= 3 && (
        <SeventhPage topsectionData={seventhPageData} />
      )} 
     <EighthPage />
      <Ninth topSliderData={topSliderData} bottomSliderData={bottomSliderData}  product={product} />
  {/*<Tenth />*/}
     <Footer/> 
    </div>
  )
}

export default HomePage