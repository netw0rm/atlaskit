/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {Input} from './styled';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export interface SliderState {
  value: number;
}

const defaultStep = 0.1;

export class Slider extends Component<SliderProps, SliderState> {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: defaultStep,
    onChange: () => {
    },
  };

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onInputChange = (e) => {
    const value = parseFloat(e.target.value);
    const {onChange} = this.props;

    this.setState({value});

    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const {
      min,
      max,
      step,
    } = this.props;
    const {
      value
    } = this.state;

    return <Input
      type="range"
      value={value.toString()}
      min={min}
      max={max}
      step={step}
      onChange={this.onInputChange}
    />;
  }
}
