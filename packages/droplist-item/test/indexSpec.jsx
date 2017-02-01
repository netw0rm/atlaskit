import React from 'react';
import { shallow, mount } from 'enzyme';
import Radio from '@atlaskit/icon/glyph/radio';
import Checkbox from '@atlaskit/icon/glyph/checkbox';

import { name } from '../package.json';
import { SecondaryTextSpan } from '../src/styled';
import Item, { SecondaryText } from '../src';

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
      expect(mount(<Item type="radio" />).find(Radio).length).to.equal(1);
      expect(mount(<Item type="checkbox" />).find(Checkbox).length).to.equal(1);
    });

    it('should NOT render icon for the link element', () => {
      const wrapper = mount(<Item type="link" />);
      expect(wrapper.find(Checkbox).length).to.equal(0);
      expect(wrapper.find(Radio).length).to.equal(0);
    });
  });

  describe('events', () => {
    describe('onActivate', () => {
      let wrapper;
      let onActivate;
      beforeEach(() => {
        onActivate = sinon.spy();
        wrapper = mount(<Item onActivate={onActivate} />).find('.element-content');
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
          mount(<Item onActivate={onActivate} isDisabled />).find('.element-content');
        disabledWrapper.simulate('click');
        disabledWrapper.simulate('keyPress', { key: 'Enter' });
        disabledWrapper.simulate('keyPress', { key: ' ' });
        expect(onActivate.called).to.equal(false);
      });
    });
  });

  it('should focus itself when the isFocused property is set to true', () => {
    const wrapper = mount(<Item isFocused />).find('.element-content');
    expect(wrapper.node).to.equal(document.activeElement);
  });

  describe('secondary text', () => {
    it('should render content inside', () => {
      expect(mount(<SecondaryText>text</SecondaryText>).text()).to.equal('text');
    });

    it('should have className', () => {
      expect(mount(<SecondaryText>text</SecondaryText>)
        .find(SecondaryTextSpan).length).to.equal(1);
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
