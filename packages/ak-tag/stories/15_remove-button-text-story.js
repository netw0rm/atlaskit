import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
import React from 'react';
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Component = reactify(Tag);

storiesOf(name, module)
  .add('remove-button: simple', () => (
    <Component
      className={styles.akTag}
      text="Liquorice"
      remove-button-text="Remove me"
    />
  ))
  .add('remove-button: with href', () => (
    <Component
      className={styles.akTag}
      href="http://www.atlassian.com"
      text="Gingerbread"
      remove-button-text="Nibble, nibble, gnaw who is nibbling at my little house?"
    />
  ))
  .add('remove-button: hover unlinked vs. linked', () => (
    <div>
      Hover over our remove buttons
      <hr />
      <Component
        className={styles.akTag}
        text="Fruitcake"
        remove-button-text="Brush your teeth!"
      />
      <Component
        className={styles.akTag}
        href="http://www.cupcakeipsum.com"
        text="Chupa chups"
        remove-button-text="Brush your teeth!"
      />
    </div>
  ));
