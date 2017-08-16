import React from 'react';
import { shallow, mount } from 'enzyme';

import { name } from '../../package.json';

import { DropdownMenuStateless } from '../../src';
import DropdownItemFocusManager from '../../src/components/context/DropdownItemFocusManager';

describe(`${name} - DropdownMenuStateless`, () => {
  describe('rendering DropdownItemFocusManager', () => {
    test('should render DropdownItemFocusManager inside Droplist', () => {
      const wrapper = shallow(<DropdownMenuStateless isOpen />);
      expect(wrapper.find('Droplist').find(DropdownItemFocusManager).exists()).toBe(true);
    });

    ['ArrowDown', 'Enter'].forEach((triggerKey) => {
      test(`should set DropdownItemFocusManager.wasOpenedViaKeyboard when opened via "${triggerKey}" key on trigger`, () => {
        const wrapper = mount(
          <DropdownMenuStateless trigger={<button className="my-trigger" />} />
        );
        wrapper.find('.my-trigger').simulate('keydown', { key: 'ArrowDown' });
        wrapper.setProps({ isOpen: true });
        expect(wrapper.find(DropdownItemFocusManager).prop('wasOpenedViaKeyboard')).toBe(true);
      });
    });

    test('should NOT set DropdownItemFocusManager.wasOpenedViaKeyboard when opened via click on trigger', () => {
      const wrapper = mount(
        <DropdownMenuStateless trigger={<button className="my-trigger" />} />
      );
      wrapper.find('.my-trigger').simulate('click');
      wrapper.setProps({ isOpen: true });
      expect(wrapper.find(DropdownItemFocusManager).prop('wasOpenedViaKeyboard')).toBe(false);
    });
  });
});
