import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import styles from 'style!../src/styles.less';
import Component from '../src';

import { name } from '../package.json';

chai.use(chaiEnzyme());
chai.should();

describe(name, () => {
  it('should render with correct CSS class name', () =>
    shallow(
      <Component />
    ).should.have.exactly(1).descendants(`.${styles.root}`)
  );

  describe('audienceName prop', () => {
    it('should default to "world"', () =>
      shallow(
        <Component />
      ).find(`.${styles.root}`).should.have.text('Hello world!')
    );
    it('should render supplied prop when provided', () =>
      shallow(
        <Component audienceName="Sideshow Bob" />
      ).find(`.${styles.root}`).should.have.text('Hello Sideshow Bob!')
    );
  });
});
