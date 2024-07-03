import React from 'react';

const InterestRateDiv = ({ IntrestRangeFrom, IntrestRangeTo, LowerSlabAmount, HigherSlabAmount }) => {
    return (
      <>
        <div className='interest-div'>
            {/* <div className='heading-400-16-14'>Calculated Interest Rate</div> */}
            <div className='heading-400-16-14'>Interest Range</div>
            <div className='IntrestRange' style={{ color: "#211E24" }}>{IntrestRangeFrom}% - {IntrestRangeTo}%</div>
        </div>
        {/* <div className='interest-div'>
            <div className='heading-400-16-14'>EMI/Month Starts From</div>
            <div className='heading-600-24-20' style={{ color: "#211E24" }}>Rs. {LowerSlabAmount} - Rs. {HigherSlabAmount}</div>
        </div> */}
        </>
    );
};

export default InterestRateDiv;
