import chai from 'chai';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import TabPane from '../../src/components/TabPane';
import TabPaneDiv from '../../src/styled/TabPane';
import { name } from '../../package.json';

const { expect } = chai;

describe(name, () => {
  describe('TabPane', () => {
    describe('exports', () => {
      it('the TabPane component', () => {
        expect(TabPane).not.to.equal(undefined);
        expect(new TabPane()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabPane />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a container wrapping the content', () => {
        const content = <span>My content</span>;
        const wrapper = shallow(<TabPane>{content}</TabPane>);
        const container = wrapper.find(TabPaneDiv);
        expect(container.props().children).to.equal(content);
      });
    });

    describe('props', () => {
      describe('isSelected prop', () => {
        it('should default to false and set aria-hidden to true', () => {
          const wrapper = shallow(<TabPane />);
          expect(wrapper.props()['aria-hidden']).to.equal('true');
          expect(wrapper.find(TabPaneDiv).props().selected).to.equal(false);
        });

        it('should set aria attribute and styles', () => {
          const wrapper = shallow(<TabPane isSelected />);
          expect(wrapper.props()['aria-hidden']).to.equal('false');
          expect(wrapper.find(TabPaneDiv).props().selected).to.equal(true);
        });
      });
    });
  });
});
