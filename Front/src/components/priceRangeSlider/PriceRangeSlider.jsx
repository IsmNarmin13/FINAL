import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { PiArrowsHorizontalLight } from 'react-icons/pi';

const PriceRangeSlider = ({ setSelectedPriceRange }) => {
  const [sliderValue, setSliderValue] = useState([0, 500]);

  const handleSliderChange = (values) => {
    setSliderValue(values);
    setSelectedPriceRange(values);
  };

  return (
    <div>
      <Slider
        range
        min={0}
        max={500}
        defaultValue={sliderValue}
        onChange={handleSliderChange}
      />
      <div className="my-3 flex items-center space-x-2">
        <span className='px-3 py-2 bg-[#ccb196] text-sm'>${sliderValue[0]}</span>
        <PiArrowsHorizontalLight />
        <span className='px-3 py-2 bg-[#ccb196] text-sm'>${sliderValue[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
