import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '@atlaskit/avatar';

import { CommentLayout } from '../src/';
import styles from '../src/styles.less';
import { name } from '../package.json';

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
          expect(wrapper.find(Avatar).length).to.equal(1);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`).contains(avatar)).to.equal(true);
          wrapper.unmount();
        });

        it('can render non-Avatar nodes as the comment avatar', () => {
          const avatar = <img src="test/src" alt="test alt" />;
          const wrapper = mount(<CommentLayout avatar={avatar} />);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`).contains(avatar)).to.equal(true);
          wrapper.unmount();
        });

        it('does not render the avatar container if no avatar is provided', () => {
          const wrapper = shallow(<CommentLayout />);
          expect(wrapper.find(`.${styles.locals.avatarSection}`).length).to.equal(0);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`).length).to.equal(0);
        });
      });

      describe('content prop', () => {
        it('should render the provided content in the correct container', () => {
          const content = (<p>My sample content</p>);
          const wrapper = mount(<CommentLayout content={content} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`).contains(content)).to.equal(true);
          wrapper.unmount();
        });
      });
    });

    describe('nesting', () => {
      it('should render child comments in the correct container', () => {
        const childComment = <CommentLayout content="child" />;
        const wrapper = mount(<CommentLayout content="parent'">{childComment}</CommentLayout>);

        const commentsContainer = wrapper.find(`.${styles.locals.nestedComments}`);
        expect(commentsContainer.contains(childComment)).to.equal(true);
        wrapper.unmount();
      });

      it('should render multiple adjacent siblings', () => {
        const childComments = [<CommentLayout content="child1" />, <CommentLayout content="child2" />];
        const wrapper = mount(<CommentLayout content="parent'">{childComments}</CommentLayout>);

        const commentsContainer = wrapper.find(`.${styles.locals.nestedComments}`);
        childComments.forEach(childComment =>
          expect(commentsContainer.contains(childComment)).to.equal(true));
        wrapper.unmount();
      });

      it('should not render the container if no nested comments are provided', () => {
        const wrapper = mount(<CommentLayout />);
        expect(wrapper.contains(`.${styles.locals.nestedComments}`)).to.equal(false);
        wrapper.unmount();
      });
    });
  });
});
