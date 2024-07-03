import React from 'react';
import './ThreeSection.css';
import { quoteIcon } from '../../../helpers/Icons';
const ThreeSection = () => {
    return (
        <div className="lightBg container-fluid">
            <div className="max-container padding-tb80">
                <div className='center-section'>
                    <div className='heading heading-600-44-20'>Watch how it works</div>
                    <div className='heading-400-16 op-80'>Origa provides tailored machine finance solutions, offering flexible lease and loan options to help you get the Equipment according to your needs</div>
                </div>
                <div className="max-container cust-row-gap">
                    <div className="video-wrap">
                        <video className='video-item' src="/asset/sample-video.mp4" controls="controls" poster="/asset/thumbnail.png"/>
                        <div className="testi-wrap">
                            {quoteIcon({width:52,height:40})}
                            <div className="heading-400-16-12">“I Have sold my machines earlier as well, but never has it been so simple, but never has it been so simple”</div>
                            <div className="name heading-600-18">Suraj Sharma</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ThreeSection;