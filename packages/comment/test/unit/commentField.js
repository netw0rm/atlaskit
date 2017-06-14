import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import CommentField from '../../src/components/Field';
import { name } from '../../package.json';
import { Anchor, Span } from '../../src/styled/FieldStyles';

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
          const wrapper = mount(<CommentField href={href}>{children}</CommentField>);

          expect(wrapper.find(Anchor).length).to.equal(1);
          expect(wrapper.find(Anchor).contains(children)).to.equal(true);
          expect(wrapper.find(Anchor).prop('href')).to.equal(href);
        });

        it('should render link with extra styles', () => {
          const wrapper = mount(<CommentField href="#" hasAuthor />);
          expect(wrapper.find(Anchor).prop('hasAuthor')).to.equal(true);
        });

        it('should reflect onClick, onFocus, and onMouseOver to the link element', () => {
          const props = {
            onClick: () => {},
            onFocus: () => {},
            onMouseOver: () => {},
          };
          const wrapper = shallow(<CommentField href="#" {...props} />);
          Object.keys(props).forEach((propName) => {
            expect(wrapper.find(Anchor).prop(propName)).to.equal(props[propName]);
          });
        });
      });

      describe('if href not provided', () => {
        it('should render a span', () => {
          const children = <span>children</span>;
          const wrapper = mount(<CommentField>{children}</CommentField>);

          expect(wrapper.find(Span).length).to.equal(1);
          expect(wrapper.find(Span).contains(children)).to.equal(true);
        });

        it('should render span with author styles', () => {
          const wrapper = mount(<CommentField hasAuthor />);
          expect((wrapper.find(Span)).prop('hasAuthor')).to.equal(true);
        });

        it('should reflect onClick, onFocus, and onMouseOver to the span', () => {
          const props = {
            onClick: () => {},
            onFocus: () => {},
            onMouseOver: () => {},
          };
          const wrapper = shallow(<CommentField {...props} />);
          Object.keys(props).forEach((propName) => {
            expect(wrapper.find(Span).prop(propName)).to.equal(props[propName]);
          });
        });
      });
    });
  });
});
