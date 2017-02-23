import * as React from 'react';
import { shallow } from 'enzyme';
import * as styles from '../src/styles';
import Renderer from '../src';
// import { expect } from 'chai';

import { name } from '../package.json';

describe(name, () => {
  xit('should render with correct CSS class name', () =>
    shallow(
      <Renderer />
    ).find(`.${styles.root}`).length.should.equal(1)
  );
});
