import React from 'react';
import './SecondSection.css';
const SecondSection = () => {
    return (
        <div className="container-fluid">
            <div className="max-container cust-row-gap">
                <div className="cust-box-wrap">
                    <div className="cust-content-wrap">
                        <div class="heading-600-44-20 text-left">Streamlined Registration</div>
                        <div className="text-left">Easily sell your used machines by filling out a simple form with details and machine images</div>
                    </div>
                    <div className="image-wrap">
                        <img src="/asset/section-image-1.jpeg"/>
                    </div>
                </div>
                <div className="cust-box-wrap">
                    <div className="image-wrap">
                        <img src="/asset/section-image-2.jpeg"/>
                    </div>
                    <div className="cust-content-wrap">
                        <div class="heading-600-44-20 text-left">Effortless Evaluation and Documentation</div>
                        <div className="text-left">Our team evaluates information within 24 hours, handling all necessary agreements between ORIGA & seller</div>
                    </div>
                </div>
                <div className="cust-box-wrap">
                    <div className="cust-content-wrap">
                        <div class="heading-600-44-20 text-left">Hassle-Free Listing and Sale</div>
                        <div className="text-left">Enjoy a free listing on our website, and once there's buyer interest, we take care of the
                        inspection visit, negotiation, and secure online payment.</div>
                    </div>
                    <div className="image-wrap">
                        <img src="/asset/section-image-3.jpeg"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SecondSection;