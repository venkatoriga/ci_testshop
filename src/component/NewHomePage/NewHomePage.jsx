
import React,{useEffect,useState} from 'react'
import HomePageFifthSection from '../NewHomePage/HomePageFifthSection'
import FinancefirstSection from '../Finance/FinancefirstSection'
import { newHomePage1,newHomePage2,newHomePage3,newHomePage4,qCheck,qCall,qFinance,qValue,qHub,closeIcon} from '../../helpers/Icons'
import HomePageBanner from './HomePageBanner'
// import NewFooter from '../Footer/NewFooter'
import Footer from '../Footer/Footer'
// import popupImage from '/asset/popup-image.png'; 

const NewHomePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const items=[
    {imagesrc:newHomePage1({width:60 ,height:60}),title:"Buy Machine",para:"50 + Brands Available",navi:"/buy",btnname:"Buy Now"},
    {imagesrc:newHomePage2({width:60 ,height:60}),title:"Service & Maintainence",para:"500 + Satisfied Customers",navi:"/service",btnname:"Book Now"},
    {imagesrc:newHomePage3({width:60, height:60}),title:"Loan and Lease Machine",para:"400 + Equipment Financed",navi:"/finance",btnname:"Apply Now"},
    {imagesrc:newHomePage4({width:60, height:60}),title:"Sell Machine",para:"1500  Machines  + Daily Visitors",navi:"/sell",btnname:"Sell Now"},
    // {imagesrc:newHomePage5({width:60, height:60}),title:"Tools Spares and Consumables",para:"500 + Products Available",navi:"#"}
    ]

    const bannerTopSection={title:"India’s 1st One Stop Platform for All Equipment Needs",para:"We strive for your satisfaction, making us the preferred choice for reliable and affordable equipment solutions"}
    
    const product={  imgurl:"/origaReach.svg",heading: "We cater to over 35 Industries",
    para: "From Industrial Engineering, Medical, Pharma to Automotive and many more"}
    const topSliderData = [
        { message: "Machine Tool",imgsrc:"/asset/Machine Tool.png" },{ message: "Medical",imgsrc:"/asset/Medical.png" },{ message: "Construction",imgsrc:"/asset/Construction.png" },
        { message: "IT & Technology",imgsrc:"/asset/IT and Technology.png" },{ message: "Automative",imgsrc:"/asset/Automative.png" },{ message: "Food & Beverages",imgsrc:"/asset/Food and Beverages.png" },
        { message: "Machine Tool",imgsrc:"/asset/Machine Tool.png" },{ message: "Medical",imgsrc:"/asset/Medical.png" },{ message: "Construction",imgsrc:"/asset/Construction.png" },
        { message: "IT & Technology",imgsrc:"/asset/IT and Technology.png" },{ message: "Automative",imgsrc:"/asset/Automative.png" },{ message: "Food & Beverages",imgsrc:"/asset/Food and Beverages.png" },
        { message: "Machine Tool",imgsrc:"/asset/Machine Tool.png" },{ message: "Medical",imgsrc:"/asset/Medical.png" },{ message: "Construction",imgsrc:"/asset/Construction.png" },
        { message: "IT & Technology",imgsrc:"/asset/IT and Technology.png" },{ message: "Automative",imgsrc:"/asset/Automative.png" },{ message: "Food & Beverages",imgsrc:"/asset/Food and Beverages.png" },
        { message: "Machine Tool",imgsrc:"/asset/Machine Tool.png" },{ message: "Medical",imgsrc:"/asset/Medical.png" },{ message: "Construction",imgsrc:"/asset/Construction.png" },
        { message: "IT & Technology",imgsrc:"/asset/IT and Technology.png" },{ message: "Automative",imgsrc:"/asset/Automative.png" },{ message: "Food & Beverages",imgsrc:"/asset/Food and Beverages.png" },
        { message: "Machine Tool",imgsrc:"/asset/Machine Tool.png" },{ message: "Medical",imgsrc:"/asset/Medical.png" },{ message: "Construction",imgsrc:"/asset/Construction.png" },
        { message: "IT & Technology",imgsrc:"/asset/IT and Technology.png" },{ message: "Automative",imgsrc:"/asset/Automative.png" },{ message: "Food & Beverages",imgsrc:"/asset/Food and Beverages.png" },
        ];
        const bottomSliderData = [
        { message: "Industrial Engineering",imgsrc:"/asset/Industrial Engineering.png" },{ message: "Defense",imgsrc:"/asset/Defense.png" },{ message: "Power & Energy",imgsrc:"/asset/Power and Energy.png" },
        { message: "Pharma",imgsrc:"/asset/Pharma.png"  },{ message: "Logistics & Transportation",imgsrc:"/asset/Logistics and Transportation.png" },{ message: "Office",imgsrc:"/asset/Office.png" },
        { message: "Industrial Engineering",imgsrc:"/asset/Industrial Engineering.png" },{ message: "Defense",imgsrc:"/asset/Defense.png" },{ message: "Power & Energy",imgsrc:"/asset/Power and Energy.png" },
        { message: "Pharma",imgsrc:"/asset/Pharma.png"  },{ message: "Logistics & Transportation",imgsrc:"/asset/Logistics and Transportation.png" },{ message: "Office",imgsrc:"/asset/Office.png" },
        { message: "Industrial Engineering",imgsrc:"/asset/Industrial Engineering.png" },{ message: "Defense",imgsrc:"/asset/Defense.png" },{ message: "Power & Energy",imgsrc:"/asset/Power and Energy.png" },
        { message: "Pharma",imgsrc:"/asset/Pharma.png"  },{ message: "Logistics & Transportation",imgsrc:"/asset/Logistics and Transportation.png" },{ message: "Office",imgsrc:"/asset/Office.png" },
        { message: "Industrial Engineering",imgsrc:"/asset/Industrial Engineering.png" },{ message: "Defense",imgsrc:"/asset/Defense.png" },{ message: "Power & Energy",imgsrc:"/asset/Power and Energy.png" },
        { message: "Pharma",imgsrc:"/asset/Pharma.png"  },{ message: "Logistics & Transportation",imgsrc:"/asset/Logistics and Transportation.png" },{ message: "Office",imgsrc:"/asset/Office.png" },
        { message: "Industrial Engineering",imgsrc:"/asset/Industrial Engineering.png" },{ message: "Defense",imgsrc:"/asset/Defense.png" },{ message: "Power & Energy",imgsrc:"/asset/Power and Energy.png" },
        { message: "Pharma",imgsrc:"/asset/Pharma.png"  },{ message: "Logistics & Transportation",imgsrc:"/asset/Logistics and Transportation.png" },{ message: "Office",imgsrc:"/asset/Office.png" },
        ];
    const advantageData = [
        {title: "",description: "50+ quality checks on machines",icon: qCheck({width:60,height:60})},
        {title: "",description: "Quick 24-hour Response To Machine Breakdowns",icon: qCall({width:60,height:60})},
        {title: "",description: "Customised Financial Solutions",icon:  qFinance({width:60,height:60})},
        {title: "",description: "Best value for your machine",icon: qValue({width:60,height:60})},
        {title: "",description: "Unified Hub for Tools, Spares & Consumables",icon:  qHub({width:60,height:60})}
      ];
      const advantageTopSection={imgurl:"/OrigaWhy.svg",title:"Origa Advantage",para:"Step into a World of Superior Equipment Management Experience"}
  /*   useEffect(() => {
    window.scrollTo(0,0)
    }, []) */


    /* useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []); */
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setShowPopup(true);
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);


      return (
        <>
        <HomePageBanner items={items} bannerTopSection={bannerTopSection}/>
       
    <FinancefirstSection  topSliderData={topSliderData} product={product} bottomSliderData={bottomSliderData}/>

    <div className="container-fluid sectionfour">
    <div className="max-container text-center">
    <img src={advantageTopSection.imgurl} alt='whyOriga'/>
    <div className='text-center heading-600-24-20 c-green'>{advantageTopSection.title}</div>
    <div className='heading-400-16-14 op-80 text-center pt-12'>{advantageTopSection.para}</div>
        <div className="row mt-32-992">
            {advantageData.map((advantage,index) => (
                <div key={index} className="col-lg-2 col-6 mx-auto step-p-16">
                    <div className="cust-box-card">
                        <div className="svg-icon mb-2" >{advantage.icon}</div>
                        <div className="title heading-600-16-14">{advantage.title}</div>
                        <div className="desc heading-400-14-12 op-80">{advantage.description}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
    
    <HomePageFifthSection title={"Looking for a specific Brand?"} para={"From Machines to tools to finance everything you need in one place"} searchHide={true}/>
    <Footer/>   
    {showPopup && (
                <div className="popup-banner">
                    <div className="popup-content">
                        <img src='/asset/popup-image.png' alt="Origa Campaign" /> 

                        {/* <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/fVxIMuHY5Ew?autoplay=1"
                            title="Origa Customer Feedback"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
 */}
                        {/* <img src={closeIcon} alt="Close" className="close-popup" onClick={() => setShowPopup(false)} />
                        icon: qCheck({width:60,height:60})
                        <button onClick={() => setShowPopup(false)} className="close-popup">Close</button> */}
                        <div className="close-popup" onClick={() => setShowPopup(false)}>
                            {closeIcon({ width: 14, height: 14 })}
                        </div>
                    </div>
                </div>
            )}
        </>
      )
    }
export default NewHomePage