import React from 'react';
import { shallow, mount } from 'enzyme';
import Flag, { FlagGroup } from '../src';
import { name } from '../package.json';
import Container, { Description, DismissButton, Title } from '../src/styled/Flag';
import { Action } from '../src/styled/Actions';

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
        it('description element should not be rendered if description prop is empty', () => {
          const wrapper = shallow(generateFlag({ description: '' }));
          expect(wrapper.find(Description).exists()).to.equal(false);
        });

        it('description element should not be rendered if description prop not passed', () => {
          const wrapper = shallow(generateFlag());
          expect(wrapper.find(Description).exists()).to.equal(false);
        });

        it('description prop text should be rendered to correct location', () => {
          const wrapper = shallow(generateFlag({ description: 'Oh hi!' }));
          expect(wrapper.find(Description).childAt(0).text()).to.equal('Oh hi!');
        });

        it('should accept JSX in description', () => {
          const wrapper = shallow(generateFlag({
            description: <span>Check this <a href="https://google.com">link</a> out</span>,
          }));
          expect(wrapper.find(Description).find('> span > a').exists()).to.equal(true);
        });
      });

      describe('actions prop', () => {
        it('actions should be rendered', () => {
          const flag = mount(
            generateFlag({
              actions: [
                { content: 'Hello!' },
                { content: 'Goodbye!' },
              ],
            })
          );
          const actionItems = flag.find(Action);
          actionItems.length.should.equal(2);
          actionItems.at(0).text().should.be.equal('Hello!');
          actionItems.at(1).text().should.be.equal('Goodbye!');
        });

        it('action onClick should be triggered on click', () => {
          const spy = sinon.spy();
          const flag = mount(
            generateFlag({
              actions: [
                { content: 'Hello!', onClick: spy },
              ],
            })
          );
          flag.find('button').simulate('click');
          expect(spy.callCount).to.equal(1);
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
  });

  describe('FlagGroup', () => {
    it('should render the correct number of Flag children', () =>
      mount(
        <FlagGroup>
          {generateFlag()}
          {generateFlag()}
          {generateFlag()}
        </FlagGroup>
      ).find(Container).length.should.equal(3)
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
