import React from 'react';
import { mount } from 'enzyme';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import { akColorB400, akColorN40 } from '@atlaskit/util-shared-styles';
import Item from '@atlaskit/item';
import { KEY_ENTER, KEY_SPACE } from '../../src/util/keys';

import { name } from '../../package.json';
import {
  DropdownItemGroupRadio,
  DropdownItemRadio,
  DropdownMenuStateless,
} from '../../src';

describe(`${name} - DropdownItemRadio`, () => {
  describe('common use cases', () => {
    let wrapper;

    const clickItem = () => {
      wrapper.find('Item').first().simulate('click');
    };

    beforeEach(() => {
      wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupRadio id="radio-group">
            <DropdownItemRadio id="radio-item">Item zero</DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>
      );
    });

    test('should render a radio icon', () => {
      expect(wrapper.find(RadioIcon).length).toBe(1);
    });

    test('should default the radio icon to unchecked', () => {
      expect(wrapper.find(RadioIcon).prop('primaryColor')).toBe(akColorN40);
      expect(wrapper.find(RadioIcon).prop('secondaryColor')).toBe(akColorN40);
    });

    test('should appear as checked when clicked, and still checked when clicked again', () => {
      clickItem();
      expect(wrapper.find(RadioIcon).prop('primaryColor')).toBe(akColorB400);
      expect(wrapper.find(RadioIcon).prop('secondaryColor')).toBe(akColorN40);

      clickItem();
      expect(wrapper.find(RadioIcon).prop('primaryColor')).toBe(akColorB400);
      expect(wrapper.find(RadioIcon).prop('secondaryColor')).toBe(akColorN40);
    });

    // Cannot seem to mock window.navigator.userAgent in jest reliably. If/when possible, another
    // test for non-VoiceOver browsers would expect role="radio"
    test('should have role="menuitemradio" on a browser that does not support VoiceOver', () => {
      expect(wrapper.find(Item).prop('role')).toBe('menuitemradio');
    });
  });

  test('custom checkbox item onClick should be called', () => {
    const clickSpy = jest.fn();
    const wrapper = mount(
      <DropdownMenuStateless isOpen>
        <DropdownItemGroupRadio id="radio-items">
          <DropdownItemRadio id="zero" onClick={clickSpy}>Item zero</DropdownItemRadio>
        </DropdownItemGroupRadio>
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
          <DropdownItemGroupRadio id="radio-items">
            <DropdownItemRadio id="zero" onClick={clickSpy}>Item zero</DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>
      );
      wrapper.find(Item).first().simulate('keydown', { key: triggerKey });
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
