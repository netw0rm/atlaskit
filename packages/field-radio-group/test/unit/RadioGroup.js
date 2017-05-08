import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Base from 'ak-field-base';
import sinon from 'sinon';

import Radio from '../../src/Radio';
import AkFieldRadioGroup from '../../src/RadioGroup';
import { name } from '../../package.json';

describe(name, () => {
  describe('AkFieldRadioGroup (stateless)', () => {
    const sampleItems = [
      { name: 'test', value: '1', label: 'one' },
      { name: 'test', value: '2', label: 'two', isSelected: true },
      { name: 'test', value: '3', label: <i>three</i>, isDisabled: true },
    ];

    describe('exports', () => {
      it('the AkFieldRadioGroup component', () => {
        expect(AkFieldRadioGroup).not.to.equal(undefined);
        expect(new AkFieldRadioGroup()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<AkFieldRadioGroup />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a FieldBase containing a Radio for each item', () => {
        const wrapper = mount(<AkFieldRadioGroup items={sampleItems} />);
        expect(wrapper.find(Base).length).to.equal(1);
        expect(wrapper.find(Base).find(Radio).length).to.equal(3);
      });
    });

    describe('props', () => {
      describe('items prop', () => {
        it('renders a Radio with correct props for each item in the array', () => {
          const wrapper = shallow(<AkFieldRadioGroup items={sampleItems} />);
          expect(wrapper.find(Radio).length).to.equal(sampleItems.length);

          const radios = wrapper.find(Radio);
          for (let i = 0; i < sampleItems.length; i++) {
            const radio = radios.at(i);
            const item = sampleItems[i];
            expect(radio.prop('name')).to.equal(item.name);
            expect(radio.prop('value')).to.equal(item.value);
            expect(radio.prop('children')).to.equal(item.label);
            expect(radio.prop('isDisabled')).to.equal(!!item.isDisabled);
            expect(radio.prop('isSelected')).to.equal(!!item.isSelected);
          }
        });
      });

      describe('label prop', () => {
        it('is reflected to the FieldBase', () => {
          const label = 'string label content';
          const wrapper = shallow(<AkFieldRadioGroup label={label} />);
          expect(wrapper.find(Base).prop('label')).to.equal(label);
        });
      });

      describe('isRequired prop', () => {
        it('is reflected to the FieldBase', () => {
          const isRequired = true;
          const wrapper = shallow(<AkFieldRadioGroup isRequired={isRequired} />);
          expect(wrapper.find(Base).prop('isRequired')).to.equal(isRequired);
        });

        it('is reflected to each Radio item', () => {
          const isRequired = true;
          const wrapper = shallow(<AkFieldRadioGroup isRequired={isRequired} />);
          wrapper.find(Radio).forEach(radio =>
            expect(radio.prop('isRequired', isRequired)).to.not.equal(undefined)
          );
        });
      });

      describe('onRadioChange prop', () => {
        it('is called when a radio item is changed', () => {
          const spy = sinon.spy();
          const wrapper = mount(<AkFieldRadioGroup onRadioChange={spy} items={sampleItems} />);
          wrapper.find(Radio).first().find('input').simulate('change');
          expect(spy.callCount).to.equal(1);
        });
      });
    });

    describe('selection', () => {
      function expectRadioSelected(wrapper, index) {
        const radios = wrapper.find(Radio);
        for (let i = 0; i < radios.length; i++) {
          expect(radios.at(i).prop('isSelected')).to.equal(index === i);
        }
      }

      function expectNoRadioSelected(wrapper) {
        return expectRadioSelected(wrapper, -1);
      }

      it('selects the radio with isSelected key', () => {
        const items = [
          { name: 'n', value: '0' },
          { name: 'n', value: '1' },
          { name: 'n', value: '2', isSelected: true },
        ];
        const wrapper = shallow(<AkFieldRadioGroup items={items} />);
        expectRadioSelected(wrapper, 2);
      });
      it('does not select an item if not specified', () => {
        const items = [
          { name: 'n', value: '0' },
          { name: 'n', value: '1' },
          { name: 'n', value: '2' },
        ];
        const wrapper = shallow(<AkFieldRadioGroup items={items} />);
        expectNoRadioSelected(wrapper);
      });
      it('can select a radio which is disabled', () => {
        const items = [
          { name: 'n', value: '0' },
          { name: 'n', value: '1' },
          { name: 'n', value: '2', isSelected: true, isDisabled: true },
        ];
        const wrapper = shallow(<AkFieldRadioGroup items={items} />);
        expectRadioSelected(wrapper, 2);
      });
    });
  });
});
