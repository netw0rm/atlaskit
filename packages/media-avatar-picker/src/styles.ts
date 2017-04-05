/* tslint:disable:variable-name */

// import {
//   akColorN500,
//   akGridSize
// } from '@atlaskit/util-shared-styles';


const chromeRangeInputStyle = `
    &::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px 2.6px #172b4d;
      /* border: 3px solid #172b4d; */
      height: 24px;
      width: 24px;
      border-radius: 16px;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -8px;
    }
    
    &:focus::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px 2.6px #4C9AFF; /* B100 */
    }
    
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      background: rgba(244, 245, 247, 0.78);
      border-radius: 4px;
      border: 0px solid #010101;
    }
    
    &:focus::-webkit-slider-runnable-track {
      background: #DEEBFF; /* B50 */
    }
`;

const firefoxRangeInputStyle = `
    &::-moz-focus-outer {
        border: 0;
    }
    
    &::-moz-range-thumb {
      box-shadow: 0px 0px 0px 2.6px #172b4d;
      border:0;
      height: 24px;
      width: 24px;
      border-radius: 16px;
      background: #ffffff;
      cursor: pointer;
    }
    
    &:focus::-moz-range-thumb {
      box-shadow: 0px 0px 0px 2.6px #4C9AFF; /* B100 */
    }
    
    &::-moz-range-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      background: rgba(244, 245, 247, 0.78);
      border-radius: 4px;
      border: 0px solid #010101;
    }
    
    &:focus::-moz-range-track {
      background: #DEEBFF; /* B50 */
    }
`;

const IERangeInputStyle = `
    &::-ms-thumb {
      box-shadow: 0px 0px 0px 2.6px #172b4d;
      height: 24px;
      width: 24px;
      border-radius: 16px;
      background: #ffffff;
      cursor: pointer;
    }
    
    &::-ms-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: rgba(238, 240, 243, 0.78);
      border: 0px solid #010101;
      border-radius: 8px;
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    }
    &::-ms-fill-upper {
      background: rgba(244, 245, 247, 0.78);
      border: 0px solid #010101;
      border-radius: 8px;
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    }
    
    &:focus::-ms-thumb {
      box-shadow: 0px 0px 0px 2.6px #4C9AFF; /* B100 */
    }
    &:focus::-ms-fill-lower {
      background: #DEEBFF; /* B50 */
    }
    &:focus::-ms-fill-upper {
      background: #DEEBFF; /* B50 */
    }
`;

export const rangeInputStyle = `
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  height: 30px;
  background: transparent; /* Otherwise white in Chrome */

  &:focus {
    outline: none;
  }
  
  ${chromeRangeInputStyle}
  ${firefoxRangeInputStyle}
  ${IERangeInputStyle}
`;
