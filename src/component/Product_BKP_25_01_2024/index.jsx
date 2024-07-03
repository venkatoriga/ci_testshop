import React, { useEffect, useState } from 'react'
import { Button, Container} from 'react-bootstrap'
import './product.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PlanBlock from '../SubComponent/AllBlock/PlanBlock';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BlackStar from '../SubComponent/AllSvgs/BlackStar';
import AllOrigaService from '../OrigaService/AllOrigaService';
import Slider2 from '../SubComponent/AllSlider/Slider2/Slider2';
import ReviewSection from './ReviewSection';
import Footer from '../Footer/Footer';
import Slider5 from '../SubComponent/AllSlider/Slider5';

const Index = () => {
    // const location = useLocation();
    let { id } = useParams();

    const [plan, setPlan] = useState()
const productCategory=<ReviewSection/>
    const productView = () => {
        console.log('ViewPLaning here')
        axios.post('https://contacts.origaleasing.com/fetchAMCPlan', {
            "plan_id": id

        })
            .then((response) => {
                console.log(response.data, "Data Visible")
                console.log(response.data.jsondata[0], 'Product')
                // const data = response.data.data;
                setPlan(response.data.jsondata[0]);

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }


    useEffect(() => {
        productView();
    }, [])

    const message3="Still have a few doubts regarding the machine? Have a word with our expert. Get a one time repair  Get a one time repairservice if your machin has broken down Still have a few doubts regarding the machine? Have a word with our expert. "

    const navigate = useNavigate();
    const onAddToCart = () => {
        // alert('Hello')
        const graphqlQuery = {
            query: `
            mutation CreateAmc($amcPlanData: AMCPlanInput!) {
                createAmc(amcPlanData: $amcPlanData) {
                  message
                  success
              
                }
              }
              
            `,
            variables: {
                "amcPlanData": {
                    "appAmcPlanId": 4,
                    "customerId": "VXNlcjoxMTA=",
                    "stage": "ADD_TO_CART"
                }

            }
        };
        axios.post('http://3.109.71.129:8001/graphql/', graphqlQuery)
            .then(response => {
                console.log('ADd to cart', response.data.data.createAmc.success)
                if (response.data.data.createAmc.success) {
                    // navigate('/managepagedetails')
                    navigate('/managepagedetails', { productData: plan });
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        // Define your GraphQL query
    }

   const productBlock= <PlanBlock/>;

    const heading = "Similar Plans";
    const para =
        "From Machines to tools to finance everything you need in one place";
    const containerData = [
        {
            title: "PRO Plan",
            price:'₹25,000',
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        },
        {
            title: "PRO Plan",
            price:'₹25,000',
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/machine-half.png"
        }
    ];

    const reviews=[
        {
        nameAndDate:"Krishna, 10 July 2023 ",
        title:"The plan assured me about my machine safety",
        message:"After opting for this plan, i have got a peace of mind as my last complaint was resolved quickly and efficiently within the time promised. The price is also quite affordable, the technician are quite professionally trained."    
        },
        {
            nameAndDate:"Krishna, 10 July 2023 ",
            title:"Affordable",
            message:"Affordable"    
            }]
    // console.log('img', plan)

    // Payment Gatway
    const proceedToPayment = () => {
        const graphqlQuery = {
            query: `
            mutation CreateAmc($amcPlanData: AMCPlanInput!) {
                createAmc(amcPlanData: $amcPlanData) {
                  message
                  success
                  paymenturl
                  referenceid
                }
              }
            `,
            variables: {
                "amcPlanData": {
                    "appAmcPlanId": 2,
                    "customerId": "VXNlcjoxMTA=",
                    "stage": "PAYMENT"
                }
            }
        };
        axios.post('https://devextension.origa.market/graphql/', graphqlQuery)
            .then(response => {
                console.log('ADd to cart', response.data)
                if (response.data.data.createAmc.success) {
                    window.open(response.data.data.createAmc.paymenturl);
                } else {
                    alert("Failed")
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        // Define your GraphQL query
    }

    return (
        <>
            <section className='p-0 pt-5 my-5'>
            
                <div className='max-container tablet-d-padding pb-5'>
                    {plan &&
                        <div className='heading-box'>
                            <div>
                                <h1 className='cart-heading'>{plan.name}</h1>
                                <p className='company-name'>Hitachi</p>
                            </div>
                            {/* <img src="asset/heart.svg" alt="heart" /> */}
                            <img src={process.env.PUBLIC_URL + '/asset/heart.svg'} alt="heart" />
                        </div>
                    }
                    {/* Slider */}
                    
                    <div className='product-swiper'>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                            }}
                            className="productSwiper">
                            {plan &&

                                <SwiperSlide>
                                    <div className='img-box'>
                                        <img src={plan.plan_image} className='img-fluid' alt={plan.plan_image} />
                                    </div>
                                </SwiperSlide>
                            }
                            {/* <SwiperSlide>
                                    <div className='img-box'>
                                        <img src="asset/machine-full.png" className='img-fluid' alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='img-box'>
                                        <img src="asset/machine-full.png" className='img-fluid' alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='img-box'>
                                        <img src="asset/machine-full.png" className='img-fluid' alt="" />
                                    </div>
                                </SwiperSlide> */}
                        </Swiper>
                    </div>
                     
                    {/* Add to Cart Box */}
                    {plan &&
                        <div className='cart-lyt-box'>
                            <div className='top-cart-box'>
                                <div className='first__row__box'>
                                    <div className='typ-custom-width'>
                                        <p className='plan-name'>{plan.plan}</p>
                                        <p className='price'>₹{plan.price} <span className='cancel-price'>₹60,000</span></p>
                                        <p className='rating'><span className='op-80'>4.2 Stars </span> <BlackStar/> </p>
                                    </div>
                                    <div>
                                        <h3 className='discount-available'>10% OFF</h3>
                                        <p className='limites_time'>Limited time offer 2 Days 10 hours</p>
                                    </div>
                                </div>
                               
                                    <div className='typ-addBtn hide-992'>
                                        <Button className="typ-transparent-button" onClick={() => proceedToPayment()}>Buy Now</Button>
                                        <Button className="typ-light-button" onClick={onAddToCart}>Add To Cart</Button>
                                    </div>
                              
                            </div>
                            <p className='break-line-D'></p>
                            <div className='container-fluid p-0 m-0 row'>
                                    
                            <div className='col col-lg-6 col-md-6 col-12'>
                                     <div className='container-fluid p-0 m-0'>
                                         <h3 className='typ-features'>Key features</h3>
                                     <div className='key-flex'>
                                             <p className='feature_list'>Service type :</p>
                                            <p className='feature_para'>Annual Maintenance Contract </p>
                                     </div>
                                    <div className='key-flex'>
                                        <p className='feature_list'>Product Covered  :</p>
                                        <p className='feature_para'>Hitachi CNC Machine  </p>
                                    </div>

                            <p className='feature_para typ-mt-15'>Zero Documentation Required  </p>
                            <p className='feature_para typ-mt-15'>1 year Service period  </p>
                        </div>
                            </div>
                            <div className='col col-lg-6 col-md-6 col-12 container-fluid p-0 m-0' >
                                <div className=' container-fluid p-0 m-0 row'>
                                    <h3 className='typ-features'>Service Scope</h3>
                                    {/* <p className='scopes_list'><img src="asset/program-img.svg" className='icon__img' alt="icon" /> Evolve Program</p> */}
                                    <p className='scopes_list'><img src={process.env.PUBLIC_URL + '/asset/program-img.svg'} className='icon__img' alt="icon" /> Evolve Program</p>
                                    <p className='scopes_list'><img src={process.env.PUBLIC_URL + '/asset/remote-img.svg'} className='icon__img' alt="icon" /> Remote assistance</p>
                                    <p className='scopes_list'><img src={process.env.PUBLIC_URL + '/asset/update-img.svg'} alt="icon" /> Regular Updates </p>
                                    {/* <p className='scopes_list'><img src="asset/quality-img.svg" className='icon__img' alt="icon" /> Quality Assurances</p> */}
                                    <p className='scopes_list'><img src={process.env.PUBLIC_URL + '/asset/quality-img.svg'} alt="icon" /> Quality Assurances</p>
                                </div>
                                </div>
                                <div className='col col-12 show-992 pt-4'>
                                <div className='typ-addBtn'>
                                <Button className="typ-transparent-button" onClick={() => proceedToPayment()}>Buy Now</Button>
                                <Button className="typ-light-button" onClick={onAddToCart}>Add To Cart</Button>
                            </div>
                                </div>
                                {/*window.innerWidth < 768 ? (
                                    <div className='typ-addBtn'>
                                        <Button className="typ-transparent-button" onClick={() => proceedToPayment()}>Buy Now</Button>
                                        <Button className="typ-light-button" onClick={onAddToCart}>Add To Cart</Button>


                                    </div>
                                ) : null */}
                            
                            </div>
                        </div>
                    }

                    <div className='cart-lyt-box'>
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Evolve program">
                            <div className='row'>
                                <div className='col col-lg-4 col-md-6 col-12'>
                                <div className='typ-first-lyt'>
                                        <h2 className='tab--heading'>About</h2>
                                        <p className='tab--para'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
                                    </div>
                                </div>
                                    <div className='col col-lg-4 col-md-6 col-12'>
                                    <div className='typ-first-lyt'>
                                    <h2 className='tab--heading'>Benefits</h2>
                                    <div className='typ-tab-flex'>
                                        {/* <img src="asset/protection.svg" className='img-fluid' alt="icon" /> */}
                                        <img src={process.env.PUBLIC_URL + '/asset/protection.svg'} className='img-fluid' alt="icon" />
                                        <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                    </div>
                                    <div className='typ-tab-flex'>
                                        {/* <img src="asset/pie-img.png" className='img-fluid' alt="icon" /> */}
                                        <img src={process.env.PUBLIC_URL + '/asset/pie-img.png'} className='img-fluid' alt="icon" />
                                        <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                    </div>
                                </div>
                                    </div>
                                  <div className='col col-lg-4 col-md-6 col-12'>
                                  <div>
                                  <h2 className='tab--heading'>What it includes?</h2>
                                  <div className='typ-tab-flex' >
                                      {/* <img src="asset/slideshow-img.svg" alt="" /> */}
                                      <img src={process.env.PUBLIC_URL + '/asset/slideshow-img.svg'} alt="" />
                                      <p className='typ--para'>The program includes related training and updates for your existing equipment</p>
                                  </div>
                                  <div className='typ-tab-flex'>
                                      {/* <img src="asset/update-img.svg" alt="" /> */}
                                      <img src={process.env.PUBLIC_URL + '/asset/update-img.svg'} alt="" />
                                      <p className='typ--para'>For many machines, additional software versions will be provided as they become available</p>
                                  </div>
                                  <div className='typ-tab-flex'>
                                      {/* <img src="asset/settings.png" alt="" /> */}
                                      <img src={process.env.PUBLIC_URL + '/asset/settings.png'} alt="" />
                                      <p className='typ--para'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
                                  </div>
                              </div>
                                  </div>
                                 
                               
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Remote assistance">
                            <div className='row'>
                            <div className='col col-lg-4 col-md-6 col-12'>
                            <div className='typ-first-lyt'>
                                    <h2 className='tab--heading'>About</h2>
                                    <p className='tab--para'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
                                </div>
                            </div>
                                <div className='col col-lg-4 col-md-6 col-12'>
                                <div className='typ-first-lyt'>
                                <h2 className='tab--heading'>Benefits</h2>
                                <div className='typ-tab-flex'>
                                    {/* <img src="asset/protection.svg" className='img-fluid' alt="icon" /> */}
                                    <img src={process.env.PUBLIC_URL + '/asset/protection.svg'} className='img-fluid' alt="icon" />
                                    <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                </div>
                                <div className='typ-tab-flex'>
                                    {/* <img src="asset/pie-img.png" className='img-fluid' alt="icon" /> */}
                                    <img src={process.env.PUBLIC_URL + '/asset/pie-img.png'} className='img-fluid' alt="icon" />
                                    <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                </div>
                            </div>
                                </div>
                              <div className='col col-lg-4 col-md-6 col-12'>
                              <div>
                              <h2 className='tab--heading'>What it includes?</h2>
                              <div className='typ-tab-flex' >
                                  {/* <img src="asset/slideshow-img.svg" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/slideshow-img.svg'} alt="" />
                                  <p className='typ--para'>The program includes related training and updates for your existing equipment</p>
                              </div>
                              <div className='typ-tab-flex'>
                                  {/* <img src="asset/update-img.svg" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/update-img.svg'} alt="" />
                                  <p className='typ--para'>For many machines, additional software versions will be provided as they become available</p>
                              </div>
                              <div className='typ-tab-flex'>
                                  {/* <img src="asset/settings.png" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/settings.png'} alt="" />
                                  <p className='typ--para'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
                              </div>
                          </div>
                              </div>
                             
                           
                            </div>
                            </Tab>
                            <Tab eventKey="contact" title="Regular updates">
                            <div className='row'>
                            <div className='col col-lg-4 col-md-6 col-12'>
                            <div className='typ-first-lyt'>
                                    <h2 className='tab--heading'>About</h2>
                                    <p className='tab--para'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
                                </div>
                            </div>
                                <div className='col col-lg-4 col-md-6 col-12'>
                                <div className='typ-first-lyt'>
                                <h2 className='tab--heading'>Benefits</h2>
                                <div className='typ-tab-flex'>
                                    {/* <img src="asset/protection.svg" className='img-fluid' alt="icon" /> */}
                                    <img src={process.env.PUBLIC_URL + '/asset/protection.svg'} className='img-fluid' alt="icon" />
                                    <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                </div>
                                <div className='typ-tab-flex'>
                                    {/* <img src="asset/pie-img.png" className='img-fluid' alt="icon" /> */}
                                    <img src={process.env.PUBLIC_URL + '/asset/pie-img.png'} className='img-fluid' alt="icon" />
                                    <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                </div>
                            </div>
                                </div>
                              <div className='col col-lg-4 col-md-6 col-12'>
                              <div>
                              <h2 className='tab--heading'>What it includes?</h2>
                              <div className='typ-tab-flex' >
                                  {/* <img src="asset/slideshow-img.svg" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/slideshow-img.svg'} alt="" />
                                  <p className='typ--para'>The program includes related training and updates for your existing equipment</p>
                              </div>
                              <div className='typ-tab-flex'>
                                  {/* <img src="asset/update-img.svg" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/update-img.svg'} alt="" />
                                  <p className='typ--para'>For many machines, additional software versions will be provided as they become available</p>
                              </div>
                              <div className='typ-tab-flex'>
                                  {/* <img src="asset/settings.png" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/settings.png'} alt="" />
                                  <p className='typ--para'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
                              </div>
                          </div>
                              </div>
                             
                           
                            </div>
                            </Tab>
                            <Tab eventKey="details" title="Other Details">
                            <div className='row'>
                            <div className='col col-lg-4 col-md-6 col-12'>
                            <div className='typ-first-lyt'>
                                    <h2 className='tab--heading'>About</h2>
                                    <p className='tab--para'>An advance program focusing on comprehensive coverage for all major components and subsystems of your equipment</p>
                                </div>
                            </div>
                                <div className='col col-lg-4 col-md-6 col-12'>
                                <div className='typ-first-lyt'>
                                <h2 className='tab--heading'>Benefits</h2>
                                <div className='typ-tab-flex'>
                                    {/* <img src="asset/protection.svg" className='img-fluid' alt="icon" /> */}
                                    <img src={process.env.PUBLIC_URL + '/asset/protection.svg'} className='img-fluid' alt="icon" />
                                    <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                </div>
                                <div className='typ-tab-flex'>
                                    {/* <img src="asset/pie-img.png" className='img-fluid' alt="icon" /> */}
                                    <img src={process.env.PUBLIC_URL + '/asset/pie-img.png'} className='img-fluid' alt="icon" />
                                    <p className='typ--para'>Protect your investment and optimize operating costs</p>
                                </div>
                            </div>
                                </div>
                              <div className='col col-lg-4 col-md-6 col-12'>
                              <div>
                              <h2 className='tab--heading'>What it includes?</h2>
                              <div className='typ-tab-flex' >
                                  {/* <img src="asset/slideshow-img.svg" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/slideshow-img.svg'} alt="" />
                                  <p className='typ--para'>The program includes related training and updates for your existing equipment</p>
                              </div>
                              <div className='typ-tab-flex'>
                                  {/* <img src="asset/update-img.svg" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/update-img.svg'} alt="" />
                                  <p className='typ--para'>For many machines, additional software versions will be provided as they become available</p>
                              </div>
                              <div className='typ-tab-flex'>
                                  {/* <img src="asset/settings.png" alt="" /> */}
                                  <img src={process.env.PUBLIC_URL + '/asset/settings.png'} alt="" />
                                  <p className='typ--para'>To drive hardware compatibility and performance, one computer hardware upgrade kit is included in the service</p>
                              </div>
                          </div>
                              </div>
                             
                           
                            </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                <Container fluid className="tenthSectionMaindiv liner-background-h-f py-5 my-5">
                <div className="max-container">
                <div className="container-fluid p-0 m-0 row align-items-center ">
                  <div className="col-sm-12 col-md-6 col-lg-6 mt-2 ">
            
                    <h2 className="mb-20 mt-4 heading-600-44" >Why Should you Opt For Star AMC Plan?</h2><div ></div>
                  <div className="row">
                      <div className="col col-md-11">
                      <p className="op-60">
                      Watch this video to gain insights into the features and advantages offered by the Star AMC plan, which serves as an ultimate safeguard plan for your equipment.
                    </p>
                      </div>
       </div>
        
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                   <img className='w-100' src="/asset/VideoImage.png" alt='Banglore.png'/>
                  </div>
                </div>
              </div>
                </Container>
               
                    {/*Speak to our expert*/}
                <div className=" mt-40" style={{ marginBottom: "8rem" }}>
                <div className="max-container">
                  <div className="container-fluid p-0 m-0  row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                <img className="h-100 w-100" src="/asset/image567.png" alt="image567.png"/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="m-5">
                        <AllOrigaService imageurl={"/asset/OrigaService.png"}/>
                        <h1 className="heading-600-40-20 c-green mb-20">Speak to our Expert</h1>
                        <div className='row'>
                          <div className='col col-lg-10 col-12'>
                          <p className="c-gray">{message3}</p>
                          </div>
                        </div>
                        <button className='button'>Get a Callback</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Slider */}
                
                <Container fluid className="sixthsection-maindiv">
                    <Container className='sixthsection-heading'>
                        <Container fluid>
                            <h1>{heading}</h1>
                            <p>{para}</p>
                        </Container>

                    </Container>
                        <Slider2 listofdata={containerData} productCategory={productBlock}/>
                </Container>
                
                {/*Reviews*/}
                <div className='max-container  pt-5 my-5'>
                <div className='container-fluid tablet-d-pending m-0 row d-flex justify-content-between pb-5'>
                    <div className='col col-5 p-0'><h1 className='heading-600-44-20'>Reviews</h1></div>
                    <div className='col col-6 p-0 d-flex justify-content-end'><button className='button'>Write a Review</button></div>
                </div>
                {/*review for desktop*/}
                <div className='hide-992 p-0'> 
                
                {reviews.map((product,index)=>
                    <>
                    {index!==0 && <div className='border'></div>}
                    <ReviewSection product={product}/>
                    </>
                    )
                }
                <p className="heading-600-14 tablet-d-padding">See all Reviews</p>
                </div>

                   {/*review for tab and phone */} 

                   <div className="show-992">
                   <Slider5 hide={"show-992"} listofdata={reviews} prevview={2} productCategory={productCategory}/>        
                   </div>
                <div className='text-end'>
                <img src='/asset/Frame1000004018.png' alt='Frame1000004018.png'/>
                </div>
            </div> 
               
            </section>

            {/* bottom message  */}
            {/*<div className='p-r'>
                
               <div className='container-fluid bg-white border-top-blur-2 p-a  bootom-0' style={{marginTop:"15.8rem"}}>
                    <div className='max-container'>
<div className="row">
    <div className="col col-md-4">
            <p className='heading-600-24-16 m-0 pt-5'>STAR AMC PLAN</p>
             <p className='heading-500-14 text-danger pt-1'>This plan is not available at the Pincode - 401 202</p>
    </div>
    <div className="col col-md-4 d-flex align-items-center">
        <p className='heading-600-24-16 m-0'>₹40,000</p>
    </div>
    <div className="col col-md-4 d-flex align-items-center gap-3">
    <button className='button-outline'>Buy Now</button>
    <button className='button'>Add to Cart</button>
    </div>
</div>
                    </div>
               </div>
            </div> */}
            <Footer/>
        </>
    )
}

export default Index