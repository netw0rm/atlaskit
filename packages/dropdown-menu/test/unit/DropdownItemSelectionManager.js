import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { name } from '../../package.json';

import {
  DropdownItemCheckbox,
  DropdownItemRadio,
} from '../../src';

import DropdownItemFocusManager from '../../src/components/context/DropdownItemFocusManager';
import DropdownItemSelectionManager from '../../src/components/context/DropdownItemSelectionManager';
import { selectionCacheContext } from '../../src/util/contextNamespace';

describe(`${name} - DropdownItemSelectionManager`, () => {
  let clock;
  const prepareEnvironment = (behavior, ItemComponent, isItemSelected) => {
    const changeSpy = sinon.spy();
    const fakeCache = {
      isItemSelected: () => isItemSelected,
      itemsInGroup: () => (
        isItemSelected
          ? [{ id: '0', groupId: 'my-group' }]
          : []
      ),
      itemSelectionsChanged: changeSpy,
    };
    const wrapper = mount(
      <DropdownItemSelectionManager groupId="my-group" behavior={behavior}>
        <DropdownItemFocusManager>
          <ItemComponent id="0">Item zero</ItemComponent>
          <ItemComponent id="1">Item one</ItemComponent>
        </DropdownItemFocusManager>
      </DropdownItemSelectionManager>,
      { context: { [selectionCacheContext]: fakeCache } }
    );
    return { changeSpy, wrapper };
  };

  beforeEach(() => {
    // There is currently a hack in `src/hoc/withToggleInteraction.jsx` where setTimeout
    // is used, see that file for more details. The plan is to get rid of this eventually.
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const clickItem = (wrapper, idx) => {
    wrapper.find('Item').at(idx).simulate('click');
    clock.tick(1);
  };

  describe('checkbox', () => {
    test('should store the selected checkbox item values on click', () => {
      const { changeSpy, wrapper } = prepareEnvironment('checkbox', DropdownItemCheckbox, false);

      clickItem(wrapper, 0);
      expect(changeSpy.calledWith(
        'my-group', [
          { groupId: 'my-group', id: '0' },
        ]
      )).toBe(true);
    });

    test('should stop storing a selected checkbox item value when clicked twice', () => {
      const { changeSpy, wrapper } = prepareEnvironment('checkbox', DropdownItemCheckbox, true);

      clickItem(wrapper, 0);
      expect(changeSpy.calledWith('my-group', [])).toBe(true);
    });
  });

  describe('radio', () => {
    test('should store the most recently selected radio item value', () => {
      const { changeSpy, wrapper } = prepareEnvironment('radio', DropdownItemRadio, false);

      clickItem(wrapper, 1);
      expect(changeSpy.calledWith(
        'my-group', [
          { groupId: 'my-group', id: '1' },
        ]
      )).toBe(true);
    });

    test('should continue storing a selected radio item value when clicked twice', () => {
      const { changeSpy, wrapper } = prepareEnvironment('radio', DropdownItemRadio, true);
      clickItem(wrapper, 0);
      expect(changeSpy.calledWith(
        'my-group', [
          { groupId: 'my-group', id: '0' },
        ]
      )).toBe(true);
    });
  });
});
