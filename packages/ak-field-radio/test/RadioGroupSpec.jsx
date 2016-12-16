import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import Radio from '../src/Radio';
import RadioGroup from '../src/RadioGroup';
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
      it('should be able to create a component', () => {
        const wrapper = shallow(<RadioGroup />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a Radio for each item', () => {
        const wrapper = mount(<RadioGroup items={sampleItems} />);
        expect(wrapper).to.have.exactly(3).descendants(Radio);
      });
    });

    describe('props', () => {
      describe('items prop', () => {
        it('renders a Radio with correct props for each item in the array', () => {
          const wrapper = shallow(<RadioGroup items={sampleItems} />);
          expect(wrapper).to.have.exactly(sampleItems.length).descendants(Radio);

          const radios = wrapper.find(Radio);
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

      describe('label prop', () => {
        it('renders label containing string', () => {
          const label = 'string label content';
          const wrapper = shallow(<RadioGroup label={label} />);
          expect(wrapper.contains(label)).to.equal(true);
        });
        it('renders label with node', () => {
          const label = (<p>label content</p>);
          const wrapper = shallow(<RadioGroup label={label} />);
          expect(wrapper.contains(label)).to.equal(true);
        });
      });

      describe('onRadioChange prop', () => {
        it('is called when a radio item is changed', () => {
          const spy = sinon.spy();
          const wrapper = shallow(<RadioGroup onRadioChange={spy} items={sampleItems} />);
          wrapper.find(Radio).first().simulate('change');
          expect(spy).to.have.been.calledOnce;
        });
      });
      describe('value prop', () => {
        function expectRadioSelected(wrapper, index) {
          for (let i = 0; i < sampleItems.length; i++) {
            expect(wrapper.find(Radio).at(i).prop('selected')).to.equal(index === i);
          }
        }
        function expectNoRadioSelected(wrapper) {
          return expectRadioSelected(wrapper, -1);
        }

        it('selects the radio with matching value', () => {
          const wrapper = shallow(<RadioGroup value={sampleItems[0].value} items={sampleItems} />);
          expectRadioSelected(wrapper, 0);
        });
        it('does not select an item if not specified', () => {
          const wrapper = shallow(<RadioGroup items={sampleItems} />);
          expectNoRadioSelected(wrapper);
        });
        it('does not select an item if value does not match a radio item', () => {
          const wrapper = shallow(<RadioGroup value="non-existent value" items={sampleItems} />);
          expectNoRadioSelected(wrapper);
        });
        it('can select a radio which is disabled', () => {
          const wrapper = shallow(<RadioGroup value={sampleItems[2].value} items={sampleItems} />);
          expectRadioSelected(wrapper, 2);
        });
      });
    });
  });
});
