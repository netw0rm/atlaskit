/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {rangeInputStyle} from './styles';

const Input = styled.input`${rangeInputStyle}`;

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export class Slider extends Component<SliderProps, {}> {
  static defaultProps = {
    min: 0,
    max: 100,
    onChange: () => {
    },
  };

  onInputChange = (e) => {
    const value = parseFloat(e.target.value);
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const {
      min,
      max,
      value
    } = this.props;

    return <Input
      type="range"
      defaultValue={value.toString()}
      min={min}
      max={max}
      onChange={this.onInputChange}
      onInput={this.onInputChange}
    />;
  }
}
