/* eslint-disable  mocha/no-skipped-tests */
import { mount, shallow } from 'enzyme';
import React, { Component } from 'react';
import sinon from 'sinon';
import Button from '@atlaskit/button';

import {
  BreadcrumbsStateless as Breadcrumbs,
  BreadcrumbsItem as Item,
} from '../../src/';

import EllipsisItem from '../../src/components/EllipsisItem';

describe('BreadcrumbsStateless', () => {
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
      const wrapper = shallow(<Breadcrumbs
        onExpand={() => {}}
      />);
      expect(wrapper).not.to.equal(undefined);
      expect(wrapper.instance()).to.be.instanceOf(Component);
    });

    it('should be able to render a single child', () => {
      const wrapper = shallow(
        <Breadcrumbs
          onExpand={() => {}}
        >
          <Item>item</Item>
        </Breadcrumbs>
      );
      expect(wrapper.find(Item)).to.have.lengthOf(1);
    });

    it('should render multiple children', () => {
      const wrapper = mount(
        <Breadcrumbs
          onExpand={() => {}}
        >
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
        </Breadcrumbs>
      );
      expect(wrapper.find(Item).length).to.equal(3);
    });

    it('should not count empty children', () => {
      const wrapper = mount(
        <Breadcrumbs onExpand={() => {}} maxItems={3}>
          {null}
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
          {undefined}
          {false}
        </Breadcrumbs>
      );
      expect(wrapper.find(Item).length).to.equal(3);
    });

    describe('with enough items to collapse', () => {
      const firstItem = <Item hasSeparator>item1</Item>;
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
          ellipsisItem.find(Button).simulate('click');
          expect(expandSpy.callCount).to.equal(1);
        });
      });

      describe('and expanded', () => {
        beforeEach(() => {
          wrapper = mount(
            <Breadcrumbs onExpand={() => {}} maxItems={4} isExpanded>
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
