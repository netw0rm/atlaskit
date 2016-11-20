import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src/index';
import { name } from '../package.json';
import styles from '../src/styles.less';

storiesOf(name, module)
  .add('overview', () => (
    <div>
      <Component
        className={styles.locals.akTag}
        text="Text only"
      />
      <Component
        className={styles.locals.akTag}
        href="https://some.link"
        text="Linked text"
      />
      <Component
        className={styles.locals.akTag}
        text="Removable"
        removeButtonText="Remove me"
      />
      <Component
        className={styles.locals.akTag}
        href="https://some.link"
        text="Removable & linked"
        removeButtonText="Remove me"
      />
      <Component
        className={styles.locals.akTag}
        text="Overflowing text that will be cut off"
      />
      <Component
        className={styles.locals.akTag}
        text="Text with button that will be cut off"
        removeButtonText="Remove me"
      />
    </div>
  ));
