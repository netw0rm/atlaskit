import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import TabsNav from '../src/internal/TabsNav';
import styles from '../src/styles.less';
import { name } from '../package.json';
import { sampleTabs } from './_constants';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('TabsNav', () => {
    describe('exports', () => {
      it('the TabsNav component', () => {
        expect(TabsNav).to.exist;
        expect(new TabsNav()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabsNav />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a list container', () => {
        const wrapper = shallow(<TabsNav />);
        expect(wrapper.type()).to.equal('ul');
        expect(wrapper).to.have.className(styles.locals.akTabLabels);
        expect(wrapper).to.have.attr('role', 'tablist');
      });
    });

    describe('props', () => {
      describe('tabs prop', () => {
        it('should render a matching list item for each tab', () => {
          const wrapper = shallow(<TabsNav tabs={sampleTabs} />);
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
  });
});
