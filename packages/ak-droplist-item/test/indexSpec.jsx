import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import keyCode from 'keycode';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Item, { SecondaryText } from '../src';

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

    it('should render elemBefore for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(mount(<Item elemBefore={Icon}>sample</Item>)).to.contain(Icon);
      expect(mount(<Item elemBefore={Icon} type="checkbox">sample</Item>)).to.contain(Icon);
      expect(mount(<Item elemBefore={Icon} type="radio">sample</Item>)).to.contain(Icon);
    });

    it('should render elemAfter for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(mount(<Item elemAfter={Icon}>sample</Item>)).to.contain(Icon);
      expect(mount(<Item elemAfter={Icon} type="checkbox">sample</Item>)).to.contain(Icon);
      expect(mount(<Item elemAfter={Icon} type="radio">sample</Item>)).to.contain(Icon);
    });

    it('should render icon for the radio or checkbox element', () => {
      expect(mount(<Item type="radio" />)).to.have.descendants(`.${styles.checkradio}`);
      expect(mount(<Item type="checkbox" />)).to.have.descendants(`.${styles.checkradio}`);
    });

    it('should NOT render icon for the link element', () => {
      expect(mount(<Item type="link" />)).to.not.have.descendants(`.${styles.checkradio}`);
    });
  });

  describe('classes', () => {
    it('should have "item" class by default', () => {
      expect(mount(<Item type="link" />).find(`.${styles.item}`)).to.exist;
      expect(mount(<Item type="checkbox" />).find(`.${styles.item}`)).to.exist;
      expect(mount(<Item type="radio" />).find(`.${styles.item}`)).to.exist;
    });

    it('should have "disabled" class when disabled', () => {
      expect(mount(<Item type="link" isDisabled />).find(`.${styles.disabled}`)).to.exist;
      expect(mount(<Item type="radio" isDisabled />).find(`.${styles.disabled}`)).to.exist;
      expect(mount(<Item type="checkbox" isDisabled />).find(`.${styles.disabled}`)).to.exist;
    });

    it('should have "active" class when link item is active', () => {
      expect(mount(<Item type="link" isActive />).find(`.${styles.active}`)).to.exist;
    });

    it('should NOT have "active" class for any other item types', () => {
      expect(mount(<Item type="radio" isActive />).find(`.${styles.active}`)).to.not.exist;
      expect(mount(<Item type="checkbox" isActive />).find(`.${styles.disabled}`)).to.not.exist;
    });

    it('should have "checked" class when checkbox or radio is checked', () => {
      expect(mount(<Item type="checkbox" isChecked />).find(`.${styles.checked}`)).to.exist;
      expect(mount(<Item type="radio" isChecked />).find(`.${styles.checked}`)).to.exist;
    });

    it('should NOT have "checked" class for any other items', () => {
      expect(mount(<Item type="link" isChecked />).find(`.${styles.checked}`)).to.not.exist;
    });

    it('should have "hidden" class when item is hidden', () => {
      expect(mount(<Item type="link" isHidden />).find(`.${styles.hidden}`)).to.exist;
      expect(mount(<Item type="checkbox" isHidden />).find(`.${styles.hidden}`)).to.exist;
      expect(mount(<Item type="radio" isHidden />).find(`.${styles.hidden}`)).to.exist;
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
        wrapper = mount(<Item onActivate={onActivate} />).find(`.${styles.item}`);
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

      it('should not be activated when disabled', () => {
        const disabledWrapper =
          mount(<Item onActivate={onActivate} isDisabled />).find(`.${styles.item}`);
        disabledWrapper.simulate('click');
        disabledWrapper.simulate('keyDown', { keyCode: keyCode('enter') });
        disabledWrapper.simulate('keyDown', { keyCode: keyCode('space') });
        expect(onActivate.called).to.be.false;
      });
    });

    it('should call onKeyDown when a key other than space and enter is pressed', () => {
      const wrapper = mount(<Item onKeyDown={onActivate} />).find(`.${styles.item}`);
      wrapper.simulate('keyDown', { keyCode: keyCode('up') });
      wrapper.simulate('keyDown', { keyCode: keyCode('down') });
      wrapper.simulate('keyDown', { keyCode: keyCode('tab') });
      expect(onActivate.calledThrice).to.be.true;
    });

    it('should not call onKeyDown when space and enter is pressed', () => {
      const wrapper = mount(<Item onKeyDown={onActivate} />).find(`.${styles.item}`);
      wrapper.simulate('keyDown', { keyCode: keyCode('space') });
      wrapper.simulate('keyDown', { keyCode: keyCode('enter') });
      expect(onActivate.called).to.be.false;
    });
  });

  it('should focus itself when the isFocused property is set to true', () => {
    const wrapper = mount(<Item isFocused />).find(`.${styles.item}`);
    expect(wrapper.find(`.${styles.item}`).node).to.equal(document.activeElement);
  });

  describe('secondary text', () => {
    it('should render content inside', () => {
      expect(mount(<SecondaryText>text</SecondaryText>)).to.have.text('text');
    });

    it('should have className', () => {
      expect(mount(<SecondaryText>text</SecondaryText>)
        .find(`.${styles.secondaryText}`).length).to.equal(1);
    });
  });
});
