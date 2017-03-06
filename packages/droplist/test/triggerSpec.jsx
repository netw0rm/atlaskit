import React from 'react';
import { shallow, mount } from 'enzyme';
import keyCode from 'keycode';

import { name } from '../package.json';
import styles from '../src/styles.less';

import { Trigger } from '../src';

describe(`${name} - trigger`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Trigger />)).not.to.equal(undefined);
  });

  describe('render', () => {
    it('should render trigger', () => {
      const TriggerSample = <div id="#test">test</div>;
      const wrapper = shallow(<Trigger>{TriggerSample}</Trigger>);
      expect(wrapper.find(`.${styles.locals.triggerContainer}`).length).to.be.above(0);
      expect(wrapper.find(`.${styles.locals.trigger}`).length).to.be.above(0);
      expect(wrapper.contains(TriggerSample)).to.equal(true);
    });

    it('should render tabIndex attribute when tabbable', () => {
      const wrapper = mount(<Trigger isTabbable />);
      expect(wrapper.find(`.${styles.locals.trigger}`).is('[tabIndex=0]')).to.equal(true);
    });

    it('should not render tabIndex when disabled or not tabbable', () => {
      let wrapper = mount(<Trigger />);
      expect(wrapper.find('[tabindex]').length).to.equal(0);
      wrapper = mount(<Trigger isDisabled />);
      expect(wrapper.find('[tabindex]').length).to.equal(0);
    });
  });

  describe('props', () => {
    it('should focus trigger when isFocused prop is set to true', () => {
      const wrapper = mount(<Trigger isFocused isTabbable>trigger</Trigger>);
      expect(document.activeElement).to.equal(wrapper.children().first().node);
    });
  });

  describe('events', () => {
    let onActivate;

    beforeEach(() => {
      onActivate = sinon.spy();
    });
    afterEach(() => {
      onActivate.reset();
    });

    describe('onActivate', () => {
      let wrapper;
      beforeEach(() => {
        onActivate = sinon.spy();
        wrapper = mount(<Trigger onActivate={onActivate} />);
      });

      it('should be activated when enter is pressed', () => {
        wrapper.simulate('keyDown', { keyCode: keyCode('enter') });
        expect(onActivate.calledOnce).to.equal(true);
      });

      it('should be activated when space is pressed', () => {
        wrapper.simulate('keyDown', { keyCode: keyCode('space') });
        expect(onActivate.calledOnce).to.equal(true);
      });

      it('should be activated when down is pressed', () => {
        wrapper.simulate('keyDown', { keyCode: keyCode('down') });
        expect(onActivate.calledOnce).to.equal(true);
      });

      it('should be activated when clicked', () => {
        wrapper.simulate('click');
        expect(onActivate.calledOnce).to.equal(true);
      });
    });
  });
});
