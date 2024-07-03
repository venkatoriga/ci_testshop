import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

const CustomerSwiper = ({ customerData }) => {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={20}
      navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
      modules={[Autoplay, Navigation]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={false}
      className="mySwiper tab-customer-swiper"
      breakpoints={{
        360: { slidesPerView: 1.2, centeredSlides: false },
        540: { slidesPerView: 1.5, centeredSlides: false },
        767: { slidesPerView: 2.3, centeredSlides: false },
        992: { slidesPerView: 1.5, centeredSlides: false },
        1360: { slidesPerView: 1.2, centeredSlides: false },
      }}
    >
      {customerData.map((customer, index) => (
        <SwiperSlide key={index}>
          <div className="customer-card">
            <div className="img-box">
              <img src={customer.cardImage} alt="workshop" />
            </div>
            <div className="customer-content">
              <div className="profile">
                <div className="img-box">
                  <img src={customer.image} alt="rajesh" />
                </div>
                <div className="profile-content">
                  <h2 className="name">{customer.name}</h2>
                  <p className="about">{customer.about}</p>
                </div>
              </div>
              <div className="customer-bt-content">
                <p className="desc">{customer.description}</p>
                <p className="date">{customer.date}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="navigations">
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </Swiper>
  );
};

export default CustomerSwiper;
