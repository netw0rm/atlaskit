import React from 'react';
import { mount } from 'enzyme';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import { akColorB400, akColorN40 } from '@atlaskit/util-shared-styles';
import Item from '@atlaskit/item';
import sinon from 'sinon';

import { name } from '../../package.json';
import {
  DropdownItemGroupCheckbox,
  DropdownItemRadio,
  DropdownMenuStateless,
} from '../../src';

describe(`${name} - DropdownItemRadio`, () => {
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
          <DropdownItemRadio>Item zero</DropdownItemRadio>
        </DropdownItemGroupCheckbox>
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

  test('should appear as checked when clicked, and unchecked when clicked again', () => {
    clickItem();
    expect(wrapper.find(RadioIcon).prop('primaryColor')).toBe(akColorB400);
    expect(wrapper.find(RadioIcon).prop('secondaryColor')).toBe(akColorN40);

    clickItem();
    expect(wrapper.find(RadioIcon).prop('primaryColor')).toBe(akColorN40);
    expect(wrapper.find(RadioIcon).prop('secondaryColor')).toBe(akColorN40);
  });

  // Cannot seem to mock window.navigator.userAgent in jest reliably. If/when possible, another
  // test for non-VoiceOver browsers would expect role="radio"
  test('should have role="menuitemradio" on a browser that does not support VoiceOver', () => {
    expect(wrapper.find(Item).prop('role')).toBe('menuitemradio');
  });
});
