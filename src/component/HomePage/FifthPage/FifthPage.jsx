import React,{useState} from 'react'
import './FifthPage.css'
import ImageWithHP from '../../SubComponent/ImageWithHP'
import RightArrow from '../../SubComponent/RightArrow'
import Slider3 from '../../SubComponent/AllSlider/Slider3/Slider3'
import { useNavigate } from 'react-router-dom'
const FifthPage = () => {
  const navigate=useNavigate();
  const [isSmallScreen]=useState(window.innerWidth<=992);
  const topsectionData = {
    heading: "Buy Equipment Essentials",
    buttonName: "View Shop",
    message: "Ensuring seamless operations with superior quality critical equipment components"
  }
  const bottomSectionData = [{ title: "Consumables", para: "Lubrication oil, hydraulic oil, spindle belt, axis belt etc", imageurl: "asset/image536a.png" },
  { title: "Tools", para: "Drill bit, cutting, grinder wheel etc", imageurl: "asset/image 536.png" },
  { title: "Spare Parts", para: "Encoder, servo motor,induction motor,stepper motor etc", imageurl: "asset/image536a.png" },
  { title: "Utility", para: "Incoming wires, ac, electrical, chiller unit, main electrical box", imageurl: "asset/image536a.png" }
  ]
  return (
    <div className='container-fluid pt-5 pb-5'>
      <div className="max-container pt-5">
      <div className='row d-flex pb-5 '>
          <div className='col col-lg-8 col-12 p-0'>
          <ImageWithHP heading={topsectionData.heading} para={topsectionData.message}/>
          </div>
          <div className={`col col-lg-4 col-12 h-center d-flex align-self-center ${isSmallScreen ? "justify-content-center":"justify-content-end"}`}>
          <p className='heading-600-14-12 v-center'>View Shop </p>
         <div className='arrow-div ml-2' onClick={()=>navigate(`/buy/product-listing?searchInput=${''}`)}>
         <RightArrow/>
         </div> 
            </div>
          </div>
      </div>
      
    <div className='xmax-container'>
      <Slider3 listofdata={bottomSectionData}/>
    </div>
    </div>
  )
}

export default FifthPage