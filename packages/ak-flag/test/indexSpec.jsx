import chai from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Flag, { FlagGroup } from '../src';
import flagStyles from '../src/less/Flag.less';

import { name } from '../package.json';

chai.should();
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
      shallow(generateFlag()).should.have.className(flagLocals.root)
    );

    describe('props', () => {
      it('icon prop element should be rendered to correct location', () =>
        shallow(
          generateFlag({
            icon: <span className="test-icon" />,
          })
        ).find(`.${flagLocals.primaryIcon}`).should.contain(<span className="test-icon" />)
      );

      it('title prop text should be rendered to correct location', () =>
        shallow(
          generateFlag({ title: 'Oh hi!' })
        ).find(`.${flagLocals.title}`).should.have.text('Oh hi!')
      );

      describe('description prop', () => {
        it('description element should not be rendered if description prop is empty', () =>
          shallow(
            generateFlag({ description: '' })
          ).find(`.${flagLocals.description}`).should.not.exist
        );

        it('description element should not be rendered if description prop not passed', () =>
          shallow(
            generateFlag()
          ).find(`.${flagLocals.description}`).should.not.exist
        );

        it('description prop text should be rendered to correct location', () =>
          shallow(
            generateFlag({ description: 'Oh hi!' })
          ).find(`.${flagLocals.description}`).should.have.text('Oh hi!')
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
        expect(spy).to.have.been.calledWith('a');
      });

      it('Dismiss button should not be rendered is isDismissAllowed is omitted', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          generateFlag({
            id: 'a',
            onDismissed: spy,
          })
        );
        wrapper.should.not.have.descendants(`.${flagLocals.dismissIconButton}`);
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
      ).should.have.exactly(3).descendants(`.${flagLocals.root}`)
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
      expect(spy).to.have.been.calledWith('a');
    });
  });
});
