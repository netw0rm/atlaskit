import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';

storiesOf(name, module)
  .add('remove-button: simple', () => (
    <Component
      className={styles.locals.akTag}
      text="Liquorice"
      removeButtonText="Remove me"
    />
  ))
  .add('remove-button: with href', () => (
    <Component
      className={styles.locals.akTag}
      href="http://www.atlassian.com"
      text="Gingerbread"
      removeButtonText="Nibble, nibble, gnaw who is nibbling at my little house?"
    />
  ))
  .add('remove-button: hover unlinked vs. linked', () => (
    <div>
      Hover over our remove buttons
      <hr />
      <Component
        className={styles.locals.akTag}
        text="Fruitcake"
        removeButtonText="Brush your teeth!"
      />
      <Component
        className={styles.locals.akTag}
        href="http://www.cupcakeipsum.com"
        text="Chupa chups"
        removeButtonText="Brush your teeth!"
      />
    </div>
  ));
