/* eslint-disable no-mixed-operators */
import styled, { css } from 'styled-components';
import {
    akColorN0,
    akColorN20,
    akColorN800,
    akColorB50,
    akColorB100,
    akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const sliderThumbSize = 20;
const sliderThumbBorderThickness = 2;
const sliderLineThickness = 6;
export const overallHeight = sliderThumbSize + akGridSizeUnitless;

const sliderThumbStyle = css`
  box-shadow: 0 0 0 ${sliderThumbBorderThickness}px ${akColorN800};
  height: ${sliderThumbSize}px;
  width: ${sliderThumbSize}px;
  border-radius: ${sliderThumbSize / 2}px;
  background: ${akColorN0};
  cursor: pointer;
`;

const sliderThumbFocusedStyle = css`
  box-shadow: 0 0 0 ${sliderThumbBorderThickness}px ${akColorB100};
`;

const sliderTrackStyle = css`
  width: 100%;
  height: ${sliderLineThickness}px;
  cursor: pointer;
  background: ${akColorN20};
  border-radius: ${sliderLineThickness / 2}px;
  border: 0;
`;

const sliderTrackFocusedStyle = css`
  background: ${akColorB50};
`;

const chromeRangeInputStyle = css`
  &::-webkit-slider-thumb {
    ${sliderThumbStyle}
    -webkit-appearance: none;
    margin-top: -${sliderThumbSize / 2 - sliderLineThickness / 2}px;
  }

  &:focus::-webkit-slider-thumb {
    ${sliderThumbFocusedStyle}
  }

  &::-webkit-slider-runnable-track {
    ${sliderTrackStyle}
  }

  &:focus::-webkit-slider-runnable-track {
    ${sliderTrackFocusedStyle}
  }
`;

const firefoxRangeInputStyle = css`
  &::-moz-focus-outer {
    border: 0;
  }

  &::-moz-range-thumb {
    ${sliderThumbStyle}
    border:0;
  }

  &:focus::-moz-range-thumb {
    ${sliderThumbFocusedStyle}
  }

  &::-moz-range-track {
    ${sliderTrackStyle}
  }

  &:focus::-moz-range-track {
    ${sliderTrackFocusedStyle}
  }
`;

const IERangeInputStyle = css`
  &::-ms-thumb {
    ${sliderThumbStyle}
  }
  &:focus::-ms-thumb {
    ${sliderThumbFocusedStyle}
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
    border: 0;
    box-shadow: 0 0 0 #000000, 0 0 0 #0d0d0d;
  }
  &::-ms-fill-upper {
    background: ${akColorN20};
    border-radius: ${sliderLineThickness / 2}px;
    border: 0;
    box-shadow: 0 0 0 #000000, 0 0 0 #0d0d0d;
  }

  &:focus::-ms-fill-lower {
    ${sliderTrackFocusedStyle}
  }
  &:focus::-ms-fill-upper {
    ${sliderTrackFocusedStyle}
  }
`;

export const rangeInputStyle = css`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  height: ${overallHeight}px; /* Otherwise thumb will collide with previous box element */
  background: transparent; /* Otherwise white in Chrome */

  &:focus {
    outline: none;
  }

  ${chromeRangeInputStyle}
  ${firefoxRangeInputStyle}
  ${IERangeInputStyle}
`;

export const Input = styled.input`${rangeInputStyle}`;
