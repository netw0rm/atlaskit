import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import TabPane from '../src/internal/TabPane';
import styles from '../src/styles.less';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('TabPane', () => {
    describe('exports', () => {
      it('the TabPane component', () => {
        expect(TabPane).to.exist;
        expect(new TabPane()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabPane />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a container wrapping the content', () => {
        const content = <span>My content</span>;
        const wrapper = shallow(<TabPane>{content}</TabPane>);
        expect(wrapper).to.have.attr('aria-hidden', 'false');

        const container = wrapper.find(`.${styles.locals.akTabPane}`);
        expect(container).to.contain(content);
      });
    });

    describe('props', () => {
      describe('isSelected prop', () => {
        it('should set aria attribute and styles', () => {
          const wrapper = shallow(<TabPane isSelected />);
          expect(wrapper).to.have.attr('aria-hidden', 'true');
          expect(wrapper.find(`.${styles.locals.akTabPane}`)).to.have.className(styles.locals.selected);
        });
      });
    });
  });
});
