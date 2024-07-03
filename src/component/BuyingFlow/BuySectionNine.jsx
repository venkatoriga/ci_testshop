import React from 'react'
import AllOrigaService from '../OrigaService/AllOrigaService'
import Block from '../Block/Block';
import Slider from 'react-slick';
import UserCard from '../SubComponent/UserCard';
const NextArrow = ({ onClick }) => {
    return (
      <button className="custom-arrow-center custom-next-arrow-center" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12L7.14 12L10.77 7.64C10.854 7.53888 10.9174 7.4222 10.9563 7.29661C10.9953 7.17103 11.0091 7.039 10.997 6.90807C10.9726 6.64365 10.8442 6.39974 10.64 6.23C10.4358 6.06026 10.1725 5.9786 9.90808 6.00298C9.64365 6.02736 9.39974 6.15578 9.23 6.36L4.23 12.36C4.19636 12.4077 4.16628 12.4579 4.14 12.51C4.14 12.56 4.09 12.59 4.07 12.64C4.02467 12.7547 4.00094 12.8767 4 13C4.00094 13.1233 4.02467 13.2453 4.07 13.36C4.07 13.41 4.12 13.44 4.14 13.49C4.16628 13.5421 4.19636 13.5923 4.23 13.64L9.23 19.64C9.32402 19.7529 9.44176 19.8437 9.57485 19.9059C9.70793 19.9681 9.85309 20.0002 10 20C10.2337 20.0005 10.4601 19.9191 10.64 19.77C10.7413 19.686 10.825 19.5829 10.8863 19.4666C10.9477 19.3503 10.9855 19.2229 10.9975 19.092C11.0096 18.961 10.9957 18.8289 10.9567 18.7033C10.9176 18.5777 10.8542 18.461 10.77 18.36L7.14 14L19 14C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12Z" fill="#211E24" />
        </svg>
      </button>
    );
  };
  
  const PrevArrow = ({ onClick }) => {
    return (
      <button className="custom-arrow-center custom-prev-arrow-center" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H16.86L13.23 16.36C13.146 16.4611 13.0826 16.5778 13.0437 16.7034C13.0047 16.829 12.9909 16.961 13.003 17.0919C13.0274 17.3564 13.1558 17.6003 13.36 17.77C13.5642 17.9397 13.8275 18.0214 14.0919 17.997C14.3563 17.9726 14.6003 17.8442 14.77 17.64L19.77 11.64C19.8036 11.5923 19.8337 11.5421 19.86 11.49C19.86 11.44 19.91 11.41 19.93 11.36C19.9753 11.2453 19.9991 11.1233 20 11C19.9991 10.8767 19.9753 10.7547 19.93 10.64C19.93 10.59 19.88 10.56 19.86 10.51C19.8337 10.4579 19.8036 10.4077 19.77 10.36L14.77 4.36C14.676 4.24712 14.5582 4.15634 14.4252 4.09412C14.2921 4.0319 14.1469 3.99976 14 4C13.7663 3.99955 13.5399 4.08092 13.36 4.23C13.2587 4.31395 13.175 4.41705 13.1137 4.5334C13.0523 4.64975 13.0145 4.77705 13.0025 4.90803C12.9904 5.03901 13.0043 5.17108 13.0433 5.29668C13.0824 5.42229 13.1458 5.53895 13.23 5.64L16.86 10H5C4.73478 10 4.48043 10.1054 4.29289 10.2929C4.10536 10.4804 4 10.7348 4 11C4 11.2652 4.10536 11.5196 4.29289 11.7071C4.48043 11.8946 4.73478 12 5 12Z" fill="#211E24" />
        </svg>
      </button>
    );
  };
  
const BuySectionNine = () => {
    const blockdata = [
        {
          imageUrl: 'asset/Group1000003580.png',
          heading: '12K+',
          message: 'Machines Sold'
        },
        {
          imageUrl: 'asset/user.png',
          heading: '1200',
          message: 'Happy Sellers'
        }, {
          imageUrl: 'asset/handshake.png',
          heading: '92%',
          message: 'Better Deals then market'
        },
        {
          imageUrl: "asset/alarm.png",
          heading: "Financial Support",
          message:"21 Days",
          title: "block",
        },
      ];

      const sliderImages=[{imageUrl:"asset/Rectangle19193.png",userName:'Rajesh Sharma',userPositiotn:'Word Workshop Owner',bottomDes:'CNC Machine | Purchased on 24 July 2023',message:'“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine'},
      {imageUrl:"asset/Rectangle19193.png",userName:'Rajesh Sharma',userPositiotn:'Word Workshop Owner',bottomDes:'CNC Machine | Purchased on 24 July 2023',message:'“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine' },
      {imageUrl:"asset/Rectangle19193.png",userName:'Rajesh Sharma',userPositiotn:'Word Workshop Owner',bottomDes:'CNC Machine | Purchased on 24 July 2023',message:'“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine'},]
      const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
  return (
    <div className='container-fluid liner-background'>
        <div className='max-container'>
          <div className='row'>
            <div className='col col-lg-6'>
                
                    <div className='row pt-4'>
                    <div className='col col-12 pt-5 pb-3'><AllOrigaService imageurl={"asset/OrigaService.png"}/></div>
                    <div className='col col-12'><h1 className='heading-600-44-20'>What our Customers say about us</h1></div>
                    <div className='col col-12'><p className="heading-400-16 op-80">From Machines to tools to finance everything you need in one place</p></div>
                    </div>
                    <div className='row'>
                    {blockdata.map((item, index) => (
                        <div className="col-lg-6 col-md-6 col-12 p-0">
                          <Block key={index} imageurl={item.imageUrl} heading={item.heading} message={item.message} />
                        </div>
                      ))}
                    </div>
            </div>
            
            
            <div className='col col-lg-6'>
            <div className="slickCarausal position-relative" >
            <Slider {...settings}>
              {sliderImages.map((product,index) => (
               <UserCard key={index} imageurl={product.imageUrl} userName={product.userName} userPosition={product.userPositiotn} message={product.message} bottomDes={product.bottomDes}/>
                ))}
            </Slider>
          </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default BuySectionNine