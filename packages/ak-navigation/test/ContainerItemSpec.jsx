import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import {
  containerItem,
  hasGlobalAppearance,
} from 'style!../src/components/less/ContainerItem.less';
import ContainerItem from '../src/components/js/ContainerItem';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

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
      { prop: 'text', value: 'foo' },
      { prop: 'textAfter', value: 'foo' },
    ].forEach(({ prop, value }) => {
      it(`passes on ${prop} to <NavigationItem />`, () => expect(passesOnProp(prop, value)).to.equal(true));
    });

    it('appearnace="global" should render with the global appearance class', () => {
      expect(mount(<ContainerItem appearance="global" />).find(`.${containerItem}`)).to.have.className(hasGlobalAppearance);
    });
  });
});
