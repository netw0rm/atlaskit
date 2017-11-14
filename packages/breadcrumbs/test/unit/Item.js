import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Button from '@atlaskit/button';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

import Item from '../../src/components/BreadcrumbsItem';
import { setItemWidth } from './_helpers';

describe('BreadcrumbsItem', () => {
  describe('exports', () => {
    it('the BreadcrumbsItem component', () => {
      expect(Item).not.toBe(undefined);
      expect(new Item()).toBeInstanceOf(Component);
    });
  });

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Item />);
      expect(wrapper).not.toBe(undefined);
      expect(wrapper.instance()).toBeInstanceOf(Component);
    });

    it('should set the initial state correctly', () => {
      const wrapper = shallow(<Item />);
      expect(wrapper.state().hasOverflow).toBe(false);
    });

    it('should render a link Button containing the content', () => {
      const text = 'text';
      const wrapper = mount(<Item text={text} />);
      expect(wrapper.find(Button).text()).toBe(text);
    });
  });

  describe('props', () => {
    describe('item prop', () => {
      it('should be reflected to the Button content', () => {
        const text = 'text';
        const wrapper = mount(<Item text={text} />);
        expect(wrapper.find(Button).text()).toBe(text);
      });
    });
    describe('href prop', () => {
      it('should be reflected to the Button', () => {
        const href = '/my/href/';
        const wrapper = mount(<Item href={href} />);
        expect(wrapper.find(Button).prop('href')).toBe(href);
      });
    });
    describe('iconAfter prop', () => {
      it('should be reflected to the Button', () => {
        const icon = <AtlassianIcon label="icon" />;
        const wrapper = mount(<Item iconAfter={icon} />);
        expect(wrapper.find(Button).prop('iconAfter')).toBe(icon);
      });
    });
    describe('iconBefore prop', () => {
      it('should be reflected to the Button', () => {
        const icon = <AtlassianIcon label="icon" />;
        const wrapper = mount(<Item iconBefore={icon} />);
        expect(wrapper.find(Button).prop('iconBefore')).toBe(icon);
      });
    });
    describe('target prop', () => {
      it('should be reflected to the Button', () => {
        const target = '_top';
        const wrapper = mount(<Item target={target} />);
        expect(wrapper.find(Button).prop('target')).toBe(target);
      });
    });
    describe('onClick prop', () => {
      it('should be reflected to the Button', () => {
        const onClick = () => 'onClickFn';
        const wrapper = mount(<Item onClick={onClick} />);
        expect(wrapper.find(Button).prop('onClick')).toBe(onClick);
      });
    });
    /* eslint-disable react/prop-types, no-unused-vars */
    describe('component prop', () => {
      it('should be reflected to the Button', () => {
        let expectedProps;
        const Link = (props) => {
          const {
            innerRef,
            truncationWidth,
            iconAfter,
            iconBefore,
            children,
            to,
            ...rest
          } = props;
          expectedProps = rest;
          return <a href={to} {...rest}>{children}</a>;
        };
        const actualComponent = mount(
          <Item component={props => <Link to={'/custom/component'} {...props}>Custom component</Link>} />
        ).find(Link);
        expect(actualComponent.length).toBe(1);
        Object.keys(expectedProps).forEach(expectedProp =>
          expect(Object.keys(actualComponent.props()).includes(expectedProp)).toBe(true));
        expect(actualComponent.props().to).toBe('/custom/component');
      });
    });
  });

  describe('overflow calculation', () => {
    const truncationWidth = 200;
    let item;
    const animStub = window.cancelAnimationFrame;

    beforeEach(() => {
      window.cancelAnimationFrame = () => {};
      const wrapper = mount(<Item truncationWidth={truncationWidth}>content</Item>);
      item = wrapper.instance();
    });

    afterEach(() => {
      window.cancelAnimationFrame = animStub;
    });

    it('for an item which is truncated', () => {
      setItemWidth(item, truncationWidth);
      expect(item.updateOverflow()).toBe(true);
    });

    it('for an item which is not truncated', () => {
      setItemWidth(item, truncationWidth - 1);
      expect(item.updateOverflow()).toBe(false);
    });
  });
});
