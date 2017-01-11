import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Avatar from 'ak-avatar';
import Lozenge from 'ak-lozenge';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src/';
import styles from '../src/styles.less';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Comment', () => {
    describe('exports', () => {
      it('the Comment component', () => {
        expect(Comment).to.exist;
        expect(new Comment()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Comment />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });
    });

    describe('props', () => {
      describe('actions prop', () => {
        it('should render action items in the correct container', () => {
          const actions = [
            <CommentAction />,
            <CommentAction>action content</CommentAction>,
            <CommentAction onClick={() => {}}>action content</CommentAction>,
          ];
          const wrapper = shallow(<Comment actions={actions} />);
          const container = wrapper.find(`.${styles.locals.actionsContainer}`);
          expect(container).to.have.exactly(actions.length).descendants(CommentAction);
          actions.forEach((action) => {
            expect(container).to.contain(action);
          });
        });
      });

      describe('author prop', () => {
        it('should render the author in the correct container', () => {
          const author = <CommentAuthor>Joshua Nelson</CommentAuthor>;
          const wrapper = shallow(<Comment author={author} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`)).to.contain(author);
        });
      });

      describe('avatar prop', () => {
        it('should render the avatar in the correct location', () => {
          const avatar = <Avatar src="test/src" label="test label" />;
          const wrapper = shallow(<Comment avatar={avatar} />);
          expect(wrapper).to.have.exactly(1).descendants(Avatar);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`)).to.contain(avatar);
        });

        it('can render non-Avatar nodes as the comment avatar', () => {
          const avatar = <img src="test/src" alt="test alt" />;
          const wrapper = shallow(<Comment avatar={avatar} />);
          expect(wrapper.find(`.${styles.locals.avatarContainer}`)).to.contain(avatar);
        });
      });

      describe('content prop', () => {
        it('should render the provided content in the correct container', () => {
          const content = (<p>My sample content</p>);
          const wrapper = shallow(<Comment content={content} />);
          expect(wrapper.find(`.${styles.locals.contentContainer}`)).to.contain(content);
        });

        it('can render string content', () => {
          const textContent = 'My sample content';
          const wrapper = shallow(<Comment content={textContent} />);
          expect(wrapper.find(`.${styles.locals.contentContainer}`)).to.have.text(textContent);
        });
      });

      describe('time prop', () => {
        it('should render the time in the correct container', () => {
          const time = <CommentTime>30 August, 2016</CommentTime>;
          const wrapper = shallow(<Comment time={time} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`)).to.contain(time);
        });
      });

      describe('type prop', () => {
        it('should render a Lozenge with the type in the correct container', () => {
          const type = 'type';
          const wrapper = shallow(<Comment type={type} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`)
            .containsMatchingElement(
              <div className={styles.locals.topItem}>
                <Lozenge>{type}</Lozenge>
              </div>)
          ).to.equal(true);
        });
      });
    });

    describe('nesting', () => {
      it('should render a child comments in the correct container', () => {
        const childComment = <Comment content="child" />;
        const wrapper = shallow(<Comment content="parent'">{childComment}</Comment>);

        const commentsContainer = wrapper.find(`.${styles.locals.nestedComments}`);
        expect(commentsContainer).to.have.exactly(1).descendants(Comment);
        expect(commentsContainer).to.contain(childComment);
      });

      it('should render multiple adjacent siblings', () => {
        const childComments = [<Comment content="child1" />, <Comment content="child2" />];
        const wrapper = shallow(<Comment content="parent'">{childComments}</Comment>);

        const commentsContainer = wrapper.find(`.${styles.locals.nestedComments}`);
        expect(commentsContainer).to.have.exactly(childComments.length).descendants(Comment);
        childComments.forEach(childComment => expect(commentsContainer).to.contain(childComment));
      });
    });
  });
});
