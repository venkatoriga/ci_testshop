import React,{useState} from 'react'
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import ProductImages from '../Buying/MyMachine/Machine/MachinePage/ProductImages';
import ImageWithHP from '../SubComponent/ImageWithHP';
import RightArrow from '../SubComponent/RightArrow';
import Slider from "react-slick";
import RatingBlock from '../AddToCart/RatingBlock';
import AccountFooter from './AccountFooter';
const OrderCancle = () => {
  const [isSmallScreen,setIsSmallScreen]=useState(window.innerWidth<=992);
    const breadcrumbsItems = [ { name: "Account", link: "/" }, { name: "My Machines", link: "/buy/my-machine" },{name:"Your Orders",link:"/yourorder"}];
    const boldtitle="Welding Tool";
    const settings = {
      infinite:false,
      speed: 500,
      slidesToShow: 3.5, 
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1368, 
          settings: {
            slidesToShow: 2.8,
          },
        }, 
        {
              breakpoint: 992, 
              settings: {
                slidesToShow: 2.3,
              },
            },
        {
          breakpoint: 769, 
          settings: {
            slidesToShow: 1.8,
          },
        },
        {
          breakpoint: 576, 
          settings: {
            slidesToShow: 1.2,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
  return (
    <>
  <div className='container-fluid'>
  <div className='max-container pt-4'>
  <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} />

  <div className="border-wrap p-3" >
  
  <div className='row d-flex justify-content-between col-reverse'>
  <div className='col col-auto'>
    <div className=' d-flex'>
    <div className=" heading-600-24-16">Welding tool</div>
    
  </div>

  <div>
  <p className='heading-400-16-14 op-50'>Hitachi</p>
  </div>
  </div>
    <div className='col col-auto'> <button className='red-btn'>Order Cancelled</button></div>
  </div>
 <div className='row d-flex justify-content-between'>
 <div className='col col-auto'><p className='heading-600-24-16'>₹4,465</p></div>
 <div className='col col-auto'>
 <button className='button'>Order Again</button>
 </div>
 </div> 
  
 
</div>

  </div>
  {/*image Section*/}
  <div className='xmax-container'>
  {/*<ProductImages/>*/} 
  </div>

<div className='max-container'>
<div className='container-fluid p-0 m-0 row d-flex justify-content-between'>
  
<div className='w-48-100 p-0 show-768 '>
<div className="border-wrap">
      <div className="row p-3 ">
          <div className="col">
            <h3 className="heading-400-14-12">Delivery Address</h3>
            <p className='heading-500-16-14'>Rajeev Singh<br/>
            rajeev@gmail.com , 9833956203</p>
          </div>
          <p className='heading-500-16-14'>
          Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093
          </p>
        </div> 
      </div> 
</div>

<div className='w-48-100 p-0'>
<div className='border-wrap'>
      <div className="row p-3">
          <div className="col col-md-7 col-12">
            <h3 className="heading-400-14-12">Order cancelled on 26 July, Mon</h3>
            <p className='heading-500-16-14'>Your refund has been initiated</p>
          </div>
         
      </div> 
      </div>
</div>
      <div className='w-48-100 p-0'>
      <div className=" border-wrap">
      <div className="row p-3 ">
          <div className="col">
            <h3 className="heading-400-14-12">Delivery Address</h3>
            <p className='heading-500-16-14'>Rajeev Singh<br/>
            rajeev@gmail.com , 9833956203</p>
          </div>
          <p className='heading-500-16-14'>
          Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093
          </p>
        </div> 
      </div> 


      </div>
 
     
      
  </div>

</div>
  

{/* slider section*/}

<div className="max-container  pt-5">
      <div className='row pb-5'>
          <div className='col col-lg-8 col-12 p-0'>
          <ImageWithHP imageurl={"asset/OrigaService.png"} heading={"You may also like"} para={"From Machines to tools to finance everything you need in one place"}/>
          </div>
        {<div className={`col col-lg-4 d-flex align-self-center ${isSmallScreen ? "justify-content-center":"justify-content-end"}`}>
        <p className='heading-600-14-12 v-center'>view Shop </p>
        <div className='arrow-div ml-2'>
        <RightArrow/>
        </div> 
          </div>}
         
            </div>
      </div>
<div className='xmax-container'>
<Slider {...settings}>
        <RatingBlock/>
        <RatingBlock/>
        <RatingBlock/>
        <RatingBlock/>
        <RatingBlock/>
  </Slider>
</div>

  </div>
  <AccountFooter/>
  </>
  )
}

export default OrderCancle