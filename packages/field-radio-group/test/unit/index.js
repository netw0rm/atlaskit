import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import FieldRadioGroup, { AkFieldRadioGroup, AkRadio } from '../../src';
import { name } from '../../package.json';

describe(name, () => {
  describe('FieldRadioGroup', () => {
    const sampleItems = [
      { name: 'test', value: '1', label: 'one' },
      { name: 'test', value: '2', label: 'two' },
      { name: 'test', value: '3', label: <i>three</i>, isDisabled: true },
    ];

    describe('exports', () => {
      it('the FieldRadioGroup component', () => {
        expect(FieldRadioGroup).not.to.equal(undefined);
        expect(new FieldRadioGroup()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<FieldRadioGroup />);
      });

      it('should be able to create a component', () => {
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a FieldRadioGroup component', () => {
        expect(wrapper.find(AkFieldRadioGroup).length).to.equal(1);
      });

      it('should set up the onRadioChange prop for the AkFieldRadioGroup', () => {
        expect(typeof wrapper.find(AkFieldRadioGroup).prop('onRadioChange')).to.equal('function');
      });

      it('should set up the initial state', () => {
        expect(wrapper.state('selectedValue')).to.equal(null);
      });
    });

    describe('props', () => {
      describe('defaultValue prop', () => {
        it('renders an AkRadio with correct props for each item in the array', () => {
          const wrapper = mount(<FieldRadioGroup items={sampleItems} />);
          expect(wrapper.find(AkRadio).length).to.equal(sampleItems.length);

          const radios = wrapper.find(AkRadio);
          for (let i = 0; i < sampleItems.length; i++) {
            const radio = radios.at(i);
            const item = sampleItems[i];
            expect(radio.prop('name')).to.equal(item.name);
            expect(radio.prop('value')).to.equal(item.value);
            expect(radio.prop('children')).to.equal(item.label);
            expect(radio.prop('isDisabled')).to.equal(!!item.isDisabled);
            expect(radio.prop('isSelected')).to.equal(false);
          }
        });
      });

      describe('items prop with defaultValue', () => {
        const sampleItemsWithDefault = sampleItems.map(item => ({ ...item }));
        sampleItemsWithDefault[2].defaultSelected = true;

        it('selects the item by default', () => {
          const wrapper = mount(<FieldRadioGroup items={sampleItemsWithDefault} />);
          expect(wrapper.find(AkRadio).at(2).prop('isSelected')).to.equal(true);
        });

        it('is overridden when an item is selected', () => {
          const wrapper = mount(<FieldRadioGroup items={sampleItemsWithDefault} />);

          const radios = wrapper.find(AkRadio);
          radios.at(0).find('input').simulate('change');

          expect(wrapper.state('selectedValue')).to.equal(sampleItemsWithDefault[0].value);
          expect(radios.at(0).prop('isSelected')).to.equal(true);
          expect(radios.at(1).prop('isSelected')).to.equal(false);
          expect(radios.at(2).prop('isSelected')).to.equal(false);
        });
      });

      describe('behaviour', () => {
        it('updates the value state when a radio is changed', () => {
          const wrapper = mount(<FieldRadioGroup items={sampleItems} />);
          expect(wrapper.state('selectedValue')).to.equal(null);
          wrapper.find(AkRadio).first().find('input').simulate('change');
          expect(wrapper.state('selectedValue')).to.equal(sampleItems[0].value);
        });
      });
    });
  });
});
