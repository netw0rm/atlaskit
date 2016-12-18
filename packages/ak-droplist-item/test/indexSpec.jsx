import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import keyCode from 'keycode';

import { name } from '../package.json';
import styles from '../src/styles.less';

import Item from '../src';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Item />)).to.exist;
  });

  it('should be "link" item by default', () => {
    expect(shallow(<Item />).instance().props.type).to.equal('link');
  });

  describe('rendering', () => {
    it('should render content that is passed to the item', () => {
      expect(mount(<Item>sample</Item>)).to.have.text('sample');
    });

    it('should render elemBefore for the link item', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(mount(<Item elemBefore={Icon}>sample</Item>)).to.contain(Icon);
    });

    it('should NOT render elemBefore for anything other than the link item', () => {
      const Icon = <div id="icon">icon</div>;
      expect(mount(<Item type="checkbox" elemBefore={Icon}>sample</Item>)).to.not.contain(Icon);
      expect(mount(<Item type="radio" elemBefore={Icon}>sample</Item>)).to.not.contain(Icon);
    });

    it('should render icon for the radio or checkbox element', () => {
      expect(mount(<Item type="radio" />)).to.have.descendants(`.${styles.locals.checkradio}`);
      expect(mount(<Item type="checkbox" />)).to.have.descendants(`.${styles.locals.checkradio}`);
    });

    it('should NOT render icon for the link element', () => {
      expect(mount(<Item type="link" />)).to.not.have.descendants(`.${styles.locals.checkradio}`);
    });
  });

  describe('classes', () => {
    it('should have "item" class by default', () => {
      expect(mount(<Item type="link" />)).to.have.className(styles.locals.item);
      expect(mount(<Item type="checkbox" />)).to.have.className(styles.locals.item);
      expect(mount(<Item type="radio" />)).to.have.className(styles.locals.item);
    });

    it('should have "disabled" class when disabled', () => {
      expect(mount(<Item type="link" isDisabled />)).to.have.className(styles.locals.disabled);
      expect(mount(<Item type="radio" isDisabled />)).to.have.className(styles.locals.disabled);
      expect(mount(<Item type="checkbox" isDisabled />)).to.have.className(styles.locals.disabled);
    });

    it('should have "active" class when link item is active', () => {
      expect(mount(<Item type="link" isActive />)).to.have.className(styles.locals.active);
    });

    it('should NOT have "active" class for any other item types', () => {
      expect(mount(<Item type="radio" isActive />)).to.not.have.className(styles.locals.active);
      expect(mount(<Item type="checkbox" isActive />)).to.not.have.className(styles.locals.active);
    });

    it('should have "checked" class when checkbox or radio is checked', () => {
      expect(mount(<Item type="checkbox" isChecked />)).to.have.className(styles.locals.checked);
      expect(mount(<Item type="radio" isChecked />)).to.have.className(styles.locals.checked);
    });

    it('should NOT have "checked" class for any other items', () => {
      expect(mount(<Item type="link" isChecked />)).to.not.have.className(styles.locals.checked);
    });

    it('should have "hidden" class when item is hidden', () => {
      expect(mount(<Item type="link" isHidden />)).to.have.className(styles.locals.hidden);
      expect(mount(<Item type="checkbox" isHidden />)).to.have.className(styles.locals.hidden);
      expect(mount(<Item type="radio" isHidden />)).to.have.className(styles.locals.hidden);
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
        wrapper = mount(<Item onActivate={onActivate} />);
      });

      it('should be activated when enter is pressed', () => {
        wrapper.simulate('keyDown', { keyCode: keyCode('enter') });
        expect(onActivate.calledOnce).to.be.true;
      });

      it('should be activated when space is pressed', () => {
        wrapper.simulate('keyDown', { keyCode: keyCode('space') });
        expect(onActivate.calledOnce).to.be.true;
      });

      it('should be activated when clicked', () => {
        wrapper.simulate('click');
        expect(onActivate.calledOnce).to.be.true;
      });
    });

    it('should call onKeyDown when a key other than space and enter is pressed', () => {
      const wrapper = mount(<Item onKeyDown={onActivate} />);
      wrapper.simulate('keyDown', { keyCode: keyCode('up') });
      wrapper.simulate('keyDown', { keyCode: keyCode('down') });
      wrapper.simulate('keyDown', { keyCode: keyCode('tab') });
      expect(onActivate.calledThrice).to.be.true;
    });

    it('should not call onKeyDown when space and enter is pressed', () => {
      const wrapper = mount(<Item onKeyDown={onActivate} />);
      wrapper.simulate('keyDown', { keyCode: keyCode('space') });
      wrapper.simulate('keyDown', { keyCode: keyCode('enter') });
      expect(onActivate.called).to.be.false;
    });
  });

  it('should focus itself when the isFocused property is set to true', () => {
    const wrapper = mount(<Item isFocused />);
    expect(wrapper.find(`.${styles.locals.item}`).node).to.equal(document.activeElement);
  });
});
