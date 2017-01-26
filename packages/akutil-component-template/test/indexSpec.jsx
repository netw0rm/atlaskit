import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import styles from 'style!../src/styles.less';
import Component from '../src';

import { name } from '../package.json';

chai.should();

describe(name, () => {
  it('should render with correct CSS class name', () =>
    shallow(
      <Component />
    ).should.have.exactly(1).descendants(`.${styles.root}`)
  );

  describe('audienceName prop', () => {
    it('should default to "world"', () =>
      expect(shallow(
        <Component />
      ).find(`.${styles.root}`).text()).to.equal('Hello world!')
    );
    it('should render supplied prop when provided', () =>
      expect(shallow(
        <Component audienceName="Sideshow Bob" />
      ).find(`.${styles.root}`).text()).to.equal('Hello Sideshow Bob!')
    );
  });
});
