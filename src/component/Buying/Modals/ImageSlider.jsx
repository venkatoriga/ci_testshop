import React, { useRef } from "react";
import "./ImageSlider.css";
import Slider from "react-slick";
import { closeIcon, leftArrowIcon, rightArrowIcon } from "../../../helpers/Icons";
const ImageSlider = ({ modalAction, sliderImage }) => {
    console.log('sliderImage======>', sliderImage);
    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    const options = {
        autoplay: false,
        infinite: true,
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,

    };
    if (sliderImage?.length === 1) {
        sliderImage = [...sliderImage, ...sliderImage]
    }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                <div className="img-wrap">

                    <div className="img-slider-head">
                        <div className="pagination-main">
                            <button className="image-slider-button" onClick={previous}>{leftArrowIcon({ width: 24, height: 24 })}</button>
                            <button className="image-slider-button" onClick={next}>{rightArrowIcon({ width: 24, height: 24 })}</button>
                        </div>
                    </div>
                    <Slider ref={sliderRef} {...options}>
                        {sliderImage?.map((item, index) => (
                            <div key={index} className="img-slider-image-item">
                                {item.product && <img className="w-100" src={item.product} alt={item.name} />}
                                {item.url && <img className="img-fluid" src={item.url} alt={item.name} />}
                                {item.imageUrl && <img className="img-fluid" src={item.imageUrl} alt={item.name} />}
                            </div>
                        ))}

                    </Slider>



                </div>
            </div>
        </div>
    );
}
export default ImageSlider;