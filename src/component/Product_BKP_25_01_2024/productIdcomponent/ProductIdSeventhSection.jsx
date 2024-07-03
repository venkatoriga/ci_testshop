import React from 'react'
import Slider7 from '../../SubComponent/AllSlider/Slider7';
import PlanBlock from '../../SubComponent/AllBlock/PlanBlock';
const ProductIdSeventhSection = () => {
    const productBlock= <PlanBlock/>;
    const breakpoints={
        a:3.3,
        b:2.4,
        c:2.1,
        d:1.5,
        e:1.1
      }
    const heading = "Similar Plans";
    const para =
        "From Machines to tools to finance everything you need in one place";
    const containerData = [
        {   id:1,
            title: "PRO Plan",
            price:'₹25,000',
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            id:2,
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            id:3,
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            id:4,
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        },
        {id:5,
            title: "PRO Plan",
            price:'₹25,000',
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            id:6,
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            id:7,
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png"
        }, {
            id:8,
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/machine-half.png"
        }
    ];
  return (
    <div>
         <div className="xmax-container pt-3 tablet-d-padding ">
                        <div className='max-container p-0 pt-5 pb-5'>
                      
                            <h1>{heading}</h1>
                            <p>{para}</p>
                        </div>

                  
                        <Slider7 listofdata={containerData} productCategory={productBlock} breakpoints={breakpoints}/>
                        
                </div>
    </div>
  )
}

export default ProductIdSeventhSection