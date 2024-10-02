import React, {useEffect, useState, memo} from "react";
import $ from 'jquery';
import '../css/inputRangeFilter.css';

const RangeSlider = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [pos, setPost] = useState({ left: 0, right: 0 });
    const [thumbMin, setThumbMin] = useState(0);
    const [thumbMax, setThumbMax] = useState(100);

      const step =5
      //100 / (MAX - MIN) * (value - MIN)
      const calcLeftPosition = value => 100 / (100) *  (value);

      const handleMinChange = e => {
        e.preventDefault();
        const newMinVal = Math.min(+e.target.value, maxValue - step);
        setMinValue(newMinVal);
        let minPos = calcLeftPosition(newMinVal)
        let maxPos = 100 - calcLeftPosition(maxValue)
        setPost({ left: minPos, right:maxPos})
        setThumbMin(calcLeftPosition(newMinVal))         
      };

      const handleMaxChange = e => {
        e.preventDefault();
        const newMaxVal = Math.max(+e.target.value, minValue + step);
         setMaxValue(newMaxVal);
        let minPos = calcLeftPosition(minValue)
        let maxPos = 100 - calcLeftPosition(newMaxVal)
        setPost({ left: minPos, right:maxPos})
        setThumbMax(calcLeftPosition(newMaxVal))

      };

    return (
     <>
        <div className="range-slide">
            <div className="filter_slide">
                <div className="line" id="line" style={{ left: `${pos.left}%`, right: `${pos.right}%` }}></div>
                <span className="thumb" id="thumbMin" style={{left:`${thumbMin}%`}}></span>
                <span className="thumb" id="thumbMax" style={{left:`${thumbMax}%`}}></span>
            </div>
            <input id="rangeMin" type="range"   min="0"  max="100"  value={minValue} step={step}
            onChange={(e)=>handleMinChange(e)} />
            <input id="rangeMax" type="range"  min="0" max="100"   value={maxValue} step={step}
            onChange={(e)=>handleMaxChange(e)} />
        </div>
        <div className="display-range-filter">
            <span id="min">{minValue} </span>
            <span id="max">{maxValue} </span>
        </div>
     </>
    );
  };

  export default memo(RangeSlider);