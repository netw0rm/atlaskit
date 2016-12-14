import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import Radio from '../src/Radio';
import { name } from '../package.json';


const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Radio', () => {
    describe('exports', () => {
      it('the Radio component', () => {
        expect(Radio).to.exist;
        expect(new Radio()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Radio />);
        expect(wrapper).to.be.defined;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render an input and the content', () => {
        const content = 'content';
        const wrapper = mount(<Radio>{content}</Radio>);
        expect(wrapper).to.have.exactly(1).descendants('input');
        expect(wrapper).to.have.text(content);
      });

      it('should render content with markup correctly', () => {
        const content = (<div>content</div>);
        const wrapper = mount(<Radio>{content}</Radio>);
        expect(wrapper).to.have.exactly(1).descendants('input');
        expect(wrapper).to.contain(content);
      });
    });

    describe('props', () => {
      describe('name prop', () => {
        it('should be reflected to the input', () => {
          const val = 'name';
          const wrapper = mount(<Radio name={val} />);
          expect(wrapper.find('input')).to.have.prop('name', val);
        });
      });
      describe('value prop', () => {
        it('should be reflected to the input', () => {
          const val = 'value';
          const wrapper = mount(<Radio value={val} />);
          expect(wrapper.find('input')).to.have.prop('value', val);
        });
      });
    });
  });
});
