import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import Flag, { FlagGroup } from '../../src';
import { name } from '../../package.json';
import Container, { Description, DismissButton, Title } from '../../src/styled/Flag';
import Actions from '../../src/components/FlagActions';
import { Action } from '../../src/styled/Actions';
import ExpanderInternal from '../../src/styled/Expander';

describe(name, () => {
  let flagCount = 0;

  // Helper function to generate <Flag /> with base props
  function generateFlag(extraProps) {
    return (
      <Flag
        icon={<div />}
        key={flagCount++}
        title="Flag"
        {...extraProps}
      />
    );
  }

  describe('Flag', () => {
    it('should instantiate', () => {
      const wrapper = shallow(generateFlag());
      expect(wrapper.exists()).to.equal(true);
    });

    describe('props', () => {
      it('icon prop element should be rendered to correct location', () => {
        const wrapper = shallow(generateFlag({ icon: <span id="test-icon" /> }));
        expect(wrapper.find('#test-icon').exists()).to.equal(true);
      });

      it('title prop text should be rendered to correct location', () => {
        const wrapper = shallow(generateFlag({ title: 'Oh hi!' }));
        expect(wrapper.find(Title).childAt(0).text()).to.equal('Oh hi!');
      });

      describe('description prop', () => {
        let flag;

        beforeEach(() => {
          flag = mount(generateFlag());
        });

        it('description element should not be rendered if description prop is empty', () => {
          flag.setProps({ description: '' });
          expect(flag.find(Description).exists()).to.equal(false);
        });

        it('description element should not be rendered if description prop not passed', () => {
          expect(flag.find(Description).exists()).to.equal(false);
        });

        it('description prop text should be rendered to correct location', () => {
          flag.setProps({ description: 'Oh hi!' });
          expect(flag.find(Description).exists()).to.equal(true);
          expect(flag.find(Description).text()).to.equal('Oh hi!');
        });

        it('should accept JSX in description', () => {
          flag.setProps({
            description: <span>Check this <a href="https://google.com">link</a> out</span>,
          });
          expect(flag.find(Description).find('> span > a').exists()).to.equal(true);
        });
      });

      describe('appearance prop', () => {
        describe('basic appearance tests', () => {
          let flag;

          beforeEach(() => {
            flag = shallow(generateFlag());
          });

          it('should default to normal appearance', () => {
            expect(flag.prop('appearance')).to.equal('normal');
          });

          it('should apply supplied appearance to root element', () => {
            flag.setProps({ appearance: 'warning' });
            expect(flag.find(Container).prop('appearance')).to.equal('warning');
          });
        });

        describe('non-bold (normal) appearance', () => {
          let flag;

          beforeEach(() => {
            flag = mount(generateFlag({ appearance: 'normal' }));
          });

          it('should not render dismiss icon if isDismissAllowed is false or if no onDismissed callback is provided', () => {
            expect(flag.find(CrossIcon).exists()).to.equal(false);
            flag.setProps({ isDismissAllowed: true, onDismissed: null });
            expect(flag.find(CrossIcon).exists()).to.equal(false);
            flag.setProps({ isDismissAllowed: false, onDismissed: () => {} });
            expect(flag.find(CrossIcon).exists()).to.equal(false);
          });

          it('should render dismiss icon if isDismissAllowed and onDismissed callback is provided', () => {
            flag.setProps({ isDismissAllowed: true, onDismissed: () => {} });
            expect(flag.find(CrossIcon).exists()).to.equal(true);
          });
        });

        describe('bold appearances', () => {
          let flag;

          beforeEach(() => {
            flag = mount(generateFlag({ appearance: 'info', isDismissAllowed: true }));
          });

          it('should default to being not expanded', () => {
            expect(flag.state('isExpanded')).to.equal(false);
          });

          it('should set isExpanded to true when icon clicked', () => {
            flag.find(DismissButton).simulate('click');
            expect(flag.state('isExpanded')).to.equal(true);
          });

          it('should render a chevron-down icon if not expanded', () => {
            expect(flag.state('isExpanded')).to.equal(false);
            expect(flag.find(ChevronDownIcon).exists()).to.equal(true);
          });

          it('should render a chevron-up icon if expanded', () => {
            flag.setState({ isExpanded: true });
            expect(flag.find(ChevronUpIcon).exists()).to.equal(true);
          });

          it('should set aria-hidden true on content when isExpanded is false', () => {
            expect(flag.state('isExpanded')).to.equal(false);
            expect(flag.find(ExpanderInternal).prop('aria-hidden')).to.equal(true);
          });

          it('should set aria-hidden false on content when isExpanded is true', () => {
            flag.setState({ isExpanded: true });
            expect(flag.find(ExpanderInternal).prop('aria-hidden')).to.equal(false);
          });

          it('should pass appearance value on to styled sub-components', () => {
            flag.setState({ isExpanded: true });
            flag.setProps({
              actions: [{ content: 'Hello!' }],
              description: 'Hi there',
            });

            expect(flag.find(Title).prop('appearance')).to.equal('info');
            expect(flag.find(DismissButton).prop('appearance')).to.equal('info');
            expect(flag.find(Description).prop('appearance')).to.equal('info');
            expect(flag.find(Actions).prop('appearance')).to.equal('info');
          });
        });
      });

      describe('actions prop', () => {
        let actionSpy;
        let flag;

        beforeEach(() => {
          actionSpy = sinon.spy();
          flag = mount(
            generateFlag({
              actions: [
                { content: 'Hello!', onClick: actionSpy },
                { content: 'Goodbye!', onClick: actionSpy },
              ],
            })
          );
        });

        it('actions should be rendered', () => {
          const actionItems = flag.find(Action);
          expect(actionItems.length).to.equal(2);
          expect(actionItems.at(0).text()).to.equal('Hello!');
          expect(actionItems.at(1).text()).to.equal('Goodbye!');
        });

        it('action onClick should be triggered on click', () => {
          flag.find('button').first().simulate('click');
          expect(actionSpy.callCount).to.equal(1);
        });
      });

      it('onDismissed should be called with flag id as param when dismiss icon clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          generateFlag({
            id: 'a',
            isDismissAllowed: true,
            onDismissed: spy,
          })
        );
        wrapper.find(DismissButton).simulate('click');
        expect(spy.callCount).to.equal(1);
        expect(spy.calledWith('a')).to.equal(true);
      });

      it('Dismiss button should not be rendered if isDismissAllowed is omitted', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          generateFlag({
            id: 'a',
            onDismissed: spy,
          })
        );
        expect(wrapper.find(DismissButton).exists()).to.equal(false);
        expect(spy.callCount).to.equal(0);
      });
    });

    describe('Flag content expander', () => {
      it('should only render children when isExpanded true (and while doing expand/contract animation)', () => {
        const flag = mount(
          generateFlag({
            appearance: 'info',
            isDismissAllowed: true,
            description: 'Hi!',
          })
        );

        // Check that default collapsed state doesn't render children
        expect(flag.find(Description).length).to.equal(0);

        // Trigger expand
        flag.find(DismissButton).simulate('click');
        expect(flag.find(Description).length).to.equal(1);

        // Trigger collapse
        flag.find(DismissButton).simulate('click');
        expect(flag.find(Description).length).to.equal(1);

        // ..once collapse animation finishes, children not rendered
        flag.find(ExpanderInternal).simulate('transitionEnd');
        expect(flag.find(Description).length).to.equal(0);
      });
    });
  });

  describe('FlagGroup', () => {
    it('should render the correct number of Flag children', () => {
      const wrapper = mount(
        <FlagGroup>
          {generateFlag()}
          {generateFlag()}
          {generateFlag()}
        </FlagGroup>
        );
      expect(wrapper.find(Container).length).to.equal(3);
    }
    );

    it('onDismissed should be called when child Flag is dismissed', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <FlagGroup onDismissed={spy}>
          {
            generateFlag({
              id: 'a',
              isDismissAllowed: true,
              onDismissed: spy,
            })
          }
          { generateFlag({ id: 'b' }) }
        </FlagGroup>
      );
      wrapper.find(DismissButton).simulate('click');
      wrapper.find(Container).first().simulate('animationEnd');
      expect(spy.callCount).to.equal(1);
      expect(spy.calledWith('a')).to.equal(true);
    });
  });
});
