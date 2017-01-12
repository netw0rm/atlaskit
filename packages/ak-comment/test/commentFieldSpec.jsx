import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import CommentField from '../src/internal/CommentField';
import styles from '../src/styles.less';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('CommentField', () => {
    describe('exports', () => {
      it('the CommentField component', () => {
        expect(CommentField).to.exist;
        expect(new CommentField()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<CommentField />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      describe('if href provided', () => {
        it('should render a link', () => {
          const children = <span>children</span>;
          const href = '/test-href';
          const wrapper = shallow(<CommentField href={href}>{children}</CommentField>);

          expect(wrapper).to.have.exactly(1).descendants(`.${styles.locals.topButtonLink}`);
          expect(wrapper.find(`.${styles.locals.topButtonLink}`)).to.contain(children);
          expect(wrapper.find(`.${styles.locals.topButtonLink}`)).to.have.prop('href', href);
        });

        it('should render link with extraClasses', () => {
          const extraClass = 'extra-class';
          const wrapper = shallow(<CommentField href="#" extraClasses={extraClass} />);
          expect(wrapper.find(`.${styles.locals.topButtonLink}`)).to.have.className(extraClass);
        });

        it('should reflect onClick, onFocus, and onMouseOver to the link element', () => {
          const props = {
            onClick: () => {},
            onFocus: () => {},
            onMouseOver: () => {},
          };
          const wrapper = shallow(<CommentField {...props} />);
          Object.keys(props).forEach((propName) => {
            expect(wrapper.find(`.${styles.locals.topButtonLink}`)).to.have.prop(propName, props[propName]);
          });
        });
      });

      describe('if href not provided', () => {
        it('should render a span', () => {
          const children = <span>children</span>;
          const wrapper = shallow(<CommentField>{children}</CommentField>);

          expect(wrapper).to.have.exactly(1).descendants(`.${styles.locals.topButtonText}`);
          expect(wrapper.find(`.${styles.locals.topButtonText}`)).to.contain(children);
        });

        it('should render span with extraClasses', () => {
          const extraClass = 'extra-class';
          const wrapper = shallow(<CommentField extraClasses={extraClass} />);
          expect(wrapper.find(`.${styles.locals.topButtonText}`)).to.have.className(extraClass);
        });

        it('should reflect onClick, onFocus, and onMouseOver to the link element', () => {
          const props = {
            onClick: () => {},
            onFocus: () => {},
            onMouseOver: () => {},
          };
          const wrapper = shallow(<CommentField {...props} />);
          Object.keys(props).forEach((propName) => {
            expect(wrapper.find(`.${styles.locals.topButtonText}`)).to.have.prop(propName, props[propName]);
          });
        });
      });
    });
  });
});
