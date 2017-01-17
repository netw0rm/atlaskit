import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Tabs, { StatelessTabs } from '../src';
import { sampleTabs, sampleTabsNoSelection, sampleTabsDefaultSelected } from './_constants';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Tabs', () => {
    describe('exports', () => {
      it('the Tabs component', () => {
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

      it('should render the StatelessTabs', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabsDefaultSelected} />);
        const statelessTabs = wrapper.find(StatelessTabs);
        expect(statelessTabs).to.have.lengthOf(1);
      });
    });

    describe('props', () => {
      describe('tabs prop', () => {
        it('is reflected to the StatelessTabs with no selection when no defaultSelected tab is specified', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsNoSelection} />);
          expect(wrapper.find(StatelessTabs).prop('tabs').filter(tab => tab.isSelected).length)
            .to.equal(0);
        });

        it('is reflected to the StatelessTabs with no selection when isSelected tab is specified', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabs} />);
          expect(wrapper.find(StatelessTabs).prop('tabs').filter(tab => tab.isSelected).length)
            .to.equal(0);
        });

        it('is reflected to the StatelessTabs with selection when defaultSelected is specified', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsDefaultSelected} />);
          expect(wrapper.find(StatelessTabs).prop('tabs').filter(tab => tab.isSelected).length)
            .to.equal(1);
          expect(wrapper.find(StatelessTabs).prop('tabs')[1].isSelected).to.equal(true);
        });

        it('is reflected to the StatelessTabs with selection when defaultSelected is specified and the first tab is selected', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsDefaultSelected} />);
          wrapper.setState({ selectedTab: 0 });
          expect(wrapper.find(StatelessTabs).prop('tabs').filter(tab => tab.isSelected).length)
            .to.equal(1);
          expect(wrapper.find(StatelessTabs).prop('tabs')[0].isSelected).to.equal(true);
        });
      });
    });
  });
});
