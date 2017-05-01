import sinon from 'sinon';

import React, { Component } from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import TabsNav from '../../src/internal/TabsNav';
import styles from '../../src/styles.less';
import { name } from '../../package.json';
import { sampleTabs } from './_constants';

const { expect } = chai;

describe(name, () => {
  describe('TabsNav', () => {
    const kbNav = () => {};

    describe('exports', () => {
      it('the TabsNav component', () => {
        expect(TabsNav).not.to.equal(undefined);
        expect(new TabsNav()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabsNav onKeyboardNav={kbNav} />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a list container', () => {
        const wrapper = shallow(<TabsNav />);
        expect(wrapper.type()).to.equal('div');
        const ul = wrapper.find('ul').at(0);
        expect(ul.props().className).to.equal(styles.akTabLabels);
        expect(ul.props().role).to.equal('tablist');
      });
    });

    describe('props', () => {
      describe('tabs prop', () => {
        it('should render a matching list item for each tab', () => {
          const wrapper = shallow(<TabsNav tabs={sampleTabs} onKeyboardNav={kbNav} />);
          const items = wrapper.find(`.${styles.akTabLabel}`);
          expect(items).to.have.length(sampleTabs.length);

          items.forEach((item, i) => {
            expect(item.props()['aria-posinset']).to.equal(i + 1);
            expect(item.props()['aria-setsize']).to.equal(sampleTabs.length);
            expect(item.props().role).to.equal('tab');
            expect(item.props().tabIndex).to.equal(sampleTabs[i].isSelected ? 0 : -1);
            expect(item.props().children).to.equal(sampleTabs[i].label);
            if (sampleTabs[i].isSelected) {
              expect(item.props()['aria-selected']).to.equal(sampleTabs[i].isSelected);
              expect(item.props().className).to.contain(styles.akTabLabelSelected);
            } else {
              expect(item.props().className).to.equal(styles.akTabLabel);
            }
          });
        });
      });
    });

    describe('props', () => {
      describe('onKeyboardNav', () => {
        const keys = ['ArrowRight', 'ArrowLeft'];
        keys.forEach((key) => {
          it(`is called in response to ${key} key press`, () => {
            const spy = sinon.spy();
            const wrapper = shallow(<TabsNav
              onKeyboardNav={spy}
              tabs={sampleTabs}
            />);
            wrapper.find(`.${styles.akTabLabel}`).at(1).simulate('keyDown', { key });
            expect(spy.calledOnce).to.equal(true);
            expect(spy.args[0][0]).to.equal(key);
          });
        });
      });
    });
  });
});
