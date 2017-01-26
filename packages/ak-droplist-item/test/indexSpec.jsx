import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import { shallow, mount } from 'enzyme';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Item, { SecondaryText } from '../src';

chai.use(chaiAsPromised);
const { expect } = chai;

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Item />)).not.to.equal(undefined);
  });

  it('should be "link" item by default', () => {
    expect(shallow(<Item />).instance().props.type).to.equal('link');
  });

  describe('rendering', () => {
    it('should render content that is passed to the item', () => {
      expect(mount(<Item>sample</Item>).text()).to.equal('sample');
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
      expect(mount(<Item type="radio" />).find(`.${styles.checkradio}`).length).to.be.above(0);
      expect(mount(<Item type="checkbox" />).find(`.${styles.checkradio}`).length).to.be.above(0);
    });

    it('should NOT render icon for the link element', () => {
      expect(mount(<Item type="link" />).find(`.${styles.checkradio}`).length).to.equal(0);
    });
  });

  describe('classes', () => {
    it('should have "item" class by default', () => {
      expect(mount(<Item type="link" />).find(`.${styles.item}`)).to.have.length.above(0);
      expect(mount(<Item type="checkbox" />).find(`.${styles.item}`)).to.have.length.above(0);
      expect(mount(<Item type="radio" />).find(`.${styles.item}`)).to.have.length.above(0);
    });

    it('should have "disabled" class when disabled', () => {
      expect(mount(<Item type="link" isDisabled />).find(`.${styles.disabled}`)).to.have.length.above(0);
      expect(mount(<Item type="radio" isDisabled />).find(`.${styles.disabled}`)).to.have.length.above(0);
      expect(mount(<Item type="checkbox" isDisabled />).find(`.${styles.disabled}`)).to.have.length.above(0);
    });

    it('should have "active" class when link item is active', () => {
      expect(mount(<Item type="link" isActive />).find(`.${styles.active}`)).to.have.length.above(0);
    });

    it('should have "active" class when option item is selected', () => {
      expect(mount(<Item type="option" isSelected />).find(`.${styles.active}`)).to.have.length.above(0);
    });

    it('should NOT have "active" class for any other item types', () => {
      expect(mount(<Item type="radio" isActive />).find(`.${styles.active}`).length).to.equal(0);
      expect(mount(<Item type="checkbox" isActive />).find(`.${styles.active}`).length).to.equal(0);
    });

    it('should have "checked" class when checkbox or radio is checked', () => {
      expect(mount(<Item type="checkbox" isChecked />).find(`.${styles.checked}`)).to.have.length.above(0);
      expect(mount(<Item type="radio" isChecked />).find(`.${styles.checked}`)).to.have.length.above(0);
    });

    it('should NOT have "checked" class for any other items', () => {
      expect(mount(<Item type="link" isChecked />).find(`.${styles.checked}`).length).to.equal(0);
    });

    it('should have "hidden" class when item is hidden', () => {
      expect(mount(<Item type="link" isHidden />).find(`.${styles.hidden}`)).to.have.length.above(0);
      expect(mount(<Item type="checkbox" isHidden />).find(`.${styles.hidden}`)).to.have.length.above(0);
      expect(mount(<Item type="radio" isHidden />).find(`.${styles.hidden}`)).to.have.length.above(0);
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
        wrapper.simulate('keyPress', { key: 'Enter' });
        expect(onActivate.calledOnce).to.equal(true);
      });

      it('should be activated when space is pressed', () => {
        wrapper.simulate('keyPress', { key: ' ' });
        expect(onActivate.calledOnce).to.equal(true);
      });

      it('should be activated when clicked', () => {
        wrapper.simulate('click');
        expect(onActivate.calledOnce).to.equal(true);
      });

      it('should not be activated when disabled', () => {
        const disabledWrapper =
          mount(<Item onActivate={onActivate} isDisabled />).find(`.${styles.item}`);
        disabledWrapper.simulate('click');
        disabledWrapper.simulate('keyPress', { key: 'Enter' });
        disabledWrapper.simulate('keyPress', { key: ' ' });
        expect(onActivate.called).to.equal(false);
      });
    });
  });

  it('should focus itself when the isFocused property is set to true', () => {
    const wrapper = mount(<Item isFocused />).find(`.${styles.item}`);
    expect(wrapper.find(`.${styles.item}`).node).to.equal(document.activeElement);
  });

  describe('secondary text', () => {
    it('should render content inside', () => {
      expect(mount(<SecondaryText>text</SecondaryText>).text()).to.equal('text');
    });

    it('should have className', () => {
      expect(mount(<SecondaryText>text</SecondaryText>)
        .find(`.${styles.secondaryText}`).length).to.equal(1);
    });
  });

  describe('accessibility', () => {
    it('disabled item', () => {
      expect(mount(<Item />).find('[aria-disabled]').length).to.equal(0);
      expect(mount(<Item isDisabled />).find('[aria-disabled]').length).to.equal(1);
    });

    it('hidden item', () => {
      expect(mount(<Item />).find('[aria-hidden]').length).to.equal(0);
      expect(mount(<Item isHidden />).find('[aria-hidden]').length).to.equal(1);
    });

    it('checked item', () => {
      expect(mount(<Item />).find('[aria-checked]').length).to.equal(0);
      expect(mount(<Item isChecked />).find('[aria-checked]').length).to.equal(1);
    });

    it('option item', () => {
      expect(mount(<Item type="option" />).find('[aria-selected=false]').length).to.equal(1);
      expect(mount(<Item type="option" isSelected />).find('[aria-selected=true]').length).to.equal(1);
    });

    it('data-role', () => {
      expect(mount(<Item />).find('[data-role]').length).to.equal(1);
    });
  });
});
