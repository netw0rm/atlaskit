import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '@atlaskit/avatar';
import LockIcon from '@atlaskit/icon/glyph/lock';
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

      describe('restrictedTo prop', () => {
        it('should render a Lock icon and restrictedTo name when supplied', () => {
          const wrapper = mount(<Comment restrictedTo="atlassian-staff" />);
          expect(wrapper.find(LockIcon).length).to.equal(1);
          expect(wrapper.text()).to.contain('atlassian-staff');
        });

        it('should not render a Lock icon if restrictedTo prop is not set', () => {
          const wrapper = mount(<Comment />);
          expect(wrapper.find(LockIcon).length).to.equal(0);
        });
      });

      describe('isSaving and savingText props', () => {
        describe('if isSaving prop is set', () => {
          it('should render the default savingText if no savingText is set', () => {
            const wrapper = mount(<Comment isSaving />);
            expect(wrapper.text()).to.contain('Sending...');
          });

          it('should render the savingText text if it is set', () => {
            const wrapper = mount(<Comment isSaving savingText="Saving..." />);
            expect(wrapper.text()).to.contain('Saving...');
          });

          it('should not render CommentActions', () => {
            const actions = [
              <CommentAction />,
              <CommentAction>action content</CommentAction>,
              <CommentAction onClick={() => {}}>action content</CommentAction>,
            ];
            const wrapper = mount(<Comment actions={actions} isSaving savingText="Saving..." />);
            expect(wrapper.find(CommentAction).length).to.equal(0);
          });

          it('should apply .optimistic-saving-content styles', () => {
            const wrapper = mount(<Comment isSaving savingText="Saving..." />);
            expect(wrapper.find(`.${styles.locals.optimisticSavingContent}`).length).to.equal(1);
          });
        });

        describe('if isSaving prop is not set', () => {
          it('should not render savingText', () => {
            const wrapper = mount(<Comment savingText="Saving..." />);
            expect(wrapper.text()).to.not.contain('Saving...');
          });

          it('should not apply .optimistic-saving-content styles', () => {
            const wrapper = mount(<Comment savingText="Saving..." />);
            expect(wrapper.find(`.${styles.locals.optimisticSavingContent}`).length).to.equal(0);
          });
        });
      });

      describe('Top items', () => {
        it('Should render in the order author, type, time, restrictedTo', () => {
          const time = <CommentTime>30 August, 2016</CommentTime>;
          const wrapper = mount(<Comment author="Mary" type="Type" time={time} restrictedTo="atlassian-staff" />);
          const topItems = wrapper.find(`.${styles.locals.topItemsContainer}`);
          expect(topItems.childAt(0).text()).to.equal('Mary');
          expect(topItems.childAt(1).text()).to.equal('Type');
          expect(topItems.childAt(2).text()).to.equal('30 August, 2016');
          expect(topItems.childAt(3).text()).to.contain('atlassian-staff');
        });

        it('Should render in the order author, type, savingText, restrictedTo', () => {
          const wrapper = mount(<Comment author="Mary" type="Type" restrictedTo="atlassian-staff" isSaving savingText="Saving..." />);
          const topItems = wrapper.find(`.${styles.locals.topItemsContainer}`);
          expect(topItems.childAt(0).text()).to.equal('Mary');
          expect(topItems.childAt(1).text()).to.equal('Type');
          expect(topItems.childAt(2).text()).to.equal('Saving...');
          expect(topItems.childAt(3).text()).to.contain('atlassian-staff');
        });

        it('should not render time if isSaving is set', () => {
          const time = <CommentTime>30 August, 2016</CommentTime>;
          const wrapper = mount(<Comment author="Mary" type="Type" time={time} restrictedTo="atlassian-staff" isSaving savingText="Saving..." />);
          expect(wrapper.find(CommentTime).length).to.equal(0);
          expect(wrapper.text()).to.contain('Saving...');
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
