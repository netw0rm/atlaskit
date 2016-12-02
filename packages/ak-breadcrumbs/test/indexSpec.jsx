import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs, { AkBreadcrumbsItem as Item } from '../src/';
import styles from '../src/styles.less';
import EllipsisItem from '../src/internal/EllipsisItem';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());


describe(name, () => {
  describe('exports', () => {
    it('the React component, and the Item component', () => {
      expect(Breadcrumbs).to.not.be.undefined;
      expect(Item).to.not.be.undefined;
      expect(new Breadcrumbs()).to.be.instanceOf(Component);
      expect(new Item()).to.be.instanceOf(Component);
    });
  });

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Breadcrumbs />);
      expect(wrapper).to.be.defined;
      expect(wrapper.instance()).to.be.instanceOf(Component);
      expect(wrapper.state().isExpanded).to.equal(false);
    });

    it('should be able to render a single child', () => {
      const wrapper = shallow(
        <Breadcrumbs>
          <Item>item</Item>
        </Breadcrumbs>
      );
      const containerDiv = wrapper.find(`.${styles.locals.container}`);
      expect(containerDiv).to.have.lengthOf(1);
      expect(containerDiv.find(Item)).to.have.lengthOf(1);
    });

    it('should render all children inside a container div', () => {
      const wrapper = shallow(
        <Breadcrumbs>
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
        </Breadcrumbs>
      );
      const containerDiv = wrapper.find(`.${styles.locals.container}`);
      expect(containerDiv).to.have.lengthOf(1);
      expect(containerDiv.find(Item)).to.have.lengthOf(3);
    });

    describe('with more than 8 items', () => {
      const firstItem = <Item>item1</Item>;
      const lastItem = <Item>item2</Item>;
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <Breadcrumbs>
            {firstItem}
            <Item>item2</Item>
            <Item>item3</Item>
            <Item>item4</Item>
            <Item>item5</Item>
            <Item>item6</Item>
            <Item>item7</Item>
            <Item>item8</Item>
            {lastItem}
          </Breadcrumbs>
        );
      });

      it('renders only the first and last items, and an ellipsis item', () => {
        expect(wrapper.find(Item)).to.have.lengthOf(2);
        expect(wrapper.contains(firstItem)).to.equal(true);
        expect(wrapper.contains(lastItem)).to.equal(true);
        expect(wrapper.find(EllipsisItem)).to.have.lengthOf(1);
      });

      it('updates the expanded state when the ellipsis is clicked', () => {
        const ellipsisItem = wrapper.find(EllipsisItem);
        expect(wrapper.state().isExpanded).to.equal(false);
        ellipsisItem.simulate('click');
        expect(wrapper.state().isExpanded).to.equal(true);
      });

      it('applies the collapsed class', () => {
        expect(wrapper.find(`.${styles.locals.collapsed}`)).to.have.lengthOf(1);
      });
    });
  });
});
