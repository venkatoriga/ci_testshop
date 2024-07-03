import React,{useEffect} from 'react'
import NewBanner from '../NewBanner/NewBanner'
import FinaceFifthSection from '../Finance/FinaceFifthSection'
import FinancefirstSection from '../Finance/FinancefirstSection'
import FinanceThirdSection from '../Finance/FinanceThirdSection'
import FinancefourthSection from '../Finance/FinancefourthSection'
import NewServicefirstSection from './NewServicefirstSection'
import { new_rapidTime,new_HandPhone,new_tool,newService1,newService2,newService3} from '../../helpers/Icons'
import NewFooter from '../Footer/NewFooter'
import { useNavigate } from "react-router-dom";

const NewService = () => {
  const navigate = useNavigate();
  const items = [
    {
      imagesrc: newService1({ width: 60, height: 60 }),
      title: "Preventive Maintenance",
      para: "Proactive Care",
      navi: () => {
        const productId = "serviceRequest";
        const serviceName = "On Call Service";
        navigate("/service/Addonservice", { state: { productId, serviceName } });
      },
    },
    {
      imagesrc: newService2({ width: 60, height: 60 }),
      title: "Breakdown Services",
      para: "Rapid Response",
      navi: () => {
        const productId = "serviceRequest";
        const serviceName = "Preventive Maintenance";
        navigate("/service/Addonservice", { state: { productId, serviceName } });
      },
    },
    {
      imagesrc: newService3({ width: 60, height: 60 }),
      title: "Annual Maintenance Contract",
      para: "Year-round Assurance",
      navi: () => {
        const productId = "serviceRequest";
        const serviceName = "AMC"
        navigate('/service/Addonservice', { state: { productId, serviceName } });
        // navigate("#");
      },
    },
  ];
  
  
    const benifit={step1:"/step1.svg",title1:"Raise a Service Request",para1:"Visit our website or application to submit a service request for your machine.",fun1:"",imageurl1:"/buy_new2.png",btn1:"Get Started",
    step2:"/step2.svg",title2:"Receive a call from our machine expert",para2:"Expect a call from one of our experienced machine experts to discuss and assess your needs.",fun2:"",imageurl2:"/buy_new1.png",btn2:"Get Started",
    step3:"/step3.svg",title3:"Book an appointment for inspection",para3:"Securely book a convenient appointment for your machine service with our team.",fun3:"",imageurl3:"/buy_new3.png",btn3:"Get Started",
    }

    const bannerTopSection={title:"Minimize Production Downtime",para:"Access Instant Expert Assistance For Machine-Related Issues",mw:"mw-430"}
    
    const product={  imgurl:"/origaReach.svg",heading: "We service all kinds of Turning Centre Machine Tools ",
    para: "From Turning Centre, Turning Centre, VMC and many more"}
    const topSliderData = [
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    { message: "Photos",imgsrc:"/asset/ftopslider1.png" },{ message: "CNC",imgsrc:"/asset/ftopslider2.png" },{ message: "Turning Centre",imgsrc:"/asset/ftopslider3.png" },
    ];
    const bottomSliderData = [
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    { message: "Photos",imgsrc:"/asset/fbottomslider1.png"  },{ message: "HMC",imgsrc:"/asset/fbottomslider2.png" },{ message: "CMH",imgsrc:"/asset/fbottomslider3.png" },
    ];
    const advantageData = [
        {title: "Rapid response time",description: "ORIGA commits to addressing inquiries within 24 hours, reducing operational disruptions.",icon: new_rapidTime({width:60,height:60})},
        {title: "Expert engineering assistance",description: " Skilled engineers provide specialized support for efficient maintenance and service.",icon: new_HandPhone({width:60,height:60})},
        {title: "Customized Solutions and Access to Tools/Spares",description: "Tailored maintenance plans and readily available tools/spare parts optimize performance and minimize disruptions.",icon:  new_tool({width:60,height:60})}
      ];
      const advantageTopSection={title:"Origa Advantage",para:"Maximizing Productivity with Swift Support and Tailored Solutions"}
  
      const listofdata=[
        {title:"Buy Used Equipment",message:"Find high-quality, pre-owned machines for your business needs at competitive prices.",imageurl:"/asset/f_other_benifit1.svg"},
        {title:"Equipment Financing",message:"Explore hassle-free loan and lease options for your next purchases",imageurl:"/asset/f_other_benifit2.svg"},
        {title:"Tools, Spares & Consumables",message:"Explore a Range of Quality Products and Brands for smooth operations.",imageurl:"/asset/f_other_benifit3.svg"},
      /*   {title:"Buy Used Equipment",message:"Find high-quality, pre-owned machines for your business needs at competitive prices.",imageurl:"/asset/f_other_benifit1.svg"},
        {title:"Equipment Financing",message:"Explore hassle-free loan and lease options for your next purchases",imageurl:"/asset/f_other_benifit2.svg"}, */
         
      ]
      useEffect(() => {
    window.scrollTo(0,0)
    }, [])
    
      return (
        <>
        <NewBanner items={items} bannerTopSection={bannerTopSection}/>
       
    <FinancefirstSection  topSliderData={topSliderData} product={product} bottomSliderData={bottomSliderData}/>
    <NewServicefirstSection benifit={benifit}/>
    <FinanceThirdSection advantageData={advantageData} topSectionData={advantageTopSection}/>
    <FinancefourthSection listofdata={listofdata}/>   
    <FinaceFifthSection title={"Looking for a specific Brand?"} para={"From Machines to tools to finance everything you need in one place"} searchbtn={"Get servicing"}/>
    <NewFooter/>  
        </>
      )
    }
export default NewService