import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Radio from '@atlaskit/icon/glyph/radio';
import Checkbox from '@atlaskit/icon/glyph/checkbox';

import { name } from '../../package.json';
import styles from '../../src/styles.less';

import { SecondaryText, Item } from '../../src';

describe(`${name} - item`, () => {
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

    it('should render descriptions after the content', () => {
      expect(mount(<Item description="test">sample</Item>).text()).to.equal('sampletest');
    });

    it('should render elemBefore for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(mount(<Item elemBefore={Icon}>sample</Item>).contains(Icon)).to.equal(true);
      expect(mount(<Item elemBefore={Icon} type="checkbox">sample</Item>).contains(Icon)).to.equal(true);
      expect(mount(<Item elemBefore={Icon} type="radio">sample</Item>).contains(Icon)).to.equal(true);
    });

    it('should render elemAfter for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(mount(<Item elemAfter={Icon}>sample</Item>).contains(Icon)).to.equal(true);
      expect(mount(<Item elemAfter={Icon} type="checkbox">sample</Item>).contains(Icon)).to.equal(true);
      expect(mount(<Item elemAfter={Icon} type="radio">sample</Item>).contains(Icon)).to.equal(true);
    });

    it('should render icon for the radio or checkbox element', () => {
      expect(mount(<Item type="radio" />).find(Radio).length).to.be.above(0);
      expect(mount(<Item type="checkbox" />).find(Checkbox).length).to.be.above(0);
    });

    it('should NOT render icon for the link element', () => {
      expect(mount(<Item type="link" />).find(Radio).length).to.equal(0);
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
        // The event listener is on the `Element` in Item which we cant select with a css selector
        wrapper = mount(<Item onActivate={onActivate} />).find(Item).childAt(0);
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
          mount(<Item onActivate={onActivate} isDisabled />).find(Item);
        disabledWrapper.simulate('click');
        disabledWrapper.simulate('keyPress', { key: 'Enter' });
        disabledWrapper.simulate('keyPress', { key: ' ' });
        expect(onActivate.called).to.equal(false);
      });
    });
  });

  describe('secondary text', () => {
    it('should render content inside', () => {
      expect(mount(<SecondaryText>text</SecondaryText>).text()).to.equal('text');
    });

    // it('should have className', () => {
    //   expect(mount(<SecondaryText>text</SecondaryText>)
    //     .find(`.${styles.secondaryText}`).length).to.equal(1);
    // });
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
