import sinon from 'sinon';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Flag, { FlagGroup } from '../src';
import flagStyles from '../src/less/Flag.less';

import { name } from '../package.json';

const { locals: flagLocals } = flagStyles;

describe(name, () => {
  let flagCount = 0;

  // Helper function to generate <Flag /> with base props
  function generateFlag(extraProps) {
    return (
      <Flag
        key={flagCount++}
        title="Flag"
        icon={<div />}
        {...extraProps}
      />
    );
  }

  describe('Flag', () => {
    it('should instantiate', () =>
      shallow(generateFlag()).hasClass(flagLocals.root).should.equal(true)
    );

    describe('props', () => {
      it('icon prop element should be rendered to correct location', () =>
        shallow(
          generateFlag({
            icon: <span className="test-icon" />,
          })
        ).find(`.${flagLocals.primaryIcon}`).contains(<span className="test-icon" />).should.be.equal(true)
      );

      it('title prop text should be rendered to correct location', () =>
        expect(shallow(
          generateFlag({ title: 'Oh hi!' })
        ).find(`.${flagLocals.title}`).text()).to.equal('Oh hi!')
      );

      describe('description prop', () => {
        it('description element should not be rendered if description prop is empty', () =>
          shallow(
            generateFlag({ description: '' })
          ).find(`.${flagLocals.description}`).isEmpty().should.equal(true)
        );

        it('description element should not be rendered if description prop not passed', () =>
          shallow(
            generateFlag()
          ).find(`.${flagLocals.description}`).isEmpty().should.equal(true)
        );

        it('description prop text should be rendered to correct location', () =>
          expect(shallow(
            generateFlag({ description: 'Oh hi!' })
          ).find(`.${flagLocals.description}`).text()).to.equal('Oh hi!')
        );
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
          const renderedActionItems = flag.find(`.${flagLocals.actionsItem}`);
          renderedActionItems.length.should.equal(2);
          renderedActionItems.at(0).text().should.be.equal('Hello!');
          renderedActionItems.at(1).text().should.be.equal('Goodbye!');
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
          flag.find(`.${flagLocals.actionsItem} button`).simulate('click');
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
        wrapper.find(`.${flagLocals.dismissIconButton}`).simulate('click');
        expect(spy.callCount).to.equal(1);
        expect(spy.calledWith('a')).to.equal(true);
      });

      it('Dismiss button should not be rendered is isDismissAllowed is omitted', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          generateFlag({
            id: 'a',
            onDismissed: spy,
          })
        );
        wrapper.find(`.${flagLocals.dismissIconButton}`).length.should.equal(0);
        expect(spy.callCount).to.equal(0);
      });
    });
  });

  describe('FlagGroup', () => {
    it('should render the correct number of Flag children', () =>
      mount(
        <FlagGroup>
          { generateFlag() }
          { generateFlag() }
          { generateFlag() }
        </FlagGroup>
      ).find(`.${flagLocals.root}`).length.should.equal(3)
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
      wrapper.find(`.${flagLocals.dismissIconButton}`).simulate('click');
      wrapper.find(`.${flagLocals.root}`).first().simulate('animationEnd');
      expect(spy.callCount).to.equal(1);
      expect(spy.calledWith('a')).to.equal(true);
    });
  });
});
