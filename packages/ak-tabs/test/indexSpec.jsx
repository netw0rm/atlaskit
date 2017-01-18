import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import Tabs, { StatelessTabs } from '../src';
import styles from '../src/styles.less';
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

    describe('behaviour', () => {
      describe('keyboard navigation', () => {
        describe('with 3 tabs, when the 2nd tab is selected', () => {
          let wrapper;
          const simulateKeyboardNav = (key) => {
            wrapper.find(`.${styles.locals.akTabLabelSelected}`).simulate('keyDown', { key });
          };

          beforeEach(() => {
            wrapper = mount(<Tabs tabs={sampleTabsDefaultSelected} />);
          });

          it('pressing LEFT arrow selects the first tab', () => {
            expect(wrapper.state().selectedTab).to.equal(1);
            simulateKeyboardNav('ArrowLeft');
            expect(wrapper.state().selectedTab).to.equal(0);
          });

          it('pressing the RIGHT arrow selects the last tab', () => {
            expect(wrapper.state().selectedTab).to.equal(1);
            simulateKeyboardNav('ArrowRight');
            expect(wrapper.state().selectedTab).to.equal(2);
          });

          it('pressing the LEFT arrow twice leaves selection on the first tab', () => {
            expect(wrapper.state().selectedTab).to.equal(1);
            simulateKeyboardNav('ArrowLeft');
            simulateKeyboardNav('ArrowLeft');
            expect(wrapper.state().selectedTab).to.equal(0);
          });

          it('pressing the RIGHT arrow twice leaves selection on the last tab', () => {
            expect(wrapper.state().selectedTab).to.equal(1);
            simulateKeyboardNav('ArrowRight');
            simulateKeyboardNav('ArrowRight');
            expect(wrapper.state().selectedTab).to.equal(2);
          });
        });
      });
    });
  });
});
