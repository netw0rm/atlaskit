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
        const wrapper = shallow(<ItemGroup />);
        expect(wrapper.find(GroupTitle).length).toBe(0);
      });
    });
    describe('elemAfter', () => {
      it('should not be rendered if title is omitted', () => {
        const wrapper = shallow(<ItemGroup elemAfter="Hello" />);
        expect(wrapper.find(GroupTitleAfter).length).toBe(0);
      });
      it('should be rendered if title is provided', () => {
        const wrapper = shallow(<ItemGroup elemAfter="Hello" title="Hello" />);
        expect(wrapper.find(GroupTitleAfter).length).toBe(1);
      });
      it('should accept a string value', () => {
        const wrapper = mount(<ItemGroup elemAfter="Hello there" title="Hi" />);
        expect(wrapper.find(GroupTitleAfter).text()).toBe('Hello there');
      });
      it('should accept a node value', () => {
        const wrapper = shallow(
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

    describe('root element aria-label', () => {
      let wrapper;
      let currentLabel;

      beforeEach(() => {
        wrapper = mount(<ItemGroup title="Hello" />);
        currentLabel = () => (wrapper.find('[aria-label]').prop('aria-label'));
      });

      it('should match title prop if no elemAfter provided', () => {
        expect(currentLabel()).toBe('Hello');
      });
      it('should contain title and elemAfter if elemAfter is a string', () => {
        wrapper.setProps({ elemAfter: 'AK-1234' });
        expect(currentLabel()).toBe('Hello AK-1234');
      });
      it('should contain title and elemAfter text content if elemAfter is JSX', () => {
        wrapper.setProps({
          elemAfter: (
            <div>
              <span>there </span>
              <span>friend</span>
            </div>
          ),
        });
        expect(currentLabel()).toBe('Hello there friend');
      });
    });
  });

  // aria-hidden="true" always (need title prop)
});
