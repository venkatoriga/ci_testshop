import React from "react";
import "./FiveSection.css";
import BuyerSwiper from "./BuyersSwiper";

const FiveSection = () => {


    const customerData = [
        { name: "Rajesh Sharma", about: "Word Workshop Owner", description: "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine", date: "CNC Machine | Purchased on 24 July 2023", image: "/rajesh.png", cardImage: "/workshop.jpg", },
        { name: "Rajesh Sharma", about: "Word Workshop Owner", description: "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine", date: "CNC Machine | Purchased on 24 July 2023", image: "/rajesh.png", cardImage: "/workshop.jpg", },
        { name: "Rajesh Sharma", about: "Word Workshop Owner", description: "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine", date: "CNC Machine | Purchased on 24 July 2023", image: "/rajesh.png", cardImage: "/workshop.jpg", },
        { name: "Rajesh Sharma", about: "Word Workshop Owner", description: "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine", date: "CNC Machine | Purchased on 24 July 2023", image: "/rajesh.png", cardImage: "/workshop.jpg", },
    ];
    const benefitsData = [
        { title: "12K+", description: "Machines Sold", image: "/machine-sold.svg" },
        { title: "1200", description: "Happy Sellers", image: "/happly-seller.svg" },
        { title: "92%", description: "Better Deals then market", image: "/better-deal.svg" },
        { title: "21 Days", description: "Avg. Selling Time", image: "/Average-Selling.svg" },
    ];

    return (
        <>
            <div className="container-fluid p-0 liner-background">
                <div className="xmax-container">
                    <section className="Customer_layout-selling">
                        <div className="row justify-content-between align-center">
                            <div className="col-lg-6 ">
                                <div>
                                    <div className="topContent">
                                       
                                    </div>
                                    <div className="main-heading">
                                        <h1 className="heading-600-24-20">What our Customers say about us</h1>
                                        <p className="">
                                            From Machines to tools to finance everything you need in one place
                                        </p>
                                    </div>
                                    <div className="container-benefit">
                                        <div className="row">
                                            {benefitsData.map((benefit, index) => (
                                                <div key={index} className="col-lg-6 col-6 mod-benefit">
                                                    <div className="icon-bg-light">
                                                        <img src={benefit.image} alt={benefit.image} />
                                                    </div>
                                                    <h3 className="title">{benefit.title}</h3>
                                                    <p className="desc">{benefit.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12 pt-5" >
                                <BuyerSwiper customerData={customerData} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default FiveSection