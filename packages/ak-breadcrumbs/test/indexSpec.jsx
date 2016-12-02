import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs, { AkBreadcrumbsItem as Item } from '../src/';
import styles from '../src/styles.less';
import { EllipsisItem } from '../src/internal/helpers';
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
      expect(wrapper.state().expanded).to.equal(false);
    });

    it('should be able to render a single child', () => {
      const wrapper = shallow(
        <Breadcrumbs items={<Item>item</Item>} />
      );
      const containerDiv = wrapper.find(`.${styles.locals.container}`);
      expect(containerDiv).to.have.lengthOf(1);
      expect(containerDiv.find(Item)).to.have.lengthOf(1);
    });

    it('should render all children inside a container div', () => {
      const wrapper = shallow(
        <Breadcrumbs
          items={[
            <Item>item</Item>,
            <Item>item</Item>,
            <Item>item</Item>,
          ]}
        />
      );
      const containerDiv = wrapper.find(`.${styles.locals.container}`);
      expect(containerDiv).to.have.lengthOf(1);
      expect(containerDiv.find(Item)).to.have.lengthOf(3);
    });

    describe('renders an ellipsis item', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(
          <Breadcrumbs
            items={[
              <Item>item</Item>,
              <Item>item</Item>,
              <Item>item</Item>,
            ]}
          />
        );
      });

      it('when there are more than two items', () => {
        expect(wrapper.find(EllipsisItem)).to.have.lengthOf(1);
      });

      it('which updates the expanded state when clicked', () => {
        const ellipsisItem = wrapper.find(EllipsisItem);
        expect(wrapper.state().expanded).to.equal(false);
        ellipsisItem.simulate('click');
        expect(wrapper.state().expanded).to.equal(true);
      });
    });

    describe('with more than 8 items', () => {
      it('applies the collapsed class', () => {
        const wrapper = shallow(
          <Breadcrumbs
            items={[
              <Item>item</Item>, <Item>item</Item>, <Item>item</Item>,
              <Item>item</Item>, <Item>item</Item>, <Item>item</Item>,
              <Item>item</Item>, <Item>item</Item>, <Item>item</Item>,
            ]}
          />
        );
        expect(wrapper.find(`.${styles.locals.collapsed}`)).to.have.lengthOf(1);
      });
    });
  });
});
