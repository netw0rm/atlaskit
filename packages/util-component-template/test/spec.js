import React from 'react';
import { shallow } from 'enzyme';
import styles from 'style!../src/styles.less';
import Component from '../src';

import { name } from '../package.json';

describe(name, () => {
  it('should render with correct CSS class name', () =>
    shallow(
      <Component />
    ).find(`.${styles.root}`).length.should.equal(1)
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
