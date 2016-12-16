import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import RadioGroup, { AkRadioGroup, AkRadio } from '../src';
import { name } from '../package.json';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiEnzyme());

describe(name, () => {
  describe('RadioGroup', () => {
    const sampleItems = [
      { name: 'test', value: '1', label: 'one' },
      { name: 'test', value: '2', label: 'two' },
      { name: 'test', value: '3', label: <i>three</i>, disabled: true },
    ];

    describe('exports', () => {
      it('the RadioGroup component', () => {
        expect(RadioGroup).to.exist;
        expect(new RadioGroup()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<RadioGroup />);
      });

      it('should be able to create a component', () => {
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a RadioGroup component', () => {
        expect(wrapper).to.have.exactly(1).descendants(AkRadioGroup);
      });

      it('should set up the onRadioChange prop for the AkRadioGroup', () => {
        expect(wrapper.find(AkRadioGroup)).prop('onRadioChange').to.be.a.function;
      });

      it('should set up the initial state', () => {
        expect(wrapper.state('value')).to.not.exist;
      });
    });

    describe('props', () => {
      describe('defaultValue prop', () => {
        it('renders an AkRadio with correct props for each item in the array', () => {
          const wrapper = mount(<RadioGroup items={sampleItems} />);
          expect(wrapper).to.have.exactly(sampleItems.length).descendants(AkRadio);

          const radios = wrapper.find(AkRadio);
          for (let i = 0; i < sampleItems.length; i++) {
            const radio = radios.at(i);
            const item = sampleItems[i];
            expect(radio.prop('name')).to.equal(item.name);
            expect(radio.prop('value')).to.equal(item.value);
            expect(radio.prop('children')).to.equal(item.label);
            expect(radio.prop('disabled')).to.equal(!!item.disabled);
            expect(radio.prop('selected')).to.equal(false);
          }
        });
      });

      describe('props', () => {
        describe('defaultValue prop', () => {
          it('sets the initial value state', () => {
            const wrapper = mount(
              <RadioGroup items={sampleItems} defaultValue={sampleItems[0].value} />
            );
            expect(wrapper.state('value')).to.equal(sampleItems[0].value);
            expect(wrapper.find(AkRadio).first()).prop('selected').to.equal(true);
          });
        });
      });

      describe('behaviour', () => {
        it('updates the value state when a radio is changed', () => {
          const wrapper = mount(<RadioGroup items={sampleItems} />);
          expect(wrapper.state('value')).to.not.exist;
          wrapper.find(AkRadio).first().find('input').simulate('change');
          expect(wrapper.state('value')).to.equal(sampleItems[0].value);
        });
      });
    });
  });
});
