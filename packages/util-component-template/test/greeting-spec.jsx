import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ManagedGreeting, { Greeting } from '../src';

import { name } from '../package.json';

describe(name, () => {
  describe('unmanaged', () => {
    it('should display a prompt', () => {
      const wrapper = mount(<Greeting name="Alex" />);

      expect(wrapper.text()).to.equal('Say greeting');
    });

    it('should speak when clicked on', () => {
      const stub = sinon.stub();
      const wrapper = mount(
        <Greeting
          name="Alex"
          onSpeak={stub}
        />
      );

      wrapper.simulate('click');

      expect(stub.calledWithExactly('Hello Alex!')).to.equal(true);
    });

    it('should speak with a default name when none is provided', () => {
      const stub = sinon.stub();
      const wrapper = mount(
        <Greeting
          name="Alex"
          onSpeak={stub}
        />
      );

      wrapper.find('button').simulate('click');

      expect(stub.calledWithExactly('[ Name not provided ]')).to.equal(true);
    });
  });

  describe('managed', () => {
    it('should fire an alert when the greeting speaks', () => {
      sinon.stub(window, 'alert');

      const wrapper = mount(
        <ManagedGreeting name="Alex" />
      );

      wrapper.find('button').simulate('click');

      expect(window.alert.calledWithExactly('Hello Alex!')).to.equal(true);

      window.alert.restore();
    });
  });
});
