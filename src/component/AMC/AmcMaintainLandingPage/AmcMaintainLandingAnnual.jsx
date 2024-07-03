import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import FifthSection from "../../Annual/FifthSection";
import SixSection from "../../Annual/SixthSection";
import SevenSection from "../../Annual/SevenSection";
import ThirdSection from "../../Annual/ThirdSection";
import Button from "../../Button/Button";
import FourthSection from "../../Annual/FourthSection";
import Footer from "../../Footer/Footer";
import axios from "axios";
import ViewAllButton from "../../Button/ViewAllButton";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from "../../SubComponent/Breadcrumbs";
import ImageSlider from "../../Buying/Modals/ImageSlider";
const AmcMaintainLandingAnnual = () => {
   
    const [products,setProducts] = useState([])
    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    // const products = props.location.state.products || [];
    // const products = 
    // const { products } = useParams();
    // console.log('products', products);
    // const products = state;
    // const products = state ? state.products : [];
const onProductBlockNavigate=(product)=>navigate(`/productmain/${ product.id }`, { state: { product } });
    const getProducts = () => {
        console.log('Hello')
        axios.post('https://contacts.origaleasing.com/fetchAMCbasedontype', {
                type:"VMC"
            })
            .then(response => {
                setProducts(response.data.jsondata)
                // navigate('/annual', { state: { products } });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    console.log('getProductss',products)

    useEffect(() => {
        getProducts();
    }, [])
    
    // firstsection-maindiv typ-anuual-sections
// firstsection typ-pos-rtlv
    const heading = "Annual Maintenace Contract";
    const para =
        "Origa offers a comprehensive Annual Maintenance Contract (AMC) to safeguard your machine against potential issues. By opting it, you not only receive regular maintenance and free service from well-trained experts but also gain access to a wide range of exclusive advantages.";
   
        const breadcrumbsItems = [ { name: "Home Page", link: "/" }, { name: "Maintain Page", link: "/service" }];
    
        const boldtitle="AMC Page";
        return (
        <>
            <Container fluid className="liner-background-anual" >
    <div className="max-container">
    <div className='container p-0 m-0 '>
    <div className="row pt-3">
        <Breadcrumbs backnavi={()=>navigate('/service/AmcMaintainLandingPage')} boldtitle={boldtitle} items={breadcrumbsItems}/>
    </div>
    <div className='container-fluid p-0 m-0 row pb-5 pt-5' onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
    <div className="p-1">
    {showModal && (
        <ImageSlider modalAction={handleModal} sliderImage={sliderImage}/>
    )}
</div>
        <div className="col col-lg-7 col-12 p-0 pt-5">
            <div className="row d-flex flex-column">
           
            <div className="col col-lg-10 col-12 pt-4">
            <h1 className="heading-600-44">{heading}</h1>
            </div>
            <div className="col col-lg-9 pt-4">
                <p className='heading-400-16 op-80'>{para}</p>
                <p className="show-992 heading-600-14-12 pt-3">Explore Services</p>
            </div>
           
           <div className='col col-lg-7 pt-5 hide-992'><Button message={"Explore Services"}/></div>
            </div>
        </div>
        <div className="col col-lg-5 col-12 d-flex align-items-center">
                <div className="row justify-content-end">
                <div className='col col-12 pt-5'>
                <div className='anuual-banner-image-div'>
                    <img className='banner-image' src={"/asset/image555a.png"} alt={"image555a.png"} />
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
            </Container>
           
              {products.length>0 && 
                <ThirdSection products={products} onProductBlockNavigate={onProductBlockNavigate}/>
            }
           <FourthSection/>
            <FifthSection />
            <SixSection/>
            <SevenSection/>
             <Footer/> 
        </>
    );
}

export default AmcMaintainLandingAnnual