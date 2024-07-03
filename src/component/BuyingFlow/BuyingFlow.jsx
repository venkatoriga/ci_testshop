import React,{useEffect} from 'react'
import NewBanner from '../NewBanner/NewBanner'
import { new_Medical,new_industrial } from '../../helpers/Icons'
import FinaceFifthSection from '../Finance/FinaceFifthSection'
import FinancefirstSection from '../Finance/FinancefirstSection'
import FinanceThirdSection from '../Finance/FinanceThirdSection'
import FinancefourthSection from '../Finance/FinancefourthSection'
import NewBuyfirstSection from './NewBuyfirstSection'
import { superiorQuality,competitivePrices,newEasyAccess } from '../../helpers/Icons'
import Footer from '../Footer/Footer'
const NewBuy = () => {
    const items=[{imagesrc:new_industrial({width:60 ,height:60}),title:"Industrial Equipment",para:"Over 1500 daily visitors",navi:`/buy/product-listing?searchInput=${'MSME'}`},
{imagesrc:new_Medical({width:60, height:60}),title:"Medical Equipment",para:"Over 500 + Equipment sold",navi:`/buy/product-listing?searchInput=${'HealthCare'}`}
]
const bannerTopSection={title:"Your Search for the Top Quality Pre-Owned Equipment Ends Here",para:"Buy Right Equipment at Competitive Prices",mw:"mw-486"}

const product={  imgurl:"/origaReach.svg",
heading: "We cater to over 50 industries ",
para: "From CNC machine tooling to CT scan, MRI machine and many more"}
const topSliderData = [
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  { message: "CNC",imgsrc:"/asset/Image1CNC.png" },{ message: "VMC",imgsrc:"/asset/Image2VMC.png" },{ message: "Machine Tooling",imgsrc:"/asset/Image3Machine Tooling.png" },{ message: "CNC",imgsrc:"/asset/Image4CNC.png" },{ message: "Injection Moulding",imgsrc:"/asset/Image5Injection Moulding.png" },
  ];
const bottomSliderData = [
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  { message: "CT Scan",imgsrc:"/asset/HealthImage1CTScan.png"  },{ message: "Ultrasound Machine",imgsrc:"/asset/HealthImage2 Ultrasoundmachine.png" },{ message: "Dialysis Machine",imgsrc:"/asset/HealthImage3 Dialysismachine.png" },{ message: "Auto Refractometer",imgsrc:"/asset/HealthImage 4Auto Refractometer.png" },
  ];
  
const benifit={step1:"/step1.svg",title1:"Machine Search and Inspection Report",para1:" Discover the perfect machine match for your needs and access the inspection report. Obtain detailed machine description & expert inspection remarks for a comprehensive understanding of equipment with minimal convenience fees",fun1:"",imageurl1:"/buy_new1.png",btn1:"Get Started",
step2:"/step2.svg",title2:"Token Payment and Schedule Visit",para2:"Secure your chosen machine by making a small reservation payment. Easily schedule a site visit for a hands-on inspection of the equipment",fun2:"",imageurl2:"/buy_new2.png" ,btn2:"Get Started",
step3:"/step3.svg",title3:"Payment",para3:"Count on Origa for the best equipment prices for you and financial support with our available lease and loan options. Easily make your final payment on our secure website",fun3:"",imageurl3:"/buy_new3.png",btn3:"Get Started",
step4:"/step4.svg",title4:"Delivery",para4:"Get the equipment delivered from any location in India with the added convenience of our transportation support. We can also support you with commissioning.",fun4:"",imageurl4:"/buy_new4.png",btn4:"Get Started"}
const advantageData = [
    {title: "Superior Quality Assurance:",description: "Access our meticulously crafted inspection report",icon: superiorQuality({width:60,height:60})},
    {title: "Competitive Prices",description: "Get the best value without sacrificing quality.",icon: competitivePrices({width:60,height:60})},
    {title: "Easy Access",description: "Shop conveniently with seamless accessibility.",icon:  newEasyAccess({width:60,height:60})}
  ];
  const advantageTopSection={imgurl:"/OrigaWhy.svg",title:"Origa Advantage",para:"Choose ORIGA for quality, affordability, and accessibility."}

  const listofdata=[
    {title:"Equipment Financing:",message:"Explore hassle-free loan and lease options for your next purchases",imageurl:"/asset/f_other_benifit1.svg",btnname:"Apply Now",navigate:'/finance'},
    {title:"Sell Used Equipment",message:"Streamline the process of selling surplus inventory by listing it easily on our website",imageurl:"/asset/f_other_benifit2.svg",btnname:"Sell Now",navigate:'/Sell'},
    {title:"Equipment Service &  Maintenance",message:"Choose from a range of preventive, breakdown, and annual maintenance contracts tailored to your needs",imageurl:"/asset/f_other_benifit3.svg",btnname:"Book Now",navigate:'/service'},
    // {title:"Equipment Financing:",message:"Explore hassle-free loan and lease options for your next purchases",imageurl:"/asset/f_other_benifit1.svg",btnname:"Apply Now",navigate:'/finance'},
    // {title:"Sell Used Equipment",message:"Streamline the process of selling surplus inventory by listing it easily on our website",imageurl:"/asset/f_other_benifit2.svg",btnname:"Sell Now",navigate:'/Sell'},
     
  ]
  useEffect(() => {
window.scrollTo(0,0)
}, [])

  return (
    <>
    <NewBanner items={items} bannerTopSection={bannerTopSection}/>
   
<FinancefirstSection  topSliderData={topSliderData} product={product} bottomSliderData={bottomSliderData}/>
<NewBuyfirstSection benifit={benifit}/>
<FinanceThirdSection advantageData={advantageData} topSectionData={advantageTopSection}/>
<FinancefourthSection listofdata={listofdata}/>   
<FinaceFifthSection title={"Looking for a specific Brand?"} para={"From Machines to tools to finance everything you need in one place"} searchbtn={"Search for Machine"}/>
   <Footer/> 
    </>
  )
}

export default NewBuy