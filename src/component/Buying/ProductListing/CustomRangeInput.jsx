import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

// CustomRangeInput component
const RangeSlider = ({ min, max, currentRefinement, refine }) => {
  const handleChange = (event, newValue) => {
    refine({ min: newValue[0], max: newValue[1] });
  };

  // Ensure values are within range
  const defaultValue = [currentRefinement.min || min, currentRefinement.max || max];

  return (
    <div>
      <Typography id="range-slider" gutterBottom>
        Price range
      </Typography>
      <Slider
        min={min}
        max={max}
        value={defaultValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={(value) => `$${value}`}
      />
    </div>
  );
};

const CustomRangeInput = connectRange(RangeSlider);
