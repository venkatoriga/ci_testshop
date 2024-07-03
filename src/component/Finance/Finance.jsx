import React,{useEffect} from 'react'
import NewBanner from '../NewBanner/NewBanner'
import FinancefirstSection from './FinancefirstSection';
import FinanceThirdSection from './FinanceThirdSection';
import FinanceSecondSection from './FinanceSecondSection';
import FinancefourthSection from './FinancefourthSection';
import Footer from '../Footer/Footer';
import FinaceFifthSection from './FinaceFifthSection';
import { f_loan,f_handsetting,averageSellingTime,f_thumb,f_handshake } from '../../helpers/Icons'

const Finance = () => {
  const product={
    imgurl:"/origaReach.svg",
    heading: "We cater to over 50 industries ",
    para: "From Machines to tools to finance everything you need in one place"};

const topSliderData = [{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },
{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" },{ message: "Medical & Pharma",imgsrc:"/asset/ftopslider1.png" },{ message: "IT & Technology",imgsrc:"/asset/ftopslider2.png" },{ message: "Industrial Engineering",imgsrc:"/asset/ftopslider3.png" }
];

const bottomSliderData = [{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },
{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" },{ message: "Building & Construction",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Power & Energy",imgsrc:"/asset/fbottomslider2.png" },{ message: "Food & Beverages",imgsrc:"/asset/fbottomslider3.png" }
];
const items=[{imagesrc:f_handsetting({width:60 ,height:60}),title:"Lease Machine",para:"400 machines leased",navi:`/finance_stepper?Type=Lease`},
{imagesrc:f_loan({width:60, height:60}),title:"Loan Machine",para:"Over INR 200 crores financed",navi:`/finance_stepper?Type=Loan`}
]
const bannerTopSection={title:"Explore Quick and Easy Equipment Financing Solutions",para:"Simplifying the Path to Procuring Your Next Equipment",mw:"mw-603"}
const advantageData = [
  {title: "Fast Processing",description: "ORIGA’s strong networks and financial ties ensures quick  approvlas",icon:averageSellingTime({width:60,height:60})},
  {title: "Easy Procedures",description: "Straightforward documentation and user-friendly interfaces",icon: f_thumb({width:60,height:60})},
  {title: "Reliable Service",description: "Team with more than 2 decades of experience and industry network",icon: f_handshake({width:60,height:60})}
];
const advantageTopSection={imgurl:"/OrigaWhy.svg",title:"Origa Advantage",para:"Choose ORIGA for fast, easy, and reliable equipment leasing or lean solutions"}
useEffect(() => {
window.scrollTo(0,0)
}, [])
const listofdata=[
  {title:"Buy Used Equipment",message:"Find high-quality, pre-owned machines for your business needs at competitive prices.",imageurl:"/asset/f_other_benifit1.svg",btnname:"Buy Now",navigate:'/buy'},
  {title:"Sell Used Equipment",message:"Streamline the process of selling surplus inventory by listing it easily on our website.",imageurl:"/asset/f_other_benifit2.svg",btnname:"Sell Now",navigate:'/sell'},
  {title:"Equipment Service & Maintenance:",message:"Choose from a range of preventive, breakdown, and annual maintenance contracts tailored to your needs",imageurl:"/asset/f_other_benifit3.svg",btnname:"Book Now",navigate:'/service'},
  // {title:"Buy Used Equipment",message:"Find high-quality, pre-owned machines for your business needs at competitive prices.",imageurl:"/asset/f_other_benifit1.svg",btnname:"Buy Now",navigate:'/buy'},
  // {title:"Sell Used Equipment",message:"Streamline the process of selling surplus inventory by listing it easily on our website.",imageurl:"/asset/f_other_benifit2.svg",btnname:"Sell Now",navigate:'/sell'}
]
  return (
    <> 
    <NewBanner items={items} bannerTopSection={bannerTopSection}/>
    <FinancefirstSection topSliderData={topSliderData} product={product} bottomSliderData={bottomSliderData}/>
    <FinanceSecondSection/>
    <FinanceThirdSection advantageData={advantageData} topSectionData={advantageTopSection}/>
    <FinancefourthSection listofdata={listofdata}/>
    <FinaceFifthSection title={"Looking for a specific Brand?"} para={"From Machines to tools to finance everything you need in one place"} searchbtn={"Get financing"}/>
    <Footer/>
    </>
  )
}

export default Finance