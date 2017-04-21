import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Button from '@atlaskit/button';

import { CommentAction } from '../../src/';
import { name } from '../../package.json';

describe(name, () => {
  describe('CommentAction', () => {
    describe('exports', () => {
      it('the CommentAction component', () => {
        expect(CommentAction).not.to.equal(undefined);
        expect(new CommentAction()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<CommentAction />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a Button containing the children', () => {
        const children = <span>children</span>;
        const wrapper = shallow(<CommentAction>{children}</CommentAction>);
        expect(wrapper.find(Button).length).to.be.above(0);
        expect(wrapper.find(Button).contains(children)).to.equal(true);
      });

      it('should reflect onClick, onFocus, and onMouseOver to a wrapping element', () => {
        const props = {
          onClick: () => {},
          onFocus: () => {},
          onMouseOver: () => {},
        };
        const wrapper = shallow(<CommentAction {...props} />);
        Object.keys(props).forEach((propName) => {
          expect(wrapper.prop(propName)).to.equal(props[propName]);
        });
      });
    });
  });
});
