import React,{useRef}  from "react";
// import "./ImageSlider.css";
import Slider from "react-slick";
import {closeIcon,leftArrowIcon,rightArrowIcon} from "../../../../helpers/Icons";
const ImageSlider = ({modalAction,images}) => {
    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    const options = {
        autoplay: false,
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
   const  Products = [
        {id: 1, product: "/asset/Pune.png", name:"prduct1"},
        {id: 2, product: "/asset/Pune.png", name:"prduct2"},
        {id: 3, product: "/asset/Pune.png", name:"prduct3"},
        {id: 4, product: "/asset/Pune.png", name:"prduct4"}
    ]
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="img-wrap">
                    <Slider ref={sliderRef} {...options}>
                        {images.map((item) => (
                            <div key={item.id} className="img-slider-image-item" >
                                <img className="w-100" src={item.url} alt={"product"}/>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="pagination-main">
                    <button className="left-btn" onClick={previous}>{leftArrowIcon({width:24,height:24})}</button>
                    <button className="right-btn" onClick={next}>{rightArrowIcon({width:24,height:24})}</button>
                </div>
            </div>
        </div>
    );
}
export default ImageSlider;