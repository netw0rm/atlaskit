import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '@atlaskit/avatar';

import { CommentLayout } from '../../src/';
import styles from '../../src/styles.less';
import { name } from '../../package.json';

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
          expect(wrapper.find(`.${styles.avatarContainer}`).contains(avatar)).to.equal(true);
        });

        it('can render non-Avatar nodes as the comment avatar', () => {
          const avatar = <img src="test/src" alt="test alt" />;
          const wrapper = mount(<CommentLayout avatar={avatar} />);
          expect(wrapper.find(`.${styles.avatarContainer}`).contains(avatar)).to.equal(true);
        });

        it('does not render the avatar container if no avatar is provided', () => {
          const wrapper = shallow(<CommentLayout />);
          expect(wrapper.find(`.${styles.avatarSection}`).length).to.equal(0);
          expect(wrapper.find(`.${styles.avatarContainer}`).length).to.equal(0);
        });
      });

      describe('content prop', () => {
        it('should render the provided content in the correct container', () => {
          const content = (<p>My sample content</p>);
          const wrapper = mount(<CommentLayout content={content} />);
          expect(wrapper.find(`.${styles.mainSection}`).contains(content)).to.equal(true);
        });
      });
    });

    describe('nesting', () => {
      it('should render child comments in the correct container', () => {
        const childComment = <CommentLayout content="child" />;
        const wrapper = mount(<CommentLayout content="parent'">{childComment}</CommentLayout>);

        const commentsContainer = wrapper.find(`.${styles.nestedComments}`);
        expect(commentsContainer.contains(childComment)).to.equal(true);
      });

      it('should render multiple adjacent siblings', () => {
        const childComments = [<CommentLayout content="child1" />, <CommentLayout content="child2" />];
        const wrapper = mount(<CommentLayout content="parent'">{childComments}</CommentLayout>);

        const commentsContainer = wrapper.find(`.${styles.nestedComments}`);
        childComments.forEach(childComment =>
          expect(commentsContainer.contains(childComment)).to.equal(true));
      });

      it('should not render the container if no nested comments are provided', () => {
        const wrapper = mount(<CommentLayout />);
        expect(wrapper.contains(`.${styles.nestedComments}`)).to.equal(false);
      });
    });
  });
});
