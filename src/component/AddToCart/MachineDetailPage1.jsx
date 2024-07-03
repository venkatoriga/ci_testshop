import React from 'react'
import LeftArrow from '../SubComponent/LeftArrow'
import Slash from '../SubComponent/Slash'
import CartProductDetails from './CartProductDetails'
import Footer from '../Footer/Footer'
import AddToCartSection2 from './AddToCartSection2'
import AddToCartSection3 from './AddToCartSection3'
import DeliverdToSection from './AddToCartComponent/DeliverdToSection'
import OrderSummarySection from './AddToCartComponent/OrderSummarySection'
const MachineDetailPage1 = () => {
    const deliverdSectionData={
        name:"Viresh Dhruv",
        btnName:"Change",
        address:"Indira Mills, Bandra East, Das Disha Marg, Andheri Gufa, Mumbai, Maharashtra"
    }
    const OrderSectionData=[
        {
        title:"Price (Items 4)",
        price:"₹40000"
        },
        {
        title:"Discount",
        price:"-₹1000"
       },{
        title:"Delivery Charges",
        price:"Free"
       },{
        title:"GST (18%)",
        price:"₹ 2682.00"
       }
        
    ];
    return (
    <>
    <div className='container-fluid tablet-d-padding' style={{minHeight:"60vh"}}>
            {/* address start*/}
            <div className='max-container  pt-4'>
                <div className='conatiner p-0 m-0 row'>
                    <div className="col col-auto mg-0 p-0"><LeftArrow /></div>
                    <div className="col col-auto mg-0 pr-0"> 
                   <p className='heading-400-14-12  op-60 pt-1'>Account</p> </div>
                    <div className="col col-auto p-0 op-80"><Slash /></div>
                    <div className="col col-auto pr-0 heading-600-14">Your Cart</div>
                </div>
            </div>
            {/* address end*/}
            <div className='max-container pt-3'>
                <div className='container-fluid p-0 m-0 row'>
                    <div className='col col-auto heading-600-20-16 p-0'>Your Cart</div>
                    <div className='col col-auto d-flex align-items-center'>
                    <p className=' heading-500-16-14 v-center'>3 items</p>
                    </div>
                </div>
            </div>



            <div className='max-container'>
                <div className='container-fluid p-0 m-0 row col-reverse pt-5 '>
                    {/*cart start*/}
                    <div className='col col-lg-8 col-md-12 p-0'>
                         { [0,1,2].map(()=>(<CartProductDetails />) )}
                          
                      {/* <CartProductDetails productData={productData} />*/}
                        
                    </div>
                    {/*cart end*/}
                    <div className=' pl-4 col col-lg-4 col-md-12'>
                        <DeliverdToSection listdata={deliverdSectionData}/>
                        <OrderSummarySection listofdata={OrderSectionData}/>
                        
                    </div>
                </div>
            </div>
          
        </div>
        <AddToCartSection2/>
        <AddToCartSection3/>
        <Footer/>
        </>
  )
}

export default MachineDetailPage1