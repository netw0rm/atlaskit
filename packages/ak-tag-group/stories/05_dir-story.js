import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tag from 'ak-tag';

import Group from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';

const RemovableComponent = props => (
  <Tag
    {...props}
    href="http://www.cupcakeipsum.com/"
    removeButtonText="No sweets for you!"
  />
);

storiesOf(name, module)
  .add('text direction', () => (
    <div>
      Try tabbing :)
      <hr />
      <Group className={styles.locals.akTagGroup}>
        <RemovableComponent text="Danish chocolate" />
        <RemovableComponent text="Jelly beans" />
        <RemovableComponent text="Cheesecake" />
      </Group>
    </div>
  ));
