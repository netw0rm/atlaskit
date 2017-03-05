import { mount } from 'enzyme';
import React from 'react';
import DrawerItem from '../src/components/js/DrawerItem';

describe('<DrawerItem />', () => {
  describe('props', () => {
    function passesOnProp(prop, value) {
      return mount(<DrawerItem
        {...{ [prop]: value }}
      />).find('NavigationItem').props()[prop] === value;
    }

    [
      { prop: 'action', value: 'foo' },
      { prop: 'icon', value: 'foo' },
      { prop: 'href', value: 'foo' },
      { prop: 'isCompact', value: false },
      { prop: 'linkComponent', value: () => null },
      { prop: 'onClick', value: () => null },
      { prop: 'subText', value: 'foo' },
      { prop: 'text', value: 'foo' },
      { prop: 'textAfter', value: 'foo' },
    ].forEach(({ prop, value }) => {
      it(`passes on ${prop} to <NavigationItem />`, () => expect(passesOnProp(prop, value)).to.equal(true));
    });
  });
});
