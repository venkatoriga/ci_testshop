import React,{useEffect} from 'react'
import NewBanner from '../NewBanner/NewBanner'
import { new_Medical,new_industrial } from '../../helpers/Icons'
import FinaceFifthSection from '../Finance/FinaceFifthSection'
import FinancefirstSection from '../Finance/FinancefirstSection'
import FinanceThirdSection from '../Finance/FinanceThirdSection'
import FinancefourthSection from '../Finance/FinancefourthSection'
import NewSellfirstSection from './NewSellfirstSection'
import { maximumValue,genuineBuyers,quickSell } from '../../helpers/Icons'
import NewFooter from '../Footer/NewFooter'

const NewSell = () => {
    const items=[{imagesrc:new_industrial({width:60 ,height:60}),title:"Industrial Equipment",para:"Over 1500 daily visitors",navi:"/sell/machine-detail"},
    {imagesrc:new_Medical({width:60, height:60}),title:"Medical Equipment",para:"Over 500 + Equipment sold",navi:"/sell/machine-detail"}
    ]
    const benifit={step1:"/step1.svg",title1:"Easy Registration",para1:"Easily sell your used machines by filling out a simple form with details and machine images",fun1:"",imageurl1:"/buy_new2.png",btn1:"Get Started",
    step2:"/step2.svg",title2:"Quick Evaluation and Documentation",para2:"Our team evaluates information within 24 hours, handling all necessary agreements between ORIGA & seller",fun2:"",imageurl2:"/buy_new1.png",btn2:"Get Started",
    step3:"/step3.svg",title3:"Hassle-Free Listing and Sale",para3:"Enjoy a free listing on our website, and once there’s buyer interest, we take care of the inspection visit, negotiation, and secure online payment.",fun3:"",imageurl3:"/buy_new3.png",btn3:"Get Started",
    }

    const bannerTopSection={title:"Get maximum value for your used machines",para:"Connect with genuine buyers for a hassle-free selling experience",mw:"mw-426"}
    
    const product={  imgurl:"/origaReach.svg",
    heading: "We cater to over 50 industries ",
    para: "From CNC machine tooling to CT scan, MRI machine and many more"}
    const topSliderData = [
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    { message: "Radiology",imgsrc:"/asset/ftopslider1.png" },{ message: "Nephrology",imgsrc:"/asset/ftopslider2.png" },{ message: "Ophthalmology",imgsrc:"/asset/ftopslider3.png" },
    ];
    const bottomSliderData = [
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Oncology",imgsrc:"/asset/fbottomslider1.png"  },{ message: "Automotive",imgsrc:"/asset/fbottomslider2.png" },{ message: "Fabrication and Industrial Machinery Manufacturing",imgsrc:"/asset/fbottomslider3.png" },
    ];
    const advantageData = [
        {title: "Quick Sell",description: "Utilise ORIGA’s nationwide reach for swift sales of your old machinery across India",icon: quickSell({width:60,height:60})},
        {title: "Genuine Buyers",description: "Connect with authentic and verified buyers on ORIGA, ensuring trustworthy transactions",icon: genuineBuyers({width:60,height:60})},
        {title: "Maximum Value",description: "Leverage ORIGA’s extensive network and secure the best price for your equipment.",icon:  maximumValue({width:60,height:60})}
      ];
      const advantageTopSection={imgurl:"/OrigaWhy.svg",title:"Origa Advantage",para:"Choose ORIGA for quality, affordability, and accessibility."}
      const listofdata=[
        {title:"Buy Used Equipment",message:"Find high-quality, pre-owned machines for your business needs at competitive prices.",imageurl:"/asset/f_other_benifit1.svg"},
        {title:"Equipment Financing",message:"Explore hassle-free loan and lease options for your next purchases",imageurl:"/asset/f_other_benifit2.svg"},
        {title:"Equipment Service & Maintenance:",message:"Choose from a range of preventive, breakdown, and annual maintenance contracts tailored to your needs",imageurl:"/asset/f_other_benifit3.svg"},
        {title:"Buy Used Equipment",message:"Find high-quality, pre-owned machines for your business needs at competitive prices.",imageurl:"/asset/f_other_benifit1.svg"},
        {title:"Equipment Financing",message:"Explore hassle-free loan and lease options for your next purchases",imageurl:"/asset/f_other_benifit2.svg"},
         
      ]
      useEffect(() => {
    window.scrollTo(0,0)
    }, [])
    
      return (
        <>
        <NewBanner items={items} bannerTopSection={bannerTopSection}/>
       
    <FinancefirstSection  topSliderData={topSliderData} product={product} bottomSliderData={bottomSliderData}/>
    <NewSellfirstSection benifit={benifit}/>
    <FinanceThirdSection advantageData={advantageData} topSectionData={advantageTopSection}/>
    <FinancefourthSection listofdata={listofdata}/>   
    <FinaceFifthSection title={"Looking for a specific Brand?"} para={"From Machines to tools to finance everything you need in one place"}  searchbtn={"Sell at Origa"}/>
      <NewFooter/>   
        </>
      )
    }
export default NewSell