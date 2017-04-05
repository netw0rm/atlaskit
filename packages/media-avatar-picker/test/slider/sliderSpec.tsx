import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {Slider} from '../../src/slider/slider';

describe('Slider', () => {
    describe('with default props', () => {
        let slider;
        let input;

        beforeEach(() => {
            slider = mount(<Slider />);
            input = slider.find('input');
        });

        it('should have input with type "range"', () => {
            expect(input.props().type).to.equal('range');
        });

        it('should have min and max set to default values', () => {
            expect(input.props().min).to.equal(0);
            expect(input.props().max).to.equal(100);
        });
    });
});

