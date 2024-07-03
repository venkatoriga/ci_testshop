import React from "react";
import "../Customers/index.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CustomerSwiper from "./CustomerSwiper";


const Customer = () => {
    const benefitsData = [
        {
            title: "12K+",
            description: "Machines Sold",
            image: "/machine-sold.svg"
        },
        {
            title: "1200",
            description: "Happy Sellers",
            image: "/happly-seller.svg"
        },
        {
            title: "92%",
            description: "Better Deals then market",
            image: "/better-deal.svg"
        },
        {
            title: "21 Days",
            description: "Avg. Selling Time",
            image: "/Average-Selling.svg"
        },
    ];
    const customerData = [
        {
            name: "Rajesh Sharma",
            about: "Word Workshop Owner",
            description:
                "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine",
            date: "CNC Machine | Purchased on 24 July 2023",
            image: "/rajesh.png",
            cardImage: "/workshop.jpg",
        },
        {
            name: "Rajesh Sharma",
            about: "Word Workshop Owner",
            description:
                "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine",
            date: "CNC Machine | Purchased on 24 July 2023",
            image: "/rajesh.png",
            cardImage: "/workshop.jpg",
        },
        {
            name: "Rajesh Sharma",
            about: "Word Workshop Owner",
            description:
                "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine",
            date: "CNC Machine | Purchased on 24 July 2023",
            image: "/rajesh.png",
            cardImage: "/workshop.jpg",
        },
        {
            name: "Rajesh Sharma",
            about: "Word Workshop Owner",
            description:
                "“Origa not just helped me find a good second-hand machine, but also assisted me to get finance to purchase the machine",
            date: "CNC Machine | Purchased on 24 July 2023",
            image: "/rajesh.png",
            cardImage: "/workshop.jpg",
        },

        // Add more customer data objects as needed
    ];
    return (
        <div className="container-fluid p-0 liner-background">
        <div className="xmax-container">
            <section className="Customer_layout ">
              
                    <div className="row justify-content-between align-center">
                        <div className= "col-lg-6 ">
                            <div >
                               
                                <div className="main-heading " style={{ maxWidth: "820px" }}>
                                    <h1 className="heading-600-44-20">What our Customers say about us</h1>
                                    <h3 className="heading-400-16-14 op-80">
                                        From Machines to tools to finance everything you need in one place
                                    </h3>
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
                            <CustomerSwiper customerData={customerData} />
                            </div>
                            
                        
                    </div>
              
                
               
                
            </section>
            </div>
        </div>
        
    )
    
}

export default Customer;