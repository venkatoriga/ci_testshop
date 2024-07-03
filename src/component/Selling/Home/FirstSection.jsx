import React,{useState} from 'react';
import "./FirstSection.css"
import ImageSlider from '../../Buying/Modals/ImageSlider'
import { useNavigate,useLocation } from 'react-router-dom';

const FirstSection = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const sectionData = {
        headingLeft: "Get maximum value for your used machines ",
        paraLeft: "Connect with genuine buyers for a hassle-free selling experience",
        headingRight: "",
        paraRight: "Origa: Your Trusted Partner in Machine Resale – Maximising Value, Minimising Stress",
        banner: "asset/image555a.png",
    }
    const sliderImage=[{product: sectionData.banner, name:"prduct1"},{product: sectionData.banner, name:"prduct2"},{product: sectionData.banner, name:"prduct3"}]
    
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }
    return (
        <>
        {showModal && (
            <ImageSlider modalAction={handleModal} sliderImage={sliderImage}/>
        )}
        <div className="container-fluid liner-background">
            <div className="max-container ">
                <div className='pt-5'>
                    <div className='container-fluid p-0 m-0 row pb-5'>
                        <div className="col col-lg-7 col-12 p-0 pt-5">
                            <div className="row d-flex flex-column pt-3">
                                
                                <div className="col col-lg-8 pt-4 pr-5">
                                    <h1 className="heading-600-44">{sectionData.headingLeft}</h1>
                                </div>
                                <div className="col col-lg-7 pt-4 ">
                                    <p className='heading-400-16 op-80'>{sectionData.paraLeft}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-5 col-12 p-0 d-flex align-items-center">
                            <div className="row text-end justify-content-end">
                                <div className='col col-12 '>
                                    <div className='banner-image-div'>
                                        <img className='banner-image' src={sectionData.banner} alt={sectionData.banner} />
                                        <div className='view-all heading-500-20' onClick={() => navigate('/sell/machine-detail')}>Sell Now</div>
                                        {/* <div className='view-all heading-500-20' onClick={() => handleModal(true)}>View All</div> */}
                                    </div>
                                </div>
                                <div className='col col-12'>
                                    <p className='heading-600-20'>{sectionData.headingRight}</p>
                                </div>
                                <div className='col col-md-12 col-12 '>
                                    <p className='heading-400-16 op-80 text-end'>{sectionData.paraRight}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default FirstSection;
