import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Button from 'ak-button';

import { CommentAction } from '../src/';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('CommentAction', () => {
    describe('exports', () => {
      it('the CommentAction component', () => {
        expect(CommentAction).to.exist;
        expect(new CommentAction()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<CommentAction />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render a Button containing the children', () => {
        const children = <span>children</span>;
        const wrapper = shallow(<CommentAction>{children}</CommentAction>);
        expect(wrapper).to.contain.exactly(1).descendants(Button);
        expect(wrapper.find(Button)).to.contain(children);
      });

      it('should apply props to wrapping div', () => {
        const props = {
          onClick: () => {},
          className: 'test-class',
        };
        const wrapper = shallow(<CommentAction {...props} />);
        Object.keys(props).forEach((propName) => {
          expect(wrapper).to.have.prop(propName, props[propName]);
        });
      });
    });
  });
});
