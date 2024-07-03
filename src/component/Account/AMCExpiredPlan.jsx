import React from 'react'
import ProductImages from '../Buying/MyMachine/Machine/MachinePage/ProductImages';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import { Getservice,Washing,LabourCharges,SpareParts } from '../SubComponent/AllSvgs/Icons2416';
import Slider7 from '../SubComponent/AllSlider/Slider7';
import RightArrow from '../SubComponent/RightArrow';
import WishListBlock from '../SubComponent/AllBlock/WishListBlock';

import AccountFooter from './AccountFooter';
const AMCExpiredPlan = () => {
  const productCategory=<WishListBlock/>
    const isSmallScreen=window.innerWidth<=576
  const breadcrumbsItems = [ { name: "Account", link: "/" }, { name: "My Machines", link: "/buy/my-machine" },{name:"Your Orders",link:"/yourorder"}];
  const boldtitle="AMC Plans";
  const OrderSectionData=[  { title:"Price", price:"₹40000" },{ title:"Discount", price:"-₹1000"},{ title:"Delivery Charges", price:"Free"},{ title:"GST (18%)", price:"₹ 2682.00" }];
  const breakpoints={
    a:2.8,
    b:2.6,
    c:2.1,
    d:1.5,
    e:1.1
  };
  const containerData = [
    {
        title: "PRO Plan",
        price:'₹25,000',
        message: "Get a one time repair service if your machin has broken down",
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",

    }, {
        title: "PRO Plan",
        price:'₹25,000',
        message: 'Get a one time repair service if your machin has broken down',
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",
    }, {
        title: "PRO Plan",
        price:'₹25,000',
        message: 'Get a one time repair service if your machin has broken down',
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",
    }, {
        title: "PRO Plan",
        price:'₹25,000',
        message: 'Get a one time repair service if your machin has broken down',
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",
    },
    {
        title: "PRO Plan",
        price:'₹25,000',
        message: "Get a one time repair service if your machin has broken down",
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",

    }, {
        title: "PRO Plan",
        price:'₹25,000',
        message: 'Get a one time repair service if your machin has broken down',
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",
    }, {
        title: "PRO Plan",
        price:'₹25,000',
        message: 'Get a one time repair service if your machin has broken down',
        discount: 25,
        productQuentity: 200,
        imageUrl: "/asset/machine-half.png",
    }, {
        title: "PRO Plan",
        price:'₹25,000',
        message: 'Get a one time repair service if your machin has broken down',
        discount: 25,
        productQuentity: 200,
        imageUrl: "asset/machine-half.png",
    }
];
  return (
    <> 
    <div className='container-fluid'>
    {/*section 1*/}
    <div className='max-container pt-4'>
    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} />
  
    <div className="border-wrap p-3" >
    
    <div className='row d-flex justify-content-between col-reverse'>
    <div className='col col-auto'>
      <div className='d-flex align-items-center gap-2'>
      <div className=" heading-600-24-16">STAR Annual maintenance contract (AMC) plan</div>
      <button className='red-btn'>Expired</button>
    </div>
  
    <div>
    <p className='heading-400-16-14 op-50'>For Hitachi CNC machine</p>
    </div>
    </div>
      <div className='col col-auto'>
       <p className='heading-600-16-14 text-end'>₹40,000</p>
       <p className='heading-600-16-14'>Rate & Review Product</p>
       </div>
      
    </div>
 
    
   
  </div>
  
    </div>

    {/*section 2*/}
    <div className='xmax-container'>
    <ProductImages/>
    </div>

    {/*Section-3*/}
    <div className='max-container'>
   <div className='container-fluid p-0 m-0 row d-flex justify-content-between'>
   <div className='w-48-100 '>
   <div className='border-wrap'>
   <div className="row p-3 pt-3 ">
         <div className="col">
           <h3 className="heading-600-16 after-full-line pb-3">Order Details</h3>
         </div>
       </div>
   <div className='row pl-3 pr-3 pt-1'>
   <div className='col col-md-6'>
   <p className='heading-400-14-12 op-70'>Order received</p>
   <p className='heading-500-16'>26 July 2023, Mon</p>
   </div>
   <div className='col col-md-6'>
   <p className='heading-400-14-12 op-70'>Validity till</p>
   <p className='heading-500-16'>Expired</p>
   </div>
   </div> 
   </div>
      
   <div className="border-wrap p-3">
   <div className="row pt-3">
     <div className="col ">
       <h3 className="heading-600-16">Order Summary</h3>
     </div>
   </div>
   <div className="border"></div>
   <div className="pt-2"></div>
   
 {OrderSectionData.map((product, index) => (
   <div className="row" key={index}> 
     <div className="col col-lg-6 col-6">
       <p className="heading-400-14-12 op-60">{product.title}</p>
     </div>
     <div className=" col col-lg-6 col-6 d-flex justify-content-end">
       <p className="heading-500-16 p-0">{product.price}</p>
     </div>
   </div>

))}
<div className="border"></div>
<div className="row pt-3 ">
     <div className="col col-lg-6 col-6">
       {" "}
       <p className="heading-600-16">TOTAL AMOUNT</p>
     </div>
     <div className=" col col-lg-6 col-6 d-flex justify-content-end ">
       <p className="heading-600-16">₹39000</p>
     </div>
   </div>
   <div className="border"></div>

   <div className='d-flex justify-content-end' >  
   <div className='pt-4 pr-4  m-0'><p className='heading-600-14-12'>Download Tax Invoice</p></div>
   <div className='pt-4 m-0'><p className='heading-600-14-12'>Download  Invoice</p></div>
   </div>
           
 </div>

   </div>

   <div className='w-48-100 p-0'>
   <div className='border-wrap'>
   <div className="row p-3 pt-3 ">
         <div className="col col-12">
         <div className=' after-full-line p-0 pb-3 m-0 row judtify-content-between'>
         <div className='col col-lg-7 col-12 p-0'>
         <h3 className="heading-600-14">Annual Maintenance Contract <span className='heading-400-14 op-60'>|  Gold Plan</span></h3>
         <p className='heading-600-16'>₹ 1,00,000</p>
         </div>

           <div className='col col-lg-5 col-12 text-end p-0'>
             <button className='button'>Renew AMC</button>
           </div>
         </div>
           </div>
           
       </div>

   <div className='row pl-3 pr-3 pt-1'>
   <div className='col col-md-6'>
   <p className='heading-400-14-12 op-70'>Service Provider</p>
   <p className='heading-500-16'>Expired</p>
   </div>
   <div className='col col-md-6'>
   <p className='heading-400-14-12 op-70'>Valid Till</p>
   <p className='heading-500-16'>10 July 2024 </p>
   </div>

  
   </div>   
   </div>
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

    {/*section-4*/}
    
    {/*section-5*/}
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


      
 
     
      
  </div>

</div>

{/*Section-6*/}

<div className='max-container'>
    <div className='row py-5'>
    <div className='col col-lg-8 col-12 p-0'>
         
        
    <div className="col col-12 pt-3">
        <h1 className='heading-600-44-20'>Similar Plans</h1>
    </div>
    <div className="col col-12 pt-2">
        <p className='heading-400-16 op-80'>Enjoy the flexibility of selecting from our diverse range of plans</p>
    </div>
          </div>
        {<div className={`col col-lg-4 d-flex align-self-center ${isSmallScreen ? "justify-content-center":"justify-content-end"}`}>
        <p className='heading-600-14-12 v-center'>View all </p>
        <div className='arrow-div ml-2'>
        <RightArrow/>
        </div> 
          </div>}
         
            </div>
        <Slider7 breakpoints={breakpoints} hide={"show-992"} productCategory={productCategory} listofdata={containerData}/>
    </div>
    </div>
    <AccountFooter/></>
  )
}

export default AMCExpiredPlan