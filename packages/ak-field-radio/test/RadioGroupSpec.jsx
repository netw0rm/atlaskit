import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import Radio from '../src/Radio';
import AkRadioGroup from '../src/RadioGroup';
import { name } from '../package.json';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiEnzyme());

describe(name, () => {
  describe('AkRadioGroup', () => {
    const sampleItems = [
      { name: 'test', value: '1', label: 'one' },
      { name: 'test', value: '2', label: 'two', selected: true },
      { name: 'test', value: '3', label: <i>three</i>, disabled: true },
    ];

    describe('exports', () => {
      it('the AkRadioGroup component', () => {
        expect(AkRadioGroup).to.exist;
        expect(new AkRadioGroup()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<AkRadioGroup />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a Radio for each item', () => {
        const wrapper = mount(<AkRadioGroup items={sampleItems} />);
        expect(wrapper).to.have.exactly(3).descendants(Radio);
      });
    });

    describe('props', () => {
      describe('items prop', () => {
        it('renders a Radio with correct props for each item in the array', () => {
          const wrapper = shallow(<AkRadioGroup items={sampleItems} />);
          expect(wrapper).to.have.exactly(sampleItems.length).descendants(Radio);

          const radios = wrapper.find(Radio);
          for (let i = 0; i < sampleItems.length; i++) {
            const radio = radios.at(i);
            const item = sampleItems[i];
            expect(radio.prop('name')).to.equal(item.name);
            expect(radio.prop('value')).to.equal(item.value);
            expect(radio.prop('children')).to.equal(item.label);
            expect(radio.prop('disabled')).to.equal(!!item.disabled);
            expect(radio.prop('selected')).to.equal(!!item.selected);
          }
        });
      });

      describe('label prop', () => {
        it('renders label containing string', () => {
          const label = 'string label content';
          const wrapper = shallow(<AkRadioGroup label={label} />);
          expect(wrapper.contains(label)).to.equal(true);
        });
        it('renders label with node', () => {
          const label = (<p>label content</p>);
          const wrapper = shallow(<AkRadioGroup label={label} />);
          expect(wrapper.contains(label)).to.equal(true);
        });
      });

      describe('onRadioChange prop', () => {
        it('is called when a radio item is changed', () => {
          const spy = sinon.spy();
          const wrapper = mount(<AkRadioGroup onRadioChange={spy} items={sampleItems} />);
          wrapper.find(Radio).first().find('input').simulate('change');
          expect(spy).to.have.been.calledOnce;
        });
      });
    });

    describe('selection', () => {
      function expectRadioSelected(wrapper, index) {
        const radios = wrapper.find(Radio);
        for (let i = 0; i < radios.length; i++) {
          expect(radios.at(i).prop('selected')).to.equal(index === i);
        }
      }

      function expectNoRadioSelected(wrapper) {
        return expectRadioSelected(wrapper, -1);
      }

      it('selects the radio with selected key', () => {
        const items = [
          { name: 'n', value: '0' },
          { name: 'n', value: '1' },
          { name: 'n', value: '2', selected: true },
        ];
        const wrapper = shallow(<AkRadioGroup items={items} />);
        expectRadioSelected(wrapper, 2);
      });
      it('does not select an item if not specified', () => {
        const items = [
          { name: 'n', value: '0' },
          { name: 'n', value: '1' },
          { name: 'n', value: '2' },
        ];
        const wrapper = shallow(<AkRadioGroup items={items} />);
        expectNoRadioSelected(wrapper);
      });
      it('can select a radio which is disabled', () => {
        const items = [
          { name: 'n', value: '0' },
          { name: 'n', value: '1' },
          { name: 'n', value: '2', selected: true, disabled: true },
        ];
        const wrapper = shallow(<AkRadioGroup items={items} />);
        expectRadioSelected(wrapper, 2);
      });
    });
  });
});
