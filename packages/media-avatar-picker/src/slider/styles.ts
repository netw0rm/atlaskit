/* tslint:disable:variable-name */

import {
    akColorN0,
    akColorN20,
    akColorN800,
    akColorB50,
    akColorB100,
    akGridSizeUnitless
} from '@atlaskit/util-shared-styles';

const sliderThumbSize = 20;
const sliderThumbBorderThickness = 2;
const sliderLineThickness = 6;

const chromeRangeInputStyle = `
    &::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px ${sliderThumbBorderThickness}px ${akColorN800};
      height: ${sliderThumbSize}px;
      width: ${sliderThumbSize}px;
      border-radius: ${sliderThumbSize / 2}px;
      background: ${akColorN0};
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -${sliderThumbSize / 2 - sliderLineThickness / 2}px;
    }
    
    &:focus::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px ${sliderThumbBorderThickness}px ${akColorB100};
    }
    
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: ${sliderLineThickness}px;
      cursor: pointer;
      background: ${akColorN20};
      border-radius: ${sliderLineThickness / 2}px;
      border: 0px;
    }
    
    &:focus::-webkit-slider-runnable-track {
      background: ${akColorB50};
    }
`;

const firefoxRangeInputStyle = `
    &::-moz-focus-outer {
        border: 0;
    }
    
    &::-moz-range-thumb {
      box-shadow: 0px 0px 0px ${sliderThumbBorderThickness}px ${akColorN800};
      border:0;
      height: ${sliderThumbSize}px;
      width: ${sliderThumbSize}px;
      border-radius: ${sliderThumbSize / 2}px;
      background: ${akColorN0};
      cursor: pointer;
    }
    
    &:focus::-moz-range-thumb {
      box-shadow: 0px 0px 0px ${sliderThumbBorderThickness}px ${akColorB100};
    }
    
    &::-moz-range-track {
      width: 100%;
      height: ${sliderLineThickness}px;
      cursor: pointer;
      background: ${akColorN20};
      border-radius: ${sliderLineThickness / 2}px;
      border: 0px;
    }
    
    &:focus::-moz-range-track {
      background: ${akColorB50};
    }
`;

const IERangeInputStyle = `
    &::-ms-thumb {
      box-shadow: 0px 0px 0px ${sliderThumbBorderThickness}px ${akColorN800};
      height: ${sliderThumbSize}px;
      width: ${sliderThumbSize}px;
      border-radius: ${sliderThumbSize / 2}px;
      background: ${akColorN0};
      cursor: pointer;
    }
    &:focus::-ms-thumb {
      box-shadow: 0px 0px 0px ${sliderThumbBorderThickness}px ${akColorB100};
    }
    &::-ms-track {
      width: 100%;
      height: ${sliderLineThickness}px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: ${akColorN20};
      border-radius: ${sliderLineThickness / 2}px;
      border: 0px;
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    }
    &::-ms-fill-upper {
      background: ${akColorN20};
      border-radius: ${sliderLineThickness / 2}px;
      border: 0px;
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    }
    
    &:focus::-ms-fill-lower {
      background: ${akColorB50};
    }
    &:focus::-ms-fill-upper {
      background: ${akColorB50};
    }
`;

export const rangeInputStyle = `
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  height: ${sliderThumbSize + akGridSizeUnitless}px; /* Otherwise thumb will collide with previous box element */
  background: transparent; /* Otherwise white in Chrome */

  &:focus {
    outline: none;
  }
  
  ${chromeRangeInputStyle}
  ${firefoxRangeInputStyle}
  ${IERangeInputStyle}
`;
