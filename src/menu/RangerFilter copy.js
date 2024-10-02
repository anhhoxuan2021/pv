import React, {useEffect} from "react";
import $ from 'jquery';
import '../css/inputRangeFilter.css';

const RangeSlider = () => {
    const [minValue, setMinValue] = React.useState(0);
    const [maxValue, setMaxValue] = React.useState(100);
  
    useEffect(() => {
        let min = 10;
        let max = 100;

        const calcLeftPosition = value => 100 / (100 - 10) *  (value - 10);

        $('#rangeMin').on('input', function(e) {
        const newValue = parseInt(e.target.value);
        if (newValue > max) return;
        min = newValue;
        $('#thumbMin').css('left', calcLeftPosition(newValue) + '%');
        $('#min').html(newValue);
        $('#line').css({
            'left': calcLeftPosition(newValue) + '%',
            'right': (100 - calcLeftPosition(max)) + '%'
        });
        });

        $('#rangeMax').on('input', function(e) {
        const newValue = parseInt(e.target.value);
        if (newValue < min) return;
        max = newValue;
        $('#thumbMax').css('left', calcLeftPosition(newValue) + '%');
        $('#max').html(newValue);
        $('#line').css({
            'left': calcLeftPosition(min) + '%',
            'right': (100 - calcLeftPosition(newValue)) + '%'
        });
        });
      });
  
    return (
     <>
        <div className="range-slide">
            <div className="slide">
                <div className="line" id="line" style={{left: "0%", right: "0%"}}></div>
                <span className="thumb" id="thumbMin" style={{left:"0%"}}></span>
                <span className="thumb" id="thumbMax" style={{left:"100%"}}></span>
            </div>
            <input id="rangeMin" type="range" max="100" min="10" step="5" value="0" />
            <input id="rangeMax" type="range" max="100" min="10" step="5" value="100"/>
        </div>
        <div className="display">
        <span id="min">10</span>
        <span id="max">100</span>
    </div>
     </>
    );
  };

  export default RangeSlider;