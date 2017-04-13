import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { expect } from 'chai';
import {Slider, SliderProps} from '../../src/slider/index';

describe('Slider', () => {
    describe('with default props', () => {
        let slider;
        let input;

        beforeEach(() => {
            slider = mount<SliderProps, {}>(<Slider value={20.12} />);
            input = slider.find('input');
        });

        it('should have input with type "range"', () => {
            expect(input.props().type).to.equal('range');
        });

        it('should have min, max and step set to default values', () => {
            expect(input.props().min).to.equal(0);
            expect(input.props().max).to.equal(100);
            expect(input.props().step).to.equal(0.1);
        });

        it('should input with defined value', () => {
            expect(input.props().value).to.equal('20.12');
        });
    });

    describe('with defined props', () => {
      let slider;
      let input;
      let onChangeSpy;

      beforeEach(() => {
          onChangeSpy = sinon.spy();
          slider = mount<SliderProps, {}>(<Slider value={25} min={10} max={20} onChange={onChangeSpy}/>);
          input = slider.find('input');
      });

      it('should have defined min and max values', () => {
          expect(input.props().min).to.equal(10);
          expect(input.props().max).to.equal(20);
      });

      it('should call spy when value is changed', () => {
        input.simulate('change', {target: {value: '15'}});
        expect(onChangeSpy.calledOnce).to.equal(true);
        expect(onChangeSpy.calledWithExactly(15)).to.equal(true);
      });

      it('should change input value when value is changed', () => {
        input.simulate('change', {target: {value: '15'}});
        expect(input.props().value).to.equal('15');
      });

      it('should change input value when prop is changed', () => {
        slider.setProps({value: 15});
        expect(input.props().value).to.equal('15');
      });

    });
});

