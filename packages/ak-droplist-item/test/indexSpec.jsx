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
    expect(shallow(<Item />)).to.be.defined;
  });

  it('should be "menu" item by default', () => {
    expect(shallow(<Item />).instance().props.type).to.equal('menu');
  });

  describe('all about rendering', () => {
    it('should render content that is passed to the item', () => {
      expect(mount(<Item>sample</Item>)).to.have.text('sample');
    });

    it('should render elemBefore for the menu item', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(mount(<Item elemBefore={Icon}>sample</Item>)).to.contain(Icon);
    });

    it('should NOT render elemBefore for anything other than the menu item', () => {
      const Icon = <div id="icon">icon</div>;
      expect(mount(<Item type="checkbox" elemBefore={Icon}>sample</Item>)).to.not.contain(Icon);
      expect(mount(<Item type="radio" elemBefore={Icon}>sample</Item>)).to.not.contain(Icon);
    });

    it('should render icon for the radio or checkbox element', () => {
      expect(mount(<Item type="radio" />)).to.have.descendants(`.${styles.locals.checkradio}`);
      expect(mount(<Item type="checkbox" />)).to.have.descendants(`.${styles.locals.checkradio}`);
    });

    it('should NOT render icon for the menu element', () => {
      expect(mount(<Item type="menu" />)).to.not.have.descendants(`.${styles.locals.checkradio}`);
    });
  });

  describe('all about classes', () => {
    it('should have "item" class by default', () => {
      expect(mount(<Item type="menu" />)).to.have.className(styles.locals.item);
      expect(mount(<Item type="checkbox" />)).to.have.className(styles.locals.item);
      expect(mount(<Item type="radio" />)).to.have.className(styles.locals.item);
    });

    it('should have "disabled" class when disabled', () => {
      expect(mount(<Item type="menu" isDisabled />)).to.have.className(styles.locals.disabled);
      expect(mount(<Item type="radio" isDisabled />)).to.have.className(styles.locals.disabled);
      expect(mount(<Item type="checkbox" isDisabled />)).to.have.className(styles.locals.disabled);
    });

    it('should have "active" class when menu item is active', () => {
      expect(mount(<Item type="menu" isActive />)).to.have.className(styles.locals.active);
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
      expect(mount(<Item type="menu" isChecked />)).to.not.have.className(styles.locals.checked);
    });

    it('should have "hidden" class when item is hidden', () => {
      expect(mount(<Item type="menu" isHidden />)).to.have.className(styles.locals.hidden);
      expect(mount(<Item type="checkbox" isHidden />)).to.have.className(styles.locals.hidden);
      expect(mount(<Item type="radio" isHidden />)).to.have.className(styles.locals.hidden);
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

    it('should call onFocusPrev when the up key is pressed', () => {
      const wrapper = mount(<Item onFocusPrev={onActivate} />);
      wrapper.simulate('keyDown', { keyCode: keyCode('up') });
      expect(onActivate.calledOnce).to.be.true;
    });

    it('should call onFocusNext when the down key is pressed', () => {
      const wrapper = mount(<Item onFocusNext={onActivate} />);
      wrapper.simulate('keyDown', { keyCode: keyCode('down') });
      expect(onActivate.calledOnce).to.be.true;
    });

    it('should call onEscapeFrom when the tab key is pressed', () => {
      const wrapper = mount(<Item onEscapeFrom={onActivate} />);
      wrapper.simulate('keyDown', { keyCode: keyCode('tab') });
      expect(onActivate.calledOnce).to.be.true;
    });
  });
});
