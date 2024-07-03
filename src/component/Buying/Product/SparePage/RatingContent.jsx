import React from "react";
import './RatingContent.css'

const RatingContent = () => {
    return (
        <div className='content'>
            <div className='flex-row-c'>
                <div className='frame-1c'>
                    <span className='are-you-rated'>Are you Rated?</span>
                    <div>
                        <input type='radio' id='rated-yes' name='rated' className="radio-button curser-pointer" value='yes' />
                        <label htmlFor='rated-yes' className='yes'>Yes</label>
                        <input type='radio' id='rated-no' className='radio-button-21 curser-pointer' name='rated' value='no' />
                        <label htmlFor='rated-no' className='no'>No</label>
                    </div>
                </div>
                <div className='frame-1d'>
                    <span className='are-you-rated-1e'>Are you Profitable?</span>
                    <div>
                        <input type='radio' id='profitable-yes' name='profitable' className='radio-button-22 curser-pointer' value='yes' />
                        <label htmlFor='profitable-yes' className='yes-1f'>Yes</label>
                        <input type='radio' id='profitable-no' className='radio-button-23 curser-pointer' name='profitable' value='no' />
                        <label htmlFor='profitable-no' className='no-20'>No</label>
                    </div>
                </div>
                <div className='frame-26'>
                    <span className='select-rating'>Select Rating</span>
                </div>
                <select className='dropdown-s-collapsed curser-pointer'>
                    <option value='' >Select Revenue</option>
                    <option value='AAA'>AAA</option>
                </select>
                <div className='frame-27'>
                    <span className='select-rating'>Select Rating</span>
                </div>
                <select className='dropdown-s-collapsed-28 curser-pointer'>
                    <option value='' >Select Range</option>
                    <option value='10 Cr - 20 Cr'>10 Cr - 20 Cr</option>
                </select>
            </div>

        </div>
    );
}

export default RatingContent;
