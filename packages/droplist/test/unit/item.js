import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Radio from '@atlaskit/icon/glyph/radio';
import Checkbox from '@atlaskit/icon/glyph/checkbox';
import Tooltip from '@atlaskit/tooltip';

import { name } from '../../package.json';

import { SecondaryText, Item } from '../../src';
import Element from '../../src/components/Element';
import { Anchor, Span } from '../../src/styled/Item';

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

    it('should render tooltip when tooltipDescription is not empty', () => {
      expect(mount(<Item tooltipDescription="foo" />).find(Tooltip).length).to.equal(1);
    });

    it('should NOT render tooltip when tooltipDescription is empty', () => {
      expect(mount(<Item />).find(Tooltip).length).to.equal(0);
      expect(mount(<Item tooltipPosition="left" />).find(Tooltip).length).to.equal(0);
    });
  });

  describe('variants', () => {
    it('should render the correct "type" of styled component', () => {
      expect(mount(<Item type="link" href="https://atlassian.design" />).find(Anchor).exists()).to.equal(true);
      expect(mount(<Item type="checkbox" />).find(Span).exists()).to.equal(true);
      expect(mount(<Item type="radio" />).find(Span).exists()).to.equal(true);
    });

    it('should have "disabled" data-attribute when disabled', () => {
      expect(mount(<Item type="link" isDisabled />).find(Span).prop('data-test-disabled')).to.equal(true);
      expect(mount(<Item type="radio" isDisabled />).find(Span).prop('data-test-disabled')).to.equal(true);
      expect(mount(<Item type="checkbox" isDisabled />).find(Span).prop('data-test-disabled')).to.equal(true);
    });

    it('should have "active" data-attribute when link item is active', () => {
      expect(mount(<Item type="link" isActive />).find(Span).prop('data-test-active')).to.equal(true);
    });

    it('should have "selected" data-attribute when option item is selected', () => {
      expect(mount(<Item type="option" isSelected />).find(Span).prop('data-test-selected')).to.equal(true);
    });

    it('should NOT have "active" prop passed to Element for any other item types', () => {
      expect(mount(<Item type="radio" isActive />).find(Element).prop('isActive')).to.equal(false);
      expect(mount(<Item type="checkbox" isActive />).find(Element).prop('isActive')).to.equal(false);
    });

    it('should have "checked" data-attribute when checkbox or radio is checked', () => {
      expect(mount(<Item type="checkbox" isChecked />).find(Span).prop('data-test-checked')).to.equal(true);
      expect(mount(<Item type="radio" isChecked />).find(Span).prop('data-test-checked')).to.equal(true);
    });

    it('should NOT have "checked" class for any other items', () => {
      expect(mount(<Item type="link" isChecked />).find(Span).prop('data-test-checked')).to.equal(false);
    });

    it('should have "hidden" data-attribute when item is hidden', () => {
      expect(mount(<Item type="link" isHidden />).find(Span).prop('data-test-hidden')).to.equal(true);
      expect(mount(<Item type="checkbox" isHidden />).find(Span).prop('data-test-hidden')).to.equal(true);
      expect(mount(<Item type="radio" isHidden />).find(Span).prop('data-test-hidden')).to.equal(true);
    });
  });

  describe('appearance prop', () => {
    it('should be "default" by default', () => {
      expect(mount(<Item />).prop('appearance')).to.equal('default');
    });

    it('should correctly pass "isPrimary" to Element component', () => {
      // appearance="primary" will be passed as an isPrimary prop
      expect(mount(<Item />).find(Element).prop('isPrimary')).to.equal(false);
      expect(mount(<Item appearance="primary" />).find(Element).prop('isPrimary')).to.equal(true);
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
        wrapper = mount(<Item onActivate={onActivate} />).find(Element);
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
      expect(mount(<SecondaryText>secondary text</SecondaryText>).text()).to.equal('secondary text');
    });
  });

  describe('accessibility', () => {
    it('disabled item', () => {
      expect(mount(<Item />).find(Span).prop('aria-disabled')).to.equal(false);
      expect(mount(<Item isDisabled />).find(Span).prop('aria-disabled')).to.equal(true);
    });

    it('hidden item', () => {
      expect(mount(<Item />).find(Span).prop('aria-hidden')).to.equal(false);
      expect(mount(<Item isHidden />).find(Span).prop('aria-hidden')).to.equal(true);
    });

    it('checked item', () => {
      expect(mount(<Item />).find(Span).prop('aria-checked')).to.equal(false);
      expect(mount(<Item type="checkbox" isChecked />).find(Span).prop('aria-checked')).to.equal(true);
    });

    it('option item', () => {
      expect(mount(<Item type="option" />).find(Span).prop('aria-selected')).to.equal(false);
      expect(mount(<Item type="option" isSelected />).find(Span).prop('aria-selected')).to.equal(true);
    });

    it('data-role', () => {
      expect(mount(<Item />).find('[data-role]').length).to.equal(1);
    });
  });
});
