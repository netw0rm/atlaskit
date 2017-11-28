import React from 'react';
import { shallow, mount } from 'enzyme';

import Item, { ItemGroup } from '../../src';

import { name } from '../../package.json';
import {
  GroupTitle,
  GroupTitleText,
  GroupTitleAfter,
} from '../../src/styled/ItemGroup';

describe(`${name} - ItemGroup`, () => {
  describe('props', () => {
    describe('children', () => {
      it('should render provided children', () => {
        const wrapper = shallow(
          <ItemGroup>
            <Item>Item one</Item>
            <Item>Item two</Item>
          </ItemGroup>
        );
        expect(wrapper.find('[role="group"]').find(Item).length).toBe(2);
      });
    });
    describe('title', () => {
      it('should render title if provided', () => {
        const wrapper = mount(<ItemGroup title="Hello" />);
        expect(wrapper.find(GroupTitleText).text()).toBe('Hello');
      });
      it('should not render title if omitted', () => {
        const wrapper = mount(<ItemGroup />);
        expect(wrapper.find(GroupTitle).length).toBe(0);
      });
    });
    describe('elemAfter', () => {
      it('should not be rendered if title is omitted', () => {
        const wrapper = mount(<ItemGroup elemAfter="Hello" />);
        expect(wrapper.find(GroupTitleAfter).length).toBe(0);
      });
      it('should be rendered if title is provided', () => {
        const wrapper = mount(<ItemGroup elemAfter="Hello" title="Hello" />);
        expect(wrapper.find(GroupTitleAfter).length).toBe(1);
      });
      it('should accept a string value', () => {
        const wrapper = mount(<ItemGroup elemAfter="Hello there" title="Hi" />);
        expect(wrapper.find(GroupTitleAfter).text()).toBe('Hello there');
      });
      it('should accept a node value', () => {
        const wrapper = mount(
          <ItemGroup
            elemAfter={<span className="after-custom" />}
            title="Hi"
          />
        );
        expect(wrapper.find('.after-custom').length).toBe(1);
      });
    });
  });

  describe('accessibility', () => {
    it('root element should have role="group" by default', () => {
      const wrapper = shallow(<ItemGroup />);
      expect(wrapper.prop('role')).toBe('group');
    });

    it('root element should apply role prop if supplied', () => {
      const wrapper = shallow(<ItemGroup role="menu" />);
      expect(wrapper.prop('role')).toBe('menu');
    });

    it('title should always have aria-hidden="true" because we use aria-label', () => {
      const wrapper = shallow(<ItemGroup title="Hello" />);
      expect(wrapper.find(GroupTitle).prop('aria-hidden')).toBe('true');
    });
  });
});
