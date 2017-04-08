import React from 'react';
import { shallow, mount } from 'enzyme';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import { SecondaryText, Item } from '../src';

describe(`${name} - item`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Item />)).not.to.equal(undefined);
  });

  it('should be "link" item by default', () => {
    expect(shallow(<Item />).instance().props.type).to.equal('link');
  });

  describe('rendering', () => {
    it('should render content that is passed to the item', () => {
      const wrapper = mount(<Item>sample</Item>);
      expect(wrapper.text()).to.equal('sample');
      wrapper.unmount();
    });

    it('should render descriptions after the content', () => {
      const wrapper = mount(<Item description="test">sample</Item>);
      expect(wrapper.text()).to.equal('sampletest');
      wrapper.unmount();
    });

    it('should render elemBefore for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      const wrapper = mount(<Item elemBefore={Icon}>sample</Item>);
      const wrapperCheckBox = mount(<Item elemBefore={Icon} type="checkbox">sample</Item>);
      const wrapperRadio = mount(<Item elemBefore={Icon} type="radio">sample</Item>);
      expect(wrapper.contains(Icon)).to.equal(true);
      expect(wrapperCheckBox.contains(Icon)).to.equal(true);
      expect(wrapperRadio.contains(Icon)).to.equal(true);
      wrapper.unmount();
      wrapperCheckBox.unmount();
      wrapperRadio.unmount();
    });

    it('should render elemAfter for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      const wrapper = mount(<Item elemAfter={Icon}>sample</Item>);
      const wrapperCheckBox = mount(<Item elemAfter={Icon} type="checkbox">sample</Item>);
      const wrapperRadio = mount(<Item elemAfter={Icon} type="radio">sample</Item>);
      expect(wrapper.contains(Icon)).to.equal(true);
      expect(wrapperCheckBox.contains(Icon)).to.equal(true);
      expect(wrapperRadio.contains(Icon)).to.equal(true);
      wrapper.unmount();
      wrapperCheckBox.unmount();
      wrapperRadio.unmount();
    });

    it('should render icon for the radio or checkbox element', () => {
      const wrapperRadio = mount(<Item type="radio" />);
      const wrapperCheckBox = mount(<Item type="checkbox" />);
      expect(wrapperRadio.find(`.${styles.checkradio}`).length).to.be.above(0);
      expect(wrapperCheckBox.find(`.${styles.checkradio}`).length).to.be.above(0);
      wrapperRadio.unmount();
      wrapperCheckBox.unmount();
    });

    it('should NOT render icon for the link element', () => {
      const wrapper = mount(<Item type="link" />);
      expect(wrapper.find(`.${styles.checkradio}`).length).to.equal(0);
      wrapper.unmount();
    });
  });

  describe('classes', () => {
    it('should have "item" class by default', () => {
      const wrapperLink = mount(<Item type="link" />);
      const wrapperCheckBox = mount(<Item type="checkbox" />);
      const wrapperRadio = mount(<Item type="radio" />);
      expect(wrapperLink.find(`.${styles.item}`)).to.have.length.above(0);
      expect(wrapperCheckBox.find(`.${styles.item}`)).to.have.length.above(0);
      expect(wrapperRadio.find(`.${styles.item}`)).to.have.length.above(0);
      wrapperLink.unmount();
      wrapperCheckBox.unmount();
      wrapperRadio.unmount();
    });

    it('should have "disabled" class when disabled', () => {
      const wrapperLink = mount(<Item type="link" isDisabled />);
      const wrapperCheckBox = mount(<Item type="checkbox" isDisabled />);
      const wrapperRadio = mount(<Item type="radio" isDisabled />);
      expect(wrapperLink.find(`.${styles.disabled}`)).to.have.length.above(0);
      expect(wrapperCheckBox.find(`.${styles.disabled}`)).to.have.length.above(0);
      expect(wrapperRadio.find(`.${styles.disabled}`)).to.have.length.above(0);
      wrapperLink.unmount();
      wrapperCheckBox.unmount();
      wrapperRadio.unmount();
    });

    it('should have "active" class when link item is active', () => {
      const wrapper = mount(<Item type="link" isActive />);
      expect(wrapper.find(`.${styles.active}`)).to.have.length.above(0);
      wrapper.unmount();
    });

    it('should have "active" class when option item is selected', () => {
      const wrapper = mount(<Item type="option" isSelected />);
      expect(wrapper.find(`.${styles.active}`)).to.have.length.above(0);
      wrapper.unmount();
    });

    it('should NOT have "active" class for any other item types', () => {
      const wrapperRadio = mount(<Item type="radio" isActive />);
      const wrapperCheckBox = mount(<Item type="checkbox" isActive />);
      expect(wrapperRadio.find(`.${styles.active}`).length).to.equal(0);
      expect(wrapperCheckBox.find(`.${styles.active}`).length).to.equal(0);
      wrapperRadio.unmount();
      wrapperCheckBox.unmount();
    });

    it('should have "checked" class when checkbox or radio is checked', () => {
      const wrapperCheckBox = mount(<Item type="checkbox" isChecked />);
      const wrapperRadio = mount(<Item type="radio" isChecked />);
      expect(wrapperCheckBox.find(`.${styles.checked}`)).to.have.length.above(0);
      expect(wrapperRadio.find(`.${styles.checked}`)).to.have.length.above(0);
      wrapperCheckBox.unmount();
      wrapperRadio.unmount();
    });

    it('should NOT have "checked" class for any other items', () => {
      const wrapper = mount(<Item type="link" isChecked />);
      expect(wrapper.find(`.${styles.checked}`).length).to.equal(0);
      wrapper.unmount();
    });

    it('should have "hidden" class when item is hidden', () => {
      const wrapperLink = mount(<Item type="link" isHidden />);
      const wrapperCheckBox = mount(<Item type="checkbox" isHidden />);
      const wrapperRadio = mount(<Item type="radio" isHidden />);
      expect(wrapperLink.find(`.${styles.hidden}`)).to.have.length.above(0);
      expect(wrapperCheckBox.find(`.${styles.hidden}`)).to.have.length.above(0);
      expect(wrapperRadio.find(`.${styles.hidden}`)).to.have.length.above(0);
      wrapperLink.unmount();
      wrapperCheckBox.unmount();
      wrapperRadio.unmount();
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
      let item;
      let wrapper;
      beforeEach(() => {
        onActivate = sinon.spy();
        item = mount(<Item onActivate={onActivate} />);
        wrapper = item.find(`.${styles.item}`);
      });

      afterEach(() => {
        item.unmount();
        wrapper = null;
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
        const disabledItem = mount(<Item onActivate={onActivate} isDisabled />);
        const disabledWrapper = disabledItem.find(`.${styles.item}`);
        disabledWrapper.simulate('click');
        disabledWrapper.simulate('keyPress', { key: 'Enter' });
        disabledWrapper.simulate('keyPress', { key: ' ' });
        expect(onActivate.called).to.equal(false);
        disabledItem.unmount();
      });
    });
  });

  describe('secondary text', () => {
    it('should render content inside', () => {
      const wrapper = mount(<SecondaryText>text</SecondaryText>);
      expect(wrapper.text()).to.equal('text');
      wrapper.unmount();
    });

    it('should have className', () => {
      const wrapper = mount(<SecondaryText>text</SecondaryText>);
      expect(wrapper.find(`.${styles.secondaryText}`).length).to.equal(1);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('disabled item', () => {
      const wrapper = mount(<Item />);
      const wrapperDisabled = mount(<Item isDisabled />);
      expect(wrapper.find('[aria-disabled]').length).to.equal(0);
      expect(wrapperDisabled.find('[aria-disabled]').length).to.equal(1);
      wrapper.unmount();
      wrapperDisabled.unmount();
    });

    it('hidden item', () => {
      const wrapper = mount(<Item />);
      const wrapperHidden = mount(<Item isHidden />);
      expect(wrapper.find('[aria-hidden]').length).to.equal(0);
      expect(wrapperHidden.find('[aria-hidden]').length).to.equal(1);
      wrapper.unmount();
      wrapperHidden.unmount();
    });

    it('checked item', () => {
      const wrapper = mount(<Item />);
      const wrapperChecked = mount(<Item isChecked />);
      expect(wrapper.find('[aria-checked]').length).to.equal(0);
      expect(wrapperChecked.find('[aria-checked]').length).to.equal(1);
      wrapper.unmount();
      wrapperChecked.unmount();
    });

    it('option item', () => {
      const wrapper = mount(<Item type="option" />);
      const wrapperSelected = mount(<Item type="option" isSelected />);
      expect(wrapper.find('[aria-selected=false]').length).to.equal(1);
      expect(wrapperSelected.find('[aria-selected=true]').length).to.equal(1);
      wrapper.unmount();
      wrapperSelected.unmount();
    });

    it('data-role', () => {
      const wrapper = mount(<Item />);
      expect(wrapper.find('[data-role]').length).to.equal(1);
      wrapper.unmount();
    });
  });
});
