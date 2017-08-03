import React from 'react';
import { mount } from 'enzyme';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import { akColorB400, akColorN40 } from '@atlaskit/util-shared-styles';
import Item from '@atlaskit/item';
import sinon from 'sinon';

import { name } from '../../package.json';
import {
  DropdownMenuStateless,
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '../../src';

describe(`${name} - DropdownItemCheckbox`, () => {
  let wrapper;
  let clock;

  const clickItem = () => {
    wrapper.find('Item').first().simulate('click');
    clock.tick(1);
  };

  beforeEach(() => {
    // There is currently a hack in `src/hoc/withToggleInteraction.jsx` where setTimeout
    // is used, see that file for more details. The plan is to get rid of this eventually.
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  beforeEach(() => {
    wrapper = mount(
      <DropdownMenuStateless isOpen>
        <DropdownItemGroupCheckbox>
          <DropdownItemCheckbox>Item zero</DropdownItemCheckbox>
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

  test('should have role="checkbox"', () => {
    expect(wrapper.find(Item).prop('role')).toBe('checkbox');
  });
});
