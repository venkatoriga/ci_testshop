import React, { useState,useEffect } from 'react'
import ViewAllButton from '../../Button/ViewAllButton'
import Slash from '../../SubComponent/Slash'
import LeftArrow from '../../SubComponent/LeftArrow'
import UnfortunatelySecondSetion from './UnfortunatelySecondSetion'
import UnfortunatelyThirdSection from './UnfortunatelyThirdSection'
import Footer from '../../Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import ImageSlider from '../../Buying/Modals/ImageSlider'
const Unfortunately = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {naviurl}=location.state
    const sliderImage=[{product: "/asset/image555a.png", name:"prduct1"},{product: "/asset/image555a.png", name:"prduct2"},{product: "/asset/image555a.png", name:"prduct3"}]
    const onMouseEnterhandler = () => {
        setIsHovered(true);
      };
      const onMouseLeavehandler = () => {
        setIsHovered(false);
      };
     
      const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }

useEffect(()=>{
    window.scrollTo(0,0)
})
  return (
    <>
    
    <div className='container-fluid liner-background pb-5'>
    <div className="max-container pb-5">

    <div className='container m-0 p-0'>
    <div className='row pt-3'>
        <div className="col col-auto mg-0 pr-0 curser-pointer" onClick={()=>navigate(naviurl)}><LeftArrow/></div>
        <div className="col col-auto mg-0 pr-0 op-60 curser-pointer" onClick={()=>navigate('/service/amc')}>AMC</div>
        <div className="col col-auto p-0 op-60"><Slash/></div>
<div className="col col-auto pr-0 heading-600-14">Commissioning/Decommissioning</div>
    </div>
</div>
    <div className='container m-0 p-0 pt-3'   onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
    <div className="p-1">
                {showModal && (
                    <ImageSlider modalAction={handleModal} sliderImage={sliderImage}/>
                )}
            </div>
    <div className='row pb-5'>
        <div className="col col-lg-7 col-12 pt-5">
            <div className="row d-flex flex-column pt-5">
            <div className="col col-lg-12 pt-4">
            <h1 className="heading-600-44">Unfortunately!</h1>
            </div>
            <div className="col col-lg-8 pt-4">
                <p className='heading-400-16 op-80'>Origa does not offer commissioning services to your selected location ( 401 202)</p>
            </div>
           
           <div className='col col-lg-8 pt-5 '>
            <div className='row'>
                <div className='col col-6'>
                <button className='button' onClick={()=>navigate(naviurl)}>Change Location</button>
                </div>

                <div className='col col-6 d-flex align-items-center'>
                        <p className='heading-600-14-12 v-center'>Back to Service Page</p>
                </div>
            </div>
            
            </div>
            </div>
        </div>
        <div className="col col-lg-5 col-12 d-flex align-items-center">
                <div className="row justify-content-end">
                <div className='col col-12 pt-5'>
                <div className='banner-image-div'>
                    <img className='banner-image' src={"/asset/image555a.png"} alt={"Image555a.png"} />
                    {isHovered &&  <div className="viewAllCenter">
                    <ViewAllButton message={"View All"} callFunction={() => handleModal(true)}/>
                    </div>}
                </div>
                   
                </div>
                </div>
        </div>
    </div>
</div>
    </div>
   
    </div>
    <UnfortunatelySecondSetion/>
    <UnfortunatelyThirdSection/>
    <div className='max-container p-r d-flex justify-content-end'>
                    <img className='p-a' src='asset/Frame1000004018.png' alt='Frame1000004018.png'/>
                </div>
    <Footer/>
    </>
  )
}

export default Unfortunately