import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Tabs from '../src/Tabs';
import TabsNav from '../src/internal/TabsNav';
import Tab from '../src/internal/Tab';
import { sampleTabs, sampleTabsNoSelection } from './_constants';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('StatelessTabs', () => {
    describe('exports', () => {
      it('the StatelessTabs component', () => {
        expect(Tabs).to.exist;
        expect(new Tabs()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Tabs />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render the TabsNav navigation item', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabs} />);

        const tabsNav = wrapper.find(TabsNav);
        expect(tabsNav).to.have.lengthOf(1);
        expect(tabsNav).to.have.prop('tabs', sampleTabs);
      });

      it('should render the selected Tab item', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabs} />);
        const selectedTab = sampleTabs[1];

        const tab = wrapper.find(Tab);
        expect(tab).to.have.lengthOf(1);
        expect(tab).to.have.prop('isSelected', selectedTab.isSelected);
        expect(tab).to.contain(selectedTab.content);
      });

      it('should not render a Tab item if there is no selected tab', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabsNoSelection} />);
        const tab = wrapper.find(Tab);
        expect(tab).to.not.exist;
      });
    });
  });
});
