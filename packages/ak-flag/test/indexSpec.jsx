import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import Flag, { FlagGroup } from '../src';
import flagStyles from '../src/less/Flag.less';
import flagGroupStyles from '../src/less/FlagGroup.less';

import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
chai.use(chaiEnzyme());

const { locals: flagLocals } = flagStyles;
const { locals: flagGroupLocals } = flagGroupStyles;

describe(name, () => {
  describe('Flag', () => {
    it('should instantiate', () =>
      shallow(<Flag />).should.have.className(flagLocals.root)
    );

    describe('props', () => {
      it('icon prop element should be rendered to correct location', () =>
        shallow(
          <Flag
            icon={
              <span className="test-icon" />
            }
          />
        ).find(`.${flagLocals.primaryIcon}`).should.contain(<span className="test-icon" />)
      );

      it('title prop text should be rendered to correct location', () =>
        shallow(
          <Flag title="Oh hi!" />
        ).find(`.${flagLocals.title}`).should.have.text('Oh hi!')
      );

      describe('description prop', () => {
        it('description element should not be rendered if description prop is empty', () =>
          shallow(
            <Flag description="" />
          ).find(`.${flagLocals.description}`).should.not.exist
        );

        it('description element should not be rendered if description prop not passed', () =>
          shallow(
            <Flag />
          ).find(`.${flagLocals.description}`).should.not.exist
        );

        it('description prop text should be rendered to correct location', () =>
          shallow(
            <Flag description="Oh hi!" />
          ).find(`.${flagLocals.description}`).should.have.text('Oh hi!')
        );
      });

      it('onDismissed should be called with flag id as param when dismiss icon clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          <Flag
            id="a"
            onDismissed={spy}
          />
        );
        wrapper.find(`.${flagLocals.dismissIconButton}`).simulate('click');
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith('a');
      });
    });
  });

  describe('FlagGroup', () => {
    it('should instantiate', () =>
      shallow(
        <FlagGroup />
      ).should.have.className(flagGroupLocals.root)
    );

    it('should render correct number of Flag children', () =>
      mount(
        <FlagGroup>
          <Flag />
          <Flag />
          <Flag />
        </FlagGroup>
      ).should.have.exactly(3).descendants(`.${flagLocals.root}`)
    );
  });
});
