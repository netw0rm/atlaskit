import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';

import Comment, { CommentAction, CommentAuthor, CommentTime, CommentLayout } from '../src/';
import styles from '../src/styles.less';
import { name } from '../package.json';

describe(name, () => {
  describe('Comment', () => {
    describe('exports', () => {
      it('the Comment component', () => {
        expect(Comment).not.to.equal(undefined);
        expect(new Comment()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Comment />);
        expect(wrapper).not.to.equal(undefined);
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
          const wrapper = mount(<Comment actions={actions} />);
          const container = wrapper.find(`.${styles.locals.actionsContainer}`);
          expect(container.find(CommentAction).length).to.equal(actions.length);
          actions.forEach((action) => {
            expect(container.contains(action)).to.equal(true);
          });
        });
      });

      describe('author prop', () => {
        it('should render the author in the correct container', () => {
          const author = <CommentAuthor>Joshua Nelson</CommentAuthor>;
          const wrapper = mount(<Comment author={author} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`).contains(author)).to.equal(true);
        });
      });

      describe('avatar prop', () => {
        it('should be reflected to the CommentLayout', () => {
          const avatar = <Avatar src="test/src" label="test label" />;
          const wrapper = shallow(<Comment avatar={avatar} />);
          expect(wrapper.find(CommentLayout).prop('avatar')).to.equal(avatar);
        });
      });

      describe('content prop', () => {
        it('should render the provided content in the correct container', () => {
          const content = (<p>My sample content</p>);
          const wrapper = mount(<Comment content={content} />);
          expect(wrapper.find(`.${styles.locals.contentContainer}`).contains(content)).to.equal(true);
        });

        it('can render string content', () => {
          const textContent = 'My sample content';
          const wrapper = mount(<Comment content={textContent} />);
          expect(wrapper.find(`.${styles.locals.contentContainer}`).text()).to.equal(textContent);
        });
      });

      describe('time prop', () => {
        it('should render the time in the correct container', () => {
          const time = <CommentTime>30 August, 2016</CommentTime>;
          const wrapper = mount(<Comment time={time} />);
          expect(wrapper.find(`.${styles.locals.mainSection}`).contains(time)).to.equal(true);
        });
      });

      describe('type prop', () => {
        it('should render a Lozenge with the type in the correct container', () => {
          const type = 'type';
          const wrapper = mount(<Comment type={type} />);
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
      it('should reflect children to the CommentLayout', () => {
        const childComment = <Comment content="child" />;
        const wrapper = shallow(<Comment content="parent'">{childComment}</Comment>);
        expect(wrapper.find(CommentLayout).prop('children')).to.equal(childComment);
      });
    });
  });
});
