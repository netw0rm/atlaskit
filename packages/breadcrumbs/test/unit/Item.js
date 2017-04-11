import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Button from '@atlaskit/button';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

import Item from '../../src/BreadcrumbsItem';
import { itemTruncateWidth } from '../../src/internal/constants';
import { setItemWidth } from '../_helpers';

describe('BreadcrumbsItem', () => {
  describe('exports', () => {
    it('the BreadcrumbsItem component', () => {
      expect(Item).not.to.equal(undefined);
      expect(new Item()).to.be.instanceOf(Component);
    });
  });

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Item />);
      expect(wrapper).not.to.equal(undefined);
      expect(wrapper.instance()).to.be.instanceOf(Component);
    });

    it('should set the initial state correctly', () => {
      const wrapper = shallow(<Item />);
      expect(wrapper.state().hasOverflow).to.equal(false);
    });

    it('should render a link Button containing the content', () => {
      const text = 'text';
      const wrapper = mount(<Item text={text} />);
      expect(wrapper.find(Button).text()).to.equal(text);
    });
  });

  describe('props', () => {
    describe('item prop', () => {
      it('should be reflected to the Button content', () => {
        const text = 'text';
        const wrapper = mount(<Item text={text} />);
        expect(wrapper.find(Button).text()).to.equal(text);
      });
    });
    describe('href prop', () => {
      it('should be reflected to the Button', () => {
        const href = '/my/href/';
        const wrapper = mount(<Item href={href} />);
        expect(wrapper.find(Button).prop('href')).to.equal(href);
      });
      describe('iconAfter prop', () => {
        it('should be reflected to the Button', () => {
          const icon = <AtlassianIcon label="icon" />;
          const wrapper = shallow(<Item iconAfter={icon} />);
          expect(wrapper.find(Button).prop('iconAfter')).to.equal(icon);
        });
      });
      describe('iconBefore prop', () => {
        it('should be reflected to the Button', () => {
          const icon = <AtlassianIcon label="icon" />;
          const wrapper = shallow(<Item iconBefore={icon} />);
          expect(wrapper.find(Button).prop('iconBefore')).to.equal(icon);
        });
      });
    });
  });

  describe('overflow calculation', () => {
    let item;
    const animStub = window.cancelAnimationFrame;

    beforeEach(() => {
      window.cancelAnimationFrame = () => {};
      const wrapper = mount(<Item>content</Item>);
      item = wrapper.instance();
    });

    afterEach(() => {
      window.cancelAnimationFrame = animStub;
    });

    it('for an item which is truncated', () => {
      setItemWidth(item, itemTruncateWidth);
      expect(item.updateOverflow()).to.equal(true);
    });

    it('for an item which is not truncated', () => {
      setItemWidth(item, itemTruncateWidth - 1);
      expect(item.updateOverflow()).to.equal(false);
    });
  });
});
