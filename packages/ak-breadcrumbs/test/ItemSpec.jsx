import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Button from 'ak-button';

import Item from '../src/BreadcrumbsItem';
import { locals } from '../src/styles.less';
import { itemTruncateWidth } from '../src/internal/constants';
import { name } from '../package.json';
import { setItemWidth } from './_helpers';


const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('exports', () => {
    it('the BreadcrumbsItem component', () => {
      expect(Item).to.not.be.undefined;
      expect(new Item()).to.be.instanceOf(Component);
    });
  });

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Item />);
      expect(wrapper).to.be.defined;
      expect(wrapper.instance()).to.be.instanceOf(Component);
    });

    it('should set the initial state correctly', () => {
      const wrapper = shallow(<Item />);
      expect(wrapper.state().hasOverflow).to.equal(false);
    });

    it('should render a link Button containing the content', () => {
      const children = 'children';
      const wrapper = shallow(<Item>{children}</Item>);
      expect(wrapper.find(Button).contains(children)).to.equal(true);
    });

    it('should render a Tooltip with the item content', () => {
      const children = (<span>content</span>);
      const wrapper = shallow(<Item>{children}</Item>);
      const tooltip = wrapper.find(`.${locals.tooltip}`);
      expect(tooltip).to.exist;
      expect(tooltip.contains(children)).to.equal(true);
    });
  });

  describe('props', () => {
    describe('href prop', () => {
      it('should be reflected to the Button', () => {
        const href = '/my/href/';
        const wrapper = mount(<Item href={href}>content</Item>);
        expect(wrapper.find(Button)).to.have.attr('href', href);
      });
    });
  });

  describe('overflow calculation', () => {
    let item;

    beforeEach(() => {
      const wrapper = mount(<Item>content</Item>);
      item = wrapper.instance();
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
