import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount } from 'enzyme';

import Breadcrumbs, {
  AkBreadcrumbs,
  AkBreadcrumbsItem as Item,
} from '../src/';
import EllipsisItem from '../src/internal/EllipsisItem';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());


describe(name, () => {
  describe('Breadcrumbs', () => {
    describe('exports', () => {
      it('the smart React component, Breadcrumbs component, and the Item component', () => {
        expect(Breadcrumbs).to.exist;
        expect(AkBreadcrumbs).to.exist;
        expect(Item).to.exist;
        expect(new Breadcrumbs()).to.be.instanceOf(Component);
        expect(new AkBreadcrumbs()).to.be.instanceOf(Component);
        expect(new Item()).to.be.instanceOf(Component);
      });
    });

    describe('with more than 8 items', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <Breadcrumbs>
            <Item>item1</Item>
            <Item>item2</Item>
            <Item>item3</Item>
            <Item>item4</Item>
            <Item>item5</Item>
            <Item>item6</Item>
            <Item>item7</Item>
            <Item>item8</Item>
            <Item>item9</Item>
          </Breadcrumbs>
        );
      });

      it('updates the expanded state when the ellipsis is clicked', () => {
        expect(wrapper.state().isExpanded).to.equal(false);
        expect(wrapper.find(AkBreadcrumbs).props().isExpanded).to.equal(false);

        const ellipsisItem = wrapper.find(EllipsisItem);
        ellipsisItem.simulate('click');
        expect(wrapper.state().isExpanded).to.equal(true);
        expect(wrapper.find(AkBreadcrumbs).props().isExpanded).to.equal(true);
      });
    });
  });
});
