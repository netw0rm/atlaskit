import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';

storiesOf(name, module)
  .add('href: custom link', () => (
    <Component
      className={styles.locals.akTag}
      href="https://www.atlassian.com/search?query=Carrot%20cake"
      text="Carrot cake"
    />
  ));
