/* eslint-disable  mocha/no-skipped-tests */
import { mount, shallow } from 'enzyme';
import React, { Component } from 'react';
import sinon from 'sinon';

import {
  AkBreadcrumbs as Breadcrumbs,
  AkBreadcrumbsItem as Item,
} from '../../src/';

import EllipsisItem from '../../src/internal/EllipsisItem';

const locals = undefined;

describe('AkBreadcrumbs', () => {
  describe('exports', () => {
    it('the React component, and the Item component', () => {
      expect(Breadcrumbs).not.to.equal(undefined);
      expect(Item).not.to.equal(undefined);
      expect(new Breadcrumbs()).to.be.instanceOf(Component);
      expect(new Item()).to.be.instanceOf(Component);
    });
  });

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Breadcrumbs />);
      expect(wrapper).not.to.equal(undefined);
      expect(wrapper.instance()).to.be.instanceOf(Component);
    });

    it.skip('should be able to render a single child', () => {
      const wrapper = shallow(
        <Breadcrumbs>
          <Item>item</Item>
        </Breadcrumbs>
      );
      const containerDiv = wrapper.find(`.${locals.container}`);
      expect(containerDiv).to.have.lengthOf(1);
      expect(containerDiv.find(Item)).to.have.lengthOf(1);
    });

    it.skip('should render all children inside a container div', () => {
      const wrapper = mount(
        <Breadcrumbs>
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
        </Breadcrumbs>
      );
      const containerDiv = wrapper.find(`.${locals.container}`);
      expect(containerDiv).to.have.length.above(0);
      expect(containerDiv.find(Item).length).to.equal(3);
    });

    describe('with enough items to collapse', () => {
      const firstItem = <Item>item1</Item>;
      const lastItem = <Item>item2</Item>;
      const expandSpy = sinon.spy();
      let wrapper;

      describe('and not expanded', () => {
        beforeEach(() => {
          wrapper = mount(
            <Breadcrumbs maxItems={4} onExpand={expandSpy}>
              {firstItem}
              <Item>item2</Item>
              <Item>item3</Item>
              <Item>item4</Item>
              {lastItem}
            </Breadcrumbs>
          );
        });

        it('renders only the first and last items, and an ellipsis item', () => {
          expect(wrapper.find(Item).length).to.equal(2);
          expect(wrapper.contains(firstItem)).to.equal(true);
          expect(wrapper.contains(lastItem)).to.equal(true);
          expect(wrapper.find(EllipsisItem).length).to.equal(1);
        });

        it('calls the onExpand handler when the ellipsis is clicked', () => {
          const ellipsisItem = wrapper.find(EllipsisItem);
          ellipsisItem.simulate('click');
          expect(expandSpy.callCount).to.equal(1);
        });
      });

      describe('and expanded', () => {
        beforeEach(() => {
          wrapper = mount(
            <Breadcrumbs maxItems={4} isExpanded>
              <Item>item1</Item>
              <Item>item2</Item>
              <Item>item3</Item>
              <Item>item4</Item>
            </Breadcrumbs>
          );
        });

        it('renders all the items', () => {
          expect(wrapper.props().isExpanded).to.equal(true);
          expect(wrapper.find(Item).length).to.equal(4);
          expect(wrapper.find(EllipsisItem).length).to.equal(0);
        });
      });
    });
  });
});
