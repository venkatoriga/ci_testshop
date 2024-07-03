import React,{useState}  from "react";
import './tenure.css'
import MultiRangeSlider from "multi-range-slider-react";
const TenureSlider = ({name = "tenure",value = 0}) => {
    const [sliderValue,setSliderValue] = useState(value);
    const handleInput = (e) => {
  
        setSliderValue(e.maxValue);
    };
    return (
        <div className="bi-tenure-slider-wrap">
            <div className="top-wrap-tenure">
                <span>Tenure</span>
                <span>{sliderValue} {(sliderValue > 1) ? "Years" : "Year"}</span>
            </div>
            {/* <input type="range"   style={sliderStyles} name={name} className="tenure-slider" value={sliderValue} min="1" max="100" step="1" onChange={(e) => setSliderValue(e.target.value)}/> */}
           <div className="tenure-slider">

           <MultiRangeSlider
			min={0}
			max={100}
			step={1}
			barInnerColor="#9B9E51"
			barRightColor="#D9D9D9"
			barLeftColor="#D9D9D9"
			minValue={0}
			maxValue={sliderValue}
			onInput={(e) => {
				handleInput(e);
			}}
		/>
           </div>
            <div className="top-wrap-tenure">
                <span>1 Year</span>
                <span>100 Years</span>
            </div>
        </div>
    );
}
export default TenureSlider;