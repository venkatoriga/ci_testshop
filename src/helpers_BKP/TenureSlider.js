import React, { useState, useEffect } from "react";

const TenureSlider = ({ name = "tenure", FinanceDetails, setslideroutput }) => {
    //console.log('FinanceDetails=====>', FinanceDetails);

    const [sliderValue, setSliderValue] = useState(1);
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(1);
    const [middleValue, setmiddleValue] = useState();
    useEffect(() => {
        setslideroutput(sliderValue)
    }, [sliderValue])
    useEffect(() => {
        if (FinanceDetails && FinanceDetails.length > 0) {
            const tenures = FinanceDetails.map(detail => detail.tenure_of_lease);
            const min = Math.min(...tenures);
            const max = Math.max(...tenures);
            console.log('min', min);
            console.log('max', max);
            setMinValue(min);
            setMaxValue(max);
            setSliderValue(min);
            const middle = Math.floor((max - min) / 2) + min;
            setmiddleValue(middle)
        }
    }, [FinanceDetails]);

    return (
        <div className="bi-tenure-slider-wrap">
            <div className="top-wrap">
                <span>Tenure (in Months)</span>
                {/* <span>{sliderValue} Months</span> */}
            </div>
            <input
                type="range"
                name={name}
                value={sliderValue}
                min={minValue}
                max={maxValue}
                step="12"
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
            />
            <div className="top-wrap">
                <span>{minValue} </span>
                <span>{middleValue} </span>
                <span>{maxValue} </span>
            </div>
        </div>
    );
}

export default TenureSlider;
