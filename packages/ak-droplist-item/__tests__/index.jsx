import React from 'react';
import { shallow, mount } from 'enzyme';

import { name } from '../package.json';
import styles from '../__mocks__/styleMock';
import Item, { SecondaryText } from '../src';
import Element from '../src/internal/Element';

import Radio from 'ak-icon/glyph/radio';
import Checkbox from 'ak-icon/glyph/checkbox';


describe(name, () => {
  it('should be possible to create a component', () =>
    expect(shallow(<Item />).isEmpty()).toBeFalsy()
  );

  it('should be "link" item by default', () =>
    expect(shallow(<Item />).find(Element).prop('type')).toBe('link')
  );

  describe('rendering', () => {
    it('should render content that is passed to the item', () =>
      expect(mount(<Item>sample</Item>).text()).toBe('sample')
    );

    it('should render elemBefore for all items', () => {
      const Icon = <div id="icon">icon</div>;
      expect(shallow(<Item elemBefore={Icon}>sample</Item>).contains(Icon)).toBeTruthy();
      expect(shallow(<Item elemBefore={Icon} type="checkbox">sample</Item>).contains(Icon)).toBeTruthy();
      expect(shallow(<Item elemBefore={Icon} type="radio">sample</Item>).contains(Icon)).toBeTruthy();
    });

    it('should render elemAfter for all items', () => {
      const Icon = (<div id="icon">icon</div>);
      expect(shallow(<Item elemAfter={Icon}>sample</Item>).contains(Icon)).toBeTruthy();
      expect(shallow(<Item elemAfter={Icon} type="checkbox">sample</Item>).contains(Icon)).toBeTruthy();
      expect(shallow(<Item elemAfter={Icon} type="radio">sample</Item>).contains(Icon)).toBeTruthy();
    });

    it('should render icon for the radio or checkbox element', () => {
      expect(shallow(<Item type="checkbox" />).find(Checkbox).isEmpty()).toBeFalsy();
      expect(shallow(<Item type="radio" />).find(Radio).isEmpty()).toBeFalsy();
    });

    it('should NOT render icon for the link element', () => {
      const wrapper = shallow(<Item type="link" />);
      expect(wrapper.find(Checkbox).isEmpty()).toBeTruthy();
      expect(wrapper.find(Radio).isEmpty()).toBeTruthy();
    });
  });

  describe('classes', () => {
    it('should have "item" class by default', () => {
      expect(shallow(<Item type="link" />).find(Element).hasClass(styles.item)).toBeTruthy();
      expect(shallow(<Item type="checkbox" />).find(Element).hasClass(styles.item)).toBeTruthy();
      expect(shallow(<Item type="radio" />).find(Element).hasClass(styles.item)).toBeTruthy();
    });

    it('should have "disabled" class when disabled', () => {
      expect(shallow(<Item type="link" isDisabled />).find(Element).hasClass(styles.disabled)).toBeTruthy();
      expect(shallow(<Item type="radio" isDisabled />).find(Element).hasClass(styles.disabled)).toBeTruthy();
      expect(shallow(<Item type="checkbox" isDisabled />).find(Element).hasClass(styles.disabled)).toBeTruthy();
    });

    it('should have "active" class when link item is active', () =>
      expect(shallow(<Item type="link" isActive />).find(Element).hasClass(styles.active)).toBeTruthy()
    );

    it('should have "active" class when option item is selected', () =>
      expect(shallow(<Item type="option" isSelected />).find(Element).hasClass(styles.active)).toBeTruthy()
    );

    it('should NOT have "active" class for any other item types', () => {
      expect(shallow(<Item type="radio" isActive />).find(Element).hasClass(styles.active)).toBeFalsy();
      expect(shallow(<Item type="checkbox" isActive />).find(Element).hasClass(styles.disabled)).toBeFalsy();
    });

    it('should have "checked" class when checkbox or radio is checked', () => {
      expect(shallow(<Item type="checkbox" isChecked />).find(Element).hasClass(styles.checked)).toBeTruthy();
      expect(shallow(<Item type="radio" isChecked />).find(Element).hasClass(styles.checked)).toBeTruthy();
    });

    it('should NOT have "checked" class for any other items', () => {
      expect(shallow(<Item type="link" isChecked />).find(Element).hasClass(styles.checked)).toBeFalsy();
    });

    it('should have "hidden" class when item is hidden', () => {
      expect(shallow(<Item type="link" isHidden />).find(Element).hasClass(styles.hidden)).toBeTruthy();
      expect(shallow(<Item type="checkbox" isHidden />).find(Element).hasClass(styles.hidden)).toBeTruthy();
      expect(shallow(<Item type="radio" isHidden />).find(Element).hasClass(styles.hidden)).toBeTruthy();
    });
  });

  describe('events', () => {
  //   let onActivate;

  //   beforeEach(() => {
  //     onActivate = sinon.spy();
  //   });
  //   afterEach(() => {
  //     onActivate.reset();
  //   });

    describe.only('onActivate', () => {
      let wrapper;
      let onActivate;
      beforeEach(() => {
        onActivate = jest.fn();

// myMock('1');
// myMock('a', 'b');
// console.log(myMock.mock.calls);
        wrapper = mount(<Item onActivate={onActivate} />).find(`.${styles.item}`);
      });

      it('should be activated when enter is pressed', () => {
        wrapper.simulate('keyPress', { key: 'Enter' });
        expect(onActivate.mock.calls.length).toBe(1);
      });

      // it('should be activated when space is pressed', () => {
      //   wrapper.simulate('keyPress', { key: ' ' });
      //   expect(onActivate.calledOnce).to.be.true;
      // });

      // it('should be activated when clicked', () => {
      //   wrapper.simulate('click');
      //   expect(onActivate.calledOnce).to.be.true;
      // });

      // it('should not be activated when disabled', () => {
      //   const disabledWrapper =
      //     mount(<Item onActivate={onActivate} isDisabled />).find(`.${styles.item}`);
      //   disabledWrapper.simulate('click');
      //   disabledWrapper.simulate('keyPress', { key: 'Enter' });
      //   disabledWrapper.simulate('keyPress', { key: ' ' });
      //   expect(onActivate.called).to.be.false;
      // });
    });
  });

  // it('should focus itself when the isFocused property is set to true', () => {
  //   const wrapper = mount(<Item isFocused />).find(`.${styles.item}`);
  //   expect(wrapper.find(`.${styles.item}`).node).to.equal(document.activeElement);
  // });

  // describe('secondary text', () => {
  //   it('should render content inside', () => {
  //     expect(mount(<SecondaryText>text</SecondaryText>)).to.have.text('text');
  //   });

  //   it('should have className', () => {
  //     expect(mount(<SecondaryText>text</SecondaryText>)
  //       .find(`.${styles.secondaryText}`).length).to.equal(1);
  //   });
  // });

  // describe('accessibility', () => {
  //   it('disabled item', () => {
  //     expect(mount(<Item />).find('[aria-disabled]').length).to.equal(0);
  //     expect(mount(<Item isDisabled />).find('[aria-disabled]').length).to.equal(1);
  //   });

  //   it('hidden item', () => {
  //     expect(mount(<Item />).find('[aria-hidden]').length).to.equal(0);
  //     expect(mount(<Item isHidden />).find('[aria-hidden]').length).to.equal(1);
  //   });

  //   it('checked item', () => {
  //     expect(mount(<Item />).find('[aria-checked]').length).to.equal(0);
  //     expect(mount(<Item isChecked />).find('[aria-checked]').length).to.equal(1);
  //   });

  //   it('option item', () => {
  //     expect(mount(<Item type="option" />).find('[aria-selected=false]').length).to.equal(1);
  //     expect(mount(<Item type="option" isSelected />).find('[aria-selected=true]').length).to.equal(1);
  //   });

  //   it('data-role', () => {
  //     expect(mount(<Item />).find('[data-role]').length).to.equal(1);
  //   });
  // });
});
