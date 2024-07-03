import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "./ProductImages.css";
import ImageSlider from "../../Modals/ImageSlider";
import { heartIcon } from "../../../../../helpers/Icons";
import useWishListAddOrUpdate from "../../../../SubComponent/useWishListAddOrUpdate";
const ProductImages = ({ media, productId, productImage, productPrice, productName }) => {
    const [showModal, setShowModal] = useState(false);
    const [isImageHover, setIsImageHover] = useState(false)
    const [isHeartColor, setIsHeartColor] = useState({ fill: "none", stroke: "#FFF" })
    const [showSlide, setShowSlide] = useState();
    const { onWishlistHandler, heartColor } = useWishListAddOrUpdate();
    const handleModal = (status) => {
        setShowModal(status);
    };

    const sliderRef = useRef(null);
    const options = {
        autoplay: true,
        dots: false,
        speed: 500,
        slidesToShow: showSlide,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };
    console.log("midea==>", media);
    useEffect(() => {
        if (media.length === 1) {
            setShowSlide(1);
        }
        if (media.length === 2) {
            setShowSlide(2);
        }
        if (media.length >= 3) {
            setShowSlide(3);
        }


    }, [])

    //     {isHoverd.activeIndex===index && }

    //     {isHoverd.activeIndex===index && }
    const onWishHandler = () => {

        if (isHeartColor.fill === "none") {
            onWishlistHandler(productId, productImage, productPrice, productName)
            setIsHeartColor((prev) => ({ ...prev, fill: "#FFF" }))
        } else {
            setIsHeartColor((prev) => ({ ...prev, fill: "none" }))
        }
    }
    // useEffect(()=>{
    //     setIsHeartColor((prev)=>({...prev,fill:"#FFF"}))
    // },[heartColor])
    return (
        <>
            {showModal && (
                <div className="img-wrap">
                    {showModal && <ImageSlider modalAction={handleModal} images={media} />}
                </div>
            )}
            {media.length > 1 && <div className="product-img-wrap">
                <div className="p-r">
                    {<><div className="drag" onClick={() => handleModal(true)}>View all</div>
                        <button className="frame-btn" onClick={onWishHandler}>{heartIcon({ width: 30, height: 30, fill: isHeartColor.fill, stroke: isHeartColor.stroke })}</button>
                    </>} <Slider ref={sliderRef} {...options}>
                        {media.map((image, index) => (
                            <div className="product" key={image.id} onMouseEnter={() => setIsImageHover(true)} onMouseLeave={() => setIsImageHover(false)}>
                                <img className="product-img" src={image.url} alt={image.alt || ""} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>}
            {media.length === 1 && <div className="product-img-wrap product-img-single">
                <div className="p-r xmax-container">

                    {media.map((image, index) => (
                        <div className="product img-container" key={image.id} onMouseEnter={() => setIsImageHover(true)} onMouseLeave={() => setIsImageHover(false)}>
                            <img className="product-img" src={image.url} alt={image.alt || ""} />
                            {isImageHover && <><div className="drag" onClick={() => handleModal(true)}>View all</div>
                                <button className="frame-btn" onClick={onWishHandler}>{heartIcon({ width: 30, height: 30, fill: isHeartColor.fill, stroke: isHeartColor.stroke })}</button>
                            </>}
                        </div>
                    ))}
                </div>
            </div>}

        </>
    );
};
export default ProductImages;