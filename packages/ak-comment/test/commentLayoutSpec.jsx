import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from 'ak-avatar';

import { CommentLayout } from '../src/';
import styles from '../src/styles.less';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('CommentLayout', () => {
    describe('exports', () => {
      it('the CommentLayout component', () => {
        expect(CommentLayout).not.to.equal(undefined);
        expect(new CommentLayout()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<CommentLayout />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });
    });

    describe('props', () => {
      describe('avatar prop', () => {
        it('should render the avatar in the correct location', () => {
          const avatar = <Avatar src="test/src" label="test label" />;
          const wrapper = mount(<CommentLayout avatar={avatar} />);
          expect(wrapper).to.have.exactly(1).descendants(Avatar);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`)).to.contain(avatar);
        });

        it('can render non-Avatar nodes as the comment avatar', () => {
          const avatar = <img src="test/src" alt="test alt" />;
          const wrapper = mount(<CommentLayout avatar={avatar} />);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`)).to.contain(avatar);
        });

        it('does not render the avatar container if no avatar is provided', () => {
          const wrapper = shallow(<CommentLayout />);
          expect(wrapper).to.not.contain(`.${styles.locals.avatarSection}`);
          expect(wrapper).to.not.contain(`.${styles.locals.avatarContainer}`);
        });
      });

      describe('content prop', () => {
        it('should render the provided content in the correct container', () => {
          const content = (<p>My sample content</p>);
          const wrapper = mount(<CommentLayout content={content} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`)).to.contain(content);
        });
      });
    });

    describe('nesting', () => {
      it('should render child comments in the correct container', () => {
        const childComment = <CommentLayout content="child" />;
        const wrapper = mount(<CommentLayout content="parent'">{childComment}</CommentLayout>);

        const commentsContainer = wrapper.find(`.${styles.locals.nestedComments}`);
        expect(commentsContainer).to.contain(childComment);
      });

      it('should render multiple adjacent siblings', () => {
        const childComments = [<CommentLayout content="child1" />, <CommentLayout content="child2" />];
        const wrapper = mount(<CommentLayout content="parent'">{childComments}</CommentLayout>);

        const commentsContainer = wrapper.find(`.${styles.locals.nestedComments}`);
        childComments.forEach(childComment => expect(commentsContainer).to.contain(childComment));
      });

      it('should not render the container if no nested comments are provided', () => {
        const wrapper = mount(<CommentLayout />);
        expect(wrapper).to.not.contain(`.${styles.locals.nestedComments}`);
      });
    });
  });
});
