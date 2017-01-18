import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Tabs from '../src/Tabs';
import TabsNav from '../src/internal/TabsNav';
import TabPane from '../src/internal/TabPane';
import { sampleTabs, sampleTabsNoSelection } from './_constants';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('StatelessTabs', () => {
    const kbNav = () => {};

    describe('exports', () => {
      it('the StatelessTabs component', () => {
        expect(Tabs).to.exist;
        expect(new Tabs()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Tabs onKeyboardNav={kbNav} />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render the TabsNav element', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabs} onKeyboardNav={kbNav} />);

        const tabsNav = wrapper.find(TabsNav);
        expect(tabsNav).to.have.lengthOf(1);
        expect(tabsNav).to.have.prop('tabs', sampleTabs);
      });

      it('should render the selected TabPane item', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabs} onKeyboardNav={kbNav} />);
        const selectedTab = sampleTabs[1];

        const tab = wrapper.find(TabPane);
        expect(tab).to.have.lengthOf(1);
        expect(tab).to.have.prop('isSelected', selectedTab.isSelected);
        expect(tab).to.contain(selectedTab.content);
      });

      it('should not render a TabPane item if there is no selected tab', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabsNoSelection} onKeyboardNav={kbNav} />);
        const tab = wrapper.find(TabPane);
        expect(tab).to.not.exist;
      });
    });

    describe('props', () => {
      describe('onKeyboardNav prop', () => {
        it('should be reflected to the TabsNav element', () => {
          const keyboardNavHandler = () => {};
          const wrapper = shallow(<Tabs onKeyboardNav={keyboardNavHandler} />);
          expect(wrapper.find(TabsNav).prop('onKeyboardNav')).to.equal(keyboardNavHandler);
        });
      });
    });
  });
});
