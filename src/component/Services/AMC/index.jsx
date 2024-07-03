import React from "react";
import { useNavigate } from "react-router-dom";
import LookingForBuySellRight from "../../HomePage/SecondPage/LokkingBuySell/LookingForBuySellRight/LookingForBuySellRight";
import './index.css'


const AMCBenefits = () => {
    const navigate = useNavigate();

    const benefitsData = [
        {
            heading: "Quick Response",
            message: "We ﬁx things within 24 hours",
            imageUrl: "/checks.svg"
        },
        {
            heading: "Experts on the Job",
            message: "Our experienced professionals handle your machines",
            imageUrl: "/deliver.svg"
        },
        {
            heading: "Access to service history",
            message: "We use technology to maintain your service records."
            ,
            imageUrl: "/service.svg"
        },
        {
            heading: "Best Price",
            message: "Get quality service at better prices than the market",
            imageUrl: "/finance.svg"
        },
    ];
    const productId = "serviceRequest"
    const serviceName = "AMC"
    return (
        <div className="container-fluid p-0 m-0 liner-background-service">
            <div className="max-container tablet-d-padding">
                <div className={`container-fluid p-0 m-0 row d-flex justify-content-between   `}>

                    <div className="col-lg-5 col-md-12 col-12 p-0 d-flex align-items-center">
                        <div className="p-0 m-0">
                           
                            <p className="heading-600-32-20">AMC (Annual Maintenance Contract)</p>
                            <p className="heading-400-16-14">An AMC offers periodical check-ups and extra care for your machine, ensuring
                                proper functioning, and preventing expensive shutdowns with complete overhauls & maintenance.</p>
                            <div className='btn-left-to-right-992 pb-5'>
                                <button className="long-btn" onClick={() => {
                                    console.log('hello')
                                    window.scrollTo(0, 0);
                                    navigate('/service/Addonservice', { state: { productId, serviceName } });
                                    //navigate('/service/amc');
                                }}>Book Service</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12 pt-4 pb-5">
                        <p className="heading-600-24-20 pt-4 ">Your Benefits At a Glance</p>
                        <LookingForBuySellRight product={benefitsData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AMCBenefits;
