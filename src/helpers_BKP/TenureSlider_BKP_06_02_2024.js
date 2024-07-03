import React,{useState}  from "react";
const TenureSlider = ({name = "tenure",value = 0}) => {
    const [sliderValue,setSliderValue] = useState(value);
    return (
        <div className="bi-tenure-slider-wrap">
            <div className="top-wrap">
                <span>Tenure</span>
                <span>{sliderValue} {(sliderValue > 1) ? "Years" : "Year"}</span>
            </div>
            <input type="range" name={name} value={sliderValue} min="1" max="100" step="1" onChange={(e) => setSliderValue(e.target.value)}/>
            <div className="top-wrap">
                <span>1 Year</span>
                <span>100 Years</span>
            </div>
        </div>
    );
}
export default TenureSlider;