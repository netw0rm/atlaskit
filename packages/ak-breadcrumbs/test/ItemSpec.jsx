import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Button from 'ak-button';

import Item from '../src/BreadcrumbsItem';
import styles from '../src/styles.less';
import { name } from '../package.json';


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

    it('should render a link Button containing the content', () => {
      const children = 'children';
      const wrapper = shallow(<Item>{children}</Item>);
      expect(wrapper.find(Button).contains(children)).to.equal(true);
    });

    it('should render a Tooltip with the item content', () => {
      const children = (<span>content</span>);
      const wrapper = shallow(<Item>{children}</Item>);
      const tooltip = wrapper.find(`.${styles.locals.tooltip}`);
      expect(tooltip).to.have.lengthOf(1);
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
});
