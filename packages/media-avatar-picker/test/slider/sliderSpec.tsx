import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { expect } from 'chai';
import {Slider, SliderProps} from '../../src/slider/slider';

describe('Slider', () => {
    describe('with default props', () => {
        let slider;
        let input;

        beforeEach(() => {
            slider = mount<SliderProps, {}>(<Slider />);
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

    describe('with defined props', () => {
      let slider;
      let input;
      let onChangeSpy;

      beforeEach(() => {
          onChangeSpy = sinon.spy();
          slider = mount<SliderProps, {}>(<Slider min={10} max={20} onChange={onChangeSpy}/>);
          input = slider.find('input');
      });

      it('should have defined min and max values', () => {
          expect(input.props().min).to.equal(10);
          expect(input.props().max).to.equal(20);
      });

      it('should call spy when value is changed', () => {
          input.simulate('input', {target: {value: '15'}});
          expect(onChangeSpy.calledOnce).to.equal(true);
          expect(onChangeSpy.calledWithExactly(15)).to.equal(true);
      });
    });
});

