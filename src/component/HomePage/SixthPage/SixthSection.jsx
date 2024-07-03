import React from "react";
import "./SixthPage.css";
import Slider2 from '../../SubComponent/AllSlider/Slider2/Slider2';
import ProductCategory from '../../SubComponent/AllBlock/ProductCategory'
// const SixthSection = () => {
//     return(
//         <></>
//     )
// }
const SixthSection = () => {
    const productCategory=<ProductCategory/>
    const heading = "Our Product categories";
    const para =
        "From Machines to tools to finance everything you need in one place";
    const listofdata = [
        {
            title: "Lubricants & Oils",
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image560(2).png",
        }, {
            title: 'Welding & Soldering',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image536(2).png"
        }, {
            title: 'Safety Equipment',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image529(1).png"
        }, {
            title: 'Welding & Soldering',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image536(2).png"
        },
        {
            title: "Lubricants & Oils",
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image560(2).png",
        }, {
            title: 'Welding & Soldering',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image536(2).png"
        }, {
            title: 'Safety Equipment',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image529(1).png"
        }, {
            title: 'Welding & Soldering',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/image536(2).png"
        }
    ];

    return (
        <div className="container-fluid pt-5 pb-5">
            <div className='max-container pt-5 '>
            <div className=" row d-flex justify-content-between">
                <div className='col col-lg-9'>
                    <h1 className='heading-600-44-20'>{heading}</h1>
                    <p className='heading-400-16-14 op-60'>{para}</p>
                </div>
               </div>
            </div>

            <div className="xmax-container ">
                <Slider2 listofdata={listofdata} productCategory={productCategory}/>
            </div>
   
        </div>
    );
};

export default SixthSection