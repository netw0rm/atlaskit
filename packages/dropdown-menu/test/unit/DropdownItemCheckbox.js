import React from 'react';
import { mount } from 'enzyme';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import { akColorB400, akColorN40 } from '@atlaskit/util-shared-styles';
import Item from '@atlaskit/item';
import { KEY_ENTER, KEY_SPACE } from '../../src/util/keys';

import { name } from '../../package.json';
import {
  DropdownMenuStateless,
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '../../src';

describe(`${name} - DropdownItemCheckbox`, () => {
  describe('common use cases', () => {
    let wrapper;

    const clickItem = () => {
      wrapper.find(Item).first().simulate('click');
    };

    beforeEach(() => {
      wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupCheckbox id="check-items">
            <DropdownItemCheckbox id="zero">Item zero</DropdownItemCheckbox>
          </DropdownItemGroupCheckbox>
        </DropdownMenuStateless>
      );
    });

    test('should render a checkbox icon', () => {
      expect(wrapper.find(CheckboxIcon).length).toBe(1);
    });

    test('should default the checkbox icon to unchecked', () => {
      expect(wrapper.find(CheckboxIcon).prop('primaryColor')).toBe(akColorN40);
      expect(wrapper.find(CheckboxIcon).prop('secondaryColor')).toBe(akColorN40);
    });

    test('should appear as checked when clicked, and unchecked when clicked again', () => {
      clickItem();
      expect(wrapper.find(CheckboxIcon).prop('primaryColor')).toBe(akColorB400);
      expect(wrapper.find(CheckboxIcon).prop('secondaryColor')).toBe(akColorN40);

      clickItem();
      expect(wrapper.find(CheckboxIcon).prop('primaryColor')).toBe(akColorN40);
      expect(wrapper.find(CheckboxIcon).prop('secondaryColor')).toBe(akColorN40);
    });

    // Cannot seem to mock window.navigator.userAgent in jest reliably. If/when possible, another
    // test for non-VoiceOver browsers would expect role="checkbox"
    test('should have role="menuitemcheckbox" on a browser that does not support VoiceOver', () => {
      expect(wrapper.find(Item).prop('role')).toBe('menuitemcheckbox');
    });
  });

  test('custom checkbox item onClick should be called when item clicked', () => {
    const clickSpy = jest.fn();
    const wrapper = mount(
      <DropdownMenuStateless isOpen>
        <DropdownItemGroupCheckbox id="check-items">
          <DropdownItemCheckbox id="zero" onClick={clickSpy}>Item zero</DropdownItemCheckbox>
        </DropdownItemGroupCheckbox>
      </DropdownMenuStateless>
    );
    wrapper.find(Item).first().simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  [KEY_SPACE, KEY_ENTER].forEach((triggerKey) => {
    test(`custom checkbox item onClick should be called when "${triggerKey}" key pressed`, () => {
      const clickSpy = jest.fn();
      const wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupCheckbox id="check-items">
            <DropdownItemCheckbox id="zero" onClick={clickSpy}>Item zero</DropdownItemCheckbox>
          </DropdownItemGroupCheckbox>
        </DropdownMenuStateless>
      );
      wrapper.find(Item).first().simulate('keydown', { key: triggerKey });
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
