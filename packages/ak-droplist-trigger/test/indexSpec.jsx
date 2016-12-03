import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import keyCode from 'keycode';

import { name } from '../package.json';
import styles from '../src/styles.less';

import Trigger from '../src';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;


describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Trigger />)).to.be.defined;
  });

  it('should have type "default" by default', () => {
    expect(shallow(<Trigger>trigger</Trigger>).instance().props.type).to.equal('default');
  });

  describe('all about render', () => {
    it('should render default trigger', () => {
      const TriggerSample = <div id="#test">test</div>;
      const wrapper = shallow(<Trigger>{TriggerSample}</Trigger>);
      expect(wrapper).to.have.descendants(`.${styles.locals.triggerContainer}`);
      expect(wrapper).to.have.descendants(`.${styles.locals.trigger}`);
      expect(wrapper).to.contain(TriggerSample);
    });

    it('should render button when type is set to "button"', () => {
      const TriggerSample = <div id="#test">test</div>;
      const wrapper = mount(<Trigger type="button" isOpened>{TriggerSample}</Trigger>);
      expect(wrapper).to.have.descendants(`.${styles.locals.triggerContainer}`);
      expect(wrapper).to.not.have.descendants(`.${styles.locals.trigger}`);
      expect(wrapper).to.contain(TriggerSample);
    });
  });

  describe('all about props', () => {
    it('if the trigger is disabled, the button also should be disabled', () => {
      const wrapper = mount(<Trigger type="button" isDisabled>trigger</Trigger>);
      expect(wrapper.find('button').props().disabled).to.be.true;
    });
  });

  describe('all about events', () => {
    let onActivate;

    beforeEach(() => {
      onActivate = sinon.spy();
    });
    afterEach(() => {
      onActivate.reset();
    });

    ['default', 'button'].forEach((type) => {
      describe(`onActivate, type: ${type}`, () => {
        let wrapper;
        beforeEach(() => {
          onActivate = sinon.spy();
          wrapper = mount(<Trigger onActivate={onActivate} type={type} />);
        });

        it('should be activated when enter is pressed', () => {
          wrapper.simulate('keyDown', { keyCode: keyCode('enter') });
          expect(onActivate.calledOnce).to.be.true;
        });

        it('should be activated when space is pressed', () => {
          wrapper.simulate('keyDown', { keyCode: keyCode('space') });
          expect(onActivate.calledOnce).to.be.true;
        });

        it('should be activated when down is pressed', () => {
          wrapper.simulate('keyDown', { keyCode: keyCode('down') });
          expect(onActivate.calledOnce).to.be.true;
        });

        it('should be activated when clicked', () => {
          wrapper.simulate('click');
          expect(onActivate.calledOnce).to.be.true;
        });
      });
    });
  });
});
