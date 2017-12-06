import * as React from 'react';
import { shallow } from 'enzyme';
import * as styles from '../../src/styles';
import Component from '../../src';

import { name } from '../../package.json';

describe(name, () => {
  it('should render with correct CSS class name', () => {
    expect(shallow(<Component />).find(`.${styles.root}`).length).toBe(1);
  });

  describe('audienceName prop', () => {
    it('should default to "world"', () => {
      expect(shallow(<Component />).find(`.${styles.root}`).text()).toBe('Hello world!');
    });
    it('should render supplied prop when provided', () => {
      expect(shallow(<Component audienceName="Sideshow Bob" />).find(`.${styles.root}`).text()).toBe('Hello Sideshow Bob!');
    });
  });
});
