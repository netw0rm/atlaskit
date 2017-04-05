/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import {rangeInputStyle} from '../styles';

const Input = styled.input`${rangeInputStyle}`;

export interface SliderProps {
    min?: number;
    max?: number;
}

export class Slider extends Component<SliderProps, {}> {
    static defaultProps = {
        min: 0,
        max: 100
    };

    render(){
        const {
            min,
            max
        } = this.props;

        return <Input type="range" min={min} max={max} />;
    }
}
