import React, { Component } from 'react';
import { shallow } from 'enzyme';

import CommentField from '../src/internal/CommentField';
import styles from '../src/styles.less';
import { name } from '../package.json';

describe(name, () => {
  describe('CommentField', () => {
    describe('exports', () => {
      it('the CommentField component', () => {
        expect(CommentField).not.to.equal(undefined);
        expect(new CommentField()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<CommentField />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      describe('if href provided', () => {
        it('should render a link', () => {
          const children = <span>children</span>;
          const href = '/test-href';
          const wrapper = shallow(<CommentField href={href}>{children}</CommentField>);

          expect(wrapper.find(`.${styles.topButtonLink}`).length).to.equal(1);
          expect(wrapper.find(`.${styles.topButtonLink}`).contains(children)).to.equal(true);
          expect(wrapper.find(`.${styles.topButtonLink}`).prop('href')).to.equal(href);
        });

        it('should render link with extraClasses', () => {
          const extraClass = 'extra-class';
          const wrapper = shallow(<CommentField href="#" extraClasses={extraClass} />);
          expect((wrapper.find(`.${styles.topButtonLink}`)).hasClass((extraClass))).to.equal(true);
        });

        it('should reflect onClick, onFocus, and onMouseOver to the link element', () => {
          const props = {
            onClick: () => {},
            onFocus: () => {},
            onMouseOver: () => {},
          };
          const wrapper = shallow(<CommentField href="#" {...props} />);
          Object.keys(props).forEach((propName) => {
            expect(wrapper.find(`.${styles.topButtonLink}`).prop(propName)).to.equal(props[propName]);
          });
        });
      });

      describe('if href not provided', () => {
        it('should render a span', () => {
          const children = <span>children</span>;
          const wrapper = shallow(<CommentField>{children}</CommentField>);

          expect(wrapper.find(`.${styles.topButtonText}`).length).to.equal(1);
          expect(wrapper.find(`.${styles.topButtonText}`).contains(children)).to.equal(true);
        });

        it('should render span with extraClasses', () => {
          const extraClass = 'extra-class';
          const wrapper = shallow(<CommentField extraClasses={extraClass} />);
          expect((wrapper.find(`.${styles.topButtonText}`)).hasClass((extraClass))).to.equal(true);
        });

        it('should reflect onClick, onFocus, and onMouseOver to the span', () => {
          const props = {
            onClick: () => {},
            onFocus: () => {},
            onMouseOver: () => {},
          };
          const wrapper = shallow(<CommentField {...props} />);
          Object.keys(props).forEach((propName) => {
            expect(wrapper.find(`.${styles.topButtonText}`).prop(propName)).to.equal(props[propName]);
          });
        });
      });
    });
  });
});
