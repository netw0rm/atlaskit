import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '@atlaskit/avatar';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import Lozenge from '@atlaskit/lozenge';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import Comment, {
  CommentAction,
  CommentAuthor,
  CommentEdited,
  CommentLayout,
  CommentTime,
} from '../../src/';
import { name } from '../../package.json';
import { ActionsContainer } from '../../src/styled/FooterStyles';
import {
  TopItem,
  TopItemsContainer,
} from '../../src/styled/HeaderStyles';
import { Container, Highlight } from '../../src/styled/LayoutStyles';
import { Content } from '../../src/styled/CommentStyles';

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
          const container = wrapper.find(ActionsContainer);
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
          expect(wrapper.find(Container).contains(author)).to.equal(true);
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
          expect(wrapper.find(Content).contains(content)).to.equal(true);
        });

        it('can render string content', () => {
          const textContent = 'My sample content';
          const wrapper = mount(<Comment content={textContent} />);
          expect(wrapper.find(Content).text()).to.equal(textContent);
        });
      });

      describe('time prop', () => {
        it('should render the time in the correct container', () => {
          const time = <CommentTime>30 August, 2016</CommentTime>;
          const wrapper = mount(<Comment time={time} />);
          expect(wrapper.find(Container).contains(time)).to.equal(true);
        });
      });

      describe('edited prop', () => {
        it('should render edited correctly', () => {
          const edited = <CommentEdited>Edited</CommentEdited>;
          const wrapper = mount(<Comment edited={edited} />);
          expect(wrapper.find(Container).contains(edited)).to.equal(true);
        });
      });

      describe('type prop', () => {
        it('should render a Lozenge with the type in the correct container', () => {
          const type = 'type';
          const wrapper = mount(<Comment type={type} />);
          expect(wrapper.find(TopItem).find(Lozenge).length).to.equal(1);
        });
      });

      describe('restrictedTo prop', () => {
        it('should render a Lock icon and restrictedTo name when supplied', () => {
          const wrapper = mount(<Comment restrictedTo="atlassian-staff" />);
          expect(wrapper.find(LockFilledIcon).length).to.equal(1);
          expect(wrapper.text()).to.contain('atlassian-staff');
        });

        it('should not render a Lock icon if restrictedTo prop is not set', () => {
          const wrapper = mount(<Comment />);
          expect(wrapper.find(LockFilledIcon).length).to.equal(0);
        });
      });

      describe('highlighted prop', () => {
        it('should render a highlight underlay inside the container', () => {
          const wrapper = mount(<Comment highlighted />);
          expect(wrapper.find(Highlight).length).to.equal(1);
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
            const wrapper = mount(
              <Comment actions={actions} isSaving savingText="Saving..." isError errorActions={actions} />
            );
            expect(wrapper.find(CommentAction).length).to.equal(0);
          });

          it('should apply .optimistic-saving-content styles', () => {
            const wrapper = mount(<Comment isSaving savingText="Saving..." />);
            expect(wrapper.find(Content).prop('isDisabled')).to.equal(true);
          });
        });

        describe('if isSaving prop is not set', () => {
          it('should not render savingText', () => {
            const wrapper = mount(<Comment savingText="Saving..." />);
            expect(wrapper.text()).to.not.contain('Saving...');
          });

          it('should not apply .optimistic-saving-content styles', () => {
            const wrapper = mount(<Comment savingText="Saving..." />);
            expect(wrapper.find(Content).prop('isDisabled')).to.equal(false);
          });
        });
      });

      describe('isError, errorActions and errorLabel props', () => {
        const errorActions = [
          <CommentAction>Retry</CommentAction>,
          <CommentAction onClick={() => {}}>Cancel</CommentAction>,
        ];

        describe('if isError prop is set', () => {
          it('should render the default (empty) if no errorIconLabel is set', () => {
            const wrapper = mount(<Comment isError errorActions={errorActions} />);
            expect(wrapper.find(WarningIcon).length).to.equal(1);
            expect(wrapper.find(WarningIcon).at(0).prop('label')).to.equal('');
          });

          it('should render the errorIconLabel text if it is set', () => {
            const label = 'Error';
            const wrapper = mount(
              <Comment isError errorActions={errorActions} errorIconLabel={label} />
            );
            expect(wrapper.find(WarningIcon).length).to.equal(1);
            expect(wrapper.find(WarningIcon).at(0).prop('label')).to.equal(label);
          });

          it('should render the icon and errorActions instead of the actions', () => {
            const actions = [
              <CommentAction />,
              <CommentAction>action content</CommentAction>,
              <CommentAction onClick={() => {}}>action content</CommentAction>,
            ];
            const wrapper = mount(
              <Comment actions={actions} isError errorActions={errorActions} />
            );
            expect(wrapper.find(CommentAction).length).to.equal(2);
            const actionItems = wrapper.find(ActionsContainer);
            expect(actionItems.children().length).to.equal(3);
            expect(actionItems.childAt(0).find(WarningIcon).length).to.equal(1);
            expect(actionItems.childAt(1).text()).to.equal('Retry');
            expect(actionItems.childAt(2).text()).to.equal('Cancel');
          });

          it('should apply .optimistic-saving-content styles', () => {
            const wrapper = mount(<Comment isError />);
            expect(wrapper.find(Content).prop('isDisabled')).to.equal(true);
          });
        });

        describe('if isError prop is not set', () => {
          it('should not render the icon and errorActions', () => {
            const wrapper = mount(<Comment errorActions={errorActions} />);
            expect(wrapper.find(WarningIcon).length).to.equal(0);
            expect(wrapper.find(CommentAction).length).to.equal(0);
          });

          it('should not apply .optimistic-saving-content styles', () => {
            const wrapper = mount(<Comment />);
            expect(wrapper.find(Content).prop('isDisabled')).to.equal(false);
          });
        });
      });

      describe('Top items', () => {
        it('Should render in the order author, type, time, restrictedTo', () => {
          const time = <CommentTime>30 August, 2016</CommentTime>;
          const wrapper = mount(<Comment author="Mary" type="Type" time={time} restrictedTo="atlassian-staff" />);
          const topItems = wrapper.find(TopItemsContainer);
          expect(topItems.childAt(0).text()).to.equal('Mary');
          expect(topItems.childAt(1).text()).to.equal('Type');
          expect(topItems.childAt(2).text()).to.equal('30 August, 2016');
          expect(topItems.childAt(3).text()).to.contain('atlassian-staff');
        });

        it('Should render in the order author, type, savingText, restrictedTo', () => {
          const wrapper = mount(<Comment author="Mary" type="Type" restrictedTo="atlassian-staff" isSaving savingText="Saving..." />);
          const topItems = wrapper.find(TopItemsContainer);
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
