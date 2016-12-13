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
        ).find(`.${flagLocals.title}`).text().should.equal('Oh hi!')
      );

      it('description prop text should be rendered to correct location', () =>
        shallow(
          <Flag description="Oh hi!" />
        ).find(`.${flagLocals.description}`).text().should.equal('Oh hi!')
      );
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
      ).find(`.${flagLocals.root}`).length.should.equal(3)
    );
  });
});
