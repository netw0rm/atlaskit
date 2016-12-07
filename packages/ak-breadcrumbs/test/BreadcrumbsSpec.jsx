import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import {
  AkBreadcrumbs as Breadcrumbs,
  AkBreadcrumbsItem as Item,
} from '../src/';
import { locals } from '../src/styles.less';
import EllipsisItem from '../src/internal/EllipsisItem';
import { name } from '../package.json';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiEnzyme());


describe(name, () => {
  describe('Breadcrumbs', () => {
    describe('exports', () => {
      it('the React component, and the Item component', () => {
        expect(Breadcrumbs).to.exist;
        expect(Item).to.exist;
        expect(new Breadcrumbs()).to.be.instanceOf(Component);
        expect(new Item()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Breadcrumbs />);
        expect(wrapper).to.be.defined;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should be able to render a single child', () => {
        const wrapper = shallow(
          <Breadcrumbs>
            <Item>item</Item>
          </Breadcrumbs>
        );
        const containerDiv = wrapper.find(`.${locals.container}`);
        expect(containerDiv).to.have.lengthOf(1);
        expect(containerDiv.find(Item)).to.have.lengthOf(1);
      });

      it('should render all children inside a container div', () => {
        const wrapper = mount(
          <Breadcrumbs>
            <Item>item</Item>
            <Item>item</Item>
            <Item>item</Item>
          </Breadcrumbs>
        );
        const containerDiv = wrapper.find(`.${locals.container}`);
        expect(containerDiv).to.exist;
        expect(containerDiv).to.have.exactly(3).descendants(Item);
      });

      describe('with more than 8 items', () => {
        const firstItem = <Item>item1</Item>;
        const lastItem = <Item>item2</Item>;
        const expandSpy = sinon.spy();
        let wrapper;

        describe('and not expanded', () => {
          beforeEach(() => {
            wrapper = mount(
              <Breadcrumbs onExpand={expandSpy}>
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
            expect(wrapper).to.have.exactly(2).descendants(Item);
            expect(wrapper).to.contain(firstItem);
            expect(wrapper).to.contain(lastItem);
            expect(wrapper).to.have.exactly(1).descendants(EllipsisItem);
          });

          it('calls the onExpand handler when the ellipsis is clicked', () => {
            const ellipsisItem = wrapper.find(EllipsisItem);
            ellipsisItem.simulate('click');
            expect(expandSpy).to.have.been.calledOnce;
          });
        });

        describe('and expanded', () => {
          beforeEach(() => {
            wrapper = mount(
              <Breadcrumbs isExpanded>
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

          it('renders all the items', () => {
            expect(wrapper.props().isExpanded).to.equal(true);
            expect(wrapper).to.have.exactly(9).descendants(Item);
            expect(wrapper).to.not.have.descendants(EllipsisItem);
          });
        });
      });
    });
  });
});
