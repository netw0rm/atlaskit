import React, { Component } from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';

import TabsNav from '../src/internal/TabsNav';
import styles from '../src/styles.less';
import { name } from '../package.json';
import { sampleTabs } from './_constants';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiEnzyme());

describe(name, () => {
  describe('TabsNav', () => {
    const kbNav = () => {};

    describe('exports', () => {
      it('the TabsNav component', () => {
        expect(TabsNav).to.exist;
        expect(new TabsNav()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabsNav onKeyboardNav={kbNav} />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a list container', () => {
        const wrapper = shallow(<TabsNav onKeyboardNav={kbNav} />);
        expect(wrapper.type()).to.equal('ul');
        expect(wrapper).to.have.className(styles.locals.akTabLabels);
        expect(wrapper).to.have.attr('role', 'tablist');
      });
    });

    describe('props', () => {
      describe('tabs prop', () => {
        it('should render a matching list item for each tab', () => {
          const wrapper = shallow(<TabsNav tabs={sampleTabs} onKeyboardNav={kbNav} />);
          const items = wrapper.find(`.${styles.locals.akTabLabel}`);
          expect(items).to.have.length(sampleTabs.length);

          items.forEach((item, i) => {
            expect(item).to.have.prop('aria-posinset', i + 1);
            expect(item).to.have.prop('aria-setsize', sampleTabs.length);
            expect(item).to.have.prop('role', 'tab');
            expect(item).to.have.prop('tabIndex', sampleTabs[i].isSelected ? 0 : -1);
            expect(item).to.have.className(styles.locals.akTabLabel);
            expect(item).to.contain(sampleTabs[i].label);
            if (sampleTabs[i].isSelected) {
              expect(item).to.have.attr('aria-selected', `${sampleTabs[i].isSelected}`);
              expect(item).to.have.className(styles.locals.akTabLabel);
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
            wrapper.find(`.${styles.locals.akTabLabel}`).at(1).simulate('keyDown', { key });
            expect(spy.calledOnce).to.equal(true);
            expect(spy.args[0][0]).to.equal(key);
          });
        });
      });
    });
  });
});
