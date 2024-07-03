import React, { useState } from "react";
import ImageSlider from "../../Buying/Modals/ImageSlider";
import { addIcon } from "../../../helpers/Icons";
import "./MachineSaleImage.css";
import Slider from "react-slick";

const MachineSaleImage = ({ media }) => {
    console.log(media, 'media'); // Check the structure of media object
    const [showModal, setShowModal] = useState(false);
    const handleModal = (status) => {
        setShowModal(status);
    }

    const options = {
        autoplay: false,
        dots: false,
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            {showModal && (
                <div className="img-wrap">
                    <ImageSlider modalAction={handleModal} sliderImage={media} />
                </div>
            )}
            <div className="product-img-wrap-main">
                {media?.length > 0 && (
                    <div className="max-container viewall-div">
                        <div className="drag" onClick={() => handleModal(true)}>View all</div>
                        <button className="framreplus">{addIcon({ width: 24, height: 24, fill: "#fff" })}</button>
                    </div>

                )}

                <Slider {...options}>
                    {media?.map((image, index) => (
                        <div key={index} className="product">
                            <img className="product-img" src={image.imageUrl ? image?.imageUrl : image} alt={image.name} />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default MachineSaleImage;
