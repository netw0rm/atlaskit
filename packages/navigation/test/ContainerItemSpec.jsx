import { mount } from 'enzyme';
import React from 'react';
import {
  containerItem,
  hasGlobalAppearance,
  hasSettingsAppearance,
} from 'style!../src/components/less/ContainerItem.less';
import ContainerItem from '../src/components/js/ContainerItem';

describe('<ContainerItem />', () => {
  describe('props', () => {
    function passesOnProp(prop, value) {
      return mount(<ContainerItem
        {...{ [prop]: value }}
      />).find('NavigationItem').props()[prop] === value;
    }

    [
      { prop: 'action', value: 'foo' },
      { prop: 'icon', value: 'foo' },
      { prop: 'href', value: 'foo' },
      { prop: 'isCompact', value: false },
      { prop: 'isSelected', value: false },
      { prop: 'linkComponent', value: () => null },
      { prop: 'onClick', value: () => null },
      { prop: 'subText', value: 'foo' },
      { prop: 'text', value: 'foo' },
      { prop: 'textAfter', value: 'foo' },
    ].forEach(({ prop, value }) => {
      it(`passes on ${prop} to <NavigationItem />`, () => expect(passesOnProp(prop, value)).to.equal(true));
    });

    it('appearance="global" should render with the global appearance class', () => {
      expect((mount(<ContainerItem appearance="global" />).find(`.${containerItem}`)).hasClass((hasGlobalAppearance))).to.equal(true);
    });

    it('appearance="settings" should render with the settings appearance class', () => {
      expect((mount(<ContainerItem appearance="settings" />).find(`.${containerItem}`)).hasClass((hasSettingsAppearance))).to.equal(true);
    });
  });
});
